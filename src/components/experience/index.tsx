import type { TranslationKey } from "@/lib/i18n";
import { getTranslationsServer } from "@/lib/i18n-server";
import {
  Briefcase,
  Building2,
  Download,
  GraduationCap,
  Languages,
  Layers,
  Plane,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { CountUp } from "../ui/count-up";
import { IconBox } from "../ui/icon-box";

type TimelineType = "work" | "education" | "award";

interface TimelineItem {
  id: string;
  type: TimelineType;
  icon: React.ComponentType<{ className?: string }>;
  current?: boolean;
  highlight?: boolean;
  tags?: string[];
}

const timeline: TimelineItem[] = [
  {
    id: "university",
    type: "education",
    icon: GraduationCap,
    current: true,
  },
  {
    id: "freelance",
    type: "work",
    icon: Briefcase,
    current: true,
    tags: ["Minecraft Plugins", "Discord Bots", "Web"],
  },
  {
    id: "hackathons",
    type: "award",
    icon: Trophy,
  },
  {
    id: "internships",
    type: "work",
    icon: Building2,
    tags: ["Flutter", "REST API", "Databases"],
  },
  {
    id: "erasmus",
    type: "work",
    icon: Plane,
    tags: ["SEO", "Erasmus+"],
  },
  {
    id: "highschool",
    type: "education",
    icon: GraduationCap,
    highlight: true,
  },
];

const typeStyles: Record<TimelineType, string> = {
  work: "text-primary",
  education: "text-blue-400",
  award: "text-emerald-400",
};

const stats = [
  { id: "downloads", icon: Download, className: "text-primary" },
  { id: "projects", icon: Layers, className: "text-blue-400" },
  { id: "rating", icon: Star, className: "text-emerald-400" },
  { id: "grade", icon: GraduationCap, className: "text-purple-400" },
] as const;

const skills = [
  { id: "backend", items: ["Java", "Kotlin", "PHP", "TypeScript"] },
  { id: "frontend", items: ["React", "HTML", "Tailwind"] },
  { id: "mobile", items: ["React Native", "Flutter"] },
  { id: "frameworks", items: ["Next.js", "Laravel", "Prisma"] },
  { id: "minecraft", items: ["Paper", "NMS", "Velocity", "BungeeCord"] },
  { id: "databases", items: ["MySQL", "Postgres", "MongoDB"] },
  { id: "systems", items: ["GitHub", "Docker"] },
] as const;

const softSkills = ["communication", "problemSolving", "speaking", "driven"];
const languages = ["italian", "english"];

export default async function Experience() {
  const { t: translate } = await getTranslationsServer();
  const t = (key: string) => translate(key as TranslationKey);

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
      <div className="mb-12 text-center lg:text-left">
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
          {t("exp.title")}{" "}
          <span className="text-gradient">{t("exp.titleHighlight")}</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
          {t("exp.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {stats.map(({ id, icon: Icon, className }) => (
          <Card key={id} className="flex flex-col justify-between">
            <IconBox className={`mb-4 ${className}`}>
              <Icon className="w-6 h-6" />
            </IconBox>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                <CountUp value={t(`exp.stat.${id}.value`)} />
              </div>
              <div className="text-sm text-gray-400">
                {t(`exp.stat.${id}.label`)}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <h2 className="text-3xl font-bold mb-10">{t("exp.timeline")}</h2>
      <ol className="relative mb-24 ml-6 border-l border-white/10">
        {timeline.map(
          ({ id, type, icon: Icon, current, highlight, tags }) => (
            <li key={id} className="relative pl-10 pb-10 last:pb-0">
              <div
                className={`absolute -left-6 top-0 w-12 h-12 rounded-2xl bg-[#1c1c1c] border border-white/10 flex items-center justify-center ${typeStyles[type]}`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <Card>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-sm font-semibold text-gray-400">
                    {t(`exp.${id}.date`)}
                  </span>
                  <Badge className={typeStyles[type]}>
                    {t(`exp.type.${type}`)}
                  </Badge>
                  {current && (
                    <span className="badge flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {t("exp.current")}
                    </span>
                  )}
                </div>

                <h3 className="text-xl lg:text-2xl font-bold mb-3">
                  {t(`exp.${id}.title`)}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {t(`exp.${id}.desc`)}
                </p>

                {highlight && (
                  <div className="mt-6 inline-flex items-baseline gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-3">
                    <span className="text-3xl font-bold text-gradient">
                      {t("exp.stat.grade.value")}
                    </span>
                    <span className="text-sm text-gray-300">
                      {t("exp.highschool.grade")}
                    </span>
                  </div>
                )}

                {tags && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                )}
              </Card>
            </li>
          ),
        )}
      </ol>

      <h2 className="text-3xl font-bold mb-10">{t("exp.skills")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {skills.map(({ id, items }) => (
          <Card key={id}>
            <h3 className="text-lg font-bold mb-4">{t(`exp.skill.${id}`)}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </Card>
        ))}

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Languages className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold">{t("exp.languages")}</h3>
          </div>
          <ul className="space-y-3">
            {languages.map((language) => (
              <li key={language}>
                <div className="font-semibold text-white">
                  {t(`exp.lang.${language}`)}
                </div>
                <div className="text-sm text-gray-400">
                  {t(`exp.lang.${language}.level`)}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold">{t("exp.softSkills")}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {softSkills.map((skill) => (
            <div key={skill}>
              <div className="font-semibold text-white mb-1">
                {t(`exp.soft.${skill}`)}
              </div>
              <div className="text-sm text-gray-400 leading-relaxed">
                {t(`exp.soft.${skill}.desc`)}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
