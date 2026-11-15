/* ---------- Pares de palavras (jogo de memória): liga cada palavra à tradução ---------- */
(function(){
  const LN = {en:"inglês", es:"espanhol", fr:"francês", ru:"russo", tr:"turco", ar:"árabe"};
  const EN = {
A1:`red|vermelho
blue|azul
green|verde
yellow|amarelo
black|preto
white|branco
mother|mãe
father|pai
brother|irmão
sister|irmã
friend|amigo
house|casa
table|mesa
chair|cadeira
window|janela
door|porta
bread|pão
water|água
milk|leite
apple|maçã
dog|cachorro
cat|gato
book|livro
pen|caneta
big|grande
small|pequeno
happy|feliz
sad|triste
hot|quente
cold|frio
day|dia
night|noite
morning|manhã
today|hoje
tomorrow|amanhã
hand|mão
head|cabeça
eye|olho
school|escola
city|cidade`,
A2:`shopping|compras
price|preço
cheap|barato
expensive|caro
weather|clima
rain|chuva
ticket|passagem
airport|aeroporto
luggage|bagagem
hungry|com fome
tired|cansado
busy|ocupado
early|cedo
late|tarde
always|sempre
never|nunca
sometimes|às vezes
borrow|pegar emprestado
lend|emprestar
wait|esperar
visit|visitar
invite|convidar
cook|cozinhar
clean|limpar
wash|lavar
travel|viajar
arrive|chegar
leave|sair
bring|trazer
forget|esquecer
remember|lembrar
ask|perguntar
answer|responder
buy|comprar
sell|vender
pay|pagar
cost|custar
fast|rápido
near|perto
far|longe`,
B1:`achievement|conquista
challenge|desafio
experience|experiência
opportunity|oportunidade
advice|conselho
behavior|comportamento
environment|meio ambiente
government|governo
relationship|relacionamento
decision|decisão
improve|melhorar
develop|desenvolver
suggest|sugerir
avoid|evitar
provide|fornecer
require|exigir
reduce|reduzir
increase|aumentar
afford|ter condições de pagar
ashamed|envergonhado
proud|orgulhoso
jealous|ciumento
reliable|confiável
honest|honesto
rude|grosseiro
polite|educado
deadline|prazo
salary|salário
meeting|reunião
employee|funcionário
customer|cliente
schedule|cronograma
although|embora
however|porém
therefore|portanto
meanwhile|enquanto isso`,
B2:`nevertheless|mesmo assim
furthermore|além disso
consequently|consequentemente
reluctant|relutante
thorough|minucioso
subtle|sutil
genuine|genuíno
vague|vago
controversial|polêmico
sustainable|sustentável
overcome|superar
undertake|empreender
enhance|aprimorar
acknowledge|reconhecer
claim|alegar
convince|convencer
rely on|depender de
cope with|lidar com
drawback|desvantagem
outcome|resultado
trend|tendência
evidence|evidência
assumption|suposição
hesitate|hesitar
tackle|enfrentar
shortage|escassez
boost|impulsionar
bias|viés`,
C1:`ubiquitous|onipresente
meticulous|meticuloso
ambiguous|ambíguo
mitigate|mitigar
exacerbate|agravar
resilient|resiliente
pragmatic|pragmático
coherent|coerente
inevitable|inevitável
profound|profundo
elaborate|elaborar
nuance|nuance
discrepancy|discrepância
leverage|alavancar
foster|fomentar
hinder|dificultar
undermine|minar
imminent|iminente
prevalent|predominante
tenuous|tênue
plausible|plausível
jeopardize|pôr em risco
concede|admitir`,
C2:`ephemeral|efêmero
quintessential|típico por excelência
serendipity|descoberta feliz ao acaso
surreptitious|sorrateiro
laconic|lacônico
magnanimous|magnânimo
pernicious|nocivo
perfunctory|feito por obrigação
recalcitrant|rebelde
tenacious|tenaz
cogent|convincente
fastidious|exigente
gregarious|sociável
insidious|insidioso
obdurate|inflexível
prescient|que prevê o futuro
vicarious|vivido por meio de outro
truculent|agressivo
alacrity|presteza
sanguine|otimista`};
  const hash = s => { let h = 11; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) | 0; return Math.abs(h); };
  const mul = a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const shuf = (n, seed, avoid) => { const r = mul(hash(seed) * 7919 + 13); let a, k = 0;
    do { a = Array.from({length:n}, (_, i) => i); for (let i = n - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } k++; }
    while (k < 12 && (a.every((v, i) => v === i) || (avoid && a.filter((v, i) => v === avoid[i]).length > 1)));
    return a; };
  /* coleta pares (palavra no idioma, tradução em português) dos exercícios de vocabulário */
  function harvest(lang){
    const out = {}, seen = new Set(), B = EX_BOOKS[lang];
    (B.vunits || []).forEach(u => (u.items || []).forEach(it => {
      let tg = null, pt = null, m;
      if (it.t === "text" && (m = /Escreva em [^:]+: “([^”]+)”/.exec(it.q))){ pt = m[1]; tg = it.a[0]; }
      else if (it.t === "choice" && (m = /^Como se diz “([^”]+)” em /.exec(it.q))){ pt = m[1]; tg = it.opts[it.a]; }
      else if (it.t === "choice" && (m = /^Qual palavra em [^ ]+ significa “([^”]+)”/.exec(it.q))){ pt = m[1]; tg = it.opts[it.a]; }
      else if (it.t === "choice" && (m = /^Qual é o significado de “([^”]+)”/.exec(it.q))){ tg = m[1]; pt = it.opts[it.a]; }
      if (!tg || !pt || tg.length > 22 || pt.length > 24 || seen.has(lang + u.lvl + tg)) return;
      seen.add(lang + u.lvl + tg); (out[u.lvl] = out[u.lvl] || []).push([tg, pt]);
    }));
    return out;
  }
  window.HARVEST = lang => { if (lang !== "en") return harvest(lang); const o = {}; Object.keys(EN).forEach(l => { o[l] = EN[l].split("\n").map(r => r.split("|")); }); return o; };
  for (const lang of Object.keys(EX_BOOKS)){
    let by = {};
    if (lang === "en") Object.keys(EN).forEach(l => { by[l] = EN[l].split("\n").map(r => r.split("|")); }); else by = harvest(lang);
    const B = EX_BOOKS[lang];
    Object.keys(by).forEach(lvl => {
      /* remove traduções repetidas na mesma lista para o jogo não ficar ambíguo */
      const ptSeen = new Set(), tgSeen = new Set(), list = by[lvl].filter(([t, p]) => { if (ptSeen.has(p) || tgSeen.has(t)) return false; ptSeen.add(p); tgSeen.add(t); return true; });
      const items = [];
      for (let i = 0; i + 6 <= list.length; i += 6){ const pairs = list.slice(i, i + 6), seed = lang + lvl + i, PL = shuf(6, seed + "L");
        items.push({t:"match", q:"Ligue cada palavra em " + LN[lang] + " à tradução em português. Toque em uma palavra de cada coluna.", pairs, pl:PL, pr:shuf(6, seed + "R", PL)}); }
      for (let k = 0, n = 1; k < items.length; k += 3, n++){
        const grp = items.slice(k, k + 3); if (grp.length < 2) continue;
        const u = {id:`mp-${lang}-${lvl}-${n}`, title:`${lvl} · Pares de palavras ${n}`, lvl,
          lead:"Jogo de memória: ligue cada palavra à sua tradução." + (lang === "en" ? "" : " (conteúdo novo, ainda sem revisão de falante nativo)"),
          expl:`<div class="exintro2"><b>Como funciona</b><p>Em cada quadro há duas colunas. Toque em uma palavra em ${LN[lang]} e depois na tradução em português. Se estiver certo, o par fica verde e some da disputa; se errar, tente de novo. Poucos erros contam como acerto. Antes de tocar, tente lembrar a tradução de cabeça: é isso que fixa a palavra.</p></div>`,
          items:grp};
        B.units.push(u); if (window.INTRO_APPLY) { u._intro = 1; }
      }
    });
  }
})();
