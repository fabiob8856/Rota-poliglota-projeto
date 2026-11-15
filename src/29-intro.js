/* ---------- Texto explicativo antes das questões: toda unidade ganha um parágrafo "Sobre este tema" ---------- */
(function(){
  const LNAME = {en:"inglês", es:"espanhol", fr:"francês", ru:"russo", tr:"turco", ar:"árabe"};
  const TR = { // traços de cada idioma para temas recorrentes (explicados a quem fala português do Brasil)
    art:{en:"Em inglês só existem “the” (o, a, os, as) e “a/an” (um, uma): o artigo nunca muda de gênero nem de número.",
         es:"Em espanhol o artigo concorda com o substantivo: el/la (o/a), los/las (os/as), un/una (um/uma).",
         fr:"Em francês: le/la/les (o, a, os, as) e un/une (um, uma). Antes de vogal, le e la viram l’.",
         ru:"O russo não tem artigos: o contexto mostra se a coisa é conhecida ou não. Por isso você vai notar que as frases ficam “sem o, a”.",
         tr:"O turco não tem artigo definido (o, a). Para “um/uma” usa-se “bir” antes do substantivo.",
         ar:"O artigo definido é ال, colado no início da palavra (كتاب = livro, الكتاب = o livro). Para “um/uma” não se escreve nada."},
    gen:{en:"Em inglês os substantivos não têm gênero: “the book” serve para qualquer coisa.",
         es:"Em espanhol todo substantivo é masculino ou feminino; em geral -o é masculino e -a é feminino (há exceções, como “el día”).",
         fr:"Em francês todo substantivo é masculino ou feminino, e o artigo e o adjetivo concordam com ele (le livre, la table).",
         ru:"Em russo há três gêneros: masculino (termina em consoante), feminino (termina em -а/-я) e neutro (termina em -о/-е).",
         tr:"O turco não tem gênero gramatical: “o” serve para ele, ela e neutro.",
         ar:"Em árabe há masculino e feminino; a maioria dos femininos termina em ة (ta marbuta), como مدرسة (escola)."},
    pl:{en:"O plural em inglês quase sempre acrescenta -s (book → books); há irregulares como man → men.",
        es:"O plural em espanhol acrescenta -s (vogal final) ou -es (consoante final): libro → libros, ciudad → ciudades.",
        fr:"O plural em francês geralmente acrescenta -s, que não se pronuncia: livre → livres. Palavras em -al mudam para -aux.",
        ru:"O plural russo muda a terminação conforme o gênero (стол → столы, книга → книги). O caso da frase também altera o final.",
        tr:"O plural turco usa -ler ou -lar conforme a harmonia vocálica: ev → evler, kitap → kitaplar.",
        ar:"Em árabe há plural regular (-ون / -ات) e muitos plurais “quebrados” que mudam a forma da palavra (كتاب → كتب)."},
    ord:{en:"A ordem normal em inglês é sujeito + verbo + complemento (I eat apples), e o adjetivo vem antes do substantivo.",
         es:"Em espanhol a ordem é flexível e o sujeito pode ser omitido (Como manzanas); o adjetivo costuma vir depois do substantivo.",
         fr:"Em francês a ordem básica é sujeito + verbo + complemento, e o pronome objeto vem antes do verbo (Je les mange).",
         ru:"Em russo a ordem é mais livre, porque as terminações das palavras mostram a função de cada uma; a ordem neutra é sujeito + verbo + objeto.",
         tr:"Em turco o verbo vai no fim da frase (Ben elma yerim = eu maçã como) e as ideias são ligadas por sufixos.",
         ar:"Em árabe lê-se da direita para a esquerda; a frase pode começar pelo verbo e não há verbo “ser” no presente (أنا طالب = eu estudante)."},
    past:{en:"No passado simples, verbos regulares ganham -ed (walked) e os irregulares mudam de forma (go → went).",
          es:"Em espanhol o passado tem duas formas principais: o pretérito (ação concluída: hablé) e o imperfeito (hábito ou cenário: hablaba).",
          fr:"Em francês o passado falado usa o passé composé: auxiliar avoir/être + particípio (j’ai mangé, je suis allé).",
          ru:"No passado russo o verbo concorda em gênero com o sujeito (он читал, она читала, оно читало), e o aspecto (perfectivo/imperfectivo) indica se a ação terminou.",
          tr:"O passado turco usa o sufixo -di (-dı, -du, -dü) + marca da pessoa: geldim (eu vim).",
          ar:"O passado árabe usa a raiz do verbo com terminações para cada pessoa: كتب (ele escreveu), كتبت (eu escrevi)."}
  };
  /* [regex, texto, traço] — o primeiro que casar com o título ganha */
  const T = [
    [/artigo/i, "Os artigos vêm antes do substantivo e dizem se estamos falando de algo específico (o livro) ou de qualquer um (um livro). Observe os exemplos e repare quando eles aparecem e quando não.", "art"],
    [/g[eê]nero|masculin|feminin/i, "O gênero é a classificação gramatical dos substantivos em masculino e feminino. Ele influencia artigos e adjetivos, por isso vale aprender cada palavra junto com o seu artigo.", "gen"],
    [/plural/i, "O plural indica mais de um. Leia a regra e os exemplos e perceba que terminação muda; depois pratique com as palavras novas.", "pl"],
    [/ordem|word order|estrutura da frase/i, "A ordem das palavras muda de idioma para idioma. Um brasileiro tende a montar a frase como em português, então vale observar com atenção onde cada peça se encaixa.", "ord"],
    [/pretérito|passado|past|perfeito|imperfeito/i, "Este tema trata de ações que já aconteceram. Observe como o verbo muda e quais palavras de tempo (ontem, semana passada, antes) costumam acompanhá-lo.", "past"],
    [/futuro|future|vou |going to/i, "O futuro expressa planos e previsões. Veja como o verbo se forma e quais palavras de tempo (amanhã, no ano que vem) aparecem junto.", null],
    [/condicional|se eu tivesse|hip[óo]tese|conditional/i, "As frases condicionais dizem o que acontece (ou aconteceria) se algo ocorrer. Identifique a parte do “se” e a parte do resultado, e repare no tempo do verbo em cada uma.", null],
    [/subjuntivo/i, "O subjuntivo aparece em dúvidas, desejos, ordens e hipóteses. Pense: se a frase não afirma um fato certo, é provável que peça subjuntivo.", null],
    [/imperativo|ordens|pedidos/i, "O imperativo serve para dar ordens, conselhos e instruções. Observe a forma do verbo e como se suaviza o tom com “por favor”.", null],
    [/presente|present/i, "O presente descreve fatos, hábitos e o que acontece agora. Repare nas terminações do verbo para cada pessoa (eu, você, ele...).", null],
    [/pronome/i, "Pronomes substituem nomes para não repetir. Observe o que cada um representa (quem faz, quem recebe a ação) e em que posição aparecem.", null],
    [/preposi[cç]/i, "As preposições ligam palavras e indicam lugar, tempo, origem e destino. Elas raramente coincidem uma a uma com o português, então aprenda-as dentro de frases completas.", null],
    [/adjetivo/i, "Adjetivos descrevem pessoas e coisas. Repare em que posição ficam (antes ou depois do substantivo) e se mudam de forma.", null],
    [/advérbio|adverb/i, "Advérbios dizem como, quando, onde ou com que frequência algo acontece. Observe em que lugar da frase ficam.", null],
    [/neg(a|ativ)|n[aã]o /i, "A negação transforma uma afirmação no contrário. Veja qual palavra aparece e em que posição ela entra na frase.", null],
    [/pergunta|interrogativ|question/i, "As perguntas têm uma forma própria: palavras interrogativas (quem, onde, quando, por quê) e, em alguns idiomas, uma ordem diferente de palavras ou uma partícula.", null],
    [/compar|superlativ/i, "Comparativos e superlativos mostram diferenças de grau (mais, menos, tão... quanto, o mais...). Observe as palavras ou terminações que o idioma usa para isso.", null],
    [/possess/i, "Os possessivos indicam a quem algo pertence (meu, seu, nosso). Observe com o que concordam e onde ficam.", null],
    [/demonstrativ|este |isto|aquele/i, "Os demonstrativos apontam para algo perto ou longe (este, esse, aquele). Veja como mudam conforme a distância e o substantivo.", null],
    [/conjun[cç]|conectiv|conector/i, "Conectores ligam ideias: adição, contraste, causa e consequência. Aprenda alguns e use-os para formar frases mais longas e naturais.", null],
    [/modal|poder|dever|can |must/i, "Os verbos modais expressam possibilidade, obrigação, permissão e habilidade. Repare no que vem depois deles e em como se formam perguntas e negativas.", null],
    [/passiva|voz passiva/i, "Na voz passiva, o foco vai para quem sofre a ação (“a casa foi construída”). Veja o auxiliar e o particípio e como se indica, quando necessário, quem faz a ação.", null],
    [/indireto|reported/i, "O discurso indireto conta o que alguém disse sem citar as palavras exatas. Observe as mudanças de pronomes, de tempo e de expressões de tempo.", null],
    [/n[uú]mero|cardinal|ordinal|data|hora/i, "Números, datas e horas aparecem o tempo todo. Aprenda a sequência em voz alta e treine ouvindo e dizendo valores reais do seu dia.", null],
    [/ser e estar|ser\/estar|verbo to be|ter e haver|verbo ser|verbo ter/i, "Estes são os verbos mais usados do idioma: descrevem quem somos, onde estamos e o que temos. Memorize as formas de cada pessoa.", null],
    [/cor(es)?\b|formas/i, "Cores são adjetivos ou substantivos muito usados. Veja como concordam (ou não) com o objeto descrito.", null],
    [/fam[ií]lia|parente/i, "O vocabulário da família é um dos primeiros a aprender. Fale de pessoas reais da sua vida para fixar melhor.", null],
    [/comida|alimento|bebida|restaurante|frutas/i, "Vocabulário de comida é útil em viagens e no dia a dia. Associe cada palavra a uma imagem e pratique pedindo algo, como num restaurante.", null],
    [/casa|m[oó]veis|moradia|cidade|lugares/i, "Aqui você aprende nomes de lugares e objetos do seu cotidiano. Pense em onde cada coisa fica na sua casa ou na sua cidade.", null],
    [/trabalho|profiss|carreira|emprego/i, "O vocabulário de trabalho serve para falar da sua profissão, de reuniões e de e-mails. Use as palavras para descrever o seu próprio dia de trabalho.", null],
    [/viagem|transporte|hotel|aeroporto/i, "Este tema reúne palavras e frases úteis para viajar: transporte, hospedagem e orientação. Imagine-se na situação enquanto lê.", null],
    [/sa[uú]de|corpo|m[eé]dico/i, "Palavras sobre o corpo e a saúde ajudam em situações importantes, como explicar o que sente ao médico.", null],
    [/clima|tempo e|esta[cç]|natureza|animais/i, "Falar do clima e da natureza é um assunto comum de conversa. Observe os verbos e expressões usados para descrever o tempo.", null],
    [/emo[cç]|sentiment/i, "Emoções e sentimentos tornam a sua fala mais natural. Veja quais verbos e adjetivos o idioma usa para expressá-los.", null],
    [/cena \d|di[aá]logo|apresenta|cumprimento/i, "Aqui você pratica frases de situações reais. Leia o modelo, repare nas palavras-chave e tente reproduzir a frase com a sua própria voz.", null]
  ];
  const GEN = "Leia o exemplo com calma, repare no padrão e depois responda. Se errar, volte ao exemplo e tente entender o motivo antes de seguir.";
  const typeNote = u => {
    if (/^(pk|pq)-.*-a$/.test(u.id)) return "Nesta unidade você completa frases de uma situação do dia a dia digitando a palavra que falta. Use o sentido da frase inteira (e a tradução em português) para decidir a palavra.";
    if (/^(pk|pq)-.*-b$/.test(u.id)) return "Nesta unidade você monta a frase tocando nas palavras na ordem certa. Primeiro pense no sentido em português; depois encaixe sujeito, verbo e complemento como o idioma pede.";
    if (/^(pk|pq)-.*-c$/.test(u.id)) return "Nesta unidade você lê a frase em português e escolhe a tradução correta. Procure as palavras-chave (verbos, objetos, tempo) e elimine as opções que mudam o sentido.";
    if (/^dg-/.test(u.id)) return "Um diálogo curto mostra como duas pessoas se respondem. Leia as quatro falas, ouça se quiser, e perceba que respostas combinam com cada pergunta; em seguida, responda.";
    if (/^im-/.test(u.id)) return "Aqui você liga a imagem à palavra. Olhe a figura, diga a palavra em voz alta e só depois responda: o cérebro grava melhor quando imagem, som e escrita aparecem juntos.";
    if (/^ab-/.test(u.id)) return "Aprender um alfabeto novo é questão de repetição. Veja cada letra, diga o som em voz alta e escreva-a no ar ou no papel; depois pratique reconhecendo letras e lendo palavras reais.";
    return "";
  };
  const topic = u => String(u.title || "").replace(/^[A-C][12] · /, "").replace(/^Unidade \d+ · /, "");
  function intro(lang, u){
    const t = (u.title || "") + " " + String(u.expl || "").replace(/<[^>]+>/g, " ").slice(0, 200);
    let body = typeNote(u), trait = "";
    if (!body){ const hit = T.find(r => r[0].test(t));
      if (hit){ body = hit[1]; if (hit[2] && TR[hit[2]]) trait = TR[hit[2]][lang]; }
      else if (/palavras \d+ a \d+|vocabul/i.test(u.title || "")) body = `Vamos aprender palavras do tema “${topic(u).replace(/ · Palavras.*$/, "")}”. Leia cada palavra com a tradução, diga em voz alta três vezes e invente uma frase curta com ela: usar a palavra é o que a faz ficar na memória.`;
      else body = GEN; }
    if (/^(pk|pq)-.*-b$/.test(u.id) && TR.ord[lang]) trait = TR.ord[lang];
    if (/^im-/.test(u.id) && TR.gen[lang]) trait = TR.gen[lang];
    return `<div class="exintro2"><b>Sobre este tema</b><p>${body}${trait ? " " + trait : ""}</p></div>`;
  }
  const plainLen = h => String(h || "").replace(/<[^>]+>/g, "").length;
  const apply = (lang, u) => { if (!u || u._intro) return; u._intro = 1;
    if (/^ab-/.test(u.id) || plainLen(u.expl) < 400) u.expl = intro(lang, u) + (u.expl || ""); };
  for (const lang of Object.keys(EX_BOOKS)){ const B = EX_BOOKS[lang]; [].concat(B.units, B.vunits || []).forEach(u => apply(lang, u)); }
  for (const lang of Object.keys(STEPU)) for (const lv of Object.keys(STEPU[lang])) Object.values(STEPU[lang][lv]).forEach(c => (c.units || []).forEach(u => apply(lang, u)));
  window.INTRO_APPLY = apply;
})();
