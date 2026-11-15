/* ---------- Reforço: ditados (ouvir e escrever), frases da cena em todas as unidades e dica específica de cada idioma ---------- */
(function(){
  const LN = {en:"inglês", es:"espanhol", fr:"francês", ru:"russo", tr:"turco", ar:"árabe"};
  const TIPS = {
    en:["Em inglês o verbo quase não muda por pessoa: só ganha -s na 3ª pessoa do singular no presente (he works). Cuidado para não esquecer esse -s.",
        "Cuidado com falsos amigos: “actually” significa “na verdade” (não “atualmente”) e “pretend” é “fingir” (não “pretender”).",
        "Pronúncia: o “th” (think, this) se faz com a ponta da língua entre os dentes. Não é “t”, “f” nem “d”.",
        "O -ed do passado tem três sons: /t/ (walked), /d/ (played) e /id/ (wanted). Não leia sempre “ed”.",
        "A frase em inglês pede sujeito: diga “It is hot”, nunca só “Is hot”.",
        "O adjetivo vem antes do substantivo e não varia: “a red car”, “two red cars”.",
        "Em perguntas no presente use do/does + verbo base: “Does she work here?” (sem -s em work).",
        "O acento da palavra muda o som e às vezes o sentido: “record” (substantivo) e “record” (verbo) têm sílaba forte diferente."],
    es:["Espanhol e português parecem iguais, mas há falsos amigos: “exquisito” é delicioso (não esquisito), “embarazada” é grávida e “salir” é sair.",
        "O “h” é sempre mudo (hola, hombre) e o “j” soa como um “r” forte e aspirado (jamón).",
        "Perguntas e exclamações levam sinal de abertura: ¿Cómo estás? ¡Qué bien!",
        "Ser e estar existem nos dois idiomas, mas nem sempre como no português: “estoy aburrido” (estou entediado) e “soy aburrido” (sou chato).",
        "O adjetivo costuma vir depois do substantivo: “una casa grande”.",
        "“Usted” é o tratamento formal e “tú” o informal. Em vários países da América Latina usa-se “vos” e “ustedes” no lugar de “vosotros”.",
        "O “ñ” soa como o “nh” do português: “español” = espanhól.",
        "O sujeito pode ser omitido, porque o verbo já mostra a pessoa: “Hablo español” (falo espanhol)."],
    fr:["Muitas letras finais não se pronunciam (petit, grand, vous parlez). A liaison só liga o som antes de vogal.",
        "O “r” francês é gutural, no fundo da garganta, diferente do “r” brasileiro.",
        "Todo substantivo é masculino ou feminino. Aprenda a palavra junto com o artigo: le livre, la table.",
        "A negação tem duas partes: ne ... pas (Je ne parle pas). Na fala, o “ne” costuma sumir.",
        "Os sons nasais (on, an, in) saem pelo nariz. Não pronuncie o “n” final como em português.",
        "Os acentos distinguem palavras: “a” (tem) e “à” (a, para); “ou” (ou) e “où” (onde).",
        "Use “tu” no tratamento informal e “vous” no formal ou no plural.",
        "Falsos amigos: “pain” é pão, “rester” é ficar e “exprès” é de propósito."],
    ru:["O alfabeto cirílico parece difícil, mas muitos sons são familiares. Comece por а, о, е, и, к, м, т.",
        "O russo não tem artigos e o verbo “ser” costuma sumir no presente: “Я студент” = eu (sou) estudante.",
        "O acento da palavra muda o som das vogais: o “о” sem acento soa fraco, quase como “a”.",
        "Os substantivos mudam de final conforme a função na frase (os casos). Por isso, decore as palavras já dentro de frases.",
        "Há três gêneros: masculino (termina em consoante), feminino (-а/-я) e neutro (-о/-е).",
        "O sinal “ь” (suave) amolece a consoante anterior e o “ъ” (duro) separa sons. Nenhum dos dois tem som próprio.",
        "Os verbos têm aspecto: imperfectivo (processo, hábito) e perfectivo (resultado). Cada par parece dois verbos diferentes.",
        "Cuidado com letras que enganam: “р” soa como “r” vibrado, “н” é “n”, “в” é “v” e “с” é “s”."],
    tr:["O turco junta sufixos à raiz da palavra: ev (casa) → evler (casas) → evlerde (nas casas).",
        "Harmonia vocálica: o sufixo muda a vogal conforme a última vogal da palavra (ev-ler, kitap-lar).",
        "O verbo vai no fim da frase: “Ben elma yerim” (eu maçã como).",
        "Não há artigos nem gênero: “o” serve para ele, ela e neutro.",
        "O “ı” (sem ponto) é um som fechado que não existe em português, e o “i” (com ponto) é o “i” normal.",
        "“c” soa como “dj” (cam = djam), “ç” como “tch” (çay = tchai), “ş” como “ch” e o “ğ” só alonga a vogal anterior.",
        "Em perguntas sim/não usa-se a partícula mi/mı/mu/mü depois da palavra: “Geliyor musun?” (você vem?).",
        "Para “ter” o turco usa “var” (existe) e “yok” (não existe): “Kitabım var” = tenho um livro."],
    ar:["O árabe se escreve da direita para a esquerda, e as letras mudam de forma no início, no meio e no fim da palavra.",
        "Em geral só se escrevem as consoantes e as vogais longas. As vogais curtas (harakat) aparecem em textos didáticos.",
        "Há sons que não existem em português: ع (ain), ح (h forte), خ (como o “r” de “carro” em alguns sotaques) e ق (q, mais atrás na garganta).",
        "Não há verbo “ser” no presente: “أنا طالب” = eu (sou) estudante.",
        "O artigo “ال” (al) se cola à palavra. Antes de algumas letras (as solares) o “l” se assimila: ash-shams, não al-shams.",
        "Os substantivos são masculinos ou femininos, e a maioria dos femininos termina em ة (ta marbuta).",
        "A raiz de três consoantes gera uma família de palavras: k-t-b → كتاب (livro), كاتب (escritor), مكتبة (biblioteca).",
        "O árabe falado (dialetos) difere do árabe padrão escrito. O app ensina o padrão, que vale em todo o mundo árabe."]
  };
  const hash = s => { let h = 7; for (const c of String(s)) h = (h * 33 + c.charCodeAt(0)) | 0; return Math.abs(h); };
  const wc = s => String(s).split(/\s+/).filter(Boolean).length;
  const esc2 = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  for (const lang of Object.keys(EX_BOOKS)){
    const B = EX_BOOKS[lang], units = B.units, byId = {};
    units.forEach(u => { byId[u.id] = u; });
    const add = [];
    /* 1) ditado: ouvir e escrever, com as frases de cada cena */
    units.forEach(a => {
      if (!a._rows || !/-a$/.test(a.id)) return;
      const rows = a._rows.filter(r => { const n = wc(r.plain); return n >= 3 && n <= 10; }).slice(0, 5);
      if (rows.length < 4) return;
      add.push({id: a.id.replace(/-a$/, "-d"), title: a.title.replace(/ · Complete$/, " · Ditado"), lvl: a.lvl,
        lead: "Ouça a frase e escreva exatamente o que você ouviu. Pode ouvir quantas vezes quiser.",
        expl: "<p>O ditado treina o ouvido e a escrita ao mesmo tempo. Ouça com atenção, escreva a frase inteira e confira. A dica mostra o sentido em português.</p>",
        items: rows.map(r => ({t:"text", q:"🎧 Ouça e escreva a frase.", say:r.plain, a:[r.plain, r.plain.replace(/[,;:]/g, "")], hint:"Significa: “" + r.pt + "”"}))});
    });
    add.forEach(u => units.push(u));
    /* 2) frases da cena nas unidades b/c e dica do idioma em todas */
    const tip = u => `<div class="exintro2 exdica"><b>Dica de ${LN[lang]}</b><p>${esc2(TIPS[lang][hash(u.id) % TIPS[lang].length])}</p></div>`;
    const sent = u => { const m = /^((?:pk|pq)-.*-s\d+)-([bcd])$/.exec(u.id); if (!m) return ""; const a = byId[m[1] + "-a"]; if (!a || !a._rows) return "";
      return `<div class="exintro2"><b>Frases desta cena</b><ol>${a._rows.map(r => `<li><b>${esc2(r.plain)}</b><br><small>${esc2(r.pt)}</small></li>`).join("")}</ol></div>`; };
    [].concat(units, B.vunits || []).forEach(u => { if (u._boost) return; u._boost = 1; u.expl = (u.expl || "") + sent(u) + tip(u); });
    if (typeof STEPU !== "undefined" && STEPU[lang]) for (const lv of Object.keys(STEPU[lang])) Object.values(STEPU[lang][lv]).forEach(c => (c.units || []).forEach(u => { if (u._boost) return; u._boost = 1; u.expl = (u.expl || "") + tip(u); }));
  }
})();
