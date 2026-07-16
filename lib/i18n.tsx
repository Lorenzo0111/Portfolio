"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type Locale = "en" | "it";

type TranslationValue = string | Record<string, string>;
type TranslationTree = Record<string, TranslationValue>;

const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.reviews": "Reviews",
    "nav.language": "Language",
    "footer.madeWith": "Made with",
    "footer.by": "by",
    "hero.greeting": "Hello,",
    "hero.name": "I am Lorenzo",
    "hero.description": "A software developer from Italy passionate about creating immersive experiences for people to enjoy.",
    "hero.contact": "Contact Me",
    "hero.work": "View Work",
    "about.title": "Software Developer",
    "about.description": "I love to create new experiences for people to enjoy. I mainly use Typescript and Java for my projects but I also know a lot of other technologies. I'm always looking for new opportunities to learn and grow as a developer.",
    "about.projects": "Projects",
    "about.latest": "Check out my latest work",
    "about.experience": "Years of Experience",
    "about.github": "Explore my open source projects",
    "contact.title": "Ready to start a project?",
    "contact.description": "I'm ready to hear your ideas and help you bring them to life. Get in touch with me today and let's create something amazing together!",
    "contact.cta": "Let's Talk",
    "contact.pageTitle": "Contact Me",
    "contact.pageDescription": "Send me a message and I'll get back to you as soon as possible.",
    "contact.name": "Name",
    "contact.namePlaceholder": "Your name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.messagePlaceholder": "How can I help you?",
    "contact.success": "Message sent successfully!",
    "contact.sending": "Sending...",
    "contact.send": "Send Message",
    "projects.title": "Projects",
    "projects.embedDescription": "Explore some of my best projects. Select one to view more details.",
    "projects.questionPrefix": "What are you",
    "projects.questionHighlight": "looking for",
    "projects.questionSuffix": "?",
    "projects.description": "Choose a category below to explore my projects, open-source work, and custom creations.",
    "projects.all": "All Projects",
    "projects.viewAll": "View All",
    "projects.exploreCategory": "Explore Category",
    "projects.back": "Back to categories",
    "projects.explore": "Explore",
    "projects.projectPlural": "Projects",
    "projects.browseAll": "Browse through my collection of projects across all categories",
    "projects.browseCategory": "Browse through my collection of projects in the {category} category",
    "projects.allFilter": "All",
    "projects.empty": "No projects found matching the selected category.",
    "projects.count": "{count} project{plural}",
    "projects.viewDetails": "View details",
    "projects.categoryWeb": "Modern, responsive websites built to deliver clean design, smooth navigation, and practical functionality.",
    "projects.categoryMobile": "Mobile applications designed to provide useful features, intuitive interfaces, and smooth user experiences.",
    "projects.categoryPlugin": "Custom Minecraft plugins that add new gameplay features, server tools, and personalized player experiences.",
    "projects.categoryBot": "Custom bots that automate tasks, enhance communities, and add interactive features to Discord servers.",
    "projects.categoryAll": "Examine everything! Browse my entire catalog of projects and creations without filters.",
    "projects.categoryFallback": "Specialized projects and dynamic solutions developed under the {category} category.",
    "projects.viewDetailsCapital": "View Details",
    "projects.featured": "Featured",
    "projects.backToProjects": "Back to projects",
    "projects.details": "Project details",
    "projects.attachments": "{count} attachment{plural}",
    "projects.andVideo": " and a video",
    "projects.visit": "Visit",
    "projects.website": "Website",
    "projects.gallery": "Gallery",
    "projects.screens": "Screens & highlights",
    "projects.preview": "Click a thumbnail to preview, then expand.",
    "reviews.loadingTitle": "What they say about me",
    "reviews.titleStart": "What they say",
    "reviews.titleHighlight": "about me",
    "reviews.failed": "Failed to load reviews",
    "reviews.onVouchley": "on Vouchley",
    "reviews.empty": "No reviews available",
    "reviews.viewAll": "View all",
    "reviews.showLess": "Show less",
    "reviews.readMore": "Read more",
    "auth.signIn": "Sign in",
    "auth.welcomeBack": "Welcome back",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.hidePassword": "Hide password",
    "auth.showPassword": "Show password",
    "auth.signInFailed": "Unable to sign in",
    "auth.unexpected": "Unexpected error. Please try again.",
    "auth.socialSignInFailed": "Social sign-in failed",
    "auth.noAccount": "Don't have an account?",
    "auth.signUp": "Sign up",
    "auth.createAccount": "Create account",
    "auth.startJourney": "Start your journey",
    "auth.name": "Name",
    "auth.yourName": "Your name",
    "auth.signUpFailed": "Unable to sign up",
    "auth.socialSignUpFailed": "Social sign-up failed",
    "auth.haveAccount": "Already have an account?",
    "drive.title": "Welcome to your",
    "drive.highlight": "drive",
    "drive.description": "This is where you can download your past commissions.",
    "drive.download": "Download",
    "drive.inviteError": "Error",
    "drive.goHome": "Go Home",
    "drive.invited": "You've been invited",
    "drive.toJoin": "to join",
    "drive.accepting": "Accepting...",
    "drive.accept": "Accept Invitation"
  },
  it: {
    "nav.home": "Home",
    "nav.about": "Chi sono",
    "nav.projects": "Progetti",
    "nav.reviews": "Recensioni",
    "nav.language": "Lingua",
    "footer.madeWith": "Creato con",
    "footer.by": "da",
    "hero.greeting": "Ciao,",
    "hero.name": "sono Lorenzo",
    "hero.description": "Uno sviluppatore software italiano appassionato nel creare esperienze immersive da far vivere alle persone.",
    "hero.contact": "Contattami",
    "hero.work": "Vedi lavori",
    "about.title": "Sviluppatore Software",
    "about.description": "Amo creare nuove esperienze per le persone. Uso principalmente Typescript e Java per i miei progetti, ma conosco anche molte altre tecnologie. Sono sempre alla ricerca di nuove opportunità per imparare e crescere come sviluppatore.",
    "about.projects": "Progetti",
    "about.latest": "Scopri i miei ultimi lavori",
    "about.experience": "Anni di esperienza",
    "about.github": "Esplora i miei progetti open source",
    "contact.title": "Pronto a iniziare un progetto?",
    "contact.description": "Sono pronto ad ascoltare le tue idee e ad aiutarti a realizzarle. Contattami oggi e creiamo qualcosa di fantastico insieme!",
    "contact.cta": "Parliamone",
    "contact.pageTitle": "Contattami",
    "contact.pageDescription": "Mandami un messaggio e ti risponderò il prima possibile.",
    "contact.name": "Nome",
    "contact.namePlaceholder": "Il tuo nome",
    "contact.email": "Email",
    "contact.message": "Messaggio",
    "contact.messagePlaceholder": "Come posso aiutarti?",
    "contact.success": "Messaggio inviato con successo!",
    "contact.sending": "Invio...",
    "contact.send": "Invia messaggio",
    "projects.title": "Progetti",
    "projects.embedDescription": "Esplora alcuni dei miei migliori progetti. Selezionane uno per vedere più dettagli.",
    "projects.questionPrefix": "Cosa stai",
    "projects.questionHighlight": "cercando",
    "projects.questionSuffix": "?",
    "projects.description": "Scegli una categoria qui sotto per esplorare i miei progetti, lavori open-source e creazioni personalizzate.",
    "projects.all": "Tutti i progetti",
    "projects.viewAll": "Vedi tutti",
    "projects.exploreCategory": "Esplora categoria",
    "projects.back": "Torna alle categorie",
    "projects.explore": "Esplora",
    "projects.projectPlural": "Progetti",
    "projects.browseAll": "Sfoglia la mia raccolta di progetti in tutte le categorie",
    "projects.browseCategory": "Sfoglia la mia raccolta di progetti nella categoria {category}",
    "projects.allFilter": "Tutti",
    "projects.empty": "Nessun progetto trovato per la categoria selezionata.",
    "projects.count": "{count} progett{plural}",
    "projects.viewDetails": "Vedi dettagli",
    "projects.categoryWeb": "Siti web moderni e responsive creati per offrire design pulito, navigazione fluida e funzionalità pratiche.",
    "projects.categoryMobile": "Applicazioni mobile progettate per offrire funzionalità utili, interfacce intuitive ed esperienze fluide.",
    "projects.categoryPlugin": "Plugin Minecraft personalizzati che aggiungono nuove funzionalità di gioco, strumenti server ed esperienze su misura.",
    "projects.categoryBot": "Bot personalizzati che automatizzano attività, migliorano le community e aggiungono funzioni interattive ai server Discord.",
    "projects.categoryAll": "Guarda tutto! Sfoglia l’intero catalogo dei miei progetti e creazioni senza filtri.",
    "projects.categoryFallback": "Progetti specializzati e soluzioni dinamiche sviluppate nella categoria {category}.",
    "projects.viewDetailsCapital": "Vedi dettagli",
    "projects.featured": "In evidenza",
    "projects.backToProjects": "Torna ai progetti",
    "projects.details": "Dettagli progetto",
    "projects.attachments": "{count} allegat{plural}",
    "projects.andVideo": " e un video",
    "projects.visit": "Visita",
    "projects.website": "Sito web",
    "projects.gallery": "Galleria",
    "projects.screens": "Schermate e anteprime",
    "projects.preview": "Clicca una miniatura per vedere l'anteprima, poi espandila.",
    "reviews.loadingTitle": "Cosa dicono di me",
    "reviews.titleStart": "Cosa dicono",
    "reviews.titleHighlight": "di me",
    "reviews.failed": "Impossibile caricare le recensioni",
    "reviews.onVouchley": "su Vouchley",
    "reviews.empty": "Nessuna recensione disponibile",
    "reviews.viewAll": "Vedi tutte",
    "reviews.showLess": "Mostra meno",
    "reviews.readMore": "Leggi di più",
    "auth.signIn": "Accedi",
    "auth.welcomeBack": "Bentornato",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.hidePassword": "Nascondi password",
    "auth.showPassword": "Mostra password",
    "auth.signInFailed": "Impossibile accedere",
    "auth.unexpected": "Errore imprevisto. Riprova.",
    "auth.socialSignInFailed": "Accesso social non riuscito",
    "auth.noAccount": "Non hai un account?",
    "auth.signUp": "Registrati",
    "auth.createAccount": "Crea account",
    "auth.startJourney": "Inizia il tuo percorso",
    "auth.name": "Nome",
    "auth.yourName": "Il tuo nome",
    "auth.signUpFailed": "Impossibile registrarsi",
    "auth.socialSignUpFailed": "Registrazione social non riuscita",
    "auth.haveAccount": "Hai già un account?",
    "drive.title": "Benvenuto nel tuo",
    "drive.highlight": "drive",
    "drive.description": "Qui puoi scaricare le tue commissioni passate.",
    "drive.download": "Scarica",
    "drive.inviteError": "Errore",
    "drive.goHome": "Vai alla Home",
    "drive.invited": "Hai ricevuto un invito",
    "drive.toJoin": "per accedere a",
    "drive.accepting": "Accettazione...",
    "drive.accept": "Accetta invito"
  },
} satisfies Record<Locale, TranslationTree>;

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (
    key: TranslationKey,
    params?: Record<string, string | number>,
  ) => string;
}

export type TranslationKey = keyof typeof translations.en;

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    const stored = window.localStorage.getItem("locale");
    return stored === "en" || stored === "it" ? stored : "en";
  });

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    setLocale: (next) => {
      setLocaleState(next);
      window.localStorage.setItem("locale", next);
      document.documentElement.lang = next;
    },
    t: (key, params) => {
      let value = translations[locale][key] ?? translations.en[key] ?? key;
      if (typeof value !== "string") value = String(key);
      if (!params) return value;
      return Object.entries(params).reduce(
        (text, [param, paramValue]) => text.replaceAll(`{${param}}`, String(paramValue)),
        value,
      );
    },
  }), [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
}

export function localizeField(value: string | null | undefined, locale: Locale) {
  if (!value) return "";

  try {
    const parsed = JSON.parse(value) as Partial<Record<Locale, string>>;
    if (parsed && typeof parsed === "object") {
      return parsed[locale] ?? parsed.en ?? parsed.it ?? value;
    }
  } catch {}

  return value;
}
