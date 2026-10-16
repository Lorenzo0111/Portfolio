export const locales = ["en", "it", "es", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale = "en" as const;

export const translations = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.experience": "Experience",
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

    // Experience Page
    "exp.title": "My",
    "exp.titleHighlight": "journey",
    "exp.subtitle":
      "I have been building software since I was 13. Today I maintain open source projects with over 20 million downloads, have delivered 100+ freelance projects and build backend, frontend and mobile solutions.",
    "exp.timeline": "Timeline",
    "exp.current": "Ongoing",
    "exp.type.work": "Work",
    "exp.type.education": "Education",
    "exp.type.award": "Awards",
    "exp.stat.downloads.value": "20M+",
    "exp.stat.downloads.label": "Open source downloads",
    "exp.stat.projects.value": "100+",
    "exp.stat.projects.label": "Freelance projects delivered",
    "exp.stat.rating.value": "5★",
    "exp.stat.rating.label": "Average client rating",
    "exp.stat.grade.value": "100/100",
    "exp.stat.grade.label": "Diploma grade, with honors",
    "exp.university.date": "2026 - Present",
    "exp.university.title": "Computer Science, University",
    "exp.university.desc":
      "Currently studying for a bachelor's degree in Computer Science.",
    "exp.freelance.date": "2025 - Present",
    "exp.freelance.title": "Freelance Developer",
    "exp.freelance.desc":
      "Worked on more than 100 projects for different clients while keeping a 5-star average rating. Strong focus on client communication, meeting deadlines and delivering high-quality experiences.",
    "exp.hackathons.date": "2025 - 2026",
    "exp.hackathons.title": "Hackathons",
    "exp.hackathons.desc":
      "Won various hackathons, building solutions to real-world problems. Gained experience in critical thinking, rapid prototyping and pitching ideas to an audience.",
    "exp.internships.date": "Jul 2025 - Feb 2026",
    "exp.internships.title": "Software Development Internships",
    "exp.internships.desc":
      "Three internships at a software company, focused on mobile and web apps for logistics. Worked with Flutter, APIs and databases, contributing to delivery and order management features as part of a team.",
    "exp.erasmus.date": "Feb - Mar 2025",
    "exp.erasmus.title": "Erasmus+ Internship in Spain",
    "exp.erasmus.desc":
      "Two-week internship in Spain through the Erasmus+ programme at an agency specialized in website SEO. Hands-on experience with content optimization and digital strategy analysis.",
    "exp.highschool.date": "2021 - 2026",
    "exp.highschool.title": "High School Diploma in Computer Science",
    "exp.highschool.desc":
      "Five-year technical high school programme in Computer Science, completed with the highest possible grade.",
    "exp.highschool.grade": "with honors (cum laude)",
    "exp.skills": "Skills",
    "exp.skill.backend": "Backend",
    "exp.skill.frontend": "Frontend",
    "exp.skill.mobile": "Mobile",
    "exp.skill.frameworks": "Frameworks",
    "exp.skill.minecraft": "Minecraft",
    "exp.skill.databases": "Databases",
    "exp.skill.systems": "Systems",
    "exp.languages": "Languages",
    "exp.lang.italian": "Italian",
    "exp.lang.italian.level": "Native",
    "exp.lang.english": "English",
    "exp.lang.english.level": "C1 - Cambridge certification",
    "exp.softSkills": "Soft Skills",
    "exp.soft.communication": "Client Communication",
    "exp.soft.communication.desc":
      "Kept a 5-star rating across 100+ freelance projects.",
    "exp.soft.problemSolving": "Problem Solving",
    "exp.soft.problemSolving.desc": "Won various hackathons.",
    "exp.soft.speaking": "Public Speaking",
    "exp.soft.speaking.desc":
      "Presented solutions to judges and audiences at several events.",
    "exp.soft.driven": "Driven",
    "exp.soft.driven.desc": "Building software since I was 13.",
    "about.experienceLink": "See my journey",

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
    "meta.experience.title": "Experience",
    "meta.experience.desc":
      "Work experience, education and skills of Lorenzo0111",

    // Chat
    "chat.open": "Ask AI",
    "chat.title": "Ask about Lorenzo",
    "chat.subtitle": "AI assistant",
    "chat.greeting":
      "Hi! 👋 Ask me anything about Lorenzo's projects, skills or experience.",
    "chat.suggestion1": "What are his best projects?",
    "chat.suggestion2": "What's his tech stack?",
    "chat.suggestion3": "Has he built mobile apps?",
    "chat.suggestion4": "How can I work with him?",
    "chat.placeholder": "Ask a question…",
    "chat.send": "Send",
    "chat.stop": "Stop",
    "chat.reset": "New chat",
    "chat.close": "Close",
    "chat.disclaimer": "AI can make mistakes. Don't share personal info.",
    "chat.remaining": "{count} messages left today",
    "chat.rateLimited":
      "You've reached your daily limit of {limit} messages. You can ask again in {time}.",
    "chat.tooLong": "Your message is too long, try to shorten it.",
    "chat.error": "Something went wrong. Please try again.",
    "chat.retry": "Retry",
    "chat.verifyFailed":
      "We couldn't verify that you're human. Please try again.",
    "chat.tool.searchPortfolio": "Searching the portfolio",
    "chat.tool.listProjects": "Browsing projects",
    "chat.tool.getProjectDetails": "Reading project details",
    "chat.tool.getProfile": "Checking the profile",
    "chat.tool.getExperience": "Checking experience",
    "chat.tool.getSkills": "Checking skills",
    "chat.tool.getReviews": "Reading client reviews",
    "chat.tool.showProjects": "Picking projects",

    // Privacy
    "chat.privacy": "Privacy",
    "footer.privacy": "Privacy",
    "consent.text":
      "I use optional analytics cookies to understand how the site is used. You can accept or decline them.",
    "consent.accept": "Accept",
    "consent.decline": "Decline",
    "consent.learnMore": "Privacy policy",
    "meta.privacy.title": "Privacy Policy",
    "meta.privacy.desc": "How this website handles your data",
    "privacy.title": "Privacy Policy",
    "privacy.updated": "Last updated: {date}",
    "privacy.intro":
      "This website is the personal portfolio of Lorenzo (Lorenzo0111), based in Italy, who is responsible for your data. This page explains what is collected when you use it and why.",
    "privacy.contact.title": "Contact form",
    "privacy.contact.body":
      "When you send a message, your name, email and message are emailed to me through Resend so that I can reply. They are kept only as long as needed to handle your request. Legal basis: your request.",
    "privacy.assistant.title": "AI assistant",
    "privacy.assistant.body":
      "Your questions are sent to OpenRouter and the AI model provider (OpenAI) only to generate an answer. Zero data retention is requested, so they are not stored or used for training. The conversation is kept only in your browser for the current session. Your IP address is stored for up to 24 hours from Upstash to apply usage limits, and Cloudflare Turnstile checks requests to block bots. Please don't share personal information in the chat. Legal basis: legitimate interest in providing the feature and preventing abuse.",
    "privacy.analytics.title": "Analytics",
    "privacy.analytics.body":
      "Only if you accept, PostHog (EU servers) collects usage data such as visited pages, clicks and how the AI assistant is used, never the text of your questions, using cookies and local storage. Vercel Web Analytics and Speed Insights collect anonymous, aggregated visit and performance data without cookies. Legal basis: your consent for PostHog, legitimate interest for Vercel.",
    "privacy.cookies.title": "Cookies",
    "privacy.cookies.body":
      "Technical cookies are always used to remember your language and keep you signed in. Analytics cookies are used only after your consent, and you can change your choice at any time.",
    "privacy.providers.title": "Providers and transfers",
    "privacy.providers.body":
      "The website is hosted on Vercel and uses the providers listed above: Vercel, Supabase, Resend, PostHog, Upstash, OpenRouter and OpenAI. Some of them are based in the United States, transfers rely on the EU-US Data Privacy Framework or on Standard Contractual Clauses.",
    "privacy.rights.title": "Your rights",
    "privacy.rights.body":
      "You can ask to access, correct or delete your data, object to its processing or withdraw your consent at any time through the contact page.",
    "privacy.manageConsent": "Change cookie preferences",
    "privacy.contactMe": "Contact me",
  },
  it: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "Chi Sono",
    "nav.projects": "Progetti",
    "nav.experience": "Esperienze",
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

    // Experience Page
    "exp.title": "Il mio",
    "exp.titleHighlight": "percorso",
    "exp.subtitle":
      "Sviluppo software dall'età di 13 anni. Oggi gestisco progetti open source con oltre 20 milioni di download, ho portato a termine più di 100 progetti come freelance e sviluppo soluzioni per backend, frontend e dispositivi mobili.",
    "exp.timeline": "Timeline",
    "exp.current": "In corso",
    "exp.type.work": "Lavoro",
    "exp.type.education": "Istruzione",
    "exp.type.award": "Premi",
    "exp.stat.downloads.value": "20M+",
    "exp.stat.downloads.label": "Download open source",
    "exp.stat.projects.value": "100+",
    "exp.stat.projects.label": "Progetti freelance completati",
    "exp.stat.rating.value": "5★",
    "exp.stat.rating.label": "Valutazione media dei clienti",
    "exp.stat.grade.value": "100/100",
    "exp.stat.grade.label": "Voto di diploma, con lode",
    "exp.university.date": "2026 - Ora",
    "exp.university.title": "Informatica, Università",
    "exp.university.desc":
      "Attualmente frequento il corso di laurea triennale in Informatica.",
    "exp.freelance.date": "2025 - Ora",
    "exp.freelance.title": "Sviluppatore Freelance",
    "exp.freelance.desc":
      "Ho lavorato a più di 100 progetti per diversi clienti mantenendo una valutazione media di 5 stelle. Forte attenzione alla comunicazione con i clienti, al rispetto delle scadenze e al fornire esperienze di alta qualità.",
    "exp.hackathons.date": "2025 - 2026",
    "exp.hackathons.title": "Hackathon",
    "exp.hackathons.desc":
      "Ho vinto vari hackathon, creando soluzioni per risolvere problemi del mondo reale. Ho acquisito esperienza nel pensiero critico, nella prototipazione rapida e nella presentazione di idee a un pubblico.",
    "exp.internships.date": "Lug 2025 - Feb 2026",
    "exp.internships.title": "Tirocini di Sviluppo Software",
    "exp.internships.desc":
      "Tre tirocini presso un'azienda di software, focalizzati sullo sviluppo di app mobile e web per la logistica. Esperienza con Flutter, API e database, contribuendo alle funzionalità di gestione delle consegne e degli ordini all'interno di un team.",
    "exp.erasmus.date": "Feb - Mar 2025",
    "exp.erasmus.title": "Tirocinio Erasmus+ in Spagna",
    "exp.erasmus.desc":
      "Tirocinio di due settimane in Spagna attraverso il programma Erasmus+ presso un'agenzia specializzata in SEO per siti web. Esperienza pratica nell'ottimizzazione dei contenuti e nell'analisi delle strategie digitali.",
    "exp.highschool.date": "2021 - 2026",
    "exp.highschool.title": "Diploma in Informatica",
    "exp.highschool.desc":
      "Percorso quinquennale di istituto tecnico a indirizzo Informatica, concluso con il massimo dei voti.",
    "exp.highschool.grade": "e lode",
    "exp.skills": "Competenze",
    "exp.skill.backend": "Backend",
    "exp.skill.frontend": "Frontend",
    "exp.skill.mobile": "Mobile",
    "exp.skill.frameworks": "Framework",
    "exp.skill.minecraft": "Minecraft",
    "exp.skill.databases": "Database",
    "exp.skill.systems": "Sistemi",
    "exp.languages": "Lingue",
    "exp.lang.italian": "Italiano",
    "exp.lang.italian.level": "Madrelingua",
    "exp.lang.english": "Inglese",
    "exp.lang.english.level": "C1 - Certificazione Cambridge",
    "exp.softSkills": "Competenze Trasversali",
    "exp.soft.communication": "Comunicazione con i Clienti",
    "exp.soft.communication.desc":
      "Ho mantenuto un rating di 5 stelle in oltre 100 progetti freelance.",
    "exp.soft.problemSolving": "Problem Solving",
    "exp.soft.problemSolving.desc": "Ho vinto vari hackathon.",
    "exp.soft.speaking": "Public Speaking",
    "exp.soft.speaking.desc":
      "Ho presentato soluzioni a giudici e pubblici in diversi eventi.",
    "exp.soft.driven": "Determinato",
    "exp.soft.driven.desc": "Sviluppo software da quando avevo 13 anni.",
    "about.experienceLink": "Scopri il mio percorso",

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
    "meta.experience.title": "Esperienze",
    "meta.experience.desc":
      "Esperienze lavorative, istruzione e competenze di Lorenzo0111",

    // Chat
    "chat.open": "Chiedi all'AI",
    "chat.title": "Chiedi di Lorenzo",
    "chat.subtitle": "Assistente AI",
    "chat.greeting":
      "Ciao! 👋 Chiedimi qualsiasi cosa su progetti, competenze o esperienza di Lorenzo.",
    "chat.suggestion1": "Quali sono i suoi progetti migliori?",
    "chat.suggestion2": "Quali tecnologie usa?",
    "chat.suggestion3": "Ha sviluppato app mobile?",
    "chat.suggestion4": "Come posso lavorare con lui?",
    "chat.placeholder": "Fai una domanda…",
    "chat.send": "Invia",
    "chat.stop": "Ferma",
    "chat.reset": "Nuova chat",
    "chat.close": "Chiudi",
    "chat.disclaimer": "L'AI può sbagliare. Non condividere dati personali.",
    "chat.remaining": "{count} messaggi rimasti oggi",
    "chat.rateLimited":
      "Hai raggiunto il limite giornaliero di {limit} messaggi. Potrai chiedere di nuovo tra {time}.",
    "chat.tooLong": "Il messaggio è troppo lungo, prova ad accorciarlo.",
    "chat.error": "Qualcosa è andato storto. Riprova.",
    "chat.retry": "Riprova",
    "chat.verifyFailed":
      "Non siamo riusciti a verificare che tu sia umano. Riprova.",
    "chat.tool.searchPortfolio": "Cerco nel portfolio",
    "chat.tool.listProjects": "Sfoglio i progetti",
    "chat.tool.getProjectDetails": "Leggo i dettagli del progetto",
    "chat.tool.getProfile": "Controllo il profilo",
    "chat.tool.getExperience": "Controllo l'esperienza",
    "chat.tool.getSkills": "Controllo le competenze",
    "chat.tool.getReviews": "Leggo le recensioni",
    "chat.tool.showProjects": "Scelgo i progetti",

    // Privacy
    "chat.privacy": "Privacy",
    "footer.privacy": "Privacy",
    "consent.text":
      "Uso cookie analitici facoltativi per capire come viene usato il sito. Puoi accettarli o rifiutarli.",
    "consent.accept": "Accetta",
    "consent.decline": "Rifiuta",
    "consent.learnMore": "Privacy policy",
    "meta.privacy.title": "Privacy Policy",
    "meta.privacy.desc": "Come questo sito tratta i tuoi dati",
    "privacy.title": "Privacy Policy",
    "privacy.updated": "Ultimo aggiornamento: {date}",
    "privacy.intro":
      "Questo sito è il portfolio personale di Lorenzo (Lorenzo0111), con sede in Italia, titolare del trattamento dei tuoi dati. Questa pagina spiega quali dati vengono raccolti quando lo usi e perché.",
    "privacy.contact.title": "Modulo di contatto",
    "privacy.contact.body":
      "Quando invii un messaggio, il tuo nome, la tua email e il messaggio mi vengono inviati via email tramite Resend per poterti rispondere. Vengono conservati solo per il tempo necessario a gestire la tua richiesta.",
    "privacy.assistant.title": "Assistente AI",
    "privacy.assistant.body":
      "Le tue domande vengono inviate a OpenRouter e al fornitore del modello AI (OpenAI) solo per generare una risposta. È richiesta la conservazione zero dei dati, quindi non vengono salvate né usate per l'addestramento. La conversazione resta solo nel tuo browser per la sessione corrente. Il tuo indirizzo IP viene conservato per massimo 24 ore da Upstash per applicare i limiti di utilizzo, e Cloudflare Turnstile controlla le richieste per bloccare i bot. Non condividere dati personali nella chat.",
    "privacy.analytics.title": "Statistiche",
    "privacy.analytics.body":
      "Solo se accetti, PostHog con server in UE raccoglie dati di utilizzo come pagine visitate, clic e uso dell'assistente AI, mai il testo delle tue domande, tramite cookie e local storage. Vercel Web Analytics e Speed Insights raccolgono dati anonimi e aggregati su visite e prestazioni senza cookie.",
    "privacy.cookies.title": "Cookie",
    "privacy.cookies.body":
      "I cookie tecnici vengono sempre usati per ricordare la lingua e mantenere l'accesso. I cookie analitici vengono usati solo dopo il tuo consenso, e puoi cambiare la tua scelta in qualsiasi momento.",
    "privacy.providers.title": "Fornitori e trasferimenti",
    "privacy.providers.body":
      "Il sito è ospitato su Vercel e usa i fornitori elencati sopra: Vercel, Supabase, Resend, PostHog, Upstash, OpenRouter e OpenAI. Alcuni hanno sede negli Stati Uniti, i trasferimenti si basano sull'EU-US Data Privacy Framework o sulle Clausole Contrattuali Standard.",
    "privacy.rights.title": "I tuoi diritti",
    "privacy.rights.body":
      "Puoi chiedere di accedere, correggere o cancellare i tuoi dati, opporti al trattamento o revocare il consenso in qualsiasi momento tramite la pagina contatti.",
    "privacy.manageConsent": "Modifica preferenze cookie",
    "privacy.contactMe": "Contattami",
  },
  es: {
    // Navbar
    "nav.home": "Inicio",
    "nav.about": "Sobre mí",
    "nav.projects": "Proyectos",
    "nav.experience": "Experiencia",
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

    // Experience Page
    "exp.title": "Mi",
    "exp.titleHighlight": "trayectoria",
    "exp.subtitle":
      "Desarrollo software desde los 13 años. Hoy mantengo proyectos de código abierto con más de 20 millones de descargas, he completado más de 100 proyectos como freelance y desarrollo soluciones de backend, frontend y móviles.",
    "exp.timeline": "Cronología",
    "exp.current": "En curso",
    "exp.type.work": "Trabajo",
    "exp.type.education": "Educación",
    "exp.type.award": "Premios",
    "exp.stat.downloads.value": "20M+",
    "exp.stat.downloads.label": "Descargas de código abierto",
    "exp.stat.projects.value": "100+",
    "exp.stat.projects.label": "Proyectos freelance entregados",
    "exp.stat.rating.value": "5★",
    "exp.stat.rating.label": "Valoración media de los clientes",
    "exp.stat.grade.value": "100/100",
    "exp.stat.grade.label": "Nota del diploma, con honores",
    "exp.university.date": "2026 - Actualidad",
    "exp.university.title": "Informática, Universidad",
    "exp.university.desc":
      "Actualmente curso el grado universitario en Informática.",
    "exp.freelance.date": "2025 - Actualidad",
    "exp.freelance.title": "Desarrollador Freelance",
    "exp.freelance.desc":
      "He trabajado en más de 100 proyectos para distintos clientes manteniendo una valoración media de 5 estrellas. Gran atención a la comunicación con los clientes, al cumplimiento de los plazos y a ofrecer experiencias de alta calidad.",
    "exp.hackathons.date": "2025 - 2026",
    "exp.hackathons.title": "Hackathones",
    "exp.hackathons.desc":
      "Gané varios hackathon, creando soluciones a problemas del mundo real. Adquirí experiencia en pensamiento crítico, prototipado rápido y presentación de ideas ante un público.",
    "exp.internships.date": "Jul 2025 - Feb 2026",
    "exp.internships.title": "Prácticas de Desarrollo de Software",
    "exp.internships.desc":
      "Tres prácticas en una empresa de software, centradas en el desarrollo de apps móviles y web para logística. Experiencia con Flutter, APIs y bases de datos, contribuyendo a las funciones de gestión de entregas y pedidos dentro de un equipo.",
    "exp.erasmus.date": "Feb - Mar 2025",
    "exp.erasmus.title": "Prácticas Erasmus+ en España",
    "exp.erasmus.desc":
      "Prácticas de dos semanas en España a través del programa Erasmus+ en una agencia especializada en SEO para sitios web. Experiencia práctica en optimización de contenidos y análisis de estrategias digitales.",
    "exp.highschool.date": "2021 - 2026",
    "exp.highschool.title": "Diploma de Bachillerato Técnico en Informática",
    "exp.highschool.desc":
      "Programa de cinco años de instituto técnico en Informática, finalizado con la máxima nota posible.",
    "exp.highschool.grade": "con matrícula de honor",
    "exp.skills": "Habilidades",
    "exp.skill.backend": "Backend",
    "exp.skill.frontend": "Frontend",
    "exp.skill.mobile": "Móvil",
    "exp.skill.frameworks": "Frameworks",
    "exp.skill.minecraft": "Minecraft",
    "exp.skill.databases": "Bases de datos",
    "exp.skill.systems": "Sistemas",
    "exp.languages": "Idiomas",
    "exp.lang.italian": "Italiano",
    "exp.lang.italian.level": "Nativo",
    "exp.lang.english": "Inglés",
    "exp.lang.english.level": "C1 - Certificación Cambridge",
    "exp.softSkills": "Habilidades Blandas",
    "exp.soft.communication": "Comunicación con Clientes",
    "exp.soft.communication.desc":
      "He mantenido una valoración de 5 estrellas en más de 100 proyectos freelance.",
    "exp.soft.problemSolving": "Resolución de Problemas",
    "exp.soft.problemSolving.desc": "He ganado varios hackathones.",
    "exp.soft.speaking": "Hablar en Público",
    "exp.soft.speaking.desc":
      "He presentado soluciones ante jueces y público en varios eventos.",
    "exp.soft.driven": "Determinado",
    "exp.soft.driven.desc": "Desarrollo software desde los 13 años.",
    "about.experienceLink": "Descubre mi trayectoria",

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
    "meta.experience.title": "Experiencia",
    "meta.experience.desc":
      "Experiencia laboral, educación y habilidades de Lorenzo0111",

    // Chat
    "chat.open": "Pregunta a la IA",
    "chat.title": "Pregunta sobre Lorenzo",
    "chat.subtitle": "Asistente IA",
    "chat.greeting":
      "¡Hola! 👋 Pregúntame lo que quieras sobre los proyectos, habilidades o experiencia de Lorenzo.",
    "chat.suggestion1": "¿Cuáles son sus mejores proyectos?",
    "chat.suggestion2": "¿Qué tecnologías usa?",
    "chat.suggestion3": "¿Ha creado apps móviles?",
    "chat.suggestion4": "¿Cómo puedo trabajar con él?",
    "chat.placeholder": "Haz una pregunta…",
    "chat.send": "Enviar",
    "chat.stop": "Detener",
    "chat.reset": "Nuevo chat",
    "chat.close": "Cerrar",
    "chat.disclaimer":
      "La IA puede equivocarse. No compartas datos personales.",
    "chat.remaining": "Te quedan {count} mensajes hoy",
    "chat.rateLimited":
      "Has alcanzado tu límite diario de {limit} mensajes. Podrás preguntar de nuevo en {time}.",
    "chat.tooLong": "Tu mensaje es demasiado largo, intenta acortarlo.",
    "chat.error": "Algo salió mal. Inténtalo de nuevo.",
    "chat.retry": "Reintentar",
    "chat.verifyFailed":
      "No pudimos verificar que eres humano. Inténtalo de nuevo.",
    "chat.tool.searchPortfolio": "Buscando en el portfolio",
    "chat.tool.listProjects": "Revisando proyectos",
    "chat.tool.getProjectDetails": "Leyendo detalles del proyecto",
    "chat.tool.getProfile": "Revisando el perfil",
    "chat.tool.getExperience": "Revisando la experiencia",
    "chat.tool.getSkills": "Revisando habilidades",
    "chat.tool.getReviews": "Leyendo reseñas",
    "chat.tool.showProjects": "Eligiendo proyectos",

    // Privacy
    "chat.privacy": "Privacidad",
    "footer.privacy": "Privacidad",
    "consent.text":
      "Uso cookies analíticas opcionales para entender cómo se usa el sitio. Puedes aceptarlas o rechazarlas.",
    "consent.accept": "Aceptar",
    "consent.decline": "Rechazar",
    "consent.learnMore": "Política de privacidad",
    "meta.privacy.title": "Política de privacidad",
    "meta.privacy.desc": "Cómo este sitio trata tus datos",
    "privacy.title": "Política de privacidad",
    "privacy.updated": "Última actualización: {date}",
    "privacy.intro":
      "Este sitio es el portfolio personal de Lorenzo (Lorenzo0111), con sede en Italia, responsable del tratamiento de tus datos. Esta página explica qué datos se recogen cuando lo usas y por qué.",
    "privacy.contact.title": "Formulario de contacto",
    "privacy.contact.body":
      "Cuando envías un mensaje, tu nombre, tu email y el mensaje me llegan por email a través de Resend para poder responderte. Se conservan solo el tiempo necesario para gestionar tu solicitud. Base jurídica: tu solicitud.",
    "privacy.assistant.title": "Asistente IA",
    "privacy.assistant.body":
      "Tus preguntas se envían a OpenRouter y al proveedor del modelo de IA (OpenAI) solo para generar una respuesta. Se solicita retención cero de datos, por lo que no se guardan ni se usan para entrenamiento. La conversación se guarda solo en tu navegador durante la sesión actual. Tu dirección IP se guarda hasta 24 horas de Upstash para aplicar límites de uso, y Cloudflare Turnstile revisa las solicitudes para bloquear bots. No compartas datos personales en el chat. Base jurídica: interés legítimo en ofrecer la función y prevenir abusos.",
    "privacy.analytics.title": "Estadísticas",
    "privacy.analytics.body":
      "Solo si aceptas, PostHog con servidores en la UE recoge datos de uso como páginas visitadas, clics y uso del asistente IA, nunca el texto de tus preguntas, mediante cookies y almacenamiento local. Vercel Web Analytics y Speed Insights recogen datos anónimos y agregados de visitas y rendimiento sin cookies. Base jurídica: tu consentimiento para PostHog, interés legítimo para Vercel.",
    "privacy.cookies.title": "Cookies",
    "privacy.cookies.body":
      "Las cookies técnicas se usan siempre para recordar tu idioma y mantener la sesión iniciada. Las cookies analíticas solo se usan tras tu consentimiento, y puedes cambiar tu elección en cualquier momento.",
    "privacy.providers.title": "Proveedores y transferencias",
    "privacy.providers.body":
      "El sitio está alojado en Vercel y usa los proveedores indicados arriba: Vercel, Supabase, Resend, PostHog, Upstash, OpenRouter y OpenAI. Algunos tienen sede en Estados Unidos, las transferencias se basan en el EU-US Data Privacy Framework o en Cláusulas Contractuales Tipo.",
    "privacy.rights.title": "Tus derechos",
    "privacy.rights.body":
      "Puedes pedir acceder, corregir o eliminar tus datos, oponerte a su tratamiento o retirar tu consentimiento en cualquier momento a través de la página de contacto.",
    "privacy.manageConsent": "Cambiar preferencias de cookies",
    "privacy.contactMe": "Contáctame",
  },
  fr: {
    // Navbar
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.projects": "Projets",
    "nav.experience": "Expérience",
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

    // Experience Page
    "exp.title": "Mon",
    "exp.titleHighlight": "parcours",
    "exp.subtitle":
      "Je développe des logiciels depuis l'âge de 13 ans. Aujourd'hui, je maintiens des projets open source totalisant plus de 20 millions de téléchargements, j'ai mené à bien plus de 100 projets en freelance et je développe des solutions backend, frontend et mobiles.",
    "exp.timeline": "Chronologie",
    "exp.current": "En cours",
    "exp.type.work": "Travail",
    "exp.type.education": "Formation",
    "exp.type.award": "Prix",
    "exp.stat.downloads.value": "20M+",
    "exp.stat.downloads.label": "Téléchargements open source",
    "exp.stat.projects.value": "100+",
    "exp.stat.projects.label": "Projets freelance livrés",
    "exp.stat.rating.value": "5★",
    "exp.stat.rating.label": "Note moyenne des clients",
    "exp.stat.grade.value": "100/100",
    "exp.stat.grade.label": "Note du diplôme, avec les félicitations",
    "exp.university.date": "2026 - Aujourd'hui",
    "exp.university.title": "Informatique, Université",
    "exp.university.desc":
      "Je prépare actuellement une licence en informatique.",
    "exp.freelance.date": "2025 - Aujourd'hui",
    "exp.freelance.title": "Développeur Freelance",
    "exp.freelance.desc":
      "J'ai travaillé sur plus de 100 projets pour différents clients en conservant une note moyenne de 5 étoiles. Une grande attention portée à la communication avec les clients, au respect des délais et à la qualité des réalisations.",
    "exp.hackathons.date": "2025 - 2026",
    "exp.hackathons.title": "Hackathons",
    "exp.hackathons.desc":
      "J'ai remporté un hackathon régional et deux hackathons scolaires, en créant des solutions à des problèmes concrets. J'y ai acquis de l'expérience en esprit critique, en prototypage rapide et en présentation d'idées devant un public.",
    "exp.internships.date": "Juil. 2025 - Fév. 2026",
    "exp.internships.title": "Stages en Développement Logiciel",
    "exp.internships.desc":
      "Trois stages dans une entreprise de logiciels, axés sur le développement d'applications mobiles et web pour la logistique. Expérience avec Flutter, les API et les bases de données, en contribuant aux fonctionnalités de gestion des livraisons et des commandes au sein d'une équipe.",
    "exp.erasmus.date": "Fév. - Mars 2025",
    "exp.erasmus.title": "Stage Erasmus+ en Espagne",
    "exp.erasmus.desc":
      "Stage de deux semaines en Espagne dans le cadre du programme Erasmus+, au sein d'une agence spécialisée dans le SEO de sites web. Expérience pratique de l'optimisation de contenus et de l'analyse de stratégies digitales.",
    "exp.highschool.date": "2021 - 2026",
    "exp.highschool.title": "Diplôme de Lycée Technique en Informatique",
    "exp.highschool.desc":
      "Cursus de cinq ans en lycée technique, spécialité informatique, obtenu avec la note maximale.",
    "exp.highschool.grade": "avec les félicitations",
    "exp.skills": "Compétences",
    "exp.skill.backend": "Backend",
    "exp.skill.frontend": "Frontend",
    "exp.skill.mobile": "Mobile",
    "exp.skill.frameworks": "Frameworks",
    "exp.skill.minecraft": "Minecraft",
    "exp.skill.databases": "Bases de données",
    "exp.skill.systems": "Systèmes",
    "exp.languages": "Langues",
    "exp.lang.italian": "Italien",
    "exp.lang.italian.level": "Langue maternelle",
    "exp.lang.english": "Anglais",
    "exp.lang.english.level": "C1 - Certification Cambridge",
    "exp.softSkills": "Compétences Transversales",
    "exp.soft.communication": "Communication Client",
    "exp.soft.communication.desc":
      "Une note de 5 étoiles maintenue sur plus de 100 projets freelance.",
    "exp.soft.problemSolving": "Résolution de Problèmes",
    "exp.soft.problemSolving.desc":
      "Vainqueur de hackathons régionaux et scolaires.",
    "exp.soft.speaking": "Prise de Parole en Public",
    "exp.soft.speaking.desc":
      "J'ai présenté des solutions devant des jurys et des publics lors de plusieurs événements.",
    "exp.soft.driven": "Déterminé",
    "exp.soft.driven.desc":
      "Je développe des logiciels depuis l'âge de 13 ans.",
    "about.experienceLink": "Découvrir mon parcours",

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
    "meta.experience.title": "Expérience",
    "meta.experience.desc":
      "Expérience professionnelle, formation et compétences de Lorenzo0111",

    // Chat
    "chat.open": "Demander à l'IA",
    "chat.title": "Questions sur Lorenzo",
    "chat.subtitle": "Assistant IA",
    "chat.greeting":
      "Salut ! 👋 Pose-moi tes questions sur les projets, compétences ou l'expérience de Lorenzo.",
    "chat.suggestion1": "Quels sont ses meilleurs projets ?",
    "chat.suggestion2": "Quelles technologies utilise-t-il ?",
    "chat.suggestion3": "A-t-il créé des apps mobiles ?",
    "chat.suggestion4": "Comment travailler avec lui ?",
    "chat.placeholder": "Pose une question…",
    "chat.send": "Envoyer",
    "chat.stop": "Arrêter",
    "chat.reset": "Nouveau chat",
    "chat.close": "Fermer",
    "chat.disclaimer":
      "L'IA peut se tromper. Ne partage pas de données personnelles.",
    "chat.remaining": "Il te reste {count} messages aujourd'hui",
    "chat.rateLimited":
      "Tu as atteint ta limite quotidienne de {limit} messages. Tu pourras redemander dans {time}.",
    "chat.tooLong": "Ton message est trop long, essaie de le raccourcir.",
    "chat.error": "Une erreur est survenue. Réessaie.",
    "chat.retry": "Réessayer",
    "chat.verifyFailed":
      "Nous n'avons pas pu vérifier que tu es humain. Réessaie.",
    "chat.tool.searchPortfolio": "Recherche dans le portfolio",
    "chat.tool.listProjects": "Parcours des projets",
    "chat.tool.getProjectDetails": "Lecture du projet",
    "chat.tool.getProfile": "Consultation du profil",
    "chat.tool.getExperience": "Consultation de l'expérience",
    "chat.tool.getSkills": "Consultation des compétences",
    "chat.tool.getReviews": "Lecture des avis",
    "chat.tool.showProjects": "Sélection des projets",

    // Privacy
    "chat.privacy": "Confidentialité",
    "footer.privacy": "Confidentialité",
    "consent.text":
      "J'utilise des cookies analytiques facultatifs pour comprendre comment le site est utilisé. Tu peux les accepter ou les refuser.",
    "consent.accept": "Accepter",
    "consent.decline": "Refuser",
    "consent.learnMore": "Politique de confidentialité",
    "meta.privacy.title": "Politique de confidentialité",
    "meta.privacy.desc": "Comment ce site traite tes données",
    "privacy.title": "Politique de confidentialité",
    "privacy.updated": "Dernière mise à jour : {date}",
    "privacy.intro":
      "Ce site est le portfolio personnel de Lorenzo (Lorenzo0111), basé en Italie, responsable du traitement de tes données. Cette page explique quelles données sont collectées lorsque tu l'utilises et pourquoi.",
    "privacy.contact.title": "Formulaire de contact",
    "privacy.contact.body":
      "Quand tu envoies un message, ton nom, ton email et ton message me sont envoyés par email via Resend afin que je puisse te répondre. Ils sont conservés uniquement le temps nécessaire pour traiter ta demande. Base légale : ta demande.",
    "privacy.assistant.title": "Assistant IA",
    "privacy.assistant.body":
      "Tes questions sont envoyées à OpenRouter et au fournisseur du modèle d'IA (OpenAI) uniquement pour générer une réponse. Une conservation zéro des données est demandée, elles ne sont donc ni stockées ni utilisées pour l'entraînement. La conversation reste uniquement dans ton navigateur pour la session en cours. Ton adresse IP est conservée jusqu'à 24 heures par Upstash pour appliquer les limites d'utilisation, et Cloudflare Turnstile vérifie les requêtes pour bloquer les bots. Ne partage pas de données personnelles dans le chat. Base légale : intérêt légitime à fournir la fonctionnalité et à prévenir les abus.",
    "privacy.analytics.title": "Statistiques",
    "privacy.analytics.body":
      "Uniquement si tu acceptes, PostHog avec serveurs dans l'UE collecte des données d'utilisation comme les pages visitées, les clics et l'utilisation de l'assistant IA, jamais le texte de tes questions, à l'aide de cookies et du stockage local. Vercel Web Analytics et Speed Insights collectent des données anonymes et agrégées sur les visites et les performances sans cookies. Base légale : ton consentement pour PostHog, intérêt légitime pour Vercel.",
    "privacy.cookies.title": "Cookies",
    "privacy.cookies.body":
      "Des cookies techniques sont toujours utilisés pour retenir ta langue et te garder connecté. Les cookies analytiques ne sont utilisés qu'après ton consentement, et tu peux modifier ton choix à tout moment.",
    "privacy.providers.title": "Fournisseurs et transferts",
    "privacy.providers.body":
      "Le site est hébergé sur Vercel et utilise les fournisseurs cités ci-dessus : Vercel, Supabase, Resend, PostHog, Upstash, OpenRouter et OpenAI. Certains sont basés aux États-Unis, les transferts reposent sur l'EU-US Data Privacy Framework ou sur les Clauses Contractuelles Types.",
    "privacy.rights.title": "Tes droits",
    "privacy.rights.body":
      "Tu peux demander à accéder à tes données, les corriger ou les supprimer, t'opposer à leur traitement ou retirer ton consentement à tout moment via la page de contact.",
    "privacy.manageConsent": "Modifier les préférences cookies",
    "privacy.contactMe": "Me contacter",
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
