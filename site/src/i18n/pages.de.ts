import type { Pages } from "./messages.ts";

export const pages: Pages = {
  about: {
    title: "Über den Katalog: Kennzeichen, Ersatzgrade und der nächtliche Abgleich",
    description:
      "Was ein Eintrag im Katalog angibt, was jede Nacht von GitHub gelesen wird und welche Regel hinter jedem Kennzeichen an einem Tool steht.",
    eyebrow: "Über den Katalog",
    heading: "Was der Katalog sagt, und woher er es weiß.",
    lede: "{toolCount} Entwickler-Tools, jedes mit der Angabe, was es ersetzt. Alles Übrige, was an einem Tool steht, kommt von GitHub und nicht von der Person, die es eingetragen hat.",
    entries: {
      heading: "Was ein Eintrag angibt",
      fileBefore: "Jedes Tool ist eine kleine YAML-Datei unter",
      fileAfter:
        ". Sie nennt das Tool, sein GitHub-Repository, seine Kategorie, die Tools, die es ersetzt, mit einem Ersatzgrad je Tool, und eine Verbindung, wenn es eine gibt. Mehr lässt sich in einem Beitrag nicht angeben.",
      schema:
        "Ein Eintrag nennt nie Sterne, eine Lizenz, eine Version oder eine Beschreibung. Das Schema lehnt sie ab, damit ein Pull Request keine Sternzahl aufblähen und kein Release behaupten kann, das es nicht gibt.",
    },
    refresh: {
      heading: "Der nächtliche Abgleich",
      runBefore:
        "Jede Nacht, und immer wenn sich die Katalogdaten auf dem main-Branch ändern, liest der",
      runLink: "Refresh",
      runAfter: "jedes gelistete Repository über die GitHub-API aus:",
      reads: [
        "Beschreibung, Homepage, Sprache, Lizenz, Sterne, Forks und Topics",
        "ob das Repository archiviert ist, und das Datum seines letzten Push",
        "das neueste Release, oder den neuesten Tag, wenn es kein Release gibt, und ob es signiert ist",
        "die letzten fünf veröffentlichten Releases, die auf der Tool-Seite stehen",
      ],
      maintainerFileBefore: "die Maintainer-Datei, beschrieben unter",
      maintainerFileLink: "Von den Maintainern bestätigt",
      releaseBefore: "Zwischen zwei nächtlichen Läufen aktualisiert ein veröffentlichtes Release sein Tool innerhalb weniger Minuten, wenn im Repository",
      releaseApp: "die GitHub App awesome-alternatives",
      releaseMiddle: "installiert ist oder der Release-Workflow",
      releaseAfter: "ausführt.",
      commit:
        "Wenn sich etwas geändert hat, committet der Refresh den neuen Katalog und ein neuer Build dieser Seite geht raus. Gibt GitHub das Repository eines gelisteten Tools nicht mehr zurück, weil es gelöscht oder auf privat gestellt wurde, veröffentlicht der Abgleich nichts und schlägt fehl, damit ein Mensch nachsieht: Ein Tool verlässt den Katalog nur über einen Pull Request, der seinen Eintrag entfernt.",
      changesBefore:
        "Jeder Refresh vergleicht außerdem den neuen Katalog mit dem vorherigen und hält fest, was sich geändert hat: eine Lizenz, ein Repository-Name, eine Archivierung, ein neues Release, ein Tool, das dazukommt oder geht. Die Seite",
      changesLink: "Was sich geändert hat",
      changesAfter:
        "listet das nach Tagen, mit einem RSS-Feed für den ganzen Katalog, einem pro Tool und einem pro Kategorie. Eine Änderung der Sterne zählt nie.",
    },
    marks: {
      heading: "Kennzeichen",
      signed: {
        term: "✓ signiert",
        body: "Steht neben der neuesten Version. Der Tag trägt eine Signatur, die GitHub geprüft hat, oder bei einem Lightweight-Tag der Commit, auf den er zeigt. Geprüft wird nur das neueste Release.",
      },
      verified: {
        term: "Von den Maintainern bestätigt",
        fileBefore: "Das Repository des Tools selbst trägt im Wurzelverzeichnis seines Standard-Branch die Datei",
        fileAfter: "mit dem Feld",
        slugAfter:
          "auf diesen Eintrag gesetzt. Nur wer Schreibrechte auf das Repository hat, kann sie anlegen, also sagt das Kennzeichen, dass die Maintainer hinter dem Eintrag stehen. Der Abgleich liest die Datei jede Nacht.",
        appBefore: "Das Kennzeichen wird auch gesetzt, wenn",
        appLink: "die GitHub App awesome-alternatives",
        appAfter: "im Repository installiert ist, denn dafür braucht es Adminrechte.",
      },
      archived: {
        term: "archiviert",
        before:
          "Das Repository ist archiviert und bekommt keine Änderungen mehr. Ein archiviertes Tool ist genau das, wovon Leute wegwollen, deshalb wird es nur als etwas aufgenommen, das andere Einträge ersetzen, nie als Alternative, und es löst die Warnung",
        inactiveLink: "seit einem Jahr kein Push",
        after: "nicht aus.",
      },
      licence: {
        term: "Other",
        before:
          "Steht als Lizenz, wenn GitHub eine erkennt, sie aber keinem SPDX-Bezeichner zuordnen kann. Erkennt GitHub keine, steht am Tool",
        none: "Keine erkannt",
        middle: "und es löst die Warnung",
        noLicenceLink: "keine Lizenz erkannt",
        after: "aus.",
      },
    },
    fit: {
      heading: "Ersatzgrade",
      lede: "Jeder Ersatz trägt genau einen, vergeben von der Person, die den Eintrag anlegt.",
      dropIn:
        "Übernimmt Konfiguration oder Schnittstelle des Originals unverändert: das Tool lässt sich austauschen, ohne am Setup etwas zu ändern. Wer in der Suche nach einem Drop-in fragt, bekommt nur diese.",
      full: "Erledigt dieselbe Aufgabe, auf eigene Weise. Die Konfiguration muss migriert werden.",
      partial: "Erledigt einen Teil der Aufgabe. Die Notiz unter dem Tool sagt, welchen.",
    },
    warnings: {
      heading: "Warnungen",
      lede: "Eine Warnung entfernt nie ein Tool. Sie ist etwas, das ein Maintainer vor dem Merge eines Pull Requests ansieht, und etwas, das man wissen will, bevor man sich auf das Tool verlässt.",
      moved:
        "Das Repository liegt jetzt unter einem anderen Namen oder Besitzer. GitHub leitet die alte Adresse weiter, der Eintrag sollte trotzdem aktualisiert werden.",
      noLicense: "GitHub erkennt keine Lizenz, damit ist unklar, unter welchen Bedingungen sich der Code nutzen lässt.",
      noRelease: "Das Repository hat weder ein Release noch einen Tag, es gibt also keine Version zum Pinnen.",
      inactive: "Seit mehr als {inactiveDays} Tagen wurde nichts gepusht. Archivierte Repositories sind hiervon ausgenommen.",
      starSpike:
        "Ein Tag, der {spikeThreshold} oder mehr Sterne brachte und mindestens das {spikeFactor}-Fache des üblichen täglichen Tempos des Tools im letzten Monat. Gekaufte Sterne treffen schubweise ein, ein Launch auf Hacker News aber auch, deshalb entscheidet hier ein Mensch. GitHub zeigt nicht mehr an, wer ein Repository mit einem Stern markiert hat, also speichert der nächtliche Abgleich die Sternzahl jedes Tages und vergleicht die Tage. Er braucht eine Woche dieser Historie, bevor er urteilt, ein Tool wird also erst geprüft, wenn es gelistet ist.",
      blockingBefore:
        "Andere Probleme blockieren stattdessen den Pull Request: ein Repository, das privat ist, ein Fork, archiviert und trotzdem als Alternative angeboten, jünger als {minAgeDays} Tage oder bereits unter einem anderen Slug gelistet.",
      contributeLink: "Der Leitfaden für Beiträge",
      blockingAfter: "listet jede Prüfung auf.",
    },
    affiliation: {
      heading: "Verbindung zum Tool",
      body: "Wer ein Tool pflegt, daran arbeitet oder dafür bezahlt wird, muss das im Eintrag angeben. Das eigene Projekt einzutragen ist willkommen, es zu verschweigen ist ein Grund für die Entfernung. Hat ein Eintrag eine Verbindung, zeigt die Tool-Seite sie im Wortlaut.",
    },
    search: {
      heading: "Wie die Suche funktioniert",
      before:
        "Die Anfrage wird zuerst als Stichwörter gelesen: die Namen der Tools, die andere ersetzen, die Sprachen und Lizenzen im Katalog und „drop in“. Wird kein zu ersetzendes Tool genannt, vergleicht ein kleines mehrsprachiges Embedding-Modell auf dem Suchserver die Anfrage mit der Beschreibung jedes Tools, sodass eine Anfrage in jeder Sprache der Website dieselben Tools findet wie ihre englische Fassung, obwohl die Beschreibungen selbst auf Englisch bleiben, so wie GitHub sie liefert. Sticht ein zu ersetzendes Tool klar heraus, wird es genommen, sonst werden die Ergebnisse danach sortiert, wie nah sie an der Anfrage liegen. Erst wenn beide Schritte kein zu ersetzendes Tool finden und der Server einen Schlüssel dafür hat, geht der Text der Anfrage an Jev, einen externen Dienst, der ihn liest. Dessen Lesart bleibt einen Tag lang auf dem Server zwischengespeichert. Die Ergebnisse nennen, wer die Anfrage gelesen hat: „Lokal erkannt“ oder „Von Jev gelesen“.",
      qualifiers:
        "Manche Wörter werden zu Filtern, in jeder Sprache der Seite. „Open Source“ behält Tools mit offener Lizenz. „Gepflegt“ lässt archivierte Tools weg und solche ohne Push seit {inactiveDays} Tagen. „Selbst gehostet“ behält Tools aus Kategorien von Diensten, die du selbst betreibst. Eine Plattform oder eine Art zu deployen, etwa Linux oder Docker, wird erkannt, aber noch nicht geprüft, und die Ergebnisse sagen das, statt so zu tun als ob.",
      privacyLink: "Die Datenschutzerklärung",
      after: "sagt, was gesendet und was aufbewahrt wird.",
    },
    licences: {
      heading: "Lizenzen",
      dataBefore: "Die Katalogdaten stehen gemeinfrei unter",
      dataLink: "CC0 1.0",
      codeBefore: ". Der Code der Seite, der API und der Skripte steht unter der",
      codeLink: "MIT-Lizenz",
    },
  },

  privacy: {
    title: "Datenschutzerklärung",
    description: "Was awesome-alternatives.com über seine Besucher verarbeitet, und warum.",
    eyebrow: "Rechtliches",
    heading: "Datenschutzerklärung",
    lede: "Die Seite setzt keine Cookies, speichert nichts im Browser, betreibt keine Analytics und lädt keine Skripte oder Schriften von Dritten. Jede Seite, jedes Skript und jede Schrift kommt von awesome-alternatives.com, die einzige Ausnahme sind die Bilder in der README eines Projekts, beschrieben unter „Repository-Details“. Es gibt nichts zuzustimmen, also auch kein Consent-Banner. Sollte sich das je ändern, ändern sich diese Seite und ein Consent-Mechanismus zuerst. Zuletzt aktualisiert am {lastUpdated}.",
    legitimateInterest: "Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO)",
    facts: {
      data: "Daten",
      purpose: "Zweck",
      legalBasis: "Rechtsgrundlage",
      retention: "Speicherdauer",
      recipient: "Empfänger",
      where: "Ort",
      terms: "Seine Bedingungen",
      proxyAndRetention: "Proxy und Speicherdauer",
    },
    controller: {
      heading: "Verantwortlicher",
      before: "Verantwortlicher ist der Herausgeber aus dem",
      legalNoticeLink: "Impressum",
      beforeEmail: ", erreichbar unter",
    },
    siteAccessLog: {
      heading: "Zugriffslog des Webservers",
      body: "Der nginx-Server, der die Seiten ausliefert, schreibt pro Anfrage eine Zeile in sein Standard-Zugriffslog, das in die Container-Ausgabe geht.",
      dataBefore: "IP-Adresse, Datum und Uhrzeit, angefragte Adresse (samt einer Suche, die in der Adresszeile steht, als",
      dataAfter:
        "), Status und Größe der Antwort, verweisende Seite, User-Agent des Browsers, Forwarded-For-Header",
      purpose: "Betrieb der Seite, Fehlersuche, Erkennen und Unterbinden von Missbrauch",
    },
    reverseProxyLog: {
      heading: "Zugriffslog des Reverse Proxy",
      body: "Anfragen an die Seite und an ihre Such-API laufen über einen Reverse Proxy beim Host, der ein eigenes Zugriffslog mit derselben Art von Daten führt.",
      purpose: "Weiterleiten von Anfragen, Fehlersuche, Erkennen und Unterbinden von Missbrauch",
    },
    rateLimiting: {
      heading: "Ratenbegrenzung der Suche",
      body: "Damit die Suche für alle nutzbar bleibt, erlaubt die API pro IP-Adresse eine feste Zahl von Suchanfragen pro Minute. Die API selbst schreibt kein Anfrageprotokoll.",
      data: "IP-Adresse und ein Zähler der jüngsten Suchanfragen, nur im Arbeitsspeicher gehalten",
      purpose: "Verhindern, dass ein einzelner Client die Suche auslastet",
      retention:
        "Wird bei der nächsten stündlichen Bereinigung entfernt, sobald es nicht mehr auf das Limit zählt, und bei jedem Neustart. Nie auf die Festplatte geschrieben.",
    },
    queries: {
      heading: "Suchanfragen",
      before:
        "Was im Suchfeld steht, geht an die API, die es zuerst mit einem Modell auf ihrem eigenen Server deutet. Findet das kein zu ersetzendes Tool, geht der Text der Anfrage, und sonst nichts (keine IP-Adresse, keine Kennung), an Jev unter",
      after: ", einen Sprachmodell-Dienst, der daraus Filter macht. Tippe keine personenbezogenen Daten ins Suchfeld.",
      data: "Der Text der Anfrage",
      purpose: "Beantworten der gestellten Suchanfrage",
      retention:
        "Von Jev gedeutete Anfragen liegen mit ihrem Ergebnis höchstens 24 Stunden im Arbeitsspeicher der API, ohne Bezug dazu, wer sie geschickt hat. Der Zwischenspeicher wird außerdem bei jeder stündlichen Aktualisierung des Katalogs und bei jedem Neustart geleert. Nie auf die Festplatte geschrieben.",
      addressBefore: "Die Suche schreibt die Anfrage außerdem in die Adresse der Seite",
      addressAfter:
        "), damit sich die Ergebnisse teilen lassen. Sie bleibt im Browserverlauf und landet in den oben genannten Zugriffslogs, sobald diese Adresse geladen wird.",
    },
    repositoryDetails: {
      heading: "Repository-Details",
      fetch: "Die API holt die README jedes gelisteten Projekts von GitHub und seinen Sicherheitsbericht von OpenSSF Scorecard selbst, Server zu Server, und behält beides 12 Stunden. Diese Anfragen tragen nur den Namen des Repositories, nichts über dich.",
      imagesBefore:
        "Eine Tool-Seite öffnet auf der README des Projekts. Deren Bilder und Badges lädt dein Browser von dort, wo das Projekt sie hostet: GitHub",
      imagesAfter:
        "und, bei manchen READMEs, Badge-Dienste wie shields.io. Diese Hosts erhalten deine IP-Adresse und Browserdaten wie bei jeder Bildanfrage, und es gelten ihre eigenen Richtlinien. Keine andere Seite lädt etwas von ihnen.",
    },
    recipients: {
      heading: "Wer die Daten erhält",
      before: "Der Herausgeber, der Host aus dem",
      legalNoticeLink: "Impressum",
      after:
        "als Betreiber der Server, und, nur bei Suchanfragen, der Betreiber von Jev. Nichts wird verkauft oder für Werbung weitergegeben. Links zu GitHub und zu den gelisteten Projekten sind einfache Links: wer einem folgt, unterliegt der Richtlinie der jeweiligen Seite.",
    },
    rights: {
      heading: "Deine Rechte",
      before:
        "Nach der DSGVO kannst du Auskunft über Daten zu dir verlangen, ihre Berichtigung oder Löschung und die Einschränkung der Verarbeitung, und du kannst der Verarbeitung auf Grundlage berechtigten Interesses widersprechen. Schreib an",
      after:
        ". Die Logs hängen an keinem Namen, gib also die IP-Adresse und den ungefähren Zeitpunkt deines Besuchs an, damit sich die passenden Einträge finden lassen.",
      complaintBefore:
        "Wer seine Daten falsch behandelt sieht, kann sich bei der französischen Datenschutzbehörde beschweren, der",
      complaintLink: "CNIL",
    },
  },

  legalNotice: {
    title: "Impressum",
    description: "Wer awesome-alternatives.com herausgibt und hostet.",
    eyebrow: "Rechtliches",
    heading: "Impressum",
    lede: "Veröffentlicht nach Artikel 6 III des französischen Gesetzes Nr. 2004-575 vom 21. Juni 2004 über das Vertrauen in die digitale Wirtschaft (LCEN). Zuletzt aktualisiert am {lastUpdated}.",
    facts: {
      name: "Name",
      address: "Anschrift",
      email: "E-Mail",
      phone: "Telefon",
    },
    publisher: {
      heading: "Herausgeber",
      body: "awesome-alternatives.com wird von einer Privatperson herausgegeben, nicht gewerblich.",
    },
    publicationDirector: {
      heading: "Verantwortlich für den Inhalt",
      before: "Der Herausgeber,",
    },
    host: {
      heading: "Hoster",
    },
    content: {
      heading: "Inhalte",
      licenceBefore: "Der Katalog steht unter",
      dataLink: "CC0",
      licenceMiddle: "und der Code unter",
      codeLink: "MIT",
      licenceAfter:
        ". Die Kennzahlen der Repositories (Sterne, Releases, Lizenzen, Beschreibungen) stammen aus der öffentlichen GitHub-API, ebenso der öffentliche Name und die Beschreibung des Kontos, zu dem ein Repository gehört. Projektnamen und Marken gehören ihren Inhabern.",
      reportBefore: "Um einen Fehler zu melden oder die Entfernung eines Eintrags zu beantragen, öffne ein Issue auf",
      reportLink: "GitHub",
      reportAfter: "oder schreib an",
    },
    personalData: {
      heading: "Personenbezogene Daten",
      before: "Was die Seite über Besucher verarbeitet, steht in der",
      privacyLink: "Datenschutzerklärung",
    },
  },
};
