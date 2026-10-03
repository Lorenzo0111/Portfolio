import { cookies, headers } from "next/headers";
import { defaultLocale, getTranslations, Locale, locales } from "./i18n";

export async function getLocaleServer(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get("lang")?.value as Locale | undefined;
    if (cookieLocale && locales.includes(cookieLocale)) {
      return cookieLocale;
    }
  } catch (e) {
    // cookies() might fail if called outside request context
  }

  try {
    const reqHeaders = await headers();
    const preferred = (reqHeaders.get("accept-language") || "")
      .split(",")
      .map((part) => {
        const [tag, q] = part.trim().split(";q=");
        return {
          lang: tag.split("-")[0].toLowerCase(),
          q: q === undefined ? 1 : Number(q) || 0,
        };
      })
      .sort((a, b) => b.q - a.q)
      .find(({ lang, q }) => q > 0 && locales.includes(lang as Locale));

    if (preferred) return preferred.lang as Locale;
  } catch (e) {
    // headers() might fail similarly
  }

  return defaultLocale;
}

export async function getTranslationsServer() {
  const locale = await getLocaleServer();
  return getTranslations(locale);
}
