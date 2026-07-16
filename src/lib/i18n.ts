export const locales = ["en", "it", "es", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale = "en" as const;

export const translations = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.reviews": "Reviews",

    // Footer
    "footer.madeWith": "Made with",
    "footer.by": "by",

    // Hero
    "hero.hello": "Hello,",
    "hero.iam": "I am Lorenzo",
    "hero.description":
      "A software developer from Italy passionate about creating immersive experiences for people to enjoy.",
    "hero.contact": "Contact Me",
    "hero.viewWork": "View Work",

    // About
    "about.title": "Software Developer",
    "about.description":
      "I love to create new experiences for people to enjoy. I mainly use Typescript and Java for my projects but I also know a lot of other technologies. I'm always looking for new opportunities to learn and grow as a developer.",
    "about.projects": "Projects",
    "about.projectsDescription": "Check out my latest work",
    "about.experienceValue": "5+",
    "about.experienceTitle": "Years of Experience",
    "about.githubTitle": "GitHub",
    "about.githubDescription": "Explore my open source projects",

    // Contact CTA
    "contactCta.title": "Ready to start a project?",
    "contactCta.description":
      "I'm ready to hear your ideas and help you bring them to life. Get in touch with me today and let's create something amazing together!",
    "contactCta.button": "Let's Talk",

    // Contact Page
    "contact.title": "Contact Me",
    "contact.subtitle":
      "Send me a message and I'll get back to you as soon as possible.",
    "contact.label.name": "Name",
    "contact.placeholder.name": "Your name",
    "contact.label.email": "Email",
    "contact.placeholder.email": "your@email.com",
    "contact.label.message": "Message",
    "contact.placeholder.message": "How can I help you?",
    "contact.success": "Message sent successfully!",
    "contact.sending": "Sending...",
    "contact.send": "Send Message",

    // Reviews Page
    "reviews.title": "What they say",
    "reviews.titleHighlight": "about me",
    "reviews.fallbackTitle": "What they say about me",
    "reviews.failed": "Failed to load reviews",
    "reviews.empty": "No reviews available",
    "reviews.viewAll": "View all",
    "reviews.showLess": "Show less",
    "reviews.readMore": "Read more",
    "reviews.onVouchley": "on Vouchley",

    // Projects Page
    "projects.title": "What are you",
    "projects.titleHighlight": "looking for",
    "projects.subtitle":
      "Choose a category below to explore my projects, open-source work, and custom creations.",
    "projects.allTitle": "All Projects",
    "projects.viewAll": "View All",
    "projects.exploreCategory": "Explore Category",
    "projects.backToCategories": "Back to categories",
    "projects.explore": "Explore",
    "projects.projectsSuffix": "Projects",
    "projects.browseAll":
      "Browse through my collection of projects across all categories",
    "projects.browseCategory":
      "Browse through my collection of projects in the {category} category",
    "projects.allLabel": "All",
    "projects.empty": "No projects found matching the selected category.",
    "projects.featured": "Featured",
    "projects.viewDetails": "View Details",
    "projects.viewDetailsCompact": "View details",
    "projects.projectLabel": "project",
    "projects.projectsLabel": "projects",

    // Category descriptions
    "category.desc.all":
      "Examine everything! Browse my entire catalog of projects and creations without filters.",
    "category.desc.web":
      "Modern, responsive websites built to deliver clean design, smooth navigation, and practical functionality.",
    "category.desc.mobile":
      "Mobile applications designed to provide useful features, intuitive interfaces, and smooth user experiences.",
    "category.desc.plugin":
      "Custom Minecraft plugins that add new gameplay features, server tools, and personalized player experiences.",
    "category.desc.bot":
      "Custom bots that automate tasks, enhance communities, and add interactive features to Discord servers.",
    "category.desc.fallback":
      "Specialized projects and dynamic solutions developed under the {category} category.",

    // Project Details
    "project.back": "Back to projects",
    "project.details": "Project details",
    "project.attachment": "attachment",
    "project.attachments": "attachments",
    "project.andVideo": " and a video",
    "project.visit": "Visit",
    "project.gallery": "Gallery",
    "project.screens": "Screens & highlights",
    "project.galleryHint": "Click a thumbnail to preview, then expand.",
    "project.visitGithub": "Visit GitHub",
    "project.visitWebsite": "Visit Website",

    // Metadata
    "meta.home.title": "Home - Lorenzo0111",
    "meta.home.desc":
      "Software developer from Italy specializing in Typescript and Java.",
    "meta.projects.title": "Projects",
    "meta.projects.desc": "Browse all projects and work by Lorenzo0111",
    "meta.reviews.title": "Reviews",
    "meta.reviews.desc": "Browse all reviews left by my clients",
    "meta.contact.title": "Contact Me",
    "meta.contact.desc":
      "Send me a message and I'll get back to you as soon as possible.",
    "meta.login.title": "Login",
    "meta.login.desc": "Sign in to your account",
  },
  it: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "Chi Sono",
    "nav.projects": "Progetti",
    "nav.reviews": "Recensioni",

    // Footer
    "footer.madeWith": "Fatto con",
    "footer.by": "da",

    // Hero
    "hero.hello": "Ciao,",
    "hero.iam": "Sono Lorenzo",
    "hero.description":
      "Un software developer italiano appassionato nella creazione di esperienze immersive da far vivere alle persone.",
    "hero.contact": "Contattami",
    "hero.viewWork": "I miei lavori",

    // About
    "about.title": "Sviluppatore Software",
    "about.description":
      "Amo creare nuove esperienze per il divertimento delle persone. Utilizzo principalmente TypeScript e Java per i miei progetti, ma conosco anche molte altre tecnologie. Sono sempre alla ricerca di nuove opportunità per imparare e crescere come sviluppatore.",
    "about.projects": "Progetti",
    "about.projectsDescription": "Dai un'occhiata ai miei ultimi lavori",
    "about.experienceValue": "5+",
    "about.experienceTitle": "Anni di Esperienza",
    "about.githubTitle": "GitHub",
    "about.githubDescription": "Esplora i miei progetti open source",

    // Contact CTA
    "contactCta.title": "Pronto a iniziare un progetto?",
    "contactCta.description":
      "Sono pronto ad ascoltare le tue idee e ad aiutarti a realizzarle. Contattami oggi stesso e creiamo qualcosa di straordinario insieme!",
    "contactCta.button": "Sentiamoci",

    // Contact Page
    "contact.title": "Contattami",
    "contact.subtitle":
      "Inviami un messaggio e ti risponderò il prima possibile.",
    "contact.label.name": "Nome",
    "contact.placeholder.name": "Il tuo nome",
    "contact.label.email": "Email",
    "contact.placeholder.email": "tua@email.com",
    "contact.label.message": "Messaggio",
    "contact.placeholder.message": "Come posso aiutarti?",
    "contact.success": "Messaggio inviato con successo!",
    "contact.sending": "Invio in corso...",
    "contact.send": "Invia Messaggio",

    // Reviews Page
    "reviews.title": "Cosa dicono",
    "reviews.titleHighlight": "di me",
    "reviews.fallbackTitle": "Cosa dicono di me",
    "reviews.failed": "Impossibile caricare le recensioni",
    "reviews.empty": "Nessuna recensione disponibile",
    "reviews.viewAll": "Vedi tutte",
    "reviews.showLess": "Mostra meno",
    "reviews.readMore": "Leggi di più",
    "reviews.onVouchley": "su Vouchley",

    // Projects Page
    "projects.title": "Cosa stai",
    "projects.titleHighlight": "cercando",
    "projects.subtitle":
      "Scegli una categoria qui sotto per esplorare i miei progetti, lavori open-source e creazioni personalizzate.",
    "projects.allTitle": "Tutti i Progetti",
    "projects.viewAll": "Mostra Tutti",
    "projects.exploreCategory": "Esplora Categoria",
    "projects.backToCategories": "Torna alle categorie",
    "projects.explore": "Esplora",
    "projects.projectsSuffix": "Progetti",
    "projects.browseAll":
      "Sfoglia la mia collezione di progetti in tutte le categorie",
    "projects.browseCategory":
      "Sfoglia la mia collezione di progetti nella categoria {category}",
    "projects.allLabel": "Tutti",
    "projects.empty": "Nessun progetto trovato per la categoria selezionata.",
    "projects.featured": "In evidenza",
    "projects.viewDetails": "Vedi Dettagli",
    "projects.viewDetailsCompact": "Vedi dettagli",
    "projects.projectLabel": "progetto",
    "projects.projectsLabel": "progetti",

    // Category descriptions
    "category.desc.all":
      "Esamina tutto! Sfoglia l'intero catalogo di progetti e creazioni senza filtri.",
    "category.desc.web":
      "Siti web moderni e responsive, realizzati per offrire un design pulito, una navigazione fluida e funzionalità pratiche.",
    "category.desc.mobile":
      "Applicazioni mobili progettate per fornire funzionalità utili, interfacce intuitive ed esperienze utente fluide.",
    "category.desc.plugin":
      "Plugin Minecraft personalizzati che aggiungono nuove funzionalità di gioco, strumenti server ed esperienze di gioco su misura.",
    "category.desc.bot":
      "Bot personalizzati per automatizzare attività, migliorare le community e aggiungere funzionalità interattive ai server Discord.",
    "category.desc.fallback":
      "Progetti specializzati e soluzioni dinamiche sviluppate nella categoria {category}.",

    // Project Details
    "project.back": "Torna ai progetti",
    "project.details": "Dettagli del progetto",
    "project.attachment": "allegato",
    "project.attachments": "allegati",
    "project.andVideo": " e un video",
    "project.visit": "Visita",
    "project.gallery": "Galleria",
    "project.screens": "Schermate e punti salienti",
    "project.galleryHint":
      "Clicca su una miniatura per l'anteprima, poi espandi.",
    "project.visitGithub": "Visita GitHub",
    "project.visitWebsite": "Visita Sito Web",

    // Metadata
    "meta.home.title": "Home - Lorenzo0111",
    "meta.home.desc":
      "Sviluppatore software italiano specializzato in TypeScript e Java.",
    "meta.projects.title": "Progetti",
    "meta.projects.desc": "Sfoglia tutti i progetti e i lavori di Lorenzo0111",
    "meta.reviews.title": "Recensioni",
    "meta.reviews.desc":
      "Sfoglia tutte le recensioni lasciate dai miei clienti",
    "meta.contact.title": "Contattami",
    "meta.contact.desc":
      "Inviami un messaggio e ti risponderò il prima possibile.",
    "meta.login.title": "Accedi",
    "meta.login.desc": "Accedi al tuo account",
  },
  es: {
    // Navbar
    "nav.home": "Inicio",
    "nav.about": "Sobre mí",
    "nav.projects": "Proyectos",
    "nav.reviews": "Reseñas",

    // Footer
    "footer.madeWith": "Hecho con",
    "footer.by": "por",

    // Hero
    "hero.hello": "Hola,",
    "hero.iam": "Soy Lorenzo",
    "hero.description":
      "Un desarrollador de software de Italia apasionado por crear experiencias inmersivas para el disfrute de la gente.",
    "hero.contact": "Contáctame",
    "hero.viewWork": "Ver proyectos",

    // About
    "about.title": "Desarrollador de Software",
    "about.description":
      "Me encanta crear nuevas experiencias para que la gente las disfrute. Utilizo principalmente TypeScript y Java para mis proyectos, pero también conozco muchas otras tecnologías. Siempre busco nuevas oportunidades para aprender y crecer como desarrollador.",
    "about.projects": "Proyectos",
    "about.projectsDescription": "Echa un vistazo a mis últimos trabajos",
    "about.experienceValue": "5+",
    "about.experienceTitle": "Años de Experiencia",
    "about.githubTitle": "GitHub",
    "about.githubDescription": "Explora mis proyectos de código abierto",

    // Contact CTA
    "contactCta.title": "¿Listo para empezar un proyecto?",
    "contactCta.description":
      "Estoy listo para escuchar tus ideas y ayudarte a darles vida. ¡Ponte en contacto conmigo hoy mismo y creemos algo increíble juntos!",
    "contactCta.button": "Hablemos",

    // Contact Page
    "contact.title": "Contáctame",
    "contact.subtitle": "Envíame un mensaje y te responderé lo antes posible.",
    "contact.label.name": "Nombre",
    "contact.placeholder.name": "Tu nombre",
    "contact.label.email": "Correo electrónico",
    "contact.placeholder.email": "tu@correo.com",
    "contact.label.message": "Mensaje",
    "contact.placeholder.message": "¿Cómo puedo ayudarte?",
    "contact.success": "¡Mensaje enviado con éxito!",
    "contact.sending": "Enviando...",
    "contact.send": "Enviar Mensaje",

    // Reviews Page
    "reviews.title": "Qué dicen",
    "reviews.titleHighlight": "de mí",
    "reviews.fallbackTitle": "Qué dicen de mí",
    "reviews.failed": "Error al cargar las reseñas",
    "reviews.empty": "No hay reseñas disponibles",
    "reviews.viewAll": "Ver todas",
    "reviews.showLess": "Mostrar menos",
    "reviews.readMore": "Leer más",
    "reviews.onVouchley": "en Vouchley",

    // Projects Page
    "projects.title": "¿Qué estás",
    "projects.titleHighlight": "buscando",
    "projects.subtitle":
      "Elige una categoría a continuación para explorar mis proyectos, trabajos de código abierto y creaciones personalizadas.",
    "projects.allTitle": "Todos los Proyectos",
    "projects.viewAll": "Ver Todo",
    "projects.exploreCategory": "Explorar Categoría",
    "projects.backToCategories": "Volver a categorías",
    "projects.explore": "Explorar",
    "projects.projectsSuffix": "Proyectos",
    "projects.browseAll":
      "Explora mi colección de proyectos en todas las categorías",
    "projects.browseCategory":
      "Explora mi colección de proyectos en la categoría {category}",
    "projects.allLabel": "Todos",
    "projects.empty":
      "No se encontraron proyectos que coincidan con la categoría seleccionada.",
    "projects.featured": "Destacado",
    "projects.viewDetails": "Ver Detalles",
    "projects.viewDetailsCompact": "Ver detalles",
    "projects.projectLabel": "proyecto",
    "projects.projectsLabel": "proyectos",

    // Category descriptions
    "category.desc.all":
      "¡Exáminalo todo! Explora mi catálogo completo de proyectos y creaciones sin filtros.",
    "category.desc.web":
      "Sitios web modernos y responsivos diseñados para ofrecer un diseño limpio, navegación fluida y funcionalidad práctica.",
    "category.desc.mobile":
      "Aplicaciones móviles diseñadas para proporcionar funciones útiles, interfaces intuitivas y experiencias de usuario fluidas.",
    "category.desc.plugin":
      "Plugins de Minecraft personalizados que añaden nuevas funciones de juego, herramientas de servidor y experiencias de juego personalizadas.",
    "category.desc.bot":
      "Bots personalizados que automatizan tareas, mejoran las comunidades y añaden funciones interactivas a los servidores de Discord.",
    "category.desc.fallback":
      "Proyectos especializados y soluciones dinámicas desarrollados bajo la categoría {category}.",

    // Project Details
    "project.back": "Volver a proyectos",
    "project.details": "Detalles del proyecto",
    "project.attachment": "archivo adjunto",
    "project.attachments": "archivos adjuntos",
    "project.andVideo": " y un video",
    "project.visit": "Visitar",
    "project.gallery": "Galería",
    "project.screens": "Pantallas y destacados",
    "project.galleryHint":
      "Haz clic en una miniatura para ver la vista previa y luego amplía.",
    "project.visitGithub": "Visitar GitHub",
    "project.visitWebsite": "Visitar Sitio Web",

    // Metadata
    "meta.home.title": "Inicio - Lorenzo0111",
    "meta.home.desc":
      "Desarrollador de software de Italia especializado en TypeScript y Java.",
    "meta.projects.title": "Proyectos",
    "meta.projects.desc":
      "Explora todos los proyectos y trabajos de Lorenzo0111",
    "meta.reviews.title": "Reseñas",
    "meta.reviews.desc": "Explora todas las reseñas dejadas por mis clientes",
    "meta.contact.title": "Contáctame",
    "meta.contact.desc": "Envíame un mensaje y te responderé lo antes posible.",
    "meta.login.title": "Iniciar sesión",
    "meta.login.desc": "Inicia sesión en tu cuenta",
  },
  fr: {
    // Navbar
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.projects": "Projets",
    "nav.reviews": "Avis",

    // Footer
    "footer.madeWith": "Fait avec",
    "footer.by": "par",

    // Hero
    "hero.hello": "Bonjour,",
    "hero.iam": "Je suis Lorenzo",
    "hero.description":
      "Un développeur de logiciels d'Italie passionné par la création d'expériences immersives pour le plaisir de tous.",
    "hero.contact": "Me contacter",
    "hero.viewWork": "Voir mes travaux",

    // About
    "about.title": "Développeur de logiciels",
    "about.description":
      "J'aime créer de nouvelles expériences pour le plaisir des gens. J'utilise principalement TypeScript et Java pour mes projets, mais je connais aussi beaucoup d'autres technologies. Je suis toujours à la recherche de nouvelles opportunités pour apprendre et grandir en tant que développeur.",
    "about.projects": "Projets",
    "about.projectsDescription": "Découvrez mes derniers travaux",
    "about.experienceValue": "5+",
    "about.experienceTitle": "Années d'expérience",
    "about.githubTitle": "GitHub",
    "about.githubDescription": "Explorez mes projets open source",

    // Contact CTA
    "contactCta.title": "Prêt à commencer un projet ?",
    "contactCta.description":
      "Je suis prêt à élever vos idées et à vous aider à les concrétiser. Contactez-moi dès aujourd'hui et créons quelque chose d'incroyable ensemble !",
    "contactCta.button": "Discutons",

    // Contact Page
    "contact.title": "Me contacter",
    "contact.subtitle":
      "Envoyez-moi un message et je vous répondrai dès que possible.",
    "contact.label.name": "Nom",
    "contact.placeholder.name": "Votre nom",
    "contact.label.email": "E-mail",
    "contact.placeholder.email": "votre@email.com",
    "contact.label.message": "Message",
    "contact.placeholder.message": "Comment puis-je vous aider ?",
    "contact.success": "Message envoyé avec succès !",
    "contact.sending": "Envoi en cours...",
    "contact.send": "Envoyer le message",

    // Reviews Page
    "reviews.title": "Ce qu'ils disent",
    "reviews.titleHighlight": "de moi",
    "reviews.fallbackTitle": "Ce qu'ils disent de moi",
    "reviews.failed": "Échec du chargement des avis",
    "reviews.empty": "Aucun avis disponible",
    "reviews.viewAll": "Voir tout",
    "reviews.showLess": "Voir moins",
    "reviews.readMore": "Lire plus",
    "reviews.onVouchley": "sur Vouchley",

    // Projects Page
    "projects.title": "Que",
    "projects.titleHighlight": "recherchez-vous",
    "projects.subtitle":
      "Choisissez une catégorie ci-dessous pour explorer mes projets, mes travaux open source et mes créations personnalisées.",
    "projects.allTitle": "Tous les Projets",
    "projects.viewAll": "Voir tout",
    "projects.exploreCategory": "Explorer la catégorie",
    "projects.backToCategories": "Retour aux catégories",
    "projects.explore": "Explorer",
    "projects.projectsSuffix": "Projets",
    "projects.browseAll":
      "Parcourez ma collection de projets dans toutes les catégories",
    "projects.browseCategory":
      "Parcourez ma collection de projets dans la catégorie {category}",
    "projects.allLabel": "Tous",
    "projects.empty":
      "Aucun projet trouvé correspondant à la catégorie sélectionnée.",
    "projects.featured": "Mis en avant",
    "projects.viewDetails": "Voir les détails",
    "projects.viewDetailsCompact": "Voir détails",
    "projects.projectLabel": "projet",
    "projects.projectsLabel": "projets",

    // Category descriptions
    "category.desc.all":
      "Tout examiner ! Parcourez mon catalogue complet de projets et créations sans filtres.",
    "category.desc.web":
      "Sites web modernes et réactifs conçus pour offrir un design épuré, une navigation fluide et des fonctionnalités pratiques.",
    "category.desc.mobile":
      "Applications mobiles conçues pour fournir des fonctionnalités utiles, des interfaces intellectuelles et des expériences utilisateur fluides.",
    "category.desc.plugin":
      "Plugins Minecraft personnalisés qui ajoutent de nouvelles fonctionnalités de jeu, des outils serveur et des expériences de jeu personnalisées.",
    "category.desc.bot":
      "Bots personnalisés qui automatisent les tâches, améliorent les communautés et ajoutent des fonctionnalités interactives aux serveurs Discord.",
    "category.desc.fallback":
      "Projets spécialisés et solutions dynamiques développés dans la catégorie {category}.",

    // Project Details
    "project.back": "Retour aux projets",
    "project.details": "Détails du projet",
    "project.attachment": "pièce jointe",
    "project.attachments": "pièces jointes",
    "project.andVideo": " et une vidéo",
    "project.visit": "Visiter",
    "project.gallery": "Galerie",
    "project.screens": "Écrans & points forts",
    "project.galleryHint":
      "Cliquez sur une vignette pour prévisualiser, puis agrandissez.",
    "project.visitGithub": "Visiter GitHub",
    "project.visitWebsite": "Visiter le site Web",

    // Metadata
    "meta.home.title": "Accueil - Lorenzo0111",
    "meta.home.desc":
      "Développeur de logiciels d'Italie spécialisé en TypeScript et Java.",
    "meta.projects.title": "Projets",
    "meta.projects.desc":
      "Parcourez tous les projets et travaux de Lorenzo0111",
    "meta.reviews.title": "Avis",
    "meta.reviews.desc": "Parcourez tous les avis laissés par mes clients",
    "meta.contact.title": "Me contacter",
    "meta.contact.desc":
      "Envoyez-moi un message et je vous répondrai dès que possible.",
    "meta.login.title": "Se connecter",
    "meta.login.desc": "Connectez-vous à votre compte",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function getTranslations(locale: Locale) {
  const dict = translations[locale] || translations[defaultLocale];

  return {
    t: (key: TranslationKey, variables?: Record<string, string | number>) => {
      let text: string = dict[key] || translations[defaultLocale][key] || key;
      if (variables) {
        Object.entries(variables).forEach(([k, v]) => {
          text = text.replace(new RegExp(`{${k}}`, "g"), String(v));
        });
      }
      return text;
    },
    locale,
  };
}
