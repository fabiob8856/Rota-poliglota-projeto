/* ---------- Alfabeto: unidades para aprender a ler as letras novas (ru, ar) e as letras especiais do turco ---------- */
(function(){
  const hash = s => { let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); h ^= h >>> 13; } return Math.abs(h | 0); };
  const pick3 = (right, pool, seed) => { const o = pool.filter(x => x !== right).sort((a,b) => hash(seed+a) - hash(seed+b)).slice(0,2);
    const all = [right].concat(o), k = hash(seed) % 3, opts = all.map((_, j) => all[(j + k) % all.length]); return {opts, a: opts.indexOf(right)}; };
  const D = {};
  /* letra|som em português (aprox.) */
  D.ru = {
    nome:"russo", note:" (conteúdo novo, ainda sem revisão de falante nativo)",
    groups:[
      ["Letras amigas (som parecido com o nosso)", "Estas letras se parecem com as latinas e têm som parecido.", "А|a|Е|iê|К|k|М|m|О|o|Т|t"],
      ["Falsas amigas (parecem latinas, mas o som é outro)", "Cuidado: Н não é “agá”, Р não é “p”, С não é “k”, В não é “b”.", "В|v|Н|n|Р|r (vibrado)|С|s|У|u|Х|rr (forte, de garganta)"],
      ["Letras novas, parte 1", "Letras que não existem no nosso alfabeto.", "Б|b|Г|g|Д|d|З|z|И|i|Л|l|П|p|Ф|f"],
      ["Letras novas, parte 2 (sons de chiado)", "Ж soa como o J português de “já”; Ш como o X de “xá”; Ч como “tch”.", "Ж|j (de já)|Ш|x (de xá)|Щ|xch (xá longo)|Ч|tch|Ц|ts|Ю|iu|Я|ia|Э|é|Ё|iô|Й|i curto (y)"]
    ],
    words:[["мама","mama","mamãe"],["папа","papa","papai"],["кот","kot","gato"],["дом","dom","casa"],["банк","bank","banco"],["метро","metro","metrô"],["такси","taksi","táxi"],["парк","park","parque"],["театр","teatr","teatro"],["футбол","futbol","futebol"],["кофе","kofe","café"],["чай","chai","chá"],["вода","voda","água"],["хлеб","khleb","pão"],["привет","privet","oi"],["спасибо","spasibo","obrigado"],["да","da","sim"],["нет","nyet","não"],["школа","shkola","escola"],["книга","kniga","livro"]]
  };
  D.ar = {
    nome:"árabe", note:" (conteúdo novo, ainda sem revisão de falante nativo)",
    groups:[
      ["Letras 1: ا ب ت ث", "O árabe se lê da direita para a esquerda. Alif (ا) é um “a” longo.", "ا|a / aa (alif)|ب|b|ت|t|ث|th (língua entre os dentes, um “s” fraco)"],
      ["Letras 2: ج ح خ د", "ح é um “h” soprado forte; خ é um “rr” de garganta.", "ج|j|ح|h forte (de garganta)|خ|kh (rr de garganta)|د|d"],
      ["Letras 3: ذ ر ز س ش", "ر é vibrado; ش soa como o X de “xá”.", "ذ|dh (língua entre os dentes, um “z” suave)|ر|r|ز|z|س|s|ش|x (de xá)"],
      ["Letras 4: ص ض ط ظ ع غ", "ص ض ط ظ são versões “enfáticas” (mais graves); ع sai do fundo da garganta.", "ص|s grave|ض|d grave|ط|t grave|ظ|z grave|ع|ain (som de garganta)|غ|gh (rr suave)"],
      ["Letras 5: ف ق ك ل م ن ه و ي", "و é “u” longo ou “w”; ي é “i” longo ou “y”.", "ف|f|ق|q (k de garganta)|ك|k|ل|l|م|m|ن|n|ه|h|و|w / uu|ي|y / ii"]
    ],
    words:[["كتاب","kitab","livro"],["بيت","bayt","casa"],["باب","bab","porta"],["قلم","qalam","caneta"],["شمس","shams","sol"],["ولد","walad","menino"],["أم","umm","mãe"],["أب","ab","pai"],["سلام","salam","paz / olá"],["مدرسة","madrasa","escola"],["شكرا","shukran","obrigado"],["نعم","naam","sim"],["لا","la","não"],["ماء","maa","água"],["قهوة","qahwa","café"],["تفاح","tuffah","maçãs"]]
  };
  D.ar.harakat = [["بَ","ba","a curto (fatha)"],["بِ","bi","i curto (kasra)"],["بُ","bu","u curto (damma)"],["تَ","ta",""],["تِ","ti",""],["تُ","tu",""],["مَ","ma",""],["مِ","mi",""],["مُ","mu",""],["كَ","ka",""],["كِ","ki",""],["كُ","ku",""]];
  D.tr = {
    nome:"turco", note:" (conteúdo novo, ainda sem revisão de falante nativo)",
    groups:[["Letras especiais do turco", "O turco usa letras latinas, mas com sons próprios: Ç = tch, Ş = x (de xá), Ğ alonga a vogal, I sem pingo = som fechado (como “â”), Ö = “ê” com os lábios arredondados, Ü = “i” com os lábios arredondados.", "Ç|tch|Ş|x (de xá)|Ğ|alonga a vogal (quase mudo)|I|ı sem pingo: um “i” falado com a língua recuada, perto de “â”|Ö|ê com lábios arredondados (como se fosse dizer “ô”)|Ü|i com lábios arredondados (como se fosse dizer “u”)"]],
    words:[["çay","chai","chá"],["şeker","xeker","açúcar"],["göz","gôz","olho"],["gül","gul","rosa"],["kız","kâz","menina"],["ışık","âxâk","luz"],["çocuk","tchodjuk","criança"],["güneş","gunex","sol"],["dağ","dá","montanha"],["süt","sut","leite"]]
  };
  const mk = (lang, id, title, lead, expl, items) => EX_BOOKS[lang].units.push({id, title, lead:lead + D[lang].note, expl, lvl:"A1", items});
  for (const lang of Object.keys(D)){
    if (!EX_BOOKS[lang]) continue; const d = D[lang];
    const allLetters = []; 
    d.groups.forEach((g, gi) => {
      const arr = g[2].split("|"), L = []; for (let i = 0; i < arr.length; i += 2) L.push({ch:arr[i], s:arr[i+1]});
      L.forEach(x => allLetters.push(x)); g.L = L;
    });
    const chs = allLetters.map(x => x.ch), snd = allLetters.map(x => x.s);
    d.groups.forEach((g, gi) => {
      const L = g.L, n = gi + 1, pool = lang === "ru" ? chs : chs;
      const expl = `<p>${esc(g[1])}</p><table class="alftab">` + L.map(x => `<tr><td style="font-size:1.6em;padding:2px 14px"><b>${esc(x.ch)}</b></td><td>${esc(x.s)}</td></tr>`).join("") + "</table>";
      const items = [];
      L.forEach((x, i) => { const r = pick3(x.s, snd, lang + n + x.ch); items.push({t:"choice", q:`Que som tem a letra “${x.ch}”?`, opts:r.opts, a:r.a}); });
      L.forEach((x, i) => { const r = pick3(x.ch, chs, lang + n + x.s + "r"); items.push({t:"choice", q:`Qual letra faz o som “${x.s}”?`, opts:r.opts, a:r.a}); });
      mk(lang, `ab-${lang}-L${n}`, `Alfabeto ${d.nome} · ${g[0]}`, "Aprenda e reconheça as letras.", expl, items.slice(0, 12));
    });
    /* leitura de palavras */
    const W = d.words;
    for (let u = 0; u * 5 < W.length; u++){
      const part = W.slice(u*5, u*5 + 5); if (part.length < 3) continue;
      const expl = "<p>Leia cada palavra letra por letra e compare com a pronúncia aproximada.</p><table class=\"alftab\">" + part.map(w => `<tr><td style="font-size:1.5em;padding:2px 14px"><b>${esc(w[0])}</b></td><td>${esc(w[1])}</td><td>${esc(w[2])}</td></tr>`).join("") + "</table>";
      const items = [];
      part.forEach(w => items.push({t:"text", q:`Escreva em letras latinas (pronúncia): ${w[0]}`, a:[w[1]], hint:"Use só letras de a a z"}));
      part.forEach(w => { const r = pick3(w[2], W.map(x => x[2]), lang + w[0]); items.push({t:"choice", q:`O que significa “${w[0]}”?`, opts:r.opts, a:r.a}); });
      part.forEach(w => { const r = pick3(w[0], W.map(x => x[0]), lang + w[1] + "x"); items.push({t:"choice", q:`Qual palavra é “${w[2]}”?`, opts:r.opts, a:r.a}); });
      mk(lang, `ab-${lang}-W${u+1}`, `Alfabeto ${d.nome} · Lendo palavras ${u+1}`, "Leia palavras reais com as letras novas.", expl, items);
    }
    if (d.harakat){
      const H = d.harakat, expl = "<p>As vogais curtas são sinais pequenos acima ou abaixo da letra: fatha (a), kasra (i) e damma (u).</p><table class=\"alftab\">" + H.map(h => `<tr><td style="font-size:1.6em;padding:2px 14px"><b>${h[0]}</b></td><td>${h[1]}</td></tr>`).join("") + "</table>";
      const items = H.map(h => { const r = pick3(h[1], H.map(x => x[1]), "h" + h[0]); return {t:"choice", q:`Como se lê “${h[0]}”?`, opts:r.opts, a:r.a}; });
      H.slice(0, 6).forEach(h => items.push({t:"text", q:`Escreva a leitura de “${h[0]}”`, a:[h[1]], hint:"consoante + vogal, ex.: ba"}));
      mk(lang, `ab-${lang}-H1`, `Alfabeto ${d.nome} · Vogais curtas (sinais)`, "Aprenda os sinais das vogais.", expl, items);
    }
  }
})();
