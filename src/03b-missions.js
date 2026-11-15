/* ---------- missões extras e conquistas ---------- */
const MTAG = {duo:["Duolingo","#3D8A2E"], cri:["Criativa","#6D3B83"], ime:["Imersão","#2F6B45"], soc:["Social","#B5651D"], esc:["Escrita","#7A4A2A"], mem:["Memória","#24377A"], fala:["Fala","#B8321F"], mus:["Música","#8A2F6B"], x:["Posts no X","#1D2A3A"]};
const TAG_MIN = {duo:5, cri:10, ime:10, soc:10, esc:10, mem:5, fala:10, mus:10, x:5}; // minutos estimados por tipo
const M = (id, tag, t, h, xp, tiers, ex) => ({id, tag, t, h, xp, tiers: tiers || "ABC", min: (ex && ex.min) || TAG_MIN[tag] || 10, ...(ex || {})});
const DUO = [
  M("d1","duo","Complete 2 lições no Duolingo","Vale qualquer unidade. Se já terminou a de hoje, avance na próxima.",20),
  M("d2","duo","Faça uma lição de Histórias no Duolingo","Leia e ouça a história respondendo às perguntas sem pular o áudio.",20,"AB"),
  M("d3","duo","Mantenha sua ofensiva no Duolingo","Pelo menos uma lição hoje, antes de dormir.",10),
  M("d4","duo","Refaça uma lição antiga do Duolingo com 100% de acerto","Escolha uma unidade concluída e repita até zerar os erros.",20),
  M("d5","duo","3 lições no Duolingo repetindo cada frase em voz alta","Som ligado. Repita a frase inteira antes de responder.",30),
  M("d6","duo","Treine seus erros no Duolingo","Abra a seção de revisão de erros e refaça todos.",15),
  M("d7","duo","Uma lição no Duolingo digitando as respostas","Desligue o banco de palavras e escreva tudo. É bem mais difícil.",25,"BC"),
  M("d8","duo","Complete a lição de escuta ou pronúncia da unidade","Faça os exercícios de áudio da unidade atual, com fones.",20),
  M("d9","duo","Suba uma liga no Duolingo","Ganhe XP suficiente hoje para melhorar sua posição.",15)
];
const EXTRA = [
  M("sp1","mem","Complete a sopa de letrinhas em Exercícios","Monte as 5 palavras arrastando as letras. Marca sozinha ao terminar.",15,"ABC"),
  M("n1","ime","Troque o idioma do celular para {L} por hoje","Os menus viram vocabulário real. Anote 3 palavras que você não conhecia.",15,"ABC",{min:5}),
  M("n2","fala","Descreva em voz alta o que você vê ao seu redor, em {L}","Fale por 2 minutos sem parar. Se faltar palavra, descreva de outro jeito.",15,"AB",{min:5}),
  M("n3","esc","Escreva 5 frases sobre o seu dia de hoje em {L}","Use o que já estudou. Releia e corrija uma frase.",15,"AB",{min:10}),
  M("n4","esc","Escreva um parágrafo sobre o seu fim de semana ideal em {L}","8 a 10 linhas. Depois leia em voz alta.",20,"BC",{min:10}),
  M("n5","mem","Releia o seu caderno de erros e corrija 3 deles","Escreva a frase certa de cabeça, depois confira.",15,"ABC",{min:5}),
  M("n6","ime","Ouça um podcast curto em {L} por 10 minutos","Escolha um tema que você gosta. Anote 3 palavras novas.",20,"BC",{min:10}),
  M("n7","ime","Leia uma notícia curta em {L} e resuma em duas frases","Procure um site de notícias para aprendizes ou um portal comum.",20,"BC",{min:10}),
  M("n8","soc","Mande uma mensagem em {L} para alguém (ou para você mesmo)","Pode ser um áudio. O importante é produzir.",15,"ABC",{min:5}),
  M("n9","cri","Invente uma pequena história de 5 frases em {L}","Personagem, lugar, problema e final. Sem tradutor.",20,"AB",{min:10}),
  M("n10","cri","Defenda uma opinião sua em {L} em 1 minuto","Grave um áudio: “Eu acho que… porque…”. Ouça e ache um erro.",25,"BC",{min:10}),
  M("n11","fala","Grave um áudio de 1 minuto se apresentando em {L}","Ouça depois e anote o que melhorar na pronúncia.",20,"ABC",{min:5}),
  M("n12","ime","Assista a um trailer de filme em {L} e anote 5 palavras","Veja duas vezes: na segunda, tente entender sem legenda.",15,"AB",{min:5}),
  M("n13","mem","Escolha 10 palavras do seu Baralho de revisão e use cada uma em uma frase","Frases curtas, sobre a sua vida.",20,"ABC",{min:10}),
  M("n14","ime","Veja um vídeo de 10 minutos no YouTube em {L} sobre um assunto que você gosta","Pause em uma frase que achou útil e repita em voz alta.",20,"ABC",{min:10}),
  M("n15","fala","Faça uma sombra (shadowing) de 3 minutos de um áudio em {L}","Repita logo depois do falante, copiando ritmo e entonação.",20,"ABC",{min:5}),
  M("n16","esc","Escreva um e-mail curto em {L} pedindo uma informação","Educado e direto. Releia procurando erros de ortografia.",20,"BC",{min:10}),
  M("n17","cri","Traduza do português para {L} uma música que você gosta (um verso)","Depois compare com a versão original e veja o que mudou.",20,"BC",{min:10}),
  M("n18","ime","Leia em voz alta por 3 minutos um texto em {L}","Qualquer texto curto. Marque as palavras que travaram.",15,"AB",{min:5}),
  M("n19","mem","Faça uma lista de 10 palavras do tema de hoje em {L} sem consultar","Depois confira. As que errou voltam para o Baralho de revisão.",15,"ABC",{min:5}),
  M("n20","soc","Comente um post ou vídeo em {L} com uma frase sua","Uma frase simples já vale. Escreva sem tradutor.",15,"ABC",{min:5}),
  M("n21","ime","Descreva uma foto sua em {L} em 5 frases","Pessoas, lugar, o que acontece e como você se sentia.",15,"AB",{min:5}),
  M("n22","cri","Explique a sua profissão ou o seu estudo em {L} para um iniciante","Use palavras simples. Grave e ouça.",20,"BC",{min:10}),
  M("n23","ime","Faça uma pausa do dia com 2 músicas em {L} lendo a letra","Marque 3 palavras que você já sabe e 3 novas.",15,"ABC",{min:10}),
  M("n24","fala","Pratique 5 perguntas e respostas em {L} em voz alta","Quem, onde, quando, por quê, como. Responda sobre você.",15,"AB",{min:5}),
  M("tv1","ime","Assista um episódio de série ou um filme em {L}, com legendas em português","Pode ver em partes. Anote 3 palavras ou frases que ouviu. Sugestões: {SUG1}.",30,"AB",{min:15,lv:["A1","A2","B1"]}),
  M("tv2","ime","Assista a um filme em {L}","Pode dividir em partes ao longo da semana. Tente legenda em {L} ou sem legenda e anote 5 expressões novas. Sugestões: {SUG2}.",35,"BC",{min:15,lv:["B2","C1","C2"]}),
  M("pd1","ime","Ouça um episódio de podcast para aprendizes em {L}","Escolha um episódio curto, ouça uma vez sem ler e outra lendo a transcrição. Sugestões: {POD1}.",25,"AB",{min:15,lv:["A1","A2","B1"]}),
  M("pd2","ime","Ouça um episódio de podcast em {L} no ritmo de falantes nativos","Ouça de ponta a ponta, anote 5 palavras ou expressões e resuma o episódio em 2 frases. Sugestões: {POD2}.",30,"BC",{min:20,lv:["B2","C1","C2"]}),
  M("pd3","ime","Ouça um podcast em {L} e faça shadowing de 1 minuto","Pause num trecho de que gostou e repita junto com o apresentador, copiando ritmo e entonação. Sugestões: {POD1}.",25,"ABC",{min:15}),
  M("rd1","ime","Ouça uma rádio ao vivo em {L} por 10 minutos","Deixe tocando enquanto faz outra coisa. Anote 3 palavras que se repetem. Sugestões: {RADIO}.",20,"ABC",{min:10}),
  M("rd2","ime","Ouça as notícias de uma rádio em {L} e conte o assunto principal","Mesmo entendendo pouco, tente descobrir o tema. Depois leia a notícia no site da rádio. Sugestões: {RADIO}.",25,"BC",{min:15,lv:["B1","B2","C1","C2"]}),
  M("rd3","ime","Acostume o ouvido: 5 minutos de rádio em {L}, sem tentar entender tudo","Foque no som e no ritmo e anote só as palavras que reconhecer. Sugestões: {RADIO}.",10,"A",{min:5,lv:["A1","A2"]}),
  M("c1","fala","Narre em voz alta o que está fazendo por 5 minutos","Cozinhando, arrumando a casa, no trânsito: “Agora eu estou…”.",20),
  M("c3","esc","Escreva a lista de compras em {L}","Procure no dicionário só o que não souber.",15),
  M("c5","fala","Descreva uma foto do seu celular em voz alta: 5 frases","Quem está, onde, o que fazem, que dia era, por que você gosta dela.",20),
  M("c6","ime","Cante uma música em {L} acompanhando a letra","Procure “lyrics” e cante junto. Pronúncia vem de graça.",15),
  M("c7","ime","Assista uma receita em {L} e anote 5 ingredientes","Vídeos de culinária usam vocabulário simples e repetido.",20),
  M("c8","mem","Conte de 1 a 100 em voz alta, depois de 100 a 1 de 10 em 10","Cronometre. Amanhã tente ser mais rápido.",10,"A"),
  M("c9","mem","Aprenda 3 gírias em {L} e use cada uma numa frase","Busque “gírias {L} atuais”. Anote no Caderno.",20,"BC"),
  M("c10","ime","Pense em {L} por 5 minutos","Nada de português na cabeça. Quando faltar palavra, descreva de outro jeito.",15),
  M("c11","fala","Grave um áudio de 1 minuto no WhatsApp para você mesmo sobre o seu dia","Mande no seu próprio número, sem roteiro. Ouça de volta e anote um erro.",25),
  M("c12","esc","Escreva um post curto (como um tweet) em {L} sobre algo que viu hoje","Máximo de 280 caracteres. Peça para uma IA corrigir.",15),
  M("c13","soc","Leia 10 comentários de um vídeo em {L} e responda a um deles","Comentários são a fala real das pessoas, cheia de expressões.",20,"BC"),
  M("c14","mem","Peça a uma IA um quiz de 10 perguntas sobre o que estudou esta semana","Diga o nível e os temas. Responda sem consultar.",25),
  M("c15","soc","Ensine 5 palavras novas para alguém","Explicar é a melhor forma de fixar.",15),
  M("c16","esc","Diário de gratidão: 3 coisas boas de hoje, em {L}","Três frases completas, com verbo no passado.",15),
  M("c17","fala","Leia uma notícia e grave sua opinião em 1 minuto","Concorda? Discorda? Por quê?",25,"BC"),
  M("c20","fala","Veja um vídeo de 5 minutos e conte a história para alguém","Em português vale, mas use as palavras-chave em {L}.",20),
  M("c21","fala","Fale com você mesmo no espelho por 2 minutos: planos de amanhã","Use o futuro. Olhe nos olhos, como numa conversa.",15),
  M("c22","esc","Escreva um e-mail curto para um amigo imaginário contando uma novidade","Saudação, novidade, pergunta de volta, despedida.",20),
  M("c23","ime","Ouça uma música e escreva a letra que conseguir entender","Depois compare com a letra oficial e marque o que escapou.",20),
  M("c24","mem","Liste 10 verbos que usou hoje e conjugue no passado","Em voz alta, com eu, você e ele.",20),
  M("c25","ime","Leia um cardápio em {L} e escolha seu pedido em voz alta","Busque um cardápio real de restaurante. Peça como se estivesse lá.",15,"AB"),
  M("c26","ime","Assista um stand-up curto em {L} e anote uma piada","Humor é o último nível de compreensão. Se riu, ganhou.",20,"C"),
  M("c27","esc","Resuma um episódio de série em 5 frases escritas","Quem, o quê, onde, o problema e o final.",20),
  M("c28","fala","Grave-se lendo um parágrafo e ache 3 erros de pronúncia","Compare com o áudio de um dicionário ou de um nativo.",20),
  M("c29","fala","Converse 10 minutos por voz com uma IA sobre o seu dia","Peça correções só no final.",30),
  M("c30","mem","Pegue a palavra que mais usou hoje e aprenda 3 sinônimos dela em {L}","Anote os três no Baralho de revisão com exemplo.",15),
  M("c31","soc","Mande uma mensagem em {L} para alguém que fala o idioma","Tandem, HelloTalk ou um amigo. Pergunte algo e espere a resposta.",25),
  M("c32","mem","Memorize a frase do dia e diga em voz alta 3 vezes ao longo do dia","De manhã, à tarde e à noite.",10),
  M("c33","ime","Pesquise um hobby seu no YouTube em {L} e assista 1 vídeo","Você já conhece o assunto: entende muito mais.",20),
  M("c34","fala","Escreva o roteiro da sua apresentação de 1 minuto e grave","Nome, cidade, trabalho, hobby e um plano.",25),
  M("c35","fala","Leia uma página de um livro em voz alta","Devagar, caprichando no som. Grave se quiser comparar.",15),
  M("c36","mem","Pegue 5 palavras do Caderno de erros e faça uma frase com cada","É assim que o erro vira acerto.",20),
  M("c37","soc","Deixe um comentário em {L} num vídeo ou post","Curto e educado. Veja se alguém responde.",20,"BC"),
  M("c38","ime","Assista 10 minutos de um canal de notícias ao vivo em {L}","Sem legenda. Tente pegar o tema de cada matéria.",20,"BC"),
  M("c39","esc","Escreva 3 perguntas que faria a um nativo e responda você mesmo","Depois use numa conversa de verdade.",15),
  M("c40","mem","Revise 20 cartões antigos em voz alta","Diga a palavra e uma frase com ela antes de virar o cartão.",15)
];
DUO.forEach(m => { m.url = "https://www.duolingo.com/learn"; });
/* missões de ferramenta: uma delas aparece todo dia, sorteada (Lyrics Training em qualquer idioma; X só em inglês) */
const LT = "https://lyricstraining.com/";
const XU = "https://x.com/compose/post";
const TOOLS = [
  M("m1","mus","Jogue 1 música no Lyrics Training no modo mais fácil","No site, escolha {L}, um clipe de que goste e complete as lacunas da letra enquanto o vídeo toca. Poucas lacunas: foque em ouvir.",20,"A",{url:LT}),
  M("m2","mus","Jogue 1 música no Lyrics Training com mais lacunas","Escolha um clipe em {L} e aumente a dificuldade: você escreve boa parte da letra enquanto ouve.",25,"B",{url:LT}),
  M("m3","mus","Jogue 1 música no Lyrics Training no modo difícil","Escolha um clipe em {L} e digite a letra quase toda. Depois confira os erros.",30,"C",{url:LT}),
  M("m4","mus","Jogue 3 músicas seguidas no Lyrics Training","Escolha 3 clipes curtos em {L}. Anote as palavras que mais errou.",30,"ABC",{url:LT}),
  M("m5","mus","Jogue uma música no Lyrics Training e leve 5 palavras para o Baralho de revisão","Escolha qualquer clipe em {L}. Escreva 5 palavras ou expressões da letra com a frase original.",25,"ABC",{url:LT}),
  M("x1","x","Publique no X 1 frase em inglês sobre o seu dia","Curta e simples, só em inglês. Se tiver dúvida, peça a uma IA para corrigir antes de postar.",20,"ABC",{url:XU, langs:["en"]}),
  M("x2","x","Responda em inglês a um post de alguém no X","Leia um post em inglês de uma conta de que você gosta e responda com 1 ou 2 frases.",20,"ABC",{url:XU, langs:["en"]}),
  M("x3","x","Poste no X uma expressão nova que aprendeu hoje, com um exemplo seu","Escreva a expressão e uma frase sua usando ela, em inglês.",20,"ABC",{url:XU, langs:["en"]}),
  M("x4","x","Publique no X sua opinião em inglês sobre um filme, jogo ou música","Três frases: o que viu, o que achou e por quê.",25,"BC",{url:XU, langs:["en"]}),
  M("x5","x","Escreva um post em inglês, peça a uma IA para corrigir e publique a versão certa","Compare o seu texto com o corrigido e anote o que mudou no Caderno.",25,"ABC",{url:XU, langs:["en"]}),
  M("x6","x","Publique no X uma mini-thread de 3 posts em inglês sobre algo que você domina","Um assunto do seu dia a dia. Cada post com 1 ideia só.",30,"BC",{url:XU, langs:["en"]}),
  M("x7","x","Siga 3 contas em inglês do seu interesse e comente em 1 post","Escolha contas sobre um hobby seu. Comentário curto, em inglês.",20,"ABC",{url:XU, langs:["en"]})
];
/* Duolingo: missão fixa de todo dia (a dica muda conforme o dia) */
const DUO_FIXED = M("d0","duo","Duolingo do dia","Faça pelo menos 1 lição hoje.",15,"ABC",{url:"https://www.duolingo.com/learn", min:10});
/* ---- tempo do dia: tudo cabe no tempo por dia das Configurações ----
   fixas (Duolingo, Exercícios, Escrita) + principais (plano do dia) + sorteadas */
