import type { Pages } from "./messages.ts";

export const pages: Pages = {
  about: {
    title: "Acerca de: marcas, niveles de sustitución y la actualización nocturna",
    description:
      "Qué declara una entrada del catálogo, qué se lee de GitHub cada noche y la regla detrás de cada marca que se muestra en una herramienta.",
    eyebrow: "Acerca de",
    heading: "Lo que dice el catálogo, y cómo lo sabe.",
    lede: "{toolCount} herramientas de desarrollo, cada una con lo que sustituye. El resto de lo que ves en una herramienta viene de GitHub, no de quien la añadió.",
    entries: {
      heading: "Qué declara una entrada",
      fileBefore: "Cada herramienta es un pequeño archivo YAML en",
      fileAfter:
        ". Indica el nombre de la herramienta, su repositorio de GitHub, su categoría, las herramientas a las que sustituye con un nivel de sustitución para cada una, y una afiliación cuando la hay. Eso es todo lo que puede escribir quien contribuye.",
      schema:
        "Una entrada nunca declara estrellas, licencia, versión ni descripción. El esquema las rechaza, así que un pull request no puede inflar un recuento de estrellas ni afirmar una versión que no existe.",
    },
    refresh: {
      heading: "La actualización nocturna",
      runBefore: "Cada noche, y cada vez que los datos del catálogo cambian en la rama principal, la",
      runLink: "actualización",
      runAfter: "lee cada repositorio listado desde la API de GitHub:",
      reads: [
        "descripción, página principal, lenguaje, licencia, estrellas, forks y temas",
        "si el repositorio está archivado, y la fecha de su último push",
        "la última versión, o el último tag cuando no hay versión, y si está firmada",
        "las cinco últimas versiones publicadas, que se muestran en la página de la herramienta",
        "los autores de los commits en la rama por defecto en los últimos {days} días, de los que solo se guarda el número",
        "los nombres de los archivos adjuntos a la última versión, leídos para los sistemas operativos y arquitecturas que nombran",
      ],
      activity:
        "La página de la herramienta convierte esto en lo vivo que está un proyecto, nunca en una puntuación. Su edad se cuenta desde la creación del repositorio. El ritmo de versiones es la separación mediana entre sus últimas versiones estables, y aparece a partir de tres. Los colaboradores activos son los autores de commits distintos en la rama por defecto en los últimos {days} días: las cuentas cuyo nombre termina en [bot] quedan fuera, y un commit sin cuenta de GitHub vinculada cuenta por su email, que nunca se publica. Solo se leen los {commits} últimos commits, así que un proyecto más activo muestra un mínimo como 40+. Un flujo con squash merge atribuye cada pull request a un solo autor, aunque la escribieran varios, y para una herramienta que vive en un monorepo el número cubre todo el repositorio, y la página lo indica. Las plataformas solo aparecen cuando los nombres de archivo de la última versión las nombran, y no se adivina nada cuando no lo hacen, ni para una herramienta en un monorepo, cuya última versión puede ser la de otro paquete.",
      maintainerFileBefore: "el archivo de mantenedores descrito en",
      maintainerFileLink: "verificada",
      releaseBefore: "Entre dos pasadas nocturnas, una release publicada actualiza su herramienta en pocos minutos si el repositorio tiene instalada",
      releaseApp: "la app de GitHub awesome-alternatives",
      releaseMiddle: "o ejecuta",
      releaseAfter: "en su workflow de release.",
      commit:
        "Cuando algo ha cambiado, la actualización confirma el nuevo catálogo y sale una nueva compilación de este sitio. Si GitHub deja de devolver el repositorio de una herramienta listada, porque se ha borrado o se ha hecho privado, la actualización no publica nada y falla, para que una persona lo revise: una herramienta solo sale del catálogo mediante un pull request que retira su entrada.",
      changesBefore:
        "Cada refresh compara además el nuevo catálogo con el anterior y anota lo que cambió: una licencia, el nombre de un repositorio, un archivado, una nueva release, una herramienta que entra o sale. La página",
      changesLink: "qué ha cambiado",
      changesAfter:
        "lo muestra por día, con un feed RSS para todo el catálogo, uno por herramienta y uno por categoría. Un cambio de estrellas nunca cuenta.",
    },
    marks: {
      heading: "Marcas",
      signed: {
        term: "✓ firmada",
        body: "Junto a la última versión. El tag lleva una firma que GitHub ha verificado o, en el caso de un tag ligero, la lleva el commit al que apunta. Solo se comprueba la última versión.",
      },
      verified: {
        term: "Verificada por sus mantenedores",
        fileBefore: "El propio repositorio de la herramienta tiene un archivo",
        fileAfter: "en la raíz de su rama por defecto, con",
        slugAfter:
          "apuntando a esta entrada. Solo alguien con acceso de escritura al repositorio puede añadirlo, así que la marca indica que sus mantenedores respaldan la entrada. La actualización lee el archivo cada noche.",
        appBefore: "La marca también se pone cuando",
        appLink: "la app de GitHub awesome-alternatives",
        appAfter: "está instalada en el repositorio, porque instalarla exige ser administrador del mismo.",
      },
      archived: {
        term: "archivado",
        before:
          "El repositorio está archivado y ya no recibe cambios. Una herramienta archivada es justo aquello de lo que la gente busca salir, así que solo se acepta como algo que otras entradas sustituyen, nunca como alternativa, y la advertencia",
        inactiveLink: "sin push",
        after: "no se le aplica.",
      },
      licence: {
        term: "Other",
        before:
          "Se muestra como licencia cuando GitHub detecta una pero no puede asociarla a un identificador SPDX. Cuando GitHub no detecta ninguna, la herramienta muestra",
        none: "Ninguna detectada",
        middle: "y la advertencia",
        noLicenceLink: "sin licencia",
        after: "se le aplica.",
      },
    },
    fit: {
      heading: "Niveles de sustitución",
      lede: "Cada sustitución lleva uno, fijado por quien añade la entrada.",
      dropIn:
        "Acepta sin cambios la configuración o la interfaz del original: lo cambias sin tocar tu instalación. Pedir una sustitución directa en la búsqueda deja solo estas.",
      full: "Cubre el mismo trabajo, a su manera. Cuenta con migrar tu configuración.",
      partial: "Cubre parte del trabajo. La nota bajo la herramienta indica qué parte.",
    },
    warnings: {
      heading: "Advertencias",
      lede: "Una advertencia nunca elimina una herramienta. Es algo que un mantenedor mira antes de fusionar un pull request, y algo que quizá quieras saber antes de depender de la herramienta.",
      moved:
        "El repositorio está ahora bajo otro nombre u otro propietario. GitHub redirige la dirección antigua, pero la entrada debería actualizarse.",
      noLicense: "GitHub no detecta ninguna licencia, así que no están claras las condiciones bajo las que puedes usar el código.",
      noRelease: "El repositorio no tiene ni versión ni tag, así que no hay ninguna versión que fijar.",
      inactive: "No se ha hecho ningún push durante más de {inactiveDays} días. Los repositorios archivados quedan fuera de esta advertencia.",
      starSpike:
        "Un día que sumó {spikeThreshold} estrellas o más, y al menos {spikeFactor} veces el ritmo diario habitual de la herramienta en el último mes. Las estrellas compradas llegan en ráfagas, y un lanzamiento en Hacker News también, y por eso decide una persona. GitHub ya no muestra quién marcó un repositorio con una estrella, así que la actualización nocturna guarda el número de estrellas de cada día y compara los días. Necesita una semana de ese historial para juzgar, de modo que una herramienta solo se comprueba una vez listada.",
      blockingBefore:
        "Otros problemas bloquean directamente un pull request: un repositorio privado, un fork, archivado pero ofrecido como alternativa, con menos de {minAgeDays} días, o ya listado bajo otro slug.",
      contributeLink: "La guía de contribución",
      blockingAfter: "enumera todas las comprobaciones.",
    },
    affiliation: {
      heading: "Afiliación",
      body: "Quien mantiene una herramienta, trabaja en ella o cobra por ella tiene que decirlo en su entrada. Incluir tu propio proyecto es bienvenido, no decirlo es motivo de retirada. Cuando una entrada tiene una afiliación, la página de la herramienta la muestra tal como está escrita.",
    },
    search: {
      heading: "Cómo funciona la búsqueda",
      before:
        "Tu consulta se lee primero como palabras clave: los nombres de las herramientas que otras sustituyen, los lenguajes y las licencias del catálogo, y «drop in». Cuando no se nombra ninguna herramienta a la que sustituir, un pequeño modelo de embeddings multilingüe que se ejecuta en el servidor de búsqueda compara la consulta con la descripción de cada herramienta, de modo que una consulta escrita en cualquier idioma del sitio encuentra las mismas herramientas que su versión en inglés, aunque las descripciones sigan en inglés, tal como las devuelve GitHub. Si destaca claramente una herramienta a la que sustituir, se elige; si no, los resultados se ordenan por su cercanía a la consulta. Solo cuando ninguno de los dos pasos encuentra una herramienta a la que sustituir, y el servidor tiene una clave para ello, se envía el texto de la consulta a Jev, un servicio externo, para que lo lea. Su lectura se guarda en caché en el servidor durante un día. Los resultados indican cuál ha leído tu consulta: «Interpretado localmente» o «Leído por Jev».",
      qualifiers:
        "Algunas palabras se convierten en filtros, en cada idioma del sitio. «Código abierto» deja las herramientas cuya licencia es abierta. «Mantenido» descarta las archivadas y las que no reciben un push desde hace {inactiveDays} días. «Autoalojado» deja las herramientas de categorías de servicios que ejecutas tú. Una plataforma o una forma de desplegar, como Linux o Docker, se reconoce pero aún no se comprueba, y los resultados lo dicen en lugar de fingir.",
      privacyLink: "La página de privacidad",
      after: "detalla qué se envía y qué se conserva.",
    },
    agents: {
      heading: "Desde un agente de IA",
      body: "El catálogo también es un servidor Model Context Protocol (MCP) en {url}, sobre Streamable HTTP, sin clave ni cuenta. Un agente puede buscar alternativas a una herramienta o a un producto, listar herramientas por categoría, lenguaje o licencia y leer los datos de una herramienta. Su herramienta de búsqueda lee las consultas solo con palabras clave y el modelo de este servidor, nunca con Jev, y tiene un límite por dirección; las demás herramientas no lo tienen.",
      setup: "Para añadirlo a Claude Code:",
    },
    licences: {
      heading: "Licencias",
      dataBefore: "Los datos del catálogo se ceden al dominio público bajo",
      dataLink: "CC0 1.0",
      codeBefore: ". El código del sitio, de la API y de los scripts está bajo la",
      codeLink: "licencia MIT",
    },
  },

  privacy: {
    title: "Política de privacidad",
    description: "Qué trata awesome-alternatives.com sobre sus visitantes, y por qué.",
    eyebrow: "Legal",
    heading: "Política de privacidad",
    lede: "El sitio no instala cookies, no guarda nada en tu navegador, no ejecuta analítica y no carga scripts ni tipografías de terceros. Todas las páginas, los scripts y las tipografías vienen de awesome-alternatives.com; la única excepción son las imágenes dentro del README de un proyecto, descritas en «Detalles del repositorio». No hay nada que consentir, así que no hay banner de consentimiento. Si eso cambia alguna vez, esta página y un mecanismo de consentimiento cambian primero. Última actualización: {lastUpdated}.",
    legitimateInterest: "Interés legítimo (RGPD art. 6(1)(f))",
    facts: {
      data: "Datos",
      purpose: "Finalidad",
      legalBasis: "Base jurídica",
      retention: "Plazo de conservación",
      recipient: "Destinatario",
      where: "Dónde",
      terms: "Sus condiciones",
      proxyAndRetention: "Proxy y conservación",
    },
    controller: {
      heading: "Responsable del tratamiento",
      before: "El responsable del tratamiento es el editor indicado en el",
      legalNoticeLink: "aviso legal",
      beforeEmail: ", contactable en",
    },
    siteAccessLog: {
      heading: "Registro de acceso del servidor web",
      body: "El servidor nginx que entrega las páginas escribe una línea por petición en su registro de acceso estándar, que va a la salida del contenedor.",
      dataBefore: "Dirección IP, fecha y hora, dirección solicitada (incluida una búsqueda escrita en la barra de direcciones como",
      dataAfter: "), estado y tamaño de la respuesta, página de origen, user agent del navegador, cabecera forwarded-for",
      purpose: "Hacer funcionar el sitio, diagnosticar errores, detectar y frenar abusos",
    },
    reverseProxyLog: {
      heading: "Registro de acceso del proxy inverso",
      body: "Las peticiones al sitio y a su API de búsqueda pasan por un proxy inverso en el proveedor de alojamiento, que mantiene su propio registro de acceso con el mismo tipo de datos.",
      purpose: "Enrutar las peticiones, diagnosticar errores, detectar y frenar abusos",
    },
    rateLimiting: {
      heading: "Límite de búsquedas",
      body: "Para que la búsqueda siga siendo utilizable para todos, la API permite un número fijo de búsquedas por minuto desde cada dirección IP. La propia API no escribe ningún registro de peticiones.",
      data: "Dirección IP y un contador de búsquedas recientes, conservados solo en memoria",
      purpose: "Evitar que un cliente agote la búsqueda",
      retention:
        "Se elimina en la siguiente limpieza horaria, una vez que ya no cuenta para el límite, y en cada reinicio. Nunca se escribe en disco.",
    },
    queries: {
      heading: "Consultas de búsqueda",
      before:
        "Lo que escribes en el cuadro de búsqueda se envía a la API, que primero lo interpreta con un modelo que se ejecuta en su propio servidor. Cuando este no encuentra ninguna herramienta a la que sustituir, el texto de la consulta, y nada más (ninguna dirección IP, ningún identificador), se envía a Jev en",
      after:
        ", un servicio de modelos de lenguaje que lo convierte en filtros. Evita escribir información personal en el cuadro de búsqueda.",
      data: "El texto de la consulta",
      purpose: "Responder a la búsqueda que has pedido",
      retention:
        "Las consultas interpretadas por Jev se guardan en la memoria de la API junto con su resultado, sin ningún vínculo con quien las envió, durante 24 horas como máximo. La caché también se vacía cada vez que se actualiza el catálogo, cada hora, y en cada reinicio. Nunca se escribe en disco.",
      addressBefore: "La búsqueda también coloca tu consulta en la dirección de la página",
      addressAfter:
        ") para que los resultados se puedan compartir. Permanece en el historial de tu navegador y llega a los registros anteriores cuando se carga esa dirección.",
    },
    repositoryDetails: {
      heading: "Detalles del repositorio",
      fetch: "La API obtiene por sí misma el README de cada proyecto listado desde GitHub y su informe de seguridad desde OpenSSF Scorecard, de servidor a servidor, y los conserva durante 12 horas. Esas peticiones llevan solo el nombre del repositorio, nada sobre ti.",
      imagesBefore:
        "La página de una herramienta se abre en el README de ese proyecto. Tu navegador carga sus imágenes e insignias desde donde el proyecto las aloja: GitHub",
      imagesAfter:
        "y, en algunos README, servicios de insignias como shields.io. Esos servidores reciben tu dirección IP y los datos de tu navegador como en cualquier petición de imagen, y se aplican sus propias políticas. Ninguna otra página carga nada de ellos.",
    },
    recipients: {
      heading: "Quién recibe los datos",
      before: "El editor, el proveedor de alojamiento indicado en el",
      legalNoticeLink: "aviso legal",
      after:
        "por el hecho de operar los servidores, y, solo para las consultas de búsqueda, el operador de Jev. Nada se vende ni se comparte con fines publicitarios. Los enlaces a GitHub y a los proyectos listados son enlaces normales: en cuanto sigues uno, se aplica la política de ese sitio.",
    },
    rights: {
      heading: "Tus derechos",
      before:
        "Conforme al RGPD puedes solicitar el acceso a los datos que te conciernen, su rectificación o su supresión, la limitación de su tratamiento, y puedes oponerte al tratamiento basado en el interés legítimo. Escribe a",
      after:
        ". Los registros no están vinculados a un nombre, así que indica la dirección IP y la hora aproximada de tu visita para poder encontrar las entradas correspondientes.",
      complaintBefore:
        "Si consideras que tus datos se tratan de forma indebida, puedes presentar una reclamación ante la autoridad francesa de protección de datos, la",
      complaintLink: "CNIL",
    },
  },

  legalNotice: {
    title: "Aviso legal",
    description: "Quién publica y aloja awesome-alternatives.com.",
    eyebrow: "Legal",
    heading: "Aviso legal",
    lede: "Publicado en virtud del artículo 6 III de la ley francesa n.º 2004-575 de 21 de junio de 2004 para la confianza en la economía digital (LCEN). Última actualización: {lastUpdated}.",
    facts: {
      name: "Nombre",
      address: "Dirección",
      email: "Correo electrónico",
      phone: "Teléfono",
    },
    publisher: {
      heading: "Editor",
      body: "awesome-alternatives.com lo publica un particular, a título no profesional.",
    },
    publicationDirector: {
      heading: "Director de la publicación",
      before: "El editor,",
    },
    host: {
      heading: "Alojamiento",
    },
    content: {
      heading: "Contenido",
      licenceBefore: "El catálogo se publica bajo",
      dataLink: "CC0",
      licenceMiddle: "y el código bajo",
      codeLink: "MIT",
      licenceAfter:
        ". Las cifras de los repositorios (estrellas, versiones, licencias, descripciones) provienen de la API pública de GitHub, junto con el nombre público y la descripción de la cuenta a la que pertenece cada repositorio. Los nombres de los proyectos y las marcas pertenecen a sus titulares.",
      reportBefore: "Para señalar un error o pedir que se retire una entrada, abre una issue en",
      reportLink: "GitHub",
      reportAfter: "o escribe a",
    },
    personalData: {
      heading: "Datos personales",
      before: "Lo que el sitio trata sobre las personas que lo visitan se describe en la",
      privacyLink: "política de privacidad",
    },
  },
};
