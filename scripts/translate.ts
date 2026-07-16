import "dotenv/config";

import { translateDescription } from "@/lib/ai";
import { defaultLocale, locales } from "@/lib/i18n";
import prisma from "@/lib/prismadb";

async function main() {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      description: true,
      translations: true,
    },
  });

  await Promise.all(
    projects.map(async (project) => {
      if (!project.description) return;

      const missingLocales = locales.filter(
        (locale) => locale !== defaultLocale && !project.translations?.[locale],
      );

      if (missingLocales.length === 0) return;

      const translations = await Promise.all(
        locales.map(async (locale) => {
          if (locale === defaultLocale) {
            return { locale, description: project.description! };
          }

          if (project.translations?.[locale]) {
            return { locale, description: project.translations[locale] };
          }

          const translatedDescription = await translateDescription(
            project.description!,
            locale,
          );

          return { locale, description: translatedDescription };
        }),
      );

      await prisma.project.update({
        where: { id: project.id },
        data: {
          translations: Object.fromEntries(
            translations.map((t) => [t.locale, t.description]),
          ),
        },
      });

      console.log("Updated project:", project.id);
    }),
  );
}

main()
  .then(() => {
    console.log("Script executed successfully.");
  })
  .catch((error) => {
    console.error("Error executing script:", error);
  });