const FIX_MIN = {duo:10, ex:10, wr:10};
function fixedList(p){
  const l = [{k:"duo", m:FIX_MIN.duo}];
  if ((typeof flowOn === "function" && flowOn(p)) || (typeof exDailyAvailable === "function" && exDailyAvailable(p))) l.push({k:"ex", m:FIX_MIN.ex});
  if (typeof wrAvailable === "function" && wrAvailable()) l.push({k:"wr", m:FIX_MIN.wr});
  return l;
}
function timeBudget(){
  const p = P(), B = p.cfg.min, F = fixedList(p).reduce((a,x) => a + x.m, 0), L = B - F;
  const v = L >= 10 ? Math.min(30, Math.max(5, Math.round(L*0.35/5)*5)) : 5; // tempo reservado às sorteadas
  return {B, F, v, main: Math.max(10, L - v)};
}
const mainBudget = () => timeBudget().main;
function duoDaily(dn){
  const tier = P().cfg.level.charAt(0), c = DUO.filter(m => m.tiers.includes(tier)), r = mulberry(dn*17 + 5)();
  const m = c[Math.floor(r*c.length)];
  return Object.assign({}, DUO_FIXED, {h: "Faça pelo menos 1 lição hoje. Para variar: " + m.t.charAt(0).toLowerCase() + m.t.slice(1) + "."});
}
const MALL = [DUO_FIXED, ...DUO, ...TOOLS, ...EXTRA];
const mById = id => MALL.find(m => m.id === id) ||
  (typeof id === "string" && id.startsWith("ex_") ? {id, tag:"mem", t:"Unidade de exercícios concluída", h:"", xp:18, tiers:"ABC"} : undefined) ||
  (typeof id === "string" && id.startsWith("wr_") ? {id, tag:"esc", t:"Página de escrita copiada", h:"", xp:15, tiers:"ABC"} : undefined) ||
  (typeof id === "string" && id.startsWith("rv_") ? {id, tag:"mem", t:"Baralho de revisão concluído", h:"", xp:12, tiers:"ABC"} : undefined);
