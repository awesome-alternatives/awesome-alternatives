import type { Pages } from "./messages.ts";

export const pages: Pages = {
  about: {
    title: "À propos : marques, niveaux de remplacement et mise à jour nocturne",
    description:
      "Ce qu'une entrée du catalogue affirme, ce qui est lu sur GitHub chaque nuit, et la règle derrière chaque marque affichée sur un outil.",
    eyebrow: "À propos",
    heading: "Ce que dit le catalogue, et comment il le sait.",
    lede: "{toolCount} outils de développement, chacun listé avec ce qu'il remplace. Le reste de ce que vous voyez sur un outil vient de GitHub, pas de la personne qui l'a ajouté.",
    entries: {
      heading: "Ce qu'une entrée affirme",
      fileBefore: "Chaque outil est un petit fichier YAML sous",
      fileAfter:
        ". Elle nomme l'outil, son dépôt GitHub, sa catégorie, les outils qu'il remplace avec un niveau de remplacement pour chacun, et une affiliation s'il y en a une. C'est tout ce qu'un contributeur peut écrire.",
      schema:
        "Une entrée n'indique jamais d'étoiles, de licence, de version ni de description. Le schéma les rejette, donc une pull request ne peut ni gonfler un nombre d'étoiles ni revendiquer une release qui n'existe pas.",
    },
    refresh: {
      heading: "La mise à jour nocturne",
      runBefore:
        "Chaque nuit, et à chaque changement des données du catalogue sur la branche main, le",
      runLink: "refresh",
      runAfter: "lit chaque dépôt listé depuis l'API GitHub :",
      reads: [
        "description, page d'accueil, langage, licence, étoiles, forks et topics",
        "si le dépôt est archivé, et la date de son dernier push",
        "la dernière release, ou le dernier tag à défaut de release, et si elle est signée",
        "les cinq dernières releases publiées, affichées sur la page de l'outil",
      ],
      maintainerFileBefore: "le fichier mainteneur décrit sous",
      maintainerFileLink: "vérifié",
      releaseBefore: "Entre deux passages nocturnes, une release publiée met à jour son outil en quelques minutes quand le dépôt a installé",
      releaseApp: "l'app GitHub awesome-alternatives",
      releaseMiddle: "ou lance",
      releaseAfter: "dans son workflow de release.",
      commit:
        "Dès que quelque chose a changé, le refresh commite le nouveau catalogue et une nouvelle version de ce site est publiée. Si GitHub ne renvoie plus le dépôt d'un outil listé, parce qu'il a été supprimé ou rendu privé, la mise à jour ne publie rien et échoue, pour qu'une personne regarde : un outil ne quitte le catalogue que par une pull request qui retire son entrée.",
      changesBefore:
        "Chaque refresh compare aussi le nouveau catalogue au précédent et note ce qui a changé : une licence, le nom d'un dépôt, un archivage, une nouvelle release, un outil qui arrive ou qui part. La page",
      changesLink: "ce qui a changé",
      changesAfter:
        "le liste par jour, avec un flux RSS pour tout le catalogue, un par outil et un par catégorie. Une variation d'étoiles ne compte jamais.",
    },
    marks: {
      heading: "Marques",
      signed: {
        term: "✓ signée",
        body: "À côté de la dernière version. Le tag porte une signature vérifiée par GitHub ou, pour un tag léger, c'est le commit qu'il désigne qui la porte. Seule la dernière release est vérifiée.",
      },
      verified: {
        term: "Vérifié par ses mainteneurs",
        fileBefore: "Le dépôt de l'outil lui-même contient un fichier",
        fileAfter: "à la racine de sa branche par défaut, avec",
        slugAfter:
          "renseigné sur cette entrée. Seule une personne disposant d'un accès en écriture au dépôt peut l'ajouter, si bien que la marque dit que ses mainteneurs assument l'entrée. La mise à jour lit ce fichier chaque nuit.",
        appBefore: "La marque est aussi posée quand",
        appLink: "l'app GitHub awesome-alternatives",
        appAfter: "est installée sur le dépôt, ce qui demande d'en être administrateur.",
      },
      archived: {
        term: "archivé",
        before:
          "Le dépôt est archivé et ne reçoit plus de modifications. Un outil archivé est précisément ce que l'on cherche à quitter : il n'est donc accepté que comme cible remplacée par d'autres entrées, jamais comme alternative, et l'avertissement",
        inactiveLink: "aucun push",
        after: "ne lui est pas appliqué.",
      },
      licence: {
        term: "Other",
        before:
          "Affiché comme licence quand GitHub en détecte une mais ne peut pas la rattacher à un identifiant SPDX. Quand GitHub n'en détecte aucune, l'outil affiche",
        none: "Aucune détectée",
        middle: "et l'avertissement",
        noLicenceLink: "aucune licence",
        after: "lui est appliqué.",
      },
    },
    fit: {
      heading: "Niveaux de remplacement",
      lede: "Chaque alternative en porte un, défini par la personne qui ajoute l'entrée.",
      dropIn:
        "Accepte sans changement la configuration ou l'interface de l'original : on l'échange sans toucher à son installation. Demander un drop-in dans la recherche ne garde que ceux-là.",
      full: "Couvre le même besoin, à sa manière. Prévoir de migrer sa configuration.",
      partial: "Couvre une partie du besoin. La note sous l'outil précise laquelle.",
    },
    warnings: {
      heading: "Avertissements",
      lede: "Un avertissement ne retire jamais un outil. C'est ce qu'un mainteneur regarde avant de fusionner une pull request, et ce qu'il peut être utile de savoir avant de dépendre de l'outil.",
      moved:
        "Le dépôt se trouve désormais sous un autre nom ou un autre propriétaire. GitHub redirige l'ancienne adresse, mais l'entrée devrait être mise à jour.",
      noLicense: "GitHub ne détecte aucune licence : les conditions d'utilisation du code sont donc incertaines.",
      noRelease: "Le dépôt n'a ni release ni tag : il n'y a donc aucune version à épingler.",
      inactive:
        "Rien n'a été poussé depuis plus de {inactiveDays} jours. Les dépôts archivés sont exclus de cet avertissement.",
      starSpike:
        "Une journée qui a apporté au moins {spikeThreshold} étoiles, et au moins {spikeFactor} fois le rythme quotidien habituel de l'outil sur le dernier mois. Les étoiles achetées arrivent par salves, un lancement sur Hacker News aussi, et c'est pourquoi la décision revient à une personne. GitHub ne liste plus qui a mis une étoile à un dépôt : la mise à jour nocturne garde donc le nombre d'étoiles de chaque jour et compare les jours entre eux. Il lui faut une semaine de cet historique pour juger, si bien qu'un outil n'est vérifié qu'une fois listé.",
      blockingBefore:
        "D'autres problèmes bloquent plutôt la pull request : un dépôt privé, un fork, archivé mais proposé comme alternative, plus jeune que {minAgeDays} jours, ou déjà listé sous un autre slug.",
      contributeLink: "Le guide du contributeur",
      blockingAfter: "liste toutes les vérifications.",
    },
    affiliation: {
      heading: "Affiliation",
      body: "Qui maintient un outil, y contribue ou en est rémunéré doit le déclarer dans son entrée. Référencer son propre projet est bienvenu, ne pas le dire est un motif de retrait. Quand une entrée porte une affiliation, la page de l'outil l'affiche telle qu'elle est écrite.",
    },
    search: {
      heading: "Comment fonctionne la recherche",
      before:
        "Votre requête est d'abord lue comme des mots-clés : les noms des outils que d'autres remplacent, les langages et les licences du catalogue, et « drop in ». Quand aucun outil à remplacer n'est nommé, un petit modèle d'embedding multilingue qui tourne sur le serveur de recherche compare la requête à la description de chaque outil, si bien qu'une requête écrite dans n'importe quelle langue du site trouve les mêmes outils que sa formulation anglaise, alors même que les descriptions restent en anglais, telles que GitHub les renvoie. Si un outil à remplacer se détache nettement, il est retenu ; sinon les résultats sont classés par proximité avec la requête. Ce n'est que lorsque ni l'une ni l'autre de ces étapes ne trouve d'outil à remplacer, et que le serveur dispose d'une clé pour cela, que le texte de la requête part chez Jev, un service externe, pour qu'il le lise. Sa lecture est mise en cache sur le serveur pendant une journée. Les résultats indiquent qui a lu votre requête : « Reconnu en local » ou « Lu par Jev ».",
      qualifiers:
        "Certains mots deviennent des filtres, dans chaque langue du site. « Open source » ou « libre » garde les outils dont la licence est ouverte. « Maintenu » écarte les outils archivés et ceux sans push depuis {inactiveDays} jours. « Auto-hébergé » garde les outils des catégories de services que vous faites tourner vous-même. Une plateforme ou un mode de déploiement, comme Linux ou Docker, est reconnu mais pas encore vérifié, et les résultats le disent au lieu de faire semblant.",
      privacyLink: "La page de confidentialité",
      after: "dit ce qui est envoyé et ce qui est conservé.",
    },
    licences: {
      heading: "Licences",
      dataBefore: "Les données du catalogue sont versées au domaine public sous",
      dataLink: "CC0 1.0",
      codeBefore: ". Le code du site, de l'API et des scripts est sous",
      codeLink: "licence MIT",
    },
  },

  privacy: {
    title: "Politique de confidentialité",
    description: "Ce qu'awesome-alternatives.com traite au sujet de ses visiteurs, et pourquoi.",
    eyebrow: "Légal",
    heading: "Politique de confidentialité",
    lede: "Le site ne dépose aucun cookie, n'enregistre rien dans votre navigateur, n'exécute aucune mesure d'audience et ne charge ni script ni police tiers. Chaque page, chaque script et chaque police vient d'awesome-alternatives.com ; la seule exception, ce sont les images contenues dans le README d'un projet, décrites sous « Détails du dépôt ». Il n'y a rien à consentir, donc pas de bandeau de consentement. Si cela venait à changer, cette page et un mécanisme de consentement changeraient d'abord. Dernière mise à jour le {lastUpdated}.",
    legitimateInterest: "Intérêt légitime (RGPD, art. 6.1.f)",
    facts: {
      data: "Données",
      purpose: "Finalité",
      legalBasis: "Base légale",
      retention: "Durée de conservation",
      recipient: "Destinataire",
      where: "Lieu",
      terms: "Ses conditions",
      proxyAndRetention: "Proxy et conservation",
    },
    controller: {
      heading: "Responsable de traitement",
      before: "Le responsable de traitement est l'éditeur indiqué dans les",
      legalNoticeLink: "mentions légales",
      beforeEmail: ", joignable à",
    },
    siteAccessLog: {
      heading: "Journal d'accès du serveur web",
      body: "Le serveur nginx qui délivre les pages écrit une ligne par requête dans son journal d'accès standard, qui part vers la sortie du conteneur.",
      dataBefore:
        "Adresse IP, date et heure, adresse demandée (y compris une recherche saisie dans la barre d'adresse sous la forme",
      dataAfter:
        "), statut et taille de la réponse, page de provenance, user agent du navigateur, en-tête forwarded-for",
      purpose: "Faire fonctionner le site, diagnostiquer les erreurs, détecter et stopper les abus",
    },
    reverseProxyLog: {
      heading: "Journal d'accès du reverse proxy",
      body: "Les requêtes vers le site et vers son API de recherche passent par un reverse proxy chez l'hébergeur, qui tient son propre journal d'accès avec le même type de données.",
      purpose: "Router les requêtes, diagnostiquer les erreurs, détecter et stopper les abus",
    },
    rateLimiting: {
      heading: "Limitation des recherches",
      body: "Pour que la recherche reste utilisable par tous, l'API autorise un nombre fixe de recherches par minute et par adresse IP. L'API elle-même n'écrit aucun journal de requêtes.",
      data: "Adresse IP et un compteur de recherches récentes, conservés en mémoire uniquement",
      purpose: "Empêcher un client d'épuiser la recherche",
      retention:
        "Supprimés au prochain nettoyage horaire dès qu'ils ne comptent plus pour la limite, et à chaque redémarrage. Jamais écrits sur disque.",
    },
    queries: {
      heading: "Requêtes de recherche",
      before:
        "Ce que vous saisissez dans le champ de recherche est envoyé à l'API, qui l'interprète d'abord avec un modèle tournant sur son propre serveur. Quand celui-ci ne trouve aucun outil à remplacer, le texte de la requête, et rien d'autre (ni adresse IP, ni identifiant), est envoyé à Jev sur",
      after:
        ", un service de modèle de langage qui le transforme en filtres. Évitez de saisir des informations personnelles dans le champ de recherche.",
      data: "Le texte de la requête",
      purpose: "Répondre à la recherche demandée",
      retention:
        "Les requêtes interprétées par Jev sont mises en cache dans la mémoire de l'API avec leur résultat, sans aucun lien avec qui les a envoyées, pendant 24 heures au maximum. Le cache est aussi vidé à chaque mise à jour du catalogue, toutes les heures, et à chaque redémarrage. Jamais écrit sur disque.",
      addressBefore: "La recherche place aussi votre requête dans l'adresse de la page",
      addressAfter:
        ") pour que les résultats puissent être partagés. Elle reste dans l'historique de votre navigateur, et atteint les journaux d'accès ci-dessus quand cette adresse est chargée.",
    },
    repositoryDetails: {
      heading: "Détails du dépôt",
      fetch: "L'API récupère elle-même le README de chaque projet listé depuis GitHub et son rapport de sécurité depuis OpenSSF Scorecard, de serveur à serveur, et les conserve 12 heures. Ces requêtes ne portent que le nom du dépôt, rien qui vous concerne.",
      imagesBefore:
        "Une page d'outil s'ouvre sur le README de ce projet. Ses images et ses badges sont chargés par votre navigateur là où le projet les héberge : GitHub",
      imagesAfter:
        "et, pour certains README, des services de badges comme shields.io. Ces hébergeurs reçoivent votre adresse IP et les détails de votre navigateur comme pour n'importe quelle requête d'image, et leurs propres politiques s'appliquent. Aucune autre page ne charge quoi que ce soit chez eux.",
    },
    recipients: {
      heading: "Qui reçoit les données",
      before: "L'éditeur, l'hébergeur indiqué dans les",
      legalNoticeLink: "mentions légales",
      after:
        "puisqu'il fait tourner les serveurs, et, pour les seules requêtes de recherche, l'opérateur de Jev. Rien n'est vendu ni partagé à des fins publicitaires. Les liens vers GitHub et vers les projets listés sont de simples liens : dès que vous en suivez un, la politique propre à ce site s'applique.",
    },
    rights: {
      heading: "Vos droits",
      before:
        "En vertu du RGPD, vous pouvez demander l'accès aux données vous concernant, leur rectification ou leur effacement, la limitation de leur traitement, et vous pouvez vous opposer à un traitement fondé sur l'intérêt légitime. Écrivez à",
      after:
        ". Les journaux ne sont rattachés à aucun nom : indiquez donc l'adresse IP et l'heure approximative de votre visite pour que les entrées correspondantes puissent être retrouvées.",
      complaintBefore:
        "Si vous estimez que vos données sont mal traitées, vous pouvez adresser une réclamation à l'autorité française de protection des données, la",
      complaintLink: "CNIL",
    },
  },

  legalNotice: {
    title: "Mentions légales",
    description: "Qui édite et héberge awesome-alternatives.com.",
    eyebrow: "Légal",
    heading: "Mentions légales",
    lede: "Publiées en application de l'article 6 III de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN). Dernière mise à jour le {lastUpdated}.",
    facts: {
      name: "Nom",
      address: "Adresse",
      email: "E-mail",
      phone: "Téléphone",
    },
    publisher: {
      heading: "Éditeur",
      body: "awesome-alternatives.com est édité par une personne physique, à titre non professionnel.",
    },
    publicationDirector: {
      heading: "Directeur de la publication",
      before: "L'éditeur,",
    },
    host: {
      heading: "Hébergeur",
    },
    content: {
      heading: "Contenu",
      licenceBefore: "Le catalogue est publié sous",
      dataLink: "CC0",
      licenceMiddle: "et le code sous",
      codeLink: "MIT",
      licenceAfter:
        ". Les chiffres des dépôts (étoiles, releases, licences, descriptions) proviennent de l'API publique GitHub, ainsi que le nom public et la description du compte auquel appartient chaque dépôt. Les noms de projets et les marques appartiennent à leurs titulaires.",
      reportBefore: "Pour signaler une erreur ou demander le retrait d'une entrée, ouvrez une issue sur",
      reportLink: "GitHub",
      reportAfter: "ou écrivez à",
    },
    personalData: {
      heading: "Données personnelles",
      before: "Ce que le site traite au sujet des visiteurs est décrit dans la",
      privacyLink: "politique de confidentialité",
    },
  },
};
