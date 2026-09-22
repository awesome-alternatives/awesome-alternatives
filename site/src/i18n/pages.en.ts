export const pages = {
  about: {
    title: "About: marks, fit levels and the nightly refresh",
    description:
      "What an entry in the catalog states, what is read from GitHub every night, and the rule behind every mark shown on a tool.",
    eyebrow: "About",
    heading: "What the catalog says, and how it knows.",
    lede: "{toolCount} developer tools, each listed with what it replaces. The rest of what you see on a tool comes from GitHub, not from whoever added it.",
    entries: {
      heading: "What an entry states",
      fileBefore: "Every tool is a small YAML file under",
      fileAfter:
        ". It names the tool, its GitHub repository, its category, the tools it replaces with a fit level for each, and an affiliation when there is one. That is all a contributor can write.",
      schema:
        "An entry never states stars, a licence, a version or a description. The schema rejects them, so a pull request cannot inflate a star count or claim a release that does not exist.",
    },
    refresh: {
      heading: "The nightly refresh",
      workflowBefore: "Every day at {refreshedAt}, and whenever the catalog data changes on the main branch, a",
      workflowLink: "GitHub Actions workflow",
      workflowAfter: "reads every listed repository from the GitHub API:",
      reads: [
        "description, homepage, language, licence, stars, forks and topics",
        "whether the repository is archived, and the date of its last push",
        "the latest release, or the latest tag when there is no release, and whether it is signed",
        "the last five published releases, shown on the tool page",
      ],
      maintainerFileBefore: "the maintainer file described under",
      maintainerFileLink: "verified",
      commit:
        "When anything changed, the workflow commits the new catalog and a new build of this site goes out. A tool whose repository GitHub no longer returns, because it was deleted or made private, is left out of the catalog.",
    },
    marks: {
      heading: "Marks",
      signed: {
        term: "✓ signed",
        body: "Next to the latest version. The tag carries a signature GitHub verified, or, for a lightweight tag, the commit it points at does. Only the latest release is checked.",
      },
      verified: {
        term: "Verified by its maintainers",
        fileBefore: "The tool's own repository has an",
        fileAfter: "file at the root of its default branch, with",
        slugAfter:
          "set to this entry. Only someone with write access to the repository can add it, so the mark says its maintainers stand behind the entry. The refresh reads the file every night.",
      },
      archived: {
        term: "archived",
        before:
          "The repository is archived and gets no more changes. An archived tool is exactly what people look to move off, so it is accepted only as something other entries replace, never as an alternative, and it does not get the",
        inactiveLink: "no push",
        after: "warning.",
      },
      licence: {
        term: "Other",
        before:
          "Shown as the licence when GitHub detects one but cannot map it to an SPDX identifier. When GitHub detects none, the tool reads",
        none: "None detected",
        middle: "and gets the",
        noLicenceLink: "no licence",
        after: "warning.",
      },
    },
    fit: {
      heading: "Fit levels",
      lede: "Each replacement carries one, set by whoever adds the entry.",
      dropIn:
        "Accepts the original's configuration or interface unchanged: you swap it in without touching your setup. Asking for a drop-in in the search keeps only these.",
      full: "Covers the same job, in its own way. Expect to migrate your configuration.",
      partial: "Covers part of the job. The note under the tool says which part.",
    },
    warnings: {
      heading: "Warnings",
      lede: "A warning never removes a tool. It is something a maintainer looks at before merging a pull request, and something you may want to know before you depend on the tool.",
      moved:
        "The repository now lives under another name or owner. GitHub redirects the old address, but the entry should be updated.",
      noLicense: "GitHub detects no licence, so the terms under which you can use the code are unclear.",
      noRelease: "The repository has neither a release nor a tag, so there is no version to pin.",
      inactive: "Nothing was pushed for more than {inactiveDays} days. Archived repositories are left out of this one.",
      starSpike:
        "{spikeThreshold} or more of the most recent stars arrived within {spikeHours} hours. Bought stars arrive in bursts, and so does a launch on Hacker News, which is why a person decides. This check runs when a pull request adds or edits the entry, not during the nightly refresh. GitHub refuses to page deep into the stargazers of the largest repositories, and for those the check is skipped rather than guessed.",
      blockingBefore:
        "Some problems block a pull request instead: a repository that is private, a fork, archived but offered as an alternative, younger than {minAgeDays} days, or already listed under another slug.",
      contributeLink: "The contributor guide",
      blockingAfter: "lists every check.",
    },
    affiliation: {
      heading: "Affiliation",
      body: "Whoever maintains, works on or is paid by a tool has to say so in its entry. Listing your own project is welcome, not saying so is grounds for removal. When an entry has an affiliation, the tool page shows it as written.",
    },
    search: {
      heading: "How search works",
      before:
        'Your query is first read as keywords: the names of tools that others replace, the languages and licences in the catalog, and "drop in". When no tool to replace is named, a small embedding model running on the search server compares the query with every tool\'s description. If one tool to replace clearly stands out, it is picked; otherwise the results are ranked by how close they are to the query. Only when neither step finds a tool to replace, and the server has a key for it, is the text of the query sent to Jev, an external service, to read it. Its reading is cached on the server for a day. The results say which one read your query: "Matched locally" or "Read by Jev".',
      privacyLink: "The privacy page",
      after: "says what is sent and what is kept.",
    },
    licences: {
      heading: "Licences",
      dataBefore: "The catalog data is dedicated to the public domain under",
      dataLink: "CC0 1.0",
      codeBefore: ". The code of the site, the API and the scripts is under the",
      codeLink: "MIT licence",
    },
  },

  privacy: {
    title: "Privacy policy",
    description: "What awesome-alternatives.com processes about its visitors, and why.",
    eyebrow: "Legal",
    heading: "Privacy policy",
    lede: 'The site sets no cookies, stores nothing in your browser, runs no analytics and loads no third-party scripts or fonts. Every page, script and font comes from awesome-alternatives.com; the one exception is the images inside a project\'s README, described under "Repository details". There is nothing to consent to, so there is no consent banner. If that ever changes, this page and a consent mechanism change first. Last updated {lastUpdated}.',
    legitimateInterest: "Legitimate interest (GDPR art. 6(1)(f))",
    facts: {
      data: "Data",
      purpose: "Purpose",
      legalBasis: "Legal basis",
      retention: "Retention",
      recipient: "Recipient",
      where: "Where",
      terms: "Its terms",
      proxyAndRetention: "Proxy and retention",
    },
    controller: {
      heading: "Controller",
      before: "The controller is the publisher named in the",
      legalNoticeLink: "legal notice",
      beforeEmail: ", reachable at",
    },
    siteAccessLog: {
      heading: "Web server access log",
      body: "The nginx server that delivers the pages writes one line per request to its standard access log, which goes to the container output.",
      dataBefore: "IP address, date and time, requested address (including a search typed in the address bar as",
      dataAfter: "), response status and size, referring page, browser user agent, forwarded-for header",
      purpose: "Running the site, diagnosing errors, detecting and stopping abuse",
    },
    reverseProxyLog: {
      heading: "Reverse proxy access log",
      body: "Requests to the site and to its search API pass through a reverse proxy at the host, which keeps its own access log with the same kind of data.",
      purpose: "Routing requests, diagnosing errors, detecting and stopping abuse",
    },
    rateLimiting: {
      heading: "Search rate limiting",
      body: "To keep the search usable for everyone, the API allows a fixed number of searches per minute from each IP address. The API itself writes no request log.",
      data: "IP address and a counter of recent searches, held in memory only",
      purpose: "Preventing one client from exhausting the search",
      retention:
        "Removed at the next hourly cleanup once it no longer counts toward the limit, and at every restart. Never written to disk.",
    },
    queries: {
      heading: "Search queries",
      before:
        "What you type in the search box is sent to the API, which first interprets it with a model running on its own server. When that finds no tool to replace, the text of the query, and nothing else (no IP address, no identifier), is sent to Jev at",
      after:
        ", a language model service that turns it into filters. Avoid typing personal information in the search box.",
      data: "The query text",
      purpose: "Answering the search you asked for",
      retention:
        "Queries interpreted by Jev are cached in the API's memory with their result, without any link to who sent them, for at most 24 hours. The cache is also emptied every time the catalog is refreshed, hourly, and at every restart. Never written to disk.",
      addressBefore: "The search also puts your query in the page address",
      addressAfter:
        ") so the results can be shared. It stays in your browser history, and reaches the access logs above when that address is loaded.",
    },
    repositoryDetails: {
      heading: "Repository details",
      fetch: "The API fetches each listed project's README from GitHub and its security report from OpenSSF Scorecard itself, server to server, and keeps them for 12 hours. Those requests carry only the repository name, nothing about you.",
      imagesBefore:
        "A tool page opens on that project's README. Its images and badges are loaded by your browser from where the project hosts them: GitHub",
      imagesAfter:
        "and, for some READMEs, badge services such as shields.io. Those hosts receive your IP address and browser details like any image request, and their own policies apply. No other page loads anything from them.",
    },
    recipients: {
      heading: "Who receives the data",
      before: "The publisher, the host listed in the",
      legalNoticeLink: "legal notice",
      after:
        "as it runs the servers, and, for search queries only, the operator of Jev. Nothing is sold or shared for advertising. Links to GitHub and to the listed projects are plain links: once you follow one, that site's own policy applies.",
    },
    rights: {
      heading: "Your rights",
      before:
        "Under the GDPR you can ask to access, correct or erase data about you, to restrict its processing, and you can object to processing based on legitimate interest. Write to",
      after:
        ". The logs are not tied to a name, so give the IP address and the approximate time of your visit so the matching entries can be found.",
      complaintBefore:
        "If you think your data is mishandled, you can complain to the French data protection authority, the",
      complaintLink: "CNIL",
    },
  },

  legalNotice: {
    title: "Legal notice",
    description: "Who publishes and hosts awesome-alternatives.com.",
    eyebrow: "Legal",
    heading: "Legal notice",
    lede: "Published under article 6 III of the French law n° 2004-575 of 21 June 2004 on confidence in the digital economy (LCEN). Last updated {lastUpdated}.",
    facts: {
      name: "Name",
      address: "Address",
      email: "Email",
      phone: "Phone",
    },
    publisher: {
      heading: "Publisher",
      body: "awesome-alternatives.com is published by a private individual, on a non-professional basis.",
    },
    publicationDirector: {
      heading: "Publication director",
      before: "The publisher,",
    },
    host: {
      heading: "Host",
    },
    content: {
      heading: "Content",
      licenceBefore: "The catalog is released under",
      dataLink: "CC0",
      licenceMiddle: "and the code under",
      codeLink: "MIT",
      licenceAfter:
        ". Repository figures (stars, releases, licences, descriptions) come from the public GitHub API, along with the public name and description of the account each repository belongs to. Project names and trademarks belong to their owners.",
      reportBefore: "To report an error or ask for an entry to be removed, open an issue on",
      reportLink: "GitHub",
      reportAfter: "or write to",
    },
    personalData: {
      heading: "Personal data",
      before: "What the site processes about visitors is described in the",
      privacyLink: "privacy policy",
    },
  },
};
