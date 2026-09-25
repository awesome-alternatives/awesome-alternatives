import { islands } from "./islands.de.ts";
import type { Messages } from "./messages.ts";
import { pages } from "./pages.de.ts";

export const de: Messages = {
  locale: {
    name: "Deutsch",
    htmlLang: "de",
    dir: "ltr",
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
    trendingLede: "Die am schnellsten wachsenden Tools auf GitHub, nach Anteil gewonnener Sterne der letzten {days} Tage, oder seit Beginn der Zählung, falls das später war. Mindestens {min} neue Sterne, um hier zu erscheinen.",
    browseLabel: "Nach Tool stöbern",
    allTools: "Alle Tools",
    categories: "Kategorien",
    languages: "Sprachen",
    licenses: "Lizenzen",
    owners: "Inhaber",
    sponsorNote: "Der Katalog ist kostenlos und werbefrei.",
    sponsorOpenCollective: "Open Collective ↗",
    sponsorGitHub: "GitHub Sponsors ↗",
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
    title: { one: "{name}: 1 Tool", other: "{name}: {n} Tools" },
    titleOpen: { one: "{name}: 1 Open-Source-Tool", other: "{name}: {n} Open-Source-Tools" },
    titleSelfHost: { one: "1 Tool zum Selbsthosten: {lower}", other: "{n} Tools zum Selbsthosten: {lower}" },
    descriptionSelfHost: "{description} Jedes läuft auf deinem eigenen Server. {count} Tools, verglichen nach Sprache, Lizenz, Sternen und neuestem Release.",
    comparison: "Im Vergleich",
    replaces: "Was diese Tools ersetzen",
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

  breadcrumb: {
    label: "Brotkrumen",
    home: "Start",
  },

  migrate: {
    title: "Von {from} zu {to} migrieren",
    description: "Der Wechsel von {from} zu {to}: Lizenz, Kompatibilität, Schritte und Stolperfallen, nach der offiziellen Anleitung.",
    context: "Migration",
    terms: "Lizenz und Bedingungen",
    fit: "Ersatzgrad",
    englishOnly: "Diese Seite ist auf Englisch verfasst.",
    guide: "Offizielle Anleitung",
    guideLink: "Migrationsanleitung von {name} ↗",
    sources: "Quellen",
    reviewed: "Geprüft am {date}.",
    due: "Prüfung fällig: {reasons}.",
    dueAge: "zuletzt vor mehr als einem Jahr geprüft",
    dueMajor: "{name} hat seitdem eine neue Hauptversion veröffentlicht",
    alternativesLink: "Weitere Alternativen zu {name} →",
  },

  target: {
    title: { one: "1 Alternative zu {name}", other: "{n} Alternativen zu {name}" },
    titleOpen: { one: "1 Open-Source-Alternative zu {name}", other: "{n} Open-Source-Alternativen zu {name}" },
    dropIns: "Drop-in: {names}.",
    comparison: "Im Vergleich",
    listHeading: "Alle Alternativen",
    about: "Über {name}",
    pairs: "Direkt verglichen",
    vendor: "Anbieter",
    toolColumn: "Tool",
    description:
      "{count} Alternativen zu {name}, in {languages}. Ersatzgrad, Lizenz, Sterne und das neueste signierte Release im Vergleich.",
    context: "Alternativen",
    contextTo: "zu",
    archived: "archiviert",
    aboutLink: "Über {name} →",
    closed: "Ein geschlossenes Produkt von {vendor}.",
    productSite: "Website von {name} ↗",
  },

  tool: {
    title: "{name}: {language} für {category}",
    titleFallbackLanguage: "Tool",
    descriptionFallback: "{name} im Katalog von awesome-alternatives.",
    alternativeTo: "Alternative zu",
    replacedBy: { one: "{n} Tool ersetzt {name}", other: "{n} Tools ersetzen {name}" },
    replacedByDropIn: { one: ", davon {n} als Drop-in", other: ", davon {n} als Drop-in" },
    archived: "archiviert",
    aboutLabel: "Überblick",
    owner: "Inhaber",
    archivedNote:
      "Dieses Repository ist archiviert und bekommt keine Änderungen mehr. Es steht hier, damit sich der Ersatz dafür finden lässt.",
    signed: "Signiertes Release, von GitHub geprüft",
    verified: "Von den Maintainern bestätigt",
    unverified: "Nicht von den Maintainern bestätigt",
    stars: "Sterne",
    starChart: "Sterne über {days} Tage",
    starChartDay: "{day}: {n} Sterne",
    starChartSummary: "{from} Sterne am {start}, {to} am {end}",
    forks: "Forks",
    latest: "Neuestes Release",
    noRelease: "keins",
    lastPush: "Letzter Push",
    terms: "Bedingungen",
    selfHost: "Selbst hostbar",
    selfHostNo: "Nein",
    related: "Mehr aus {category}",
    selfHostYes: "Ja",
    deploy: "Bereitstellung",
    website: "Website ↗",
    edit: "Diesen Eintrag bearbeiten",
    capabilities: "Funktionen",
    capabilityDocs: "Doku ↗",
    checked: "Am {date} von GitHub gelesen.",
    edited: "Eintrag zuletzt am {date} bearbeitet.",
  },

  compare: {
    title: "{a} vs {b}",
    description:
      "{a} und {b} nebeneinander: Sprache, Lizenz, Sterne, Releases sowie die geprüfte Passung und die Notiz, die beide verbindet.",
    context: "vergleichen",
    lede: "Dieselben Fakten für beide, jede Nacht von GitHub gelesen, dazu die von Hand geprüfte Beziehung.",
    factColumn: "Fakt",
    factCadence: "Release-Rhythmus",
    cadence: { one: "etwa {n} Tag zwischen Releases", other: "etwa {n} Tage zwischen Releases" },
    cadenceUnknown: "zu wenige Releases",
    factFlags: "Hinweise",
    noFlags: "keine",
    relationLabel: "Wie sie zusammenhängen",
    replacesLine: "{from} ersetzt {to}.",
    sharedLine: "Beide ersetzen {target}.",
    targetLink: "Alternativen zu {name} →",
    entry: "{a} und {b} vergleichen →",
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
