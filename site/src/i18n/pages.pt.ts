import type { Pages } from "./messages.ts";

export const pages: Pages = {
  about: {
    title: "Sobre: selos, tipos de substituição e a atualização noturna",
    description:
      "O que uma entrada do catálogo afirma, o que é lido do GitHub toda noite e a regra por trás de cada selo exibido em uma ferramenta.",
    eyebrow: "Sobre",
    heading: "O que o catálogo diz, e como ele sabe.",
    lede: "{toolCount} ferramentas de desenvolvimento, cada uma listada com o que substitui. O resto do que você vê em uma ferramenta vem do GitHub, não de quem a adicionou.",
    entries: {
      heading: "O que uma entrada afirma",
      fileBefore: "Cada ferramenta é um pequeno arquivo YAML em",
      fileAfter:
        ". Ele indica a ferramenta, seu repositório no GitHub, sua categoria, as ferramentas que ela substitui com um tipo de substituição para cada uma, e uma afiliação, quando houver. É tudo o que um contribuidor pode escrever.",
      schema:
        "Uma entrada nunca informa estrelas, licença, versão ou descrição. O schema rejeita esses campos, então um pull request não consegue inflar uma contagem de estrelas nem alegar uma release que não existe.",
    },
    refresh: {
      heading: "A atualização noturna",
      runBefore: "Toda noite, e sempre que os dados do catálogo mudam na branch main, o",
      runLink: "refresh",
      runAfter: "lê cada repositório listado pela API do GitHub:",
      reads: [
        "descrição, página inicial, linguagem, licença, estrelas, forks e topics",
        "se o repositório está arquivado, e a data do último push",
        "a última release, ou a última tag quando não há release, e se ela está assinada",
        "as cinco últimas releases publicadas, exibidas na página da ferramenta",
        "os autores dos commits na branch padrão nos últimos {days} dias, dos quais só a contagem é guardada",
        "os nomes dos arquivos anexados à última release, lidos para identificar os sistemas operacionais e as arquiteturas que eles citam",
      ],
      activity:
        "A página da ferramenta transforma esses dados em quão vivo um projeto está, nunca em uma nota. A idade é contada a partir do dia em que o repositório foi criado. O ritmo de releases é o intervalo mediano entre as últimas releases estáveis, exibido a partir de três. Contribuidores ativos são os autores de commits distintos na branch padrão nos últimos {days} dias: contas cujo nome termina em [bot] ficam de fora, e um commit não vinculado a nenhuma conta do GitHub conta pelo email, que nunca é publicado. Só os {commits} commits mais recentes são lidos, então um projeto mais movimentado mostra um limite inferior como 40+. Um fluxo com squash merge credita um autor por pull request, independentemente de quem mais tenha escrito junto, e para uma ferramenta que vive em um monorepo a contagem cobre o repositório inteiro, o que a página informa. As plataformas só aparecem quando os nomes dos arquivos da última release as citam, e nada é deduzido quando não citam, nem para uma ferramenta em um monorepo, cuja última release pode ser de outro pacote.",
      maintainerFileBefore: "o arquivo de mantenedor descrito em",
      maintainerFileLink: "verificado",
      releaseBefore: "Entre duas execuções noturnas, uma release publicada atualiza sua ferramenta em poucos minutos quando o repositório tem o",
      releaseApp: "GitHub App do awesome-alternatives",
      releaseMiddle: "instalado, ou executa",
      releaseAfter: "no seu workflow de release.",
      commit:
        "Quando algo muda, o refresh faz commit do novo catálogo e um novo build deste site é publicado. Se o GitHub deixa de retornar o repositório de uma ferramenta listada, porque ele foi excluído ou tornado privado, o refresh não publica nada e falha, para que uma pessoa verifique: uma ferramenta só sai do catálogo por um pull request que remove a entrada dela.",
      changesBefore:
        "Cada refresh também compara o novo catálogo com o anterior e registra o que mudou: uma licença, o nome de um repositório, um arquivamento, uma nova release, uma ferramenta que entra ou sai. A página",
      changesLink: "o que mudou",
      changesAfter:
        "lista essas mudanças por dia, com um feed RSS para o catálogo inteiro, um para cada ferramenta e um para cada categoria. Uma mudança nas estrelas nunca conta.",
    },
    marks: {
      heading: "Selos",
      signed: {
        term: "✓ assinada",
        body: "Ao lado da última versão. A tag tem uma assinatura que o GitHub verificou ou, no caso de uma tag leve, o commit para o qual ela aponta tem. Só a última release é verificada.",
      },
      verified: {
        term: "Verificado pelos mantenedores",
        fileBefore: "O próprio repositório da ferramenta tem um arquivo",
        fileAfter: "na raiz da branch padrão, com",
        slugAfter:
          "definido para esta entrada. Só alguém com acesso de escrita ao repositório pode adicioná-lo, então o selo indica que os mantenedores respaldam a entrada. O refresh lê o arquivo toda noite.",
        appBefore: "O selo também é aplicado quando o",
        appLink: "GitHub App do awesome-alternatives",
        appAfter: "está instalado no repositório, já que instalar um app nele exige permissão de administrador.",
        stale:
          "O arquivo data a verificação pelo seu último commit, e uma entrada editada depois dessa data mostra “editada desde a verificação” até que os mantenedores façam um novo commit no arquivo, para o que basta um comentário # com data.",
      },
      archived: {
        term: "arquivado",
        before:
          "O repositório está arquivado e não recebe mais alterações. Uma ferramenta arquivada é justamente o que as pessoas querem abandonar, então ela só é aceita como algo que outras entradas substituem, nunca como alternativa, e o aviso",
        inactiveLink: "sem push",
        after: "não se aplica a ela.",
      },
      licence: {
        term: "Other",
        before:
          "Exibido como licença quando o GitHub detecta uma, mas não consegue associá-la a um identificador SPDX. Quando o GitHub não detecta nenhuma, a ferramenta mostra",
        none: "Nenhuma detectada",
        middle: "e o aviso",
        noLicenceLink: "sem licença",
        after: "se aplica a ela.",
      },
    },
    fit: {
      heading: "Tipos de substituição",
      lede: "Cada substituição tem um, definido por quem adiciona a entrada.",
      dropIn:
        "Aceita a configuração ou a interface do original sem mudanças: você troca uma pela outra sem mexer no seu setup. Pedir um drop-in na pesquisa mantém só estas.",
      full: "Faz o mesmo trabalho, do seu próprio jeito. Conte com migrar a sua configuração.",
      partial: "Faz parte do trabalho. A nota abaixo da ferramenta diz qual parte.",
    },
    warnings: {
      heading: "Avisos",
      lede: "Um aviso nunca remove uma ferramenta. É algo que um mantenedor olha antes de fazer merge de um pull request, e algo que talvez você queira saber antes de depender da ferramenta.",
      moved:
        "O repositório agora está sob outro nome ou outro dono. O GitHub redireciona o endereço antigo, mas a entrada deveria ser atualizada.",
      noLicense: "O GitHub não detecta nenhuma licença, então os termos sob os quais você pode usar o código não estão claros.",
      noRelease: "O repositório não tem release nem tag, então não há versão para fixar.",
      inactive: "Nada foi enviado por push há mais de {inactiveDays} dias. Repositórios arquivados ficam de fora deste aviso.",
      starSpike:
        "Um dia que ganhou {spikeThreshold} estrelas ou mais, e pelo menos {spikeFactor} vezes o ritmo diário habitual da ferramenta no último mês, e pelo menos {spikeShare}% das estrelas que ela tinha no dia anterior, para que um bom dia comum de um projeto grande não conte. Estrelas compradas chegam em rajadas, e um lançamento no Hacker News também, por isso quem decide é uma pessoa. O GitHub não lista mais quem deu estrela em um repositório, então a atualização noturna guarda a contagem de estrelas de cada dia e compara os dias. Ela precisa de uma semana desse histórico antes de julgar, ou seja, uma ferramenta só é verificada depois de listada.",
      blockingBefore:
        "Alguns problemas bloqueiam o pull request: um repositório privado, um fork, arquivado mas oferecido como alternativa, com menos de {minAgeDays} dias, ou já listado sob outro slug.",
      contributeLink: "O guia de contribuição",
      blockingAfter: "lista todas as verificações.",
    },
    affiliation: {
      heading: "Afiliação",
      body: "Quem mantém uma ferramenta, trabalha nela ou é pago por ela precisa declarar isso na entrada. Listar o seu próprio projeto é bem-vindo, não declarar é motivo para remoção. Quando uma entrada tem uma afiliação, a página da ferramenta a mostra como foi escrita.",
    },
    search: {
      heading: "Como a pesquisa funciona",
      before:
        'Sua pesquisa é lida primeiro como palavras-chave: os nomes das ferramentas que outras substituem, as linguagens e licenças do catálogo, e "drop in". Quando nenhuma ferramenta a substituir é citada, um pequeno modelo de embedding multilíngue que roda no servidor de pesquisa compara a pesquisa com a descrição de cada ferramenta, então uma pesquisa escrita em qualquer idioma do site encontra as mesmas ferramentas que a versão em inglês, mesmo que as descrições continuem em inglês, do jeito que o GitHub as retorna. Se uma ferramenta a substituir se destaca claramente, ela é escolhida; caso contrário, os resultados são ordenados pela proximidade com a pesquisa. Só quando nenhuma das duas etapas encontra uma ferramenta a substituir, e o servidor tem uma chave para isso, o texto da pesquisa é enviado ao Jev, um serviço externo, para que ele o interprete. Essa interpretação fica em cache no servidor por um dia. Os resultados dizem quem leu a sua pesquisa: "Reconhecido localmente" ou "Lido pelo Jev".',
      qualifiers:
        'Algumas palavras viram filtros, em todos os idiomas do site. "Open source" ou "código aberto" mantém as ferramentas cuja licença é aberta. "Mantido" descarta as ferramentas arquivadas e as sem push há {inactiveDays} dias. "Auto-hospedado" mantém as ferramentas de categorias de serviços que você mesmo roda. Uma plataforma ou uma forma de deploy, como Linux ou Docker, é reconhecida mas ainda não verificada, e os resultados dizem isso em vez de fingir.',
      privacyLink: "A página de privacidade",
      after: "diz o que é enviado e o que é guardado.",
    },
    agents: {
      heading: "A partir de um agente de IA",
      body: "O catálogo também é um servidor Model Context Protocol (MCP) em {url}, via Streamable HTTP, sem chave e sem conta. Um agente pode encontrar alternativas a uma ferramenta ou a um produto, listar ferramentas por categoria, linguagem ou licença, e ler os dados de uma ferramenta. A ferramenta de pesquisa dele lê as pesquisas só com palavras-chave e o modelo deste servidor, nunca com o Jev, e tem um limite por endereço; as outras ferramentas não têm.",
      setup: "Para adicioná-lo ao Claude Code:",
    },
    licences: {
      heading: "Licenças",
      dataBefore: "Os dados do catálogo são dedicados ao domínio público sob",
      dataLink: "CC0 1.0",
      codeBefore: ". O código do site, da API e dos scripts está sob a",
      codeLink: "licença MIT",
    },
  },

  privacy: {
    title: "Política de privacidade",
    description: "O que o awesome-alternatives.com trata sobre seus visitantes, e por quê.",
    eyebrow: "Jurídico",
    heading: "Política de privacidade",
    lede: 'O site não define cookies, não armazena nada no seu navegador, não executa nenhuma ferramenta de analytics e não carrega scripts nem fontes de terceiros. Cada página, script e fonte vem de awesome-alternatives.com; a única exceção são as imagens dentro do README de um projeto, descritas em "Detalhes do repositório". Não há nada a consentir, então não há banner de consentimento. Se isso um dia mudar, esta página e um mecanismo de consentimento mudam primeiro. Última atualização em {lastUpdated}.',
    legitimateInterest: "Legítimo interesse (GDPR, art. 6(1)(f))",
    facts: {
      data: "Dados",
      purpose: "Finalidade",
      legalBasis: "Base legal",
      retention: "Retenção",
      recipient: "Destinatário",
      where: "Onde",
      terms: "Termos dele",
      proxyAndRetention: "Proxy e retenção",
    },
    controller: {
      heading: "Controlador",
      before: "O controlador é o editor indicado no",
      legalNoticeLink: "aviso legal",
      beforeEmail: ", que pode ser contatado em",
    },
    siteAccessLog: {
      heading: "Log de acesso do servidor web",
      body: "O servidor nginx que entrega as páginas grava uma linha por requisição no seu log de acesso padrão, que vai para a saída do contêiner.",
      dataBefore: "Endereço IP, data e hora, endereço solicitado (incluindo uma pesquisa digitada na barra de endereço como",
      dataAfter: "), status e tamanho da resposta, página de origem, user agent do navegador, cabeçalho forwarded-for",
      purpose: "Operar o site, diagnosticar erros, detectar e impedir abusos",
    },
    reverseProxyLog: {
      heading: "Log de acesso do proxy reverso",
      body: "As requisições ao site e à sua API de pesquisa passam por um proxy reverso no provedor de hospedagem, que mantém o seu próprio log de acesso com o mesmo tipo de dados.",
      purpose: "Rotear requisições, diagnosticar erros, detectar e impedir abusos",
    },
    rateLimiting: {
      heading: "Limite de pesquisas",
      body: "Para manter a pesquisa utilizável para todos, a API permite um número fixo de pesquisas por minuto a partir de cada endereço IP. A própria API não grava nenhum log de requisições.",
      data: "Endereço IP e um contador de pesquisas recentes, mantidos apenas em memória",
      purpose: "Impedir que um cliente esgote a pesquisa",
      retention:
        "Removidos na próxima limpeza de hora em hora, assim que não contam mais para o limite, e a cada reinicialização. Nunca gravados em disco.",
    },
    queries: {
      heading: "Pesquisas",
      before:
        "O que você digita na caixa de pesquisa é enviado à API, que primeiro o interpreta com um modelo que roda no próprio servidor. Quando isso não encontra nenhuma ferramenta a substituir, o texto da pesquisa, e nada mais (nenhum endereço IP, nenhum identificador), é enviado ao Jev em",
      after:
        ", um serviço de modelo de linguagem que o transforma em filtros. Evite digitar informações pessoais na caixa de pesquisa.",
      data: "O texto da pesquisa",
      purpose: "Responder à pesquisa que você fez",
      retention:
        "As pesquisas interpretadas pelo Jev ficam em cache na memória da API junto com o resultado, sem nenhum vínculo com quem as enviou, por no máximo 24 horas. O cache também é esvaziado toda vez que o catálogo é atualizado, de hora em hora, e a cada reinicialização. Nunca gravado em disco.",
      addressBefore: "A pesquisa também coloca a sua consulta no endereço da página",
      addressAfter:
        ") para que os resultados possam ser compartilhados. Ela fica no histórico do seu navegador e chega aos logs de acesso acima quando esse endereço é carregado.",
    },
    repositoryDetails: {
      heading: "Detalhes do repositório",
      fetch: "A própria API busca o README de cada projeto listado no GitHub e o relatório de segurança dele no OpenSSF Scorecard, de servidor para servidor, e os guarda por 12 horas. Essas requisições levam apenas o nome do repositório, nada sobre você.",
      imagesBefore:
        "Uma página de ferramenta abre com o README desse projeto. As imagens e os badges dele são carregados pelo seu navegador de onde o projeto os hospeda: GitHub",
      imagesAfter:
        "e, em alguns READMEs, serviços de badges como shields.io. Esses hosts recebem o seu endereço IP e os detalhes do seu navegador como em qualquer requisição de imagem, e as políticas deles se aplicam. Nenhuma outra página carrega nada deles.",
    },
    recipients: {
      heading: "Quem recebe os dados",
      before: "O editor, o provedor de hospedagem indicado no",
      legalNoticeLink: "aviso legal",
      after:
        "por operar os servidores e, apenas para as pesquisas, o operador do Jev. Nada é vendido nem compartilhado para publicidade. Os links para o GitHub e para os projetos listados são links simples: depois que você segue um, a política daquele site se aplica.",
    },
    rights: {
      heading: "Seus direitos",
      before:
        "Pelo GDPR, você pode pedir acesso, correção ou exclusão dos dados sobre você, pedir a limitação do tratamento, e pode se opor a um tratamento baseado em legítimo interesse. Escreva para",
      after:
        ". Os logs não estão vinculados a um nome, então informe o endereço IP e o horário aproximado da sua visita para que as entradas correspondentes possam ser encontradas.",
      complaintBefore:
        "Se você acha que os seus dados estão sendo tratados de forma inadequada, pode apresentar uma reclamação à autoridade francesa de proteção de dados, a",
      complaintLink: "CNIL",
    },
  },

  legalNotice: {
    title: "Aviso legal",
    description: "Quem publica e hospeda o awesome-alternatives.com.",
    eyebrow: "Jurídico",
    heading: "Aviso legal",
    lede: "Publicado nos termos do artigo 6 III da lei francesa n° 2004-575, de 21 de junho de 2004, para a confiança na economia digital (LCEN). Última atualização em {lastUpdated}.",
    facts: {
      name: "Nome",
      address: "Endereço",
      email: "Email",
      phone: "Telefone",
    },
    publisher: {
      heading: "Editor",
      body: "awesome-alternatives.com é publicado por uma pessoa física, em caráter não profissional.",
    },
    publicationDirector: {
      heading: "Diretor de publicação",
      before: "O editor,",
    },
    host: {
      heading: "Hospedagem",
    },
    content: {
      heading: "Conteúdo",
      licenceBefore: "O catálogo é publicado sob",
      dataLink: "CC0",
      licenceMiddle: "e o código sob",
      codeLink: "MIT",
      licenceAfter:
        ". Os dados dos repositórios (estrelas, releases, licenças, descrições) vêm da API pública do GitHub, assim como o nome público e a descrição da conta a que cada repositório pertence. Os nomes de projetos e as marcas pertencem aos seus titulares.",
      reportBefore: "Para relatar um erro ou pedir a remoção de uma entrada, abra uma issue no",
      reportLink: "GitHub",
      reportAfter: "ou escreva para",
    },
    personalData: {
      heading: "Dados pessoais",
      before: "O que o site trata sobre os visitantes está descrito na",
      privacyLink: "política de privacidade",
    },
  },
  contact: {
    title: "Contato",
    description: "Como falar com as pessoas por trás do awesome-alternatives.com, e para onde cada tipo de pedido vai mais rápido.",
    eyebrow: "Contato",
    heading: "Fale com a gente",
    lede: "O catálogo é mantido de forma aberta no GitHub, então a maioria dos pedidos anda mais rápido lá. Para qualquer outra coisa, use o formulário no fim desta página ou escreva para",
    catalog: {
      heading: "Sugerir uma ferramenta ou corrigir uma entrada",
      before: "Abra um",
      pullRequest: "pull request",
      between: " ou ",
      suggest: "sugira uma ferramenta",
      after: " em uma issue. O ",
      guide: "guia de contribuição",
      end: " explica do que uma entrada precisa.",
    },
    maintainer: {
      heading: "Você mantém uma ferramenta listada",
      before: "Você pode ter a sua entrada marcada como",
      verifiedLink: "verificada pelos mantenedores",
      after: ". Para corrigi-la ou removê-la, ",
      issueLink: "abra uma issue",
    },
    security: {
      heading: "Relatar um problema de segurança",
      before: "Por favor, não abra uma issue pública. Siga a",
      policyLink: "política de segurança",
      after: " para relatá-lo em particular.",
    },
    privacy: {
      heading: "Dados pessoais",
      before: "O que este site guarda está descrito na",
      privacyLink: "política de privacidade",
      after: ". Para exercer os seus direitos, escreva para",
    },
    other: {
      heading: "Qualquer outra coisa",
      before: "Envie uma mensagem aqui, ou escreva para",
      after: ". Uma pessoa lê cada mensagem e responde por email.",
    },
    form: {
      kind: "Do que se trata?",
      kinds: {
        question: "Uma pergunta",
        bug: "Algo está quebrado",
        security: "Um problema de segurança",
        privacy: "Meus dados pessoais",
        other: "Outra coisa",
      },
      email: "Seu email",
      name: "Seu nome",
      optional: "opcional",
      subject: "Assunto",
      message: "Mensagem",
      honeypot: "Deixe este campo vazio",
      submit: "Enviar",
      sentTitle: "Mensagem enviada",
      sentBody: "Uma pessoa vai responder no endereço que você informou. Uma cópia está a caminho da sua caixa de entrada.",
      reference: "Referência",
      incomplete: "Preencha seu email, um assunto e uma mensagem.",
      invalid: "Confira seu endereço de email, e se o assunto e a mensagem não estão longos demais.",
      tooMany: "Muitas mensagens daqui em pouco tempo. Tente de novo em alguns minutos.",
      failed: "Não foi possível enviar a mensagem. Tente de novo, ou escreva para contact@ferrlabs.com.",
    },
  },
};
