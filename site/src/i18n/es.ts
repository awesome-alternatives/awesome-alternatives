import { islands } from "./islands.es.ts";
import type { Messages } from "./messages.ts";
import { pages } from "./pages.es.ts";

export const es: Messages = {
  locale: {
    name: "Español",
    htmlLang: "es",
    dir: "ltr",
    ogLocale: "es_ES",
  },

  chrome: {
    skipToContent: "Saltar al contenido",
    brandLabel: "awesome-alternatives, inicio",
    searchLabel: "Buscar en el catálogo",
    searchPlaceholder: "Buscar alternativas",
    searchSubmit: "Buscar",
    languageLabel: "Idioma",
    feedTitle: "awesome-alternatives: herramientas nuevas",
    socialAlt: "awesome-alternatives: di qué usas y qué necesitas.",
    nav: {
      browse: "Explorar",
      about: "Acerca de",
      contribute: "Añadir una herramienta",
      github: "GitHub",
    },
    footer: {
      label: "Pie de página",
      catalog: "Catálogo",
      code: "código",
      data: "datos",
      dataLink: "de GitHub, cada noche",
      howItWorks: "Cómo funciona",
      rss: "Feed RSS",
      legalNotice: "Aviso legal",
      privacy: "Privacidad",
      github: "GitHub ↗",
    },
  },

  home: {
    title: "awesome-alternatives: encuentra lo que sustituye a la herramienta que usas",
    description:
      "Busca una alternativa a una herramienta de desarrollo por lenguaje, licencia y nivel de sustitución. Las estrellas, las versiones y las firmas vienen directamente de GitHub.",
    eyebrow: "Encuentra lo que sustituye a la herramienta que usas",
    heading: "Di qué usas y qué necesitas.",
    lede: "{count} herramientas, con datos de versiones extraídos de GitHub cada noche, nunca escritos a mano",
    noscriptBefore: "La búsqueda necesita JavaScript. Todas las herramientas están listadas abajo: ",
    noscriptLink: "explora por la herramienta que quieres sustituir",
    noscriptAfter: ".",
    trendingLabel: "Tendencia este mes",
    trendingLede: "Estrellas ganadas en GitHub en los últimos {days} días, o desde que empezó el recuento si es más reciente.",
    browseLabel: "Explorar por herramienta",
    allTools: "Todas las herramientas",
    categories: "Categorías",
    languages: "Lenguajes",
    licenses: "Licencias",
    owners: "Propietarios",
    sponsorNote: "El catálogo es gratuito y sin publicidad.",
    sponsorOpenCollective: "Open Collective ↗",
    sponsorGitHub: "GitHub Sponsors ↗",
    examples: [
      "semantic-release, pero escrito en Rust",
      "una sustitución directa de webpack, más rápida",
      "Redis, pero multihilo",
      "generador de changelog bajo MIT",
      "sustituir Terraform",
    ],
  },

  listing: {
    back: "← volver",
    browse: "explorar",
    toolCount: { one: "1 herramienta", other: "{n} herramientas" },
  },

  index: {
    alternatives: {
      title: "Alternativas a herramientas de desarrollo populares",
      description:
        "{count} herramientas de desarrollo y lo que sustituye a cada una, comparadas por nivel de sustitución, licencia y estrellas.",
      heading: "Alternativas",
      lede: "{count} herramientas a las que algo del catálogo sustituye.",
    },
    categories: {
      title: "Categorías de herramientas de desarrollo",
      description: "{count} categorías de herramientas de desarrollo, cada una con sus opciones de código abierto una al lado de otra.",
      heading: "Categorías",
      lede: "{count} categorías, desde la automatización de versiones hasta los emuladores de terminal.",
    },
    languages: {
      title: "Herramientas de desarrollo por lenguaje",
      description: "Explora el catálogo por el lenguaje en el que está escrita cada herramienta, entre {count} lenguajes.",
      heading: "Lenguajes",
      lede: "El lenguaje que GitHub indica para cada repositorio.",
    },
    licenses: {
      title: "Herramientas de desarrollo por licencia",
      description: "Explora el catálogo por licencia, entre {count} licencias detectadas por GitHub.",
      heading: "Licencias",
      lede: "La licencia que GitHub detecta en cada repositorio. Other significa un archivo de licencia que GitHub no ha podido asociar a una licencia conocida.",
    },
    owners: {
      title: "Quién publica las herramientas del catálogo",
      description: "Las {count} cuentas de GitHub con más de una herramienta en awesome-alternatives.",
      heading: "Propietarios",
      lede: "{count} cuentas publican más de una herramienta en el catálogo. El resto publica una sola, enlazada desde su ficha.",
    },
    tools: {
      title: "Todas las herramientas del catálogo",
      description: "Las {count} herramientas de awesome-alternatives, con lenguaje, licencia, estrellas y última versión.",
      heading: "Todas las herramientas",
      lede: "Todas las herramientas del catálogo, por nombre.",
    },
  },

  category: {
    context: "categoría",
    title: { one: "{name}: 1 herramienta", other: "{name}: {n} herramientas" },
    titleOpen: { one: "{name}: 1 herramienta de código abierto", other: "{name}: {n} herramientas de código abierto" },
    titleSelfHost: { one: "1 herramienta autoalojable: {lower}", other: "{n} herramientas autoalojables: {lower}" },
    descriptionSelfHost: "{description} Cada una se ejecuta en tu propio servidor. {count} herramientas comparadas por lenguaje, licencia, estrellas y última versión.",
    comparison: "Comparativa",
    replaces: "Lo que sustituyen estas herramientas",
    description: "{description} {count} herramientas comparadas por lenguaje, licencia, estrellas y última versión.",
  },

  language: {
    context: "lenguaje",
    title: "Herramientas de desarrollo escritas en {name}",
    description: "{count} herramientas del catálogo escritas en {name}, con licencia, estrellas y última versión.",
    lede: "Herramientas cuyo repositorio GitHub identifica mayoritariamente como {name}.",
  },

  license: {
    context: "licencia",
    title: "Herramientas de desarrollo bajo {name}",
    description: "{count} herramientas del catálogo con licencia {name}, con lenguaje, estrellas y última versión.",
    lede: "Herramientas cuyo repositorio GitHub indica bajo la licencia {name}.",
  },

  owner: {
    context: "propietario",
    title: "Herramientas publicadas por {name}",
    description: "{count} herramientas del catálogo que pertenecen a {name} en GitHub, con lenguaje, licencia, estrellas y última versión.",
    lede: "Repositorios que pertenecen a {name} en GitHub.",
    profile: "Perfil de GitHub ↗",
    website: "Sitio web ↗",
  },

  breadcrumb: {
    label: "Ruta de navegación",
    home: "Inicio",
  },

  migrate: {
    title: "Migrar de {from} a {to}",
    description: "Pasar de {from} a {to}: licencia, compatibilidad, pasos y trampas, según la guía oficial.",
    context: "migración",
    terms: "Licencia y condiciones",
    fit: "Nivel de sustitución",
    englishOnly: "Esta página está escrita en inglés.",
    guide: "Guía oficial",
    guideLink: "Guía de migración de {name} ↗",
    sources: "Fuentes",
    reviewed: "Revisada el {date}.",
    due: "Pendiente de revisión: {reasons}.",
    dueAge: "la última revisión fue hace más de un año",
    dueMajor: "{name} ha publicado una nueva versión mayor desde entonces",
    alternativesLink: "Otras alternativas a {name} →",
  },

  target: {
    title: { one: "1 alternativa a {name}", other: "{n} alternativas a {name}" },
    titleOpen: { one: "1 alternativa de código abierto a {name}", other: "{n} alternativas de código abierto a {name}" },
    dropIns: "Sustitución directa: {names}.",
    comparison: "Comparativa",
    listHeading: "Todas las alternativas",
    about: "Sobre {name}",
    pairs: "Cara a cara",
    vendor: "Empresa",
    toolColumn: "Herramienta",
    description:
      "{count} alternativas a {name}, en {languages}. Compara el nivel de sustitución, la licencia, las estrellas y la última versión firmada.",
    context: "alternativas",
    contextTo: "a",
    archived: "archivado",
    aboutLink: "Sobre {name} →",
    closed: "Un producto cerrado de {vendor}.",
    productSite: "Web de {name} ↗",
  },

  tool: {
    title: "{name}: {language} para {category}",
    titleFallbackLanguage: "herramienta",
    descriptionFallback: "{name} en el catálogo de awesome-alternatives.",
    alternativeTo: "alternativa a",
    replacedBy: { one: "{n} herramienta sustituye a {name}", other: "{n} herramientas sustituyen a {name}" },
    replacedByDropIn: { one: ", {n} de sustitución directa", other: ", {n} de sustitución directa" },
    archived: "archivado",
    aboutLabel: "Acerca de",
    owner: "Propietario",
    archivedNote:
      "Este repositorio está archivado y ya no recibe cambios. Aparece en la lista para que puedas encontrar lo que lo sustituye.",
    signed: "Versión firmada, verificada por GitHub",
    verified: "Verificada por sus mantenedores",
    unverified: "No verificada por sus mantenedores",
    stars: "Estrellas",
    forks: "Forks",
    latest: "Última versión",
    noRelease: "ninguna",
    lastPush: "Último push",
    terms: "Condiciones",
    selfHost: "Autoalojable",
    selfHostNo: "No",
    related: "Más en {category}",
    selfHostYes: "Sí",
    deploy: "Despliegue",
    website: "Sitio web ↗",
    edit: "Editar esta entrada",
    capabilities: "Funcionalidades",
    capabilityDocs: "docs ↗",
    checked: "Leído de GitHub el {date}.",
    edited: "Ficha editada por última vez el {date}.",
  },

  compare: {
    title: "{a} vs {b}",
    description:
      "{a} y {b} lado a lado: lenguaje, licencia, estrellas, versiones y la compatibilidad y la nota que los relacionan.",
    context: "comparar",
    lede: "Los mismos datos para ambos, leídos de GitHub cada noche, y la relación que revisó una persona.",
    factColumn: "Dato",
    factCadence: "Ritmo de versiones",
    cadence: {
      one: "alrededor de {n} día entre versiones",
      other: "alrededor de {n} días entre versiones",
    },
    cadenceUnknown: "muy pocas versiones",
    factFlags: "Avisos",
    noFlags: "ninguno",
    relationLabel: "Cómo se relacionan",
    replacesLine: "{from} sustituye a {to}.",
    sharedLine: "Ambos sustituyen a {target}.",
    targetLink: "Alternativas a {name} →",
    entry: "Comparar {a} y {b} →",
  },

  contribute: {
    title: "Añadir una herramienta a awesome-alternatives",
    description:
      "Cómo incluir una herramienta de desarrollo en el catálogo: la entrada YAML, lo que comprueba la CI y cómo los mantenedores verifican su herramienta.",
    eyebrow: "Contribuir",
    heading: "Añadir una herramienta",
    lede: "Cada entrada es un pequeño archivo YAML en el repositorio. Escríbela tú en un pull request, o describe la herramienta en una issue y un mantenedor la escribe por ti.",
    openPullRequest: "Abrir un pull request ↗",
    suggest: "Proponer una herramienta en su lugar ↗",
    guideInEnglish: "La guía que sigue está en inglés, igual que el repositorio que describe.",
  },

  notFound: {
    title: "No encontrado",
    description: "Esta página no está en el catálogo.",
    heading: "No está en el catálogo",
    ledeBefore: "En esta dirección no hay nada. ",
    ledeSearch: "Busca en el catálogo",
    ledeBetween: ", o ",
    ledeAdd: "añade la herramienta",
    ledeAfter: " que buscabas.",
  },

  feed: {
    title: "awesome-alternatives: herramientas nuevas",
    description: "Alternativas de código abierto añadidas recientemente al catálogo de awesome-alternatives.",
    joined: "{name} se suma al catálogo",
    replaces: "Sustituye a {names}.",
  },

  islands,
  pages,
};
