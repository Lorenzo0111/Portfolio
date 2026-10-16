import { parseCategoryCsv } from "@/lib/categories";
import {
  languages,
  skills,
  softSkills,
  stats,
  timeline,
} from "@/lib/experience";
import { getTranslations, type TranslationKey } from "@/lib/i18n";
import prisma from "@/lib/prismadb";
import { nameAsId } from "@/lib/utils";
import { fetchReviews } from "@/lib/vouchley";

export type KnowledgeType =
  "profile" | "experience" | "skills" | "project" | "review";

export interface KnowledgeDoc {
  id: string;
  type: KnowledgeType;
  title: string;
  text: string;
  url?: string;
}

// The knowledge base is always built in English, the model translates answers.
const { t: translate } = getTranslations("en");
const t = (key: string) => translate(key as TranslationKey);

export const socials = {
  website: "https://lorenzo0111.me",
  github: "https://github.com/Lorenzo0111",
  x: "https://x.com/akaLorenzo0111",
  discord: "https://discord.gg/HT47UQXBqG",
  reviews: "https://vouchley.com/user/lorenzo0111",
  contactPage: "/contact",
};

export function getProfile() {
  return {
    name: "Lorenzo (Lorenzo0111)",
    location: "Italy",
    headline: t("hero.description"),
    about: t("about.description"),
    journey: t("exp.subtitle"),
    yearsOfExperience: t("about.experienceValue"),
    stats: Object.fromEntries(
      stats.map((id) => [t(`exp.stat.${id}.label`), t(`exp.stat.${id}.value`)]),
    ),
    links: socials,
    howToContact:
      "Use the contact form at /contact, or reach out on Discord or X. The contact form is the preferred way for project inquiries.",
  };
}

export function getExperience() {
  return timeline.map(({ id, type, current, tags }) => ({
    title: t(`exp.${id}.title`),
    type,
    date: t(`exp.${id}.date`),
    ongoing: !!current,
    description: t(`exp.${id}.desc`),
    ...(id === "highschool" && {
      grade: `${t("exp.stat.grade.value")} ${t("exp.highschool.grade")}`,
    }),
    tags: tags ?? [],
  }));
}

export function getSkills() {
  return {
    technical: Object.fromEntries(
      skills.map(({ id, items }) => [t(`exp.skill.${id}`), [...items]]),
    ),
    languages: languages.map((language) => ({
      language: t(`exp.lang.${language}`),
      level: t(`exp.lang.${language}.level`),
    })),
    softSkills: softSkills.map((skill) => ({
      skill: t(`exp.soft.${skill}`),
      evidence: t(`exp.soft.${skill}.desc`),
    })),
  };
}

export async function getProjects() {
  const projects = await prisma.project.findMany({
    where: { hidden: false },
    orderBy: [{ top: "desc" }, { order: "desc" }],
    select: {
      name: true,
      description: true,
      category: true,
      link: true,
      youtube: true,
      thumbnail: true,
      top: true,
    },
  });

  return projects.map((project) => ({
    name: project.name,
    description: project.description ?? "",
    categories: parseCategoryCsv(project.category),
    featured: project.top,
    link: project.link,
    hasVideo: !!project.youtube,
    thumbnail: project.thumbnail,
    url: `/projects/${nameAsId(project.name)}`,
  }));
}

export type ChatProject = Awaited<ReturnType<typeof getProjects>>[number];

export async function getReviews() {
  const { reviews, average_rating } = await fetchReviews();

  return {
    averageRating: average_rating,
    count: reviews.length,
    reviews: reviews
      .toSorted((a, b) => Number(!!b.pinned) - Number(!!a.pinned))
      .map((review) => ({
        id: review.id,
        rating: review.rating,
        message: review.message,
        service: review.product?.description ?? null,
        date: review.time_sent,
      })),
  };
}

/**
 * Splits the whole portfolio into small self-contained documents
 * that get embedded into the vector index.
 *
 * In strict mode a failing source throws, so the index never drops
 * documents because of a temporary outage.
 */
export async function buildKnowledgeDocs({
  strict = true,
}: { strict?: boolean } = {}): Promise<KnowledgeDoc[]> {
  const profile = getProfile();
  const skillSet = getSkills();

  const docs: KnowledgeDoc[] = [
    {
      id: "profile",
      type: "profile",
      title: "About Lorenzo",
      text: [
        `${profile.name}, software developer from ${profile.location}.`,
        profile.headline,
        profile.about,
        profile.journey,
        `Years of experience: ${profile.yearsOfExperience}.`,
        ...Object.entries(profile.stats).map(([k, v]) => `${k}: ${v}.`),
      ].join("\n"),
      url: "/",
    },
    {
      id: "contact",
      type: "profile",
      title: "Contact and links",
      text: [
        profile.howToContact,
        ...Object.entries(profile.links).map(([k, v]) => `${k}: ${v}`),
      ].join("\n"),
      url: "/contact",
    },
    ...getExperience().map((item, i) => ({
      id: `experience-${timeline[i].id}`,
      type: "experience" as const,
      title: item.title,
      text: [
        `${item.title} (${item.type}, ${item.date}${item.ongoing ? ", ongoing" : ""})`,
        item.description,
        item.grade && `Grade: ${item.grade}`,
        item.tags.length > 0 && `Tags: ${item.tags.join(", ")}`,
      ]
        .filter(Boolean)
        .join("\n"),
      url: "/experience",
    })),
    {
      id: "skills-technical",
      type: "skills",
      title: "Technical skills",
      text: Object.entries(skillSet.technical)
        .map(([group, items]) => `${group}: ${items.join(", ")}`)
        .join("\n"),
      url: "/experience",
    },
    {
      id: "skills-soft",
      type: "skills",
      title: "Languages and soft skills",
      text: [
        ...skillSet.languages.map((l) => `${l.language}: ${l.level}`),
        ...skillSet.softSkills.map((s) => `${s.skill}: ${s.evidence}`),
      ].join("\n"),
      url: "/experience",
    },
  ];

  const [projects, reviews] = await Promise.allSettled([
    getProjects(),
    getReviews(),
  ]);

  for (const result of [projects, reviews]) {
    if (result.status === "fulfilled") continue;
    if (strict) throw result.reason;
    console.error("Skipping knowledge source", result.reason);
  }

  for (const project of projects.status === "fulfilled" ? projects.value : []) {
    docs.push({
      id: `project-${nameAsId(project.name)}`,
      type: "project",
      title: project.name,
      text: [
        `Project: ${project.name}`,
        `Categories: ${project.categories.join(", ")}`,
        project.featured && "Featured project",
        project.link && `Link: ${project.link}`,
        project.description,
      ]
        .filter(Boolean)
        .join("\n"),
      url: project.url,
    });
  }

  for (const review of reviews.status === "fulfilled"
    ? reviews.value.reviews
    : []) {
    if (!review.message) continue;

    docs.push({
      id: `review-${review.id}`,
      type: "review",
      title: `Client review (${review.rating}/5)`,
      text: [
        `Client review, rating ${review.rating}/5`,
        review.service && `Service: ${review.service}`,
        review.message,
      ]
        .filter(Boolean)
        .join("\n"),
      url: "/reviews",
    });
  }

  return docs;
}
