import { cookies, headers } from "next/headers";
import { defaultLocale, getTranslations, Locale } from "./i18n";

export async function getLocaleServer(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get("lang")?.value as Locale | undefined;
    if (cookieLocale === "en" || cookieLocale === "it" || cookieLocale === "es" || cookieLocale === "fr") {
      return cookieLocale;
    }
  } catch (e) {
    // cookies() might fail if called outside request context
  }

  try {
    const reqHeaders = await headers();
    const acceptLanguage = reqHeaders.get("accept-language") || "";
    if (acceptLanguage.startsWith("it") || acceptLanguage.includes("it-")) {
      return "it";
    }
    if (acceptLanguage.startsWith("es") || acceptLanguage.includes("es-")) {
      return "es";
    }
    if (acceptLanguage.startsWith("fr") || acceptLanguage.includes("fr-")) {
      return "fr";
    }
  } catch (e) {
    // headers() might fail similarly
  }

  return defaultLocale;
}

export async function getTranslationsServer() {
  const locale = await getLocaleServer();
  return getTranslations(locale);
}
