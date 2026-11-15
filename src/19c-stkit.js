/* ---------- Kit das etapas "práticas" (sem sessões próprias): exemplos + vídeo + exercícios ---------- */
const LN_PT = {en:"inglês", es:"espanhol", fr:"francês", ru:"russo", tr:"turco", ar:"árabe"};
/* modelos de apresentação (por idioma): saudações, blocos e um texto-modelo */
const KIT_INTRO = {
  en:{greet:[["Good morning!","Bom dia!"],["Good afternoon!","Boa tarde!"],["Good evening!","Boa noite! (ao chegar)"],["Hello! / Hi!","Olá! / Oi!"]],
      blocks:[["My name is Ana.","Meu nome é Ana."],["I'm from Brazil.","Eu sou do Brasil."],["I live in São Paulo.","Eu moro em São Paulo."],["I work as a nurse.","Eu trabalho como enfermeira."],["I like reading and cooking.","Eu gosto de ler e cozinhar."],["Nice to meet you!","Prazer em conhecer você!"]],
      model:["Good morning! My name is Ana. I'm from Brazil and I live in São Paulo. I work as a nurse. I like reading and cooking. Nice to meet you!","Bom dia! Meu nome é Ana. Sou do Brasil e moro em São Paulo. Trabalho como enfermeira. Gosto de ler e cozinhar. Prazer em conhecer você!"]},
  es:{greet:[["¡Buenos días!","Bom dia!"],["¡Buenas tardes!","Boa tarde!"],["¡Buenas noches!","Boa noite!"],["¡Hola!","Olá!"]],
      blocks:[["Me llamo Ana.","Meu nome é Ana."],["Soy de Brasil.","Eu sou do Brasil."],["Vivo en São Paulo.","Eu moro em São Paulo."],["Trabajo como enfermera.","Eu trabalho como enfermeira."],["Me gusta leer y cocinar.","Eu gosto de ler e cozinhar."],["¡Mucho gusto!","Prazer em conhecer!"]],
      model:["¡Buenos días! Me llamo Ana. Soy de Brasil y vivo en São Paulo. Trabajo como enfermera. Me gusta leer y cocinar. ¡Mucho gusto!","Bom dia! Meu nome é Ana. Sou do Brasil e moro em São Paulo. Trabalho como enfermeira. Gosto de ler e cozinhar. Prazer!"]},
  fr:{greet:[["Bonjour !","Bom dia! / Boa tarde!"],["Bonsoir !","Boa noite! (ao chegar)"],["Salut !","Oi! (informal)"],["Enchanté(e) !","Prazer!"]],
      blocks:[["Je m'appelle Ana.","Meu nome é Ana."],["Je viens du Brésil.","Eu venho do Brasil."],["J'habite à São Paulo.","Eu moro em São Paulo."],["Je travaille comme infirmière.","Eu trabalho como enfermeira."],["J'aime lire et cuisiner.","Eu gosto de ler e cozinhar."],["Enchantée de faire votre connaissance !","Prazer em conhecer você!"]],
      model:["Bonjour ! Je m'appelle Ana. Je viens du Brésil et j'habite à São Paulo. Je travaille comme infirmière. J'aime lire et cuisiner. Enchantée !","Bom dia! Meu nome é Ana. Venho do Brasil e moro em São Paulo. Trabalho como enfermeira. Gosto de ler e cozinhar. Prazer!"]},
  ru:{greet:[["Доброе утро!","Bom dia!"],["Добрый день!","Boa tarde!"],["Добрый вечер!","Boa noite! (ao chegar)"],["Привет!","Oi! (informal)"]],
      blocks:[["Меня зовут Ана.","Meu nome é Ana."],["Я из Бразилии.","Eu sou do Brasil."],["Я живу в Сан-Паулу.","Eu moro em São Paulo."],["Я работаю медсестрой.","Eu trabalho como enfermeira."],["Я люблю читать и готовить.","Eu gosto de ler e cozinhar."],["Очень приятно!","Muito prazer!"]],
      model:["Добрый день! Меня зовут Ана. Я из Бразилии и живу в Сан-Паулу. Я работаю медсестрой. Я люблю читать и готовить. Очень приятно!","Boa tarde! Meu nome é Ana. Sou do Brasil e moro em São Paulo. Trabalho como enfermeira. Gosto de ler e cozinhar. Muito prazer!"]},
  tr:{greet:[["Günaydın!","Bom dia!"],["İyi günler!","Boa tarde! / Bom dia!"],["İyi akşamlar!","Boa noite! (ao chegar)"],["Merhaba!","Olá!"]],
      blocks:[["Adım Ana.","Meu nome é Ana."],["Brezilyalıyım.","Eu sou brasileira."],["São Paulo'da yaşıyorum.","Eu moro em São Paulo."],["Hemşireyim.","Eu sou enfermeira."],["Kitap okumayı ve yemek yapmayı severim.","Eu gosto de ler e cozinhar."],["Memnun oldum!","Prazer!"]],
      model:["Merhaba! Adım Ana. Brezilyalıyım ve São Paulo'da yaşıyorum. Hemşireyim. Kitap okumayı ve yemek yapmayı severim. Memnun oldum!","Olá! Meu nome é Ana. Sou brasileira e moro em São Paulo. Sou enfermeira. Gosto de ler e cozinhar. Prazer!"]},
  ar:{greet:[["صباح الخير!","Bom dia!"],["مساء الخير!","Boa tarde / noite!"],["مرحبا!","Olá!"],["السلام عليكم","A paz esteja convosco (saudação formal)"]],
      blocks:[["اسمي آنا.","Meu nome é Ana."],["أنا من البرازيل.","Eu sou do Brasil."],["أسكن في ساو باولو.","Eu moro em São Paulo."],["أعمل ممرضة.","Eu trabalho como enfermeira."],["أحب القراءة والطبخ.","Eu gosto de ler e cozinhar."],["تشرفت بمعرفتك!","Prazer em conhecer você!"]],
      model:["مرحبا! اسمي آنا. أنا من البرازيل وأسكن في ساو باولو. أعمل ممرضة. أحب القراءة والطبخ. تشرفت بمعرفتك!","Olá! Meu nome é Ana. Sou do Brasil e moro em São Paulo. Trabalho como enfermeira. Gosto de ler e cozinhar. Prazer!"]}
};
/* perguntas básicas (pt, e uma coluna por idioma) */
const KIT_Q = [
  ["Qual é o seu nome?","What is your name?","¿Cómo te llamas?","Comment tu t'appelles ?","Как тебя зовут?","Adın ne?","ما اسمك؟"],
  ["De onde você é?","Where are you from?","¿De dónde eres?","D'où viens-tu ?","Откуда ты?","Nerelisin?","من أين أنت؟"],
  ["Onde você mora?","Where do you live?","¿Dónde vives?","Où habites-tu ?","Где ты живёшь?","Nerede yaşıyorsun?","أين تسكن؟"],
  ["Quantos anos você tem?","How old are you?","¿Cuántos años tienes?","Quel âge as-tu ?","Сколько тебе лет?","Kaç yaşındasın?","كم عمرك؟"],
  ["O que você faz?","What do you do?","¿A qué te dedicas?","Qu'est-ce que tu fais dans la vie ?","Чем ты занимаешься?","Ne iş yapıyorsun?","ماذا تعمل؟"],
  ["Você pode repetir, por favor?","Can you repeat that, please?","¿Puedes repetir, por favor?","Peux-tu répéter, s'il te plaît ?","Повтори, пожалуйста.","Tekrar eder misin, lütfen?","هل يمكنك أن تعيد من فضلك؟"]
];
const LCOL = {en:1, es:2, fr:3, ru:4, tr:5, ar:6};
function kitSayBtn(t){ return `<button type="button" class="exsay" data-say="${esc(t)}" aria-label="Ouvir">🔊 Ouvir</button>`; }
function kitRows(list, rtl){ return `<ul class="kitlist">${list.map(r => `<li${rtl ? ' dir="rtl" style="text-align:right"' : ""}><b>${esc(r[0])}</b> ${kitSayBtn(r[0])}<br><small style="direction:ltr;display:block;text-align:left">${esc(r[1])}</small></li>`).join("")}</ul>`; }
function kitExamples(st){
  const lang = S.lang, t = st.t, rtl = lang === "ar", I = KIT_INTRO[lang];
  if (/apresentar-se|apresentação de 1 minuto|5 frases sobre você/i.test(t) && I)
    return `<div class="stpanel kit"><div class="lbl">Como começar: saudações</div>${kitRows(I.greet, rtl)}
      <div class="lbl">Peças para montar a sua apresentação</div>${kitRows(I.blocks, rtl)}
      <div class="lbl">Exemplo completo</div><blockquote class="kitmodel"${rtl ? ' dir="rtl"' : ""}>${esc(I.model[0])} ${kitSayBtn(I.model[0])}<small style="display:block;direction:ltr;text-align:left">${esc(I.model[1])}</small></blockquote>
      <p class="note">Troque o nome, a cidade, o trabalho e o hobby pelos seus e grave em áudio.</p></div>`;
  if (/perguntas básicas/i.test(t)){ const c = LCOL[lang]; if (c) return `<div class="stpanel kit"><div class="lbl">Perguntas para treinar</div>${kitRows(KIT_Q.map(q => [q[c], q[0]]), rtl)}<p class="note">Faça cada pergunta em voz alta e responda sobre você.</p></div>`; }
  return "";
}
/* exercícios de prática: diálogos (fala/escuta/prova/pronúncia) ou cenas (leitura/escrita/outros) */
let stPrac = [], stPracKey = "";
function kitPool(lvl, area){
  const B = EX_BOOKS[S.lang]; if (!B) return [];
  const talk = /fala|escuta|prova|pron/i.test(area);
  return B.units.filter(u => u.lvl === lvl && (talk ? /^dg-/.test(u.id) : /^p[kq]-.*-a$/.test(u.id)));
}
function kitPick(lvl, k, area, shuffle){
  let pool = kitPool(lvl, area); if (!pool.length) return [];
  const tt = (typeof lvData === "function" && lvData(lvl).steps[k-1] || {}).t || "";
  const pref = /apresent|perguntas básicas|frases sobre|conversa|entrevista/i.test(tt) ? pool.filter(u => /Cumprimentos|família|ajuda|Entrevista|Conversa|Apresent|conselhos|opinião|Opinião/i.test(u.dgt || u.title)) : [];
  if (pref.length >= 1) pool = pref.length >= 2 ? pref : pref.concat(pool.filter(u => !pref.includes(u)));
  if (shuffle) return exShuffle(pool).slice(0, 2);
  let h = 0; for (const c of S.lang + lvl + k) h = (h*31 + c.charCodeAt(0)) | 0; h = Math.abs(h);
  return [pool[h % pool.length], pool[(h + 1) % pool.length]].filter((u, i, a) => a.indexOf(u) === i);
}
function stKitHtml(lvl, k, st){
  const area = flowAreaName(lvl, k), key = S.lang + "|" + lvl + "|" + k;
  if (stPracKey !== key){ stPracKey = key; stPrac = kitPick(lvl, k, area, false); exAns = {}; exGraded = {}; }
  const p = P(), q = [LN_PT[S.lang], st.t, "aula para brasileiros"].join(" ");
  let h = kitExamples(st);
  h += `<div class="stpanel kit"><div class="lbl">Aprenda mais</div><a class="btng stvid" href="https://www.youtube.com/results?search_query=${encodeURIComponent(q)}" target="_blank" rel="noopener"><svg class="ytic" viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" rx="5" fill="#e62117"/><path d="M11 5.5v9l8-4.5z" fill="#fff"/></svg> Ver vídeos sobre este tema no YouTube</a></div>`;
  if (stPrac.length){
    h += `<div class="stpanel kit"><div class="lbl">Exercícios para praticar</div><p class="note">Leia o exemplo de cada unidade, responda e clique em Concluir. Estes exercícios não mudam o seu progresso da etapa.</p></div>` +
      stPrac.map(u => { const d = !!exGraded[u.id];
        return `<div class="exunit" data-u="${u.id}"><div class="exunithead"><b>${esc(u.title)}</b><span class="exprog">${d ? "✓" : "0/" + u.items.length}</span></div>
          ${u.lead ? `<p class="exlead">${esc(u.lead)}</p>` : ""}${u.fig ? `<figure class="exfig">${u.fig.html}<figcaption>${esc(u.fig.cap)}</figcaption></figure>` : ""}${u.expl ? `<div class="exexpl">${u.expl}</div>` : ""}
          <ol class="exlist">${u.items.map((it, i) => exItemHtml(u, it, i, p, d)).join("")}</ol><div class="exdonearea" data-u="${u.id}"></div></div>`; }).join("") +
      `<div class="exchoice"><button type="button" class="btng exchoicebtn" id="stPracMore">Outros exercícios deste tema</button></div>`;
  }
  return h;
}
function stKitWire(body){
  stPrac.forEach(u => { u.items.forEach((it, i) => wireExItem(u, it, i)); renderDoneArea(u); });
  if (window.SOPA) SOPA.mount(body, true);
  const m = document.getElementById("stPracMore");
  if (m) m.onclick = () => { const {k, lvl} = stCtx; stPrac = kitPick(lvl, k, flowAreaName(lvl, k), true); exAns = {}; exGraded = {}; renderStep(); };
}
