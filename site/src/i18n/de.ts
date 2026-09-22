import { islands } from "./islands.de.ts";
import type { Messages } from "./messages.ts";
import { pages } from "./pages.de.ts";

export const de: Messages = {
  locale: {
    name: "Deutsch",
    htmlLang: "de",
    ogLocale: "de_DE",
  },

  chrome: {
    skipToContent: "Zum Inhalt springen",
    brandLabel: "awesome-alternatives, Startseite",
    searchLabel: "Den Katalog durchsuchen",
    searchPlaceholder: "Alternativen suchen",
    searchSubmit: "Suchen",
    languageLabel: "Sprache",
    feedTitle: "awesome-alternatives: neue Tools",
    socialAlt: "awesome-alternatives: Sag, was du einsetzt und was du brauchst.",
    nav: {
      browse: "Stöbern",
      about: "Über",
      contribute: "Tool hinzufügen",
      github: "GitHub",
    },
    footer: {
      label: "Fußzeile",
      catalog: "Katalog",
      code: "Code",
      data: "Daten",
      dataLink: "jede Nacht von GitHub",
      howItWorks: "Wie es funktioniert",
      rss: "RSS-Feed",
      legalNotice: "Impressum",
      privacy: "Datenschutz",
      github: "GitHub ↗",
    },
  },

  home: {
    title: "awesome-alternatives: finde den Ersatz für das Tool, das du einsetzt",
    description:
      "Suche nach einer Alternative zu einem Entwickler-Tool, nach Sprache, Lizenz und Ersatzgrad. Sterne, Releases und Signaturen kommen direkt von GitHub.",
    eyebrow: "Finde den Ersatz für das Tool, das du einsetzt",
    heading: "Sag, was du einsetzt und was du brauchst.",
    lede: "{count} Tools, Release-Daten jede Nacht von GitHub geholt, nie von Hand eingetragen",
    noscriptBefore: "Die Suche braucht JavaScript. Alle Tools stehen weiter unten: ",
    noscriptLink: "nach dem Tool stöbern, das ersetzt werden soll",
    noscriptAfter: ".",
    trendingLabel: "Trend in diesem Monat",
    trendingLede: "Sterne der letzten {days} Tage, gezählt über GitHub.",
    browseLabel: "Nach Tool stöbern",
    allTools: "Alle Tools",
    categories: "Kategorien",
    languages: "Sprachen",
    licenses: "Lizenzen",
    owners: "Inhaber",
    sponsorNote: "Der Katalog ist kostenlos und werbefrei.",
    sponsorLink: "Auf GitHub sponsern ↗",
    examples: [
      "semantic-release, aber in Rust geschrieben",
      "ein Drop-in für webpack, schneller",
      "Redis, aber multithreaded",
      "Changelog-Generator unter MIT",
      "Terraform ersetzen",
    ],
  },

  listing: {
    back: "← zurück",
    browse: "stöbern",
    toolCount: { one: "1 Tool", other: "{n} Tools" },
  },

  index: {
    alternatives: {
      title: "Alternativen zu verbreiteten Entwickler-Tools",
      description:
        "{count} Entwickler-Tools und der Ersatz für jedes davon, verglichen nach Ersatzgrad, Lizenz und Sternen.",
      heading: "Alternativen",
      lede: "{count} Tools, für die es im Katalog einen Ersatz gibt.",
    },
    categories: {
      title: "Kategorien von Entwickler-Tools",
      description: "{count} Kategorien von Entwickler-Tools, jede mit ihren Open-Source-Optionen nebeneinander.",
      heading: "Kategorien",
      lede: "{count} Kategorien, von Release-Automatisierung bis Terminal-Emulator.",
    },
    languages: {
      title: "Entwickler-Tools nach Sprache",
      description:
        "Den Katalog nach der Sprache durchsuchen, in der ein Tool geschrieben ist, über {count} Sprachen hinweg.",
      heading: "Sprachen",
      lede: "Die Sprache, die GitHub für das jeweilige Repository meldet.",
    },
    licenses: {
      title: "Entwickler-Tools nach Lizenz",
      description: "Den Katalog nach Lizenz durchsuchen, über {count} von GitHub erkannte Lizenzen hinweg.",
      heading: "Lizenzen",
      lede: "Die Lizenz, die GitHub im jeweiligen Repository erkennt. Other steht für eine Lizenzdatei, die GitHub keiner bekannten Lizenz zuordnen konnte.",
    },
    owners: {
      title: "Wer die Tools im Katalog veröffentlicht",
      description: "Die {count} GitHub-Konten mit mehr als einem Tool in awesome-alternatives.",
      heading: "Inhaber",
      lede: "{count} Konten veröffentlichen mehr als ein Tool im Katalog. Alle anderen veröffentlichen eines, verlinkt auf der Seite des Tools.",
    },
    tools: {
      title: "Alle Tools im Katalog",
      description: "Alle {count} Tools in awesome-alternatives, mit Sprache, Lizenz, Sternen und neuestem Release.",
      heading: "Alle Tools",
      lede: "Jedes Tool im Katalog, nach Namen.",
    },
  },

  category: {
    context: "Kategorie",
    title: "{name}: {count} Open-Source-Tools",
    description: "{description} {count} Tools, verglichen nach Sprache, Lizenz, Sternen und neuestem Release.",
  },

  language: {
    context: "Sprache",
    title: "Entwickler-Tools, die in {name} geschrieben sind",
    description: "{count} Tools im Katalog, die in {name} geschrieben sind, mit Lizenz, Sternen und neuestem Release.",
    lede: "Tools, deren Repository GitHub überwiegend als {name} meldet.",
  },

  license: {
    context: "Lizenz",
    title: "Entwickler-Tools unter {name}",
    description: "{count} Tools im Katalog unter der Lizenz {name}, mit Sprache, Sternen und neuestem Release.",
    lede: "Tools, deren Repository GitHub unter der Lizenz {name} führt.",
  },

  owner: {
    context: "Inhaber",
    title: "Tools von {name}",
    description: "{count} Tools im Katalog gehören {name} auf GitHub, mit Sprache, Lizenz, Sternen und letztem Release.",
    lede: "Repositories, die {name} auf GitHub gehören.",
    profile: "GitHub-Profil ↗",
    website: "Website ↗",
  },

  target: {
    title: "Alternativen zu {name}",
    description:
      "{count} Alternativen zu {name}, in {languages}. Ersatzgrad, Lizenz, Sterne und das neueste signierte Release im Vergleich.",
    context: "Alternativen",
    contextTo: "zu",
    archived: "archiviert",
    aboutLink: "Über {name} →",
  },

  tool: {
    title: "{name}: {language} für {category}",
    titleFallbackLanguage: "Tool",
    descriptionFallback: "{name} im Katalog von awesome-alternatives.",
    alternativeTo: "Alternative zu",
    archived: "archiviert",
    aboutLabel: "Überblick",
    owner: "Inhaber",
    archivedNote:
      "Dieses Repository ist archiviert und bekommt keine Änderungen mehr. Es steht hier, damit sich der Ersatz dafür finden lässt.",
    signed: "Signiertes Release, von GitHub geprüft",
    verified: "Von den Maintainern bestätigt",
    stars: "Sterne",
    forks: "Forks",
    latest: "Neuestes Release",
    noRelease: "keins",
    lastPush: "Letzter Push",
    website: "Website ↗",
    edit: "Diesen Eintrag bearbeiten",
  },

  contribute: {
    title: "Ein Tool zu awesome-alternatives hinzufügen",
    description:
      "Wie ein Entwickler-Tool in den Katalog kommt: der YAML-Eintrag, was die CI prüft, wie Maintainer ihr Tool bestätigen.",
    eyebrow: "Mitmachen",
    heading: "Tool hinzufügen",
    lede: "Jeder Eintrag ist eine kurze YAML-Datei im Repository. Schreib sie selbst in einem Pull Request, oder beschreib das Tool in einem Issue, dann schreibt ein Maintainer sie für dich.",
    openPullRequest: "Pull Request öffnen ↗",
    suggest: "Stattdessen ein Tool vorschlagen ↗",
    guideInEnglish: "Die folgende Anleitung ist auf Englisch, wie das Repository, das sie beschreibt.",
  },

  notFound: {
    title: "Nicht gefunden",
    description: "Diese Seite steht nicht im Katalog.",
    heading: "Nicht im Katalog",
    ledeBefore: "Unter dieser Adresse liegt nichts. ",
    ledeSearch: "Den Katalog durchsuchen",
    ledeBetween: " oder ",
    ledeAdd: "das gesuchte Tool eintragen",
    ledeAfter: ".",
  },

  feed: {
    title: "awesome-alternatives: neue Tools",
    description: "Open-Source-Alternativen, die neu in den Katalog von awesome-alternatives aufgenommen wurden.",
    joined: "{name} ist neu im Katalog",
    replaces: "Ersetzt {names}.",
  },

  islands,
  pages,
};
