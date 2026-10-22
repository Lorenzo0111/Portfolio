import type { TranslationKey } from "@/lib/i18n";
import { getTranslationsServer } from "@/lib/i18n-server";
import {
  Briefcase,
  Building2,
  GraduationCap,
  Plane,
  Trophy,
} from "lucide-react";
import { CountUp } from "../ui/count-up";
import {
  languages,
  skills,
  softSkills,
  stats,
  timeline,
  type TimelineType,
} from "@/lib/experience";

const timelineIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  university: GraduationCap,
  freelance: Briefcase,
  hackathons: Trophy,
  internships: Building2,
  erasmus: Plane,
  highschool: GraduationCap,
};

const typeStyles: Record<TimelineType, { text: string; dot: string }> = {
  work: { text: "text-primary", dot: "bg-primary" },
  education: { text: "text-sky-400", dot: "bg-sky-400" },
  award: { text: "text-emerald-400", dot: "bg-emerald-400" },
};

export default async function Experience() {
  const { t: translate } = await getTranslationsServer();
  const t = (key: string) => translate(key as TranslationKey);

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
      <header className="mb-14 lg:mb-20 max-w-3xl">
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
          {t("exp.title")}{" "}
          <span className="text-gradient">{t("exp.titleHighlight")}</span>
        </h1>
        <p className="text-lg lg:text-xl text-gray-400 leading-relaxed">
          {t("exp.subtitle")}
        </p>
      </header>

      <dl className="grid grid-cols-2 lg:grid-cols-4 rounded-3xl border border-white/10 bg-card/40 mb-24 lg:mb-32 overflow-hidden">
        {stats.map((id, index) => (
          <div
            key={id}
            className={`flex flex-col-reverse justify-end p-6 lg:p-8 border-white/10 ${index % 2 === 1 ? "border-l" : ""} ${index >= 2 ? "border-t lg:border-t-0" : ""} ${index === 2 ? "lg:border-l" : ""}`}
          >
            <dt className="mt-2 text-sm text-gray-400 leading-snug">
              {t(`exp.stat.${id}.label`)}
            </dt>
            <dd className="text-4xl lg:text-5xl font-bold tracking-tight text-white">
              <CountUp value={t(`exp.stat.${id}.value`)} />
            </dd>
          </div>
        ))}
      </dl>

      <section className="mb-24 lg:mb-32">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10 lg:mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
            {t("exp.timeline")}
          </h2>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-400">
            {(Object.keys(typeStyles) as TimelineType[]).map((type) => (
              <li key={type} className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${typeStyles[type].dot}`}
                />
                {t(`exp.type.${type}`)}
              </li>
            ))}
          </ul>
        </div>

        <ol className="relative">
          {timeline.map(({ id, type, current, highlight, tags }) => {
            const Icon = timelineIcons[id] ?? Briefcase;
            const style = typeStyles[type];
            return (
              <li
                key={id}
                className="group relative grid grid-cols-[2.5rem_1fr] lg:grid-cols-[11rem_3rem_1fr] gap-x-4 lg:gap-x-6"
              >
                <div className="hidden lg:block pt-2.5 text-right">
                  <span className="text-sm font-semibold tabular-nums text-gray-300">
                    {t(`exp.${id}.date`)}
                  </span>
                </div>

                <div className="relative flex justify-center">
                  <span className="absolute top-0 bottom-0 w-px bg-white/10 group-first:top-5 group-last:bottom-auto group-last:h-5" />
                  <span
                    className={`relative mt-0.5 w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-[#1c1c1c] border border-white/10 flex items-center justify-center ${style.text}`}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                </div>

                <div className="pb-12 lg:pb-16 group-last:pb-0 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2 pt-1.5 lg:pt-2.5 text-sm">
                    <span className="font-semibold tabular-nums text-gray-300 lg:hidden">
                      {t(`exp.${id}.date`)}
                    </span>
                    <span className={`font-medium ${style.text}`}>
                      {t(`exp.type.${type}`)}
                    </span>
                    {current && (
                      <span className="flex items-center gap-1.5 text-gray-300">
                        <span className="relative flex w-2 h-2">
                          <span className="absolute inset-0 rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
                          <span className="relative w-2 h-2 rounded-full bg-primary" />
                        </span>
                        {t("exp.current")}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold tracking-tight mb-3">
                    {t(`exp.${id}.title`)}
                  </h3>
                  <p className="text-gray-400 leading-relaxed max-w-2xl">
                    {t(`exp.${id}.desc`)}
                  </p>

                  {highlight && (
                    <div className="mt-5 inline-flex items-baseline gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-3">
                      <span className="text-3xl font-bold text-gradient">
                        {t("exp.stat.grade.value")}
                      </span>
                      <span className="text-sm text-gray-300">
                        {t("exp.highschool.grade")}
                      </span>
                    </div>
                  )}

                  {tags && (
                    <ul className="flex flex-wrap gap-2 mt-5">
                      {tags.map((tag) => (
                        <li
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-medium text-gray-300 border border-white/10"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mb-24 lg:mb-32">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-10">
          {t("exp.skills")}
        </h2>
        <dl className="border-t border-white/10">
          {skills.map(({ id, items }) => (
            <div
              key={id}
              className="grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-x-6 gap-y-2 py-5 border-b border-white/10"
            >
              <dt className="font-semibold text-white">
                {t(`exp.skill.${id}`)}
              </dt>
              <dd className="flex flex-wrap gap-x-5 gap-y-1 text-gray-400">
                {items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            {t("exp.languages")}
          </h2>
          <ul className="space-y-5">
            {languages.map((language) => (
              <li key={language}>
                <div className="text-lg font-semibold text-white">
                  {t(`exp.lang.${language}`)}
                </div>
                <div className="text-sm text-gray-400">
                  {t(`exp.lang.${language}.level`)}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="lg:col-span-2">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            {t("exp.softSkills")}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
            {softSkills.map((skill) => (
              <li key={skill} className="border-l-2 border-primary/60 pl-4">
                <div className="font-semibold text-white mb-1">
                  {t(`exp.soft.${skill}`)}
                </div>
                <div className="text-sm text-gray-400 leading-relaxed">
                  {t(`exp.soft.${skill}.desc`)}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
