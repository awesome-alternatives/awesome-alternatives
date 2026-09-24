import { islands } from "./islands.fr.ts";
import type { Messages } from "./messages.ts";
import { pages } from "./pages.fr.ts";

export const fr: Messages = {
  locale: {
    name: "Français",
    htmlLang: "fr",
    dir: "ltr",
    ogLocale: "fr_FR",
  },

  chrome: {
    skipToContent: "Aller au contenu",
    brandLabel: "awesome-alternatives, accueil",
    searchLabel: "Rechercher dans le catalogue",
    searchPlaceholder: "Rechercher une alternative",
    searchSubmit: "Rechercher",
    languageLabel: "Langue",
    feedTitle: "awesome-alternatives : nouveaux outils",
    socialAlt: "awesome-alternatives : dites ce que vous utilisez et ce qu'il vous faut.",
    nav: {
      browse: "Parcourir",
      about: "À propos",
      contribute: "Ajouter un outil",
      github: "GitHub",
    },
    footer: {
      label: "Pied de page",
      catalog: "Catalogue",
      code: "code",
      data: "données",
      dataLink: "depuis GitHub, chaque nuit",
      howItWorks: "Comment ça marche",
      rss: "Flux RSS",
      legalNotice: "Mentions légales",
      privacy: "Confidentialité",
      github: "GitHub ↗",
    },
  },

  home: {
    title: "awesome-alternatives : trouvez ce qui remplace l'outil que vous utilisez",
    description:
      "Cherchez une alternative à un outil de développement par langage, licence et type de remplacement. Étoiles, releases et signatures viennent directement de GitHub.",
    eyebrow: "Trouvez ce qui remplace l'outil que vous utilisez",
    heading: "Dites ce que vous utilisez et ce qu'il vous faut.",
    lede: "{count} outils, données de release récupérées sur GitHub chaque nuit, jamais saisies à la main",
    noscriptBefore: "La recherche a besoin de JavaScript. Tous les outils sont listés ci-dessous : ",
    noscriptLink: "parcourir par outil à remplacer",
    noscriptAfter: ".",
    trendingLabel: "Tendance ce mois-ci",
    trendingLede: "Étoiles gagnées ces {days} derniers jours, comptées depuis GitHub.",
    browseLabel: "Parcourir par outil",
    allTools: "Tous les outils",
    categories: "Catégories",
    languages: "Langages",
    licenses: "Licences",
    owners: "Propriétaires",
    sponsorNote: "Le catalogue est gratuit et sans publicité.",
    sponsorOpenCollective: "Open Collective ↗",
    sponsorGitHub: "GitHub Sponsors ↗",
    examples: [
      "semantic-release, mais écrit en Rust",
      "un drop-in pour webpack, plus rapide",
      "Redis, mais multithreadé",
      "générateur de changelog sous MIT",
      "remplacer Terraform",
    ],
  },

  listing: {
    back: "← retour",
    browse: "parcourir",
    toolCount: { one: "1 outil", other: "{n} outils" },
  },

  index: {
    alternatives: {
      title: "Alternatives aux outils de développement les plus courants",
      description:
        "{count} outils de développement et ce qui remplace chacun d'eux, comparés par type de remplacement, licence et étoiles.",
      heading: "Alternatives",
      lede: "{count} outils que quelque chose du catalogue remplace.",
    },
    categories: {
      title: "Catégories d'outils de développement",
      description: "{count} catégories d'outils de développement, chacune avec ses options open source côte à côte.",
      heading: "Catégories",
      lede: "{count} catégories, de l'automatisation des releases aux émulateurs de terminal.",
    },
    languages: {
      title: "Outils de développement par langage",
      description: "Parcourez le catalogue par langage d'écriture des outils, sur {count} langages.",
      heading: "Langages",
      lede: "Le langage que GitHub indique pour chaque dépôt.",
    },
    licenses: {
      title: "Outils de développement par licence",
      description: "Parcourez le catalogue par licence, sur {count} licences détectées par GitHub.",
      heading: "Licences",
      lede: "La licence que GitHub détecte dans chaque dépôt. Other désigne un fichier de licence que GitHub n'a pas pu rattacher à une licence connue.",
    },
    owners: {
      title: "Qui publie les outils du catalogue",
      description: "Les {count} comptes GitHub qui ont plus d'un outil dans awesome-alternatives.",
      heading: "Propriétaires",
      lede: "{count} comptes publient plus d'un outil dans le catalogue. Les autres en publient un seul, accessible depuis la fiche de l'outil.",
    },
    tools: {
      title: "Tous les outils du catalogue",
      description: "Les {count} outils d'awesome-alternatives, avec langage, licence, étoiles et dernière release.",
      heading: "Tous les outils",
      lede: "Tous les outils du catalogue, par nom.",
    },
  },

  category: {
    context: "catégorie",
    title: { one: "{name} : 1 outil", other: "{name} : {n} outils" },
    titleOpen: { one: "{name} : 1 outil open source", other: "{name} : {n} outils open source" },
    titleSelfHost: { one: "1 outil auto-hébergeable : {lower}", other: "{n} outils auto-hébergeables : {lower}" },
    descriptionSelfHost: "{description} Chacun tourne sur votre propre serveur. {count} outils comparés par langage, licence, étoiles et dernière release.",
    comparison: "Côte à côte",
    replaces: "Ce que ces outils remplacent",
    description: "{description} {count} outils comparés par langage, licence, étoiles et dernière release.",
  },

  language: {
    context: "langage",
    title: "Outils de développement écrits en {name}",
    description: "{count} outils du catalogue écrits en {name}, avec licence, étoiles et dernière release.",
    lede: "Outils dont GitHub indique le dépôt comme majoritairement en {name}.",
  },

  license: {
    context: "licence",
    title: "Outils de développement sous licence {name}",
    description: "{count} outils du catalogue sous licence {name}, avec langage, étoiles et dernière release.",
    lede: "Outils dont GitHub indique le dépôt sous licence {name}.",
  },

  owner: {
    context: "propriétaire",
    title: "Outils publiés par {name}",
    description: "{count} outils du catalogue appartenant à {name} sur GitHub, avec langage, licence, étoiles et dernière release.",
    lede: "Dépôts appartenant à {name} sur GitHub.",
    profile: "Profil GitHub ↗",
    website: "Site web ↗",
  },

  breadcrumb: {
    label: "Fil d'Ariane",
    home: "Accueil",
  },

  migrate: {
    title: "Migrer de {from} vers {to}",
    description: "Passer de {from} à {to} : licence, compatibilité, étapes et pièges, d'après le guide officiel.",
    context: "migration",
    terms: "Licence et conditions",
    fit: "Type de remplacement",
    englishOnly: "Cette page est rédigée en anglais.",
    guide: "Guide officiel",
    guideLink: "Guide de migration de {name} ↗",
    sources: "Sources",
    reviewed: "Relue le {date}.",
    due: "À relire : {reasons}.",
    dueAge: "dernière relecture il y a plus d'un an",
    dueMajor: "{name} a publié une nouvelle version majeure depuis",
    alternativesLink: "Autres alternatives à {name} →",
  },

  target: {
    title: { one: "1 alternative à {name}", other: "{n} alternatives à {name}" },
    titleOpen: { one: "1 alternative open source à {name}", other: "{n} alternatives open source à {name}" },
    dropIns: "Drop-in : {names}.",
    comparison: "Côte à côte",
    listHeading: "Toutes les alternatives",
    about: "À propos de {name}",
    pairs: "Face à face",
    vendor: "Éditeur",
    toolColumn: "Outil",
    description:
      "{count} alternatives à {name}, en {languages}. Comparez le type de remplacement, la licence, les étoiles et la dernière release signée.",
    context: "alternatives",
    contextTo: "à",
    archived: "archivé",
    aboutLink: "À propos de {name} →",
    closed: "Un produit fermé de {vendor}.",
    productSite: "Site de {name} ↗",
  },

  tool: {
    title: "{name} : {language} pour {category}",
    titleFallbackLanguage: "outil",
    descriptionFallback: "{name} dans le catalogue awesome-alternatives.",
    alternativeTo: "alternative à",
    replacedBy: { one: "{n} outil remplace {name}", other: "{n} outils remplacent {name}" },
    replacedByDropIn: { one: ", dont {n} en drop-in", other: ", dont {n} en drop-in" },
    archived: "archivé",
    aboutLabel: "À propos",
    owner: "Propriétaire",
    archivedNote:
      "Ce dépôt est archivé et ne reçoit plus de modifications. Il est listé pour que l'on trouve ce qui le remplace.",
    signed: "Release signée, vérifiée par GitHub",
    verified: "Vérifié par ses mainteneurs",
    unverified: "Non vérifié par ses mainteneurs",
    stars: "Étoiles",
    forks: "Forks",
    latest: "Dernière release",
    noRelease: "aucune",
    lastPush: "Dernier push",
    terms: "Conditions",
    selfHost: "Auto-hébergeable",
    selfHostNo: "Non",
    related: "Dans la même catégorie : {category}",
    selfHostYes: "Oui",
    website: "Site web ↗",
    edit: "Modifier cette entrée",
    checked: "Lu sur GitHub le {date}.",
    edited: "Fiche modifiée pour la dernière fois le {date}.",
  },

  compare: {
    title: "{a} vs {b}",
    description:
      "{a} et {b} côte à côte : langage, licence, étoiles, releases, ainsi que la compatibilité et la note qui les relient.",
    context: "comparer",
    lede: "Les mêmes faits pour les deux, lus sur GitHub chaque nuit, et la relation qu'une personne a relue.",
    factColumn: "Fait",
    factCadence: "Rythme des releases",
    cadence: { one: "environ {n} jour entre les releases", other: "environ {n} jours entre les releases" },
    cadenceUnknown: "trop peu de releases",
    factFlags: "Signalements",
    noFlags: "aucun",
    relationLabel: "Ce qui les relie",
    replacesLine: "{from} remplace {to}.",
    sharedLine: "Les deux remplacent {target}.",
    targetLink: "Alternatives à {name} →",
    entry: "Comparer {a} et {b} →",
  },

  contribute: {
    title: "Ajouter un outil à awesome-alternatives",
    description:
      "Comment référencer un outil de développement dans le catalogue : l'entrée YAML, ce que la CI vérifie, comment les mainteneurs valident leur outil.",
    eyebrow: "Contribuer",
    heading: "Ajouter un outil",
    lede: "Chaque entrée est un court fichier YAML dans le dépôt. Écrivez-la vous-même dans une pull request, ou décrivez l'outil dans une issue et un mainteneur l'écrira pour vous.",
    openPullRequest: "Ouvrir une pull request ↗",
    suggest: "Proposer un outil à la place ↗",
    guideInEnglish: "Le guide ci-dessous est en anglais, comme le dépôt qu'il décrit.",
  },

  notFound: {
    title: "Introuvable",
    description: "Cette page n'est pas dans le catalogue.",
    heading: "Pas dans le catalogue",
    ledeBefore: "Rien à cette adresse. ",
    ledeSearch: "Cherchez dans le catalogue",
    ledeBetween: ", ou ",
    ledeAdd: "ajoutez l'outil",
    ledeAfter: " que vous cherchiez.",
  },

  feed: {
    title: "awesome-alternatives : nouveaux outils",
    description: "Les alternatives open source récemment ajoutées au catalogue awesome-alternatives.",
    joined: "{name} rejoint le catalogue",
    replaces: "Remplace {names}.",
  },

  islands,
  pages,
};
