import { normalizeName } from "@/lib/utils";
import { tool, type InferUITools, type UIDataTypes, type UIMessage } from "ai";
import { unstable_cache } from "next/cache";
import z from "zod";
import {
  buildKnowledgeDocs,
  getExperience,
  getProfile,
  getProjects,
  getReviews,
  getSkills,
} from "./knowledge";
import { semanticSearch } from "./vector";

const cachedProjects = unstable_cache(getProjects, ["chat", "projects"], {
  revalidate: 600,
});

const cachedReviews = unstable_cache(getReviews, ["chat", "reviews"], {
  revalidate: 3600,
});

const cachedDocs = unstable_cache(
  () => buildKnowledgeDocs({ strict: false }),
  ["chat", "docs"],
  { revalidate: 600 },
);

const truncate = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;

/**
 * Plain keyword scoring, used when the vector index is unavailable.
 */
async function keywordSearch(query: string, type?: string) {
  const terms = normalizeName(query)
    .split(" ")
    .filter((term) => term.length > 2);
  const docs = await cachedDocs();

  return docs
    .filter((doc) => !type || doc.type === type)
    .map((doc) => {
      const haystack = `${doc.title} ${doc.text}`.toLowerCase();
      const score = terms.reduce(
        (acc, term) => acc + (haystack.includes(term) ? 1 : 0),
        0,
      );
      return { doc, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ doc }) => ({
      title: doc.title,
      type: doc.type,
      url: doc.url,
      content: doc.text,
    }));
}

async function findProjects(names: string[]) {
  const projects = await cachedProjects();
  return names
    .map((name) =>
      projects.find(
        (project) => normalizeName(project.name) === normalizeName(name),
      ),
    )
    .filter((project) => project !== undefined);
}

const knowledgeType = z
  .enum(["profile", "experience", "skills", "project", "review"])
  .optional()
  .describe("Restrict results to a single kind of content");

export const chatTools = {
  searchPortfolio: tool({
    description:
      "Semantic search across the whole portfolio (bio, experience, skills, projects, client reviews). Use it first for open questions, or when you don't know where the answer is.",
    inputSchema: z.object({
      query: z
        .string()
        .min(2)
        .max(200)
        .describe("A natural language search query, in English"),
      type: knowledgeType,
    }),
    execute: async ({ query, type }) => {
      const results =
        (await semanticSearch(query, { type }).catch((error) => {
          console.error("Semantic search failed", error);
          return null;
        })) ?? (await keywordSearch(query, type));

      return results.length > 0
        ? results
        : { results: [], note: "Nothing relevant found in the portfolio." };
    },
  }),

  listProjects: tool({
    description:
      "List the public projects, optionally filtered by category (e.g. web, mobile, plugin, bot) or by a keyword. Returns short summaries.",
    inputSchema: z.object({
      category: z.string().max(50).optional(),
      keyword: z.string().max(100).optional(),
    }),
    execute: async ({ category, keyword }) => {
      const projects = await cachedProjects();
      const kw = keyword?.toLowerCase();

      const filtered = projects.filter(
        (project) =>
          (!category ||
            project.categories.some((c) =>
              c.toLowerCase().includes(category.toLowerCase()),
            )) &&
          (!kw ||
            project.name.toLowerCase().includes(kw) ||
            project.description.toLowerCase().includes(kw)),
      );

      return {
        total: filtered.length,
        projects: filtered.slice(0, 25).map((project) => ({
          name: project.name,
          categories: project.categories,
          featured: project.featured,
          summary: truncate(project.description, 160),
          url: project.url,
        })),
      };
    },
  }),

  getProjectDetails: tool({
    description: "Get the full details of a single project by its name.",
    inputSchema: z.object({ name: z.string().max(100) }),
    execute: async ({ name }) => {
      const [project] = await findProjects([name]);
      if (project) return project;

      const projects = await cachedProjects();
      const candidates = projects
        .filter((p) =>
          normalizeName(p.name).includes(normalizeName(name).split(" ")[0]),
        )
        .map((p) => p.name);

      return { error: "Project not found", didYouMean: candidates.slice(0, 5) };
    },
  }),

  getProfile: tool({
    description:
      "Get Lorenzo's bio, headline stats, social links and how to contact him.",
    inputSchema: z.object({}),
    execute: async () => getProfile(),
  }),

  getExperience: tool({
    description:
      "Get Lorenzo's full timeline: work, internships, education and awards.",
    inputSchema: z.object({}),
    execute: async () => getExperience(),
  }),

  getSkills: tool({
    description:
      "Get Lorenzo's technical skills, spoken languages and soft skills.",
    inputSchema: z.object({}),
    execute: async () => getSkills(),
  }),

  getReviews: tool({
    description:
      "Get client reviews and the average rating. Pinned reviews come first.",
    inputSchema: z.object({
      limit: z.number().int().min(1).max(20).default(5),
    }),
    execute: async ({ limit }) => {
      const { reviews, ...rest } = await cachedReviews();
      return {
        ...rest,
        reviews: reviews.slice(0, limit).map(({ id: _id, ...review }) => ({
          ...review,
          message: truncate(review.message, 400),
        })),
        allReviewsUrl: "/reviews",
      };
    },
  }),

  showProjects: tool({
    description:
      "Display up to 3 project cards to the visitor (with thumbnail and link). Call it when you recommend or mention specific projects, after you know their exact names. Don't repeat the card content in your text.",
    inputSchema: z.object({
      names: z.array(z.string().max(100)).min(1).max(3),
    }),
    execute: async ({ names }) => {
      const projects = await findProjects(names);
      return projects.map((project) => ({
        name: project.name,
        categories: project.categories,
        thumbnail: project.thumbnail,
        summary: truncate(project.description, 110),
        url: project.url,
      }));
    },
  }),
};

export type ChatMetadata = {
  remaining: number;
  reset: number;
  /** The question was refused by the topic guard */
  offTopic?: boolean;
  /** Sent when the response finishes, used for analytics */
  usage?: { inputTokens?: number; outputTokens?: number };
  finishReason?: string;
};

export type ChatMessage = UIMessage<
  ChatMetadata,
  UIDataTypes,
  InferUITools<typeof chatTools>
>;