function mulberry(a){ return function(){ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
/* sorteio do dia (além das 3 fixas: Duolingo, Exercícios e Escrita): 1 ferramenta (Lyrics Training ou X) + 3 extras de tipos diferentes; evita repetir as de ontem. Só missões que dá para repetir. */
function missionsGen(dn, avoid, v, salt){
  const tier = P().cfg.level.charAt(0), rng = mulberry(dn*31 + LANG_ORDER.indexOf(S.lang)*7 + 11 + (salt || 0)*977);
  const ok = m => m.tiers.includes(tier) && (!m.lv || m.lv.includes(P().cfg.level)) && (!m.langs || m.langs.includes(S.lang)) && !avoid.includes(m.id);
  const draw = c => c.length ? c[Math.floor(rng()*c.length)] : null;
  const tl = TOOLS.filter(ok), t = draw(tl.filter(m => m.min <= v).length ? tl.filter(m => m.min <= v) : tl);
  const out = [];
  if (t) out.push(t);
  let rem = v - (t ? t.min : 0);
  const used = new Set(t ? [t.tag] : []);
  if (dn % 3 === 0){ const tv = draw(EXTRA.filter(m => m.id.startsWith("tv") && ok(m))); if (tv){ out.push(tv); used.add(tv.tag); rem = Math.max(0, rem - tv.min); } } // a cada 3 dias entra série/filme
  if (dn % 3 === 1){ const pr = draw(EXTRA.filter(m => /^(pd|rd)/.test(m.id) && ok(m) && !out.includes(m))); if (pr){ out.push(pr); used.add(pr.tag); rem = Math.max(0, rem - pr.min); } } // em outro dia do ciclo entra podcast ou rádio
  for (let i = 0; i < 4 && rem >= 5; i++){
    const c = EXTRA.filter(m => ok(m) && !out.includes(m) && m.min <= rem), fresh = c.filter(m => !used.has(m.tag)), e = draw(fresh.length ? fresh : c);
    if (e){ out.push(e); used.add(e.tag); rem -= e.min; } else break;
  }
  return out;
}
function missionsFor(dn){ const sh = P().mshuf; if (sh && sh.date === T && dn === dayNum(NOW)){ const l = sh.ids.map(id => MALL.find(m => m.id === id)).filter(Boolean); (sh.shown || []).forEach(id => { const m = MALL.find(x => x.id === id); if (m && missionDone(id) && !l.includes(m)) l.push(m); }); if (l.length) return l; } const v = timeBudget().v; return missionsGen(dn, missionsGen(dn - 1, [], v).map(m => m.id), v); }
const MPOD = {
  en:["6 Minute English (BBC), All Ears English","The Daily (NYT), This American Life, Radiolab","BBC Radio 4, BBC World Service, NPR"],
  es:["Notes in Spanish, Hoy Hablamos","Radio Ambulante, El Podcast de Radio Nacional","RNE (Radio Nacional de España), Radio Nacional Argentina"],
  fr:["InnerFrench, RFI Journal en français facile","France Culture (podcasts), Les Savanturiers","France Inter, RFI, France Info"],
  ru:["Russian with Max, Russian Progress","Радио Маяк (подкасты), подкасты на Яндекс Музыке","Радио Маяк, Русское радио, Эхо Москвы"],
  tr:["Turkish Tea Time, Easy Turkish","Podcasts da Spotify em turco, programas da TRT","TRT Radyo 1, Radyo D, Power Türk"],
  ar:["ArabicPod101, Learn Arabic with Maha","Podcasts em árabe no Spotify, programas da Al Jazeera","Radio Monte Carlo Doualiya, BBC Arabic, Al Jazeera"]
};
const MSUG = {en:["Friends, The Office, Stranger Things","Forrest Gump, Inception, The Social Network"], es:["La Casa de Papel, Élite, Control Z","Relatos salvajes, El laberinto del fauno"], fr:["Lupin, Dix pour cent, Call My Agent","Amélie, Intouchables, La Haine"], ru:["Кухня, Склифосовский","Ирония судьбы, Холоп, Брат"], tr:["Kızılcık Şerbeti, Aşk-ı Memnu","Babam ve Oğlum, Eşkıya"], ar:["باب الحارة","عمارة يعقوبيان، وجدة"]};
const mText = s => s.replace(/\{L\}/g, CL().name.toLowerCase()).replace(/\{SUG1\}/g, (MSUG[S.lang] || MSUG.en)[0]).replace(/\{SUG2\}/g, (MSUG[S.lang] || MSUG.en)[1]).replace(/\{POD1\}/g, (MPOD[S.lang] || MPOD.en)[0]).replace(/\{POD2\}/g, (MPOD[S.lang] || MPOD.en)[1]).replace(/\{RADIO\}/g, (MPOD[S.lang] || MPOD.en)[2]);
const mlogToday = () => { const p = P(); if (!p.mlog) p.mlog = {}; if (!p.mlog[T]) p.mlog[T] = []; return p.mlog[T]; };
const missionDone = id => mlogToday().includes(id);
function toggleMission(id){
  const l = mlogToday(), i = l.indexOf(id);
  if (i >= 0) l.splice(i, 1); else l.push(id);
  save(); afterChange();
}
function countMissions(filter){
  const p = P(); let n = 0;
  for (const d in (p.mlog || {})) for (const id of p.mlog[d]) if (!filter || filter(id)) n++;
  return n;
}
const ACH = [
  {id:"first", n:"Primeira missão", d:"Concluiu a primeira missão", ic:"1", ok:p => Object.values(p.log).length > 0 || countMissions() > 0},
  {id:"day", n:"Dia completo", d:"Fechou todas as missões de um dia", ic:"✓", ok:p => !!p.fullDays},
  {id:"s7", n:"7 dias seguidos", d:"Uma semana sem falhar", ic:"7", ok:() => Math.max(streak(), bestStreak()) >= 7},
  {id:"s30", n:"30 dias seguidos", d:"Um mês de constância", ic:"30", ic2:true, ok:() => Math.max(streak(), bestStreak()) >= 30},
  {id:"m25", n:"25 missões extras", d:"Missões criativas concluídas", ic:"25", ok:() => countMissions(id => mById(id)) >= 25},
  {id:"m100", n:"100 missões extras", d:"Centenário de missões", ic:"100", ok:() => countMissions(id => mById(id)) >= 100},
  {id:"duo10", n:"Amigo da coruja", d:"10 missões do Duolingo", ic:"D", ok:() => countMissions(id => id.startsWith("d")) >= 10},
  {id:"map", n:"Mapa completo", d:"Terminou todas as etapas de um nível", ic:"★", ok:() => LEVELS.some(l => doneCount(l.id) === nStep(l.id))},
  {id:"notes", n:"Caderno aberto", d:"Primeira anotação no Caderno", ic:"✎", ok:p => !!(p.notes && p.notes.trim())},
  {id:"half", n:"Meio caminho", d:"48 das 96 etapas do idioma", ic:"½", ok:() => totalDone() >= 48}
];
const modalQ = [];
function showModal(eb, num, title, msg){
  modalQ.push({eb, num, title, msg}); if (modalQ.length === 1) nextModal();
}
function nextModal(){
  const o = document.getElementById("overlay"), it = modalQ[0];
  if (!it) { o.hidden = true; return; }
  document.getElementById("lvEb").textContent = it.eb; document.getElementById("lvNum").textContent = it.num;
  document.getElementById("lvTitle").textContent = it.title; document.getElementById("lvMsg").textContent = it.msg;
  const c = document.getElementById("confetti"); c.innerHTML = "";
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) for (let i=0;i<40;i++){ const s = document.createElement("i"); s.style.left = Math.random()*100 + "%"; s.style.animationDelay = Math.random()*.8 + "s"; s.style.background = ["var(--p1l)","var(--p2)","var(--p3)","#fff"][i%4]; c.appendChild(s); }
  o.hidden = false; document.getElementById("lvOk").focus();
}
document.getElementById("lvOk").onclick = () => { modalQ.shift(); nextModal(); };
document.getElementById("overlay").addEventListener("click", e => { if (e.target.id === "overlay") { modalQ.shift(); nextModal(); } });
function checkProgress(){
  const p = P(); if (!p.ach) p.ach = {};
  for (const a of ACH) if (!p.ach[a.id] && a.ok(p)) { p.ach[a.id] = T; save(); showModal("Conquista desbloqueada", a.ic, a.n, a.d + "."); }
}
function afterChange(){ updateLog(); save(); checkProgress(); renderAll(); }

/* ---------- embaralhar missões sorteadas (as concluídas ficam; só trocam à meia-noite) ---------- */
function shuffleMissions(){
  const p = P(), dn = dayNum(NOW), cur = missionsFor(dn), kept = cur.filter(m => missionDone(m.id));
  const salt = ((p.mshuf && p.mshuf.date === T) ? p.mshuf.salt : 0) + 1, v = timeBudget().v;
  const avoid = [...cur.map(m => m.id), ...missionsGen(dn - 1, [], v).map(m => m.id)];
  const fresh = missionsGen(dn, avoid, Math.max(5, v - kept.reduce((a,m) => a + m.min, 0)), salt).filter(m => !kept.includes(m));
  const shown = new Set([...((p.mshuf && p.mshuf.date === T && p.mshuf.shown) || []), ...cur.map(m => m.id)]); p.mshuf = {date:T, salt, shown:[...shown], ids:[...kept, ...fresh].map(m => m.id)};
  save();
}
const MPIPS = {1:[5],2:[1,9],3:[1,5,9],4:[1,3,7,9],5:[1,3,5,7,9],6:[1,3,4,6,7,9]};
const mdieHtml = () => `<div class="d3"><div class="d3in">${[[1,"f1"],[6,"f6"],[3,"f3"],[4,"f4"],[2,"f2"],[5,"f5"]].map(([n,c]) => `<div class="face ${c}">${[1,2,3,4,5,6,7,8,9].map(i => `<i${MPIPS[n].includes(i) ? ' class="on"' : ""}></i>`).join("")}</div>`).join("")}</div></div>`;
const MDIE_ROT = {1:[0,0],6:[0,180],3:[0,-90],4:[0,90],2:[-90,0],5:[90,0]};
function mshufSpin(done){
  const o = document.createElement("div"); o.className = "overlay mshuf-ov"; o.setAttribute("role", "status");
  const cols = ["#B8321F","#1D2A3A","#B8321F","#1D2A3A","#B8321F","#1D2A3A","#B8321F","#1D2A3A","#B8321F","#1D2A3A","#B8321F","#2F6B45"];
  const n = cols.length, r = 92, pt = (a, rr) => [(100 + rr*Math.cos(a*Math.PI/180)).toFixed(1), (100 + rr*Math.sin(a*Math.PI/180)).toFixed(1)];
  const seg = cols.map((c,i) => { const a0 = i*360/n - 90, a1 = a0 + 360/n, [x0,y0] = pt(a0,r), [x1,y1] = pt(a1,r), [t0,u0] = pt(a0,50), [t1,u1] = pt(a1,50);
    return `<path d="M${t0} ${u0} L${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1} L${t1} ${u1} A50 50 0 0 0 ${t0} ${u0}Z" fill="${c}" stroke="#E7C766" stroke-width="1.4"/>`; }).join("");
  const nums = cols.map((c,i) => { const a = i*360/n - 90 + 360/n/2, [x,y] = pt(a,72); return `<text x="${x}" y="${y}" fill="#F9F2DE" font-size="11" font-weight="700" text-anchor="middle" dominant-baseline="central" transform="rotate(${(a+90).toFixed(1)} ${x} ${y})">${i+1}</text>`; }).join("");
  const lights = Array.from({length:16}, (_,i) => { const [x,y] = pt(i*22.5, 103); return `<circle class="lt" cx="${x}" cy="${y}" r="2.6" style="animation-delay:${(i%2)*.18}s"/>`; }).join("");
  o.innerHTML = `<div class="mshuf-box"><div class="mshuf-stage"><div class="mshuf-pointer"></div>
    <svg class="mshuf-rim" viewBox="-10 -10 220 220" aria-hidden="true"><circle cx="100" cy="100" r="106" fill="#5A2214" stroke="#E7C766" stroke-width="3"/>${lights}</svg>
    <svg class="mshuf-wheel" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="94" fill="#2A1E14" stroke="#E7C766" stroke-width="3"/>${seg}${nums}<circle cx="100" cy="100" r="48" fill="#3A2415" stroke="#E7C766" stroke-width="2.5"/><circle cx="100" cy="100" r="30" fill="none" stroke="#E7C766" stroke-width="1" opacity=".5"/><circle cx="100" cy="100" r="14" fill="#E7C766"/><circle cx="100" cy="100" r="6" fill="#B8321F"/></svg>
    <div class="mshuf-ballorbit" id="mshufBall"><i></i></div></div><b>Sorteando novas missões…</b></div>`;
  document.body.appendChild(o);
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches, dur = reduce ? 800 : 3000;
  const w = o.querySelector(".mshuf-wheel"), ball = o.querySelector("#mshufBall");
  w.style.transition = `transform ${dur}ms cubic-bezier(.12,.72,.14,1)`; ball.style.transition = `transform ${dur}ms cubic-bezier(.2,.6,.15,1)`;
  requestAnimationFrame(() => { w.style.transform = `rotate(${1080 + Math.floor(Math.random()*360)}deg)`; ball.style.transform = `rotate(${-1440 - Math.floor(Math.random()*360)}deg)`; });
  setTimeout(() => { o.remove(); done(); }, dur + 550);
}

/* embaralhar as missões principais: mantém as concluídas e troca as demais por blocos de outro tipo de dia */
function shuffleMain(){
  const p = P(), cur = plan(p.cfg.level), kept = cur.filter(b => p.today.done.includes(b.k));
  const keptK = kept.map(b => b.k), curK = cur.map(b => b.k);
  const dayIds = [0,1,2,3,4,5,6].filter(d => DAYS[d].b.some(x => !curK.includes(x[0])));
  const pool = dayIds.length ? dayIds : [0,1,2,3,4,5,6];
  const d = pool[Math.floor(Math.random()*pool.length)];
  let fresh = DAYS[d].b.filter(x => !keptK.includes(x[0]) && !curK.includes(x[0])); if (!fresh.length) fresh = DAYS[d].b.filter(x => !keptK.includes(x[0]));
  let b = [...kept.map(x => [x.k, x.w]), ...fresh.map(x => [x[0], x[1]])];
  const sum = b.reduce((a,x) => a + x[1], 0); b = b.map(x => [x[0], x[1]/sum]);
  p.pshuf = {date:T, b}; save();
}
