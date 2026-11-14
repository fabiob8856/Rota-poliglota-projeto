/* ---------- títulos no idioma estudado, com a tradução em português embaixo ---------- */
const BI_T = {
 "Exercícios":["Exercises","Ejercicios","Exercices","Упражнения","Alıştırmalar","تَمَارِين"],
 "Escrita":["Writing","Escritura","Écriture","Письмо","Yazma","الْكِتَابَة"],
 "Livro didático":["Textbook","Libro de texto","Manuel scolaire","Учебник","Ders kitabı","الْكِتَابُ الْمَدْرَسِيّ"],
 "Baralho de revisão":["Review deck","Mazo de repaso","Paquet de révision","Колода для повторения","Tekrar destesi","مَجْمُوعَةُ الْمُرَاجَعَة"],
 "Baralhos":["Decks","Mazos","Paquets","Колоды","Desteler","مَجْمُوعَات"],
 "Configurações":["Settings","Ajustes","Paramètres","Настройки","Ayarlar","الْإِعْدَادَات"],
 "Frase do dia":["Phrase of the day","Frase del día","Phrase du jour","Фраза дня","Günün cümlesi","عِبَارَةُ الْيَوْم"],
 "Caderno de erros e dúvidas":["Notebook of mistakes and doubts","Cuaderno de errores y dudas","Carnet d'erreurs et de doutes","Тетрадь ошибок и вопросов","Hata ve soru defteri","دَفْتَرُ الْأَخْطَاءِ وَالْأَسْئِلَة"],
 "Onde estudar":["Where to study","Dónde estudiar","Où étudier","Где учиться","Nerede çalışmalı","أَيْنَ تَدْرُس"],
 "Faça uma prova de nivelamento":["Take a placement test","Haz una prueba de nivel","Passe un test de niveau","Пройди тест на уровень","Seviye testi yap","اِخْتَبِرْ مُسْتَوَاك"],
 "Missões fixas":["Daily missions","Misiones fijas","Missions fixes","Ежедневные задания","Sabit görevler","مَهَامُّ ثَابِتَة"],
 "Missões principais, em ordem":["Main missions, in order","Misiones principales, en orden","Missions principales, dans l'ordre","Основные задания по порядку","Ana görevler, sırayla","الْمَهَامُّ الرَّئِيسِيَّة بِالتَّرْتِيب"],
 "Missões sorteadas de hoje":["Today's random missions","Misiones sorteadas de hoy","Missions tirées au sort aujourd'hui","Случайные задания на сегодня","Bugünün rastgele görevleri","مَهَامُّ الْيَوْمِ الْعَشْوَائِيَّة"],
 "Sua semana":["Your week","Tu semana","Ta semaine","Твоя неделя","Haftan","أُسْبُوعُك"],
 "Treino rápido":["Quick practice","Entrenamiento rápido","Entraînement rapide","Быстрая тренировка","Hızlı antrenman","تَدْرِيبٌ سَرِيع"]
};
const BI_IDX = {en:0, es:1, fr:2, ru:3, tr:4, ar:5};
function biLookup(pt){
  const head = pt.split(" · ")[0].trim(), a = BI_T[head];
  if (a) return a[BI_IDX[S.lang]];
  const m = head.match(/^As (\d+) etapas do nível$/);
  if (m) return ["The "+m[1]+" steps of the level","Los "+m[1]+" pasos del nivel","Les "+m[1]+" étapes du niveau",""+m[1]+" этапов уровня","Seviyenin "+m[1]+" adımı","خُطُوَاتُ الْمُسْتَوَى ("+m[1]+")"][BI_IDX[S.lang]];
  return null;
}
let biBusy = false;
function bilingTitles(){
  if (biBusy) return; biBusy = true;
  try {
    document.querySelectorAll("h2.cardt, .flbl").forEach(el => {
      if (el.closest("#stepView") && el.tagName === "H2") return;
      const pt = el.dataset.pt || el.textContent.trim().replace(/\s+/g, " ");
      if (el.dataset.bi === S.lang && el.dataset.pt) return;
      const tr = biLookup(pt); if (!tr) return;
      el.dataset.pt = pt; el.dataset.bi = S.lang;
      const sub = `<small class="ptsub">${esc(pt)}</small>`;
      if (el.tagName === "H2"){
        const g = [...tr];
        el.innerHTML = (S.lang === "ar" ? esc(tr) : `<span class="ini">${esc(g[0])}</span>${esc(g.slice(1).join(""))}`) + sub;
      } else el.innerHTML = esc(tr) + sub;
    });
  } finally { biBusy = false; }
}
new MutationObserver(() => { if (!biBusy) requestAnimationFrame(bilingTitles); }).observe(document.body, {childList:true, subtree:true});
bilingTitles();
