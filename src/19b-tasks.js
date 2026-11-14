/* ---------- etapas de tarefa (alfabeto e números): imagem + tarefas + vídeo, sem unidades ---------- */
const STEPT = {}; // STEPT[idioma][nível][k] = {vid, kind, img(), tasks:[...]}
const flowTask = (lvl,k) => (STEPT[S.lang] && STEPT[S.lang][lvl] && STEPT[S.lang][lvl][k]) || null;
const tkTiles = (arr, cls) => `<div class="tkgrid ${cls||""}">${arr.map(x => `<div class="tkt"><b>${esc(x[0])}</b>${x[1] ? `<small>${esc(x[1])}</small>` : ""}</div>`).join("")}</div>`;
const tkLetters = (list) => tkTiles(list.map(x => [x[0], x[1]]), "let");
const tkCap = (t) => `<div class="tkcap">${esc(t)}</div>`;
const TK_LET = {
 en: "A:ay,B:bee,C:see,D:dee,E:ee,F:eff,G:gee,H:aitch,I:eye,J:jay,K:kay,L:el,M:em,N:en,O:oh,P:pea,Q:cue,R:are,S:ess,T:tea,U:you,V:vee,W:double you,X:ex,Y:why,Z:zee",
 es: "A:a,B:be,C:ce,D:de,E:e,F:efe,G:ge,H:hache,I:i,J:jota,K:ka,L:ele,M:eme,N:ene,Ñ:eñe,O:o,P:pe,Q:cu,R:erre,S:ese,T:te,U:u,V:uve,W:doble uve,X:equis,Y:ye,Z:zeta",
 fr: "A:a,B:bé,C:cé,D:dé,E:e,F:effe,G:gé,H:hache,I:i,J:ji,K:ka,L:elle,M:emme,N:enne,O:o,P:pé,Q:qu,R:erre,S:esse,T:té,U:u,V:vé,W:double vé,X:ix,Y:i grec,Z:zède",
 ru: "А:а,Б:бэ,В:вэ,Г:гэ,Д:дэ,Е:е,Ё:ё,Ж:жэ,З:зэ,И:и,Й:и краткое,К:ка,Л:эль,М:эм,Н:эн,О:о,П:пэ,Р:эр,С:эс,Т:тэ,У:у,Ф:эф,Х:ха,Ц:цэ,Ч:чэ,Ш:ша,Щ:ща,Ъ:твёрдый знак,Ы:ы,Ь:мягкий знак,Э:э,Ю:ю,Я:я",
 tr: "A:a,B:be,C:ce,Ç:çe,D:de,E:e,F:fe,G:ge,Ğ:yumuşak ge,H:he,I:ı,İ:i,J:je,K:ke,L:le,M:me,N:ne,O:o,Ö:ö,P:pe,R:re,S:se,Ş:şe,T:te,U:u,Ü:ü,V:ve,Y:ye,Z:ze"
};
const letImg = lang => () => tkCap("Alfabeto completo") + tkTiles(TK_LET[lang].split(",").map(x => { const [l,n] = x.split(":"); return [l + " " + l.toLocaleLowerCase(lang), n]; }), "let");
const TK_NUM = {
 en: ["0 zero","1 one","2 two","3 three","4 four","5 five","6 six","7 seven","8 eight","9 nine","10 ten","11 eleven","12 twelve","13 thirteen","14 fourteen","15 fifteen","16 sixteen","17 seventeen","18 eighteen","19 nineteen","20 twenty","30 thirty","40 forty","50 fifty","60 sixty","70 seventy","80 eighty","90 ninety","100 one hundred","1000 one thousand"],
 fr: ["0 zéro","1 un","2 deux","3 trois","4 quatre","5 cinq","6 six","7 sept","8 huit","9 neuf","10 dix","11 onze","12 douze","13 treize","14 quatorze","15 quinze","16 seize","17 dix-sept","18 dix-huit","19 dix-neuf","20 vingt","30 trente","40 quarante","50 cinquante","60 soixante","70 soixante-dix","80 quatre-vingts","90 quatre-vingt-dix","100 cent","1000 mille"],
 ru: ["0 ноль","1 один","2 два","3 три","4 четыре","5 пять","6 шесть","7 семь","8 восемь","9 девять","10 десять","11 одиннадцать","12 двенадцать","13 тринадцать","14 четырнадцать","15 пятнадцать","16 шестнадцать","17 семнадцать","18 восемнадцать","19 девятнадцать","20 двадцать","30 тридцать","40 сорок","50 пятьдесят","60 шестьдесят","70 семьдесят","80 восемьдесят","90 девяносто","100 сто","1000 тысяча"],
 tr: ["0 sıfır","1 bir","2 iki","3 üç","4 dört","5 beş","6 altı","7 yedi","8 sekiz","9 dokuz","10 on","11 on bir","12 on iki","13 on üç","14 on dört","15 on beş","16 on altı","17 on yedi","18 on sekiz","19 on dokuz","20 yirmi","30 otuz","40 kırk","50 elli","60 altmış","70 yetmiş","80 seksen","90 doksan","100 yüz","1000 bin"]
};
const TK_DAYS = {
 en: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], fr: ["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"],
 ru: ["понедельник","вторник","среда","четверг","пятница","суббота","воскресенье"], tr: ["pazartesi","salı","çarşamba","perşembe","cuma","cumartesi","pazar"]
};
const TK_MONTHS = {
 en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
 fr: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],
 ru: ["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"],
 tr: ["ocak","şubat","mart","nisan","mayıs","haziran","temmuz","ağustos","eylül","ekim","kasım","aralık"]
};
const numImg = lang => () => tkCap("Números") + tkTiles(TK_NUM[lang].map(x => { const i = x.indexOf(" "); return [x.slice(0,i), x.slice(i+1)]; }), "num") + tkCap("Dias da semana") + tkTiles(TK_DAYS[lang].map(x => [x,""]), "txt") + tkCap("Meses") + tkTiles(TK_MONTHS[lang].map(x => [x,""]), "txt");
const TKN = {en:"inglês", es:"espanhol", fr:"francês", ru:"russo", tr:"turco"};
const tkLetTasks = () => ["Assista ao vídeo e acompanhe a pronúncia de cada letra.", "Copie o alfabeto completo em uma folha, letra por letra (maiúscula e minúscula).", "Pronuncie o alfabeto completo 3 vezes, em voz alta, olhando a imagem."];
const tkNumTasks = ["Assista ao vídeo e acompanhe a pronúncia dos números, dos dias e dos meses.", "Copie os números, os dias da semana e os meses em uma folha.", "Pronuncie tudo 3 vezes, em voz alta, olhando a imagem."];
const tkQ = {en:["alfabeto em inglês pronúncia completa","números de 0 a 100 em inglês pronúncia dias e meses"], es:["alfabeto em espanhol pronúncia completa"], fr:["alfabeto em francês pronúncia completa","números de 0 a 100 em francês pronúncia dias e meses"], ru:["alfabeto russo pronúncia completa para iniciantes","números de 0 a 100 em russo pronúncia dias e meses"], tr:["alfabeto turco pronúncia completa","números de 0 a 100 em turco pronúncia dias e meses"]};
const tkDe = {en:"do inglês", es:"do espanhol", fr:"do francês", ru:"russo (cirílico)", tr:"turco"};
for (const lang of ["en","es","fr","ru","tr"]){
  STEPT[lang] = STEPT[lang] || {}; STEPT[lang].A1 = STEPT[lang].A1 || {};
  STEPT[lang].A1[1] = {vid: tkQ[lang][0], img: letImg(lang), tasks: tkLetTasks() };
  if (lang !== "es") STEPT[lang].A1[4] = {vid: tkQ[lang][1], img: numImg(lang), tasks: tkNumTasks};
}

const TK_SND = {
 en: ["th|think · this","sh|ship · she","ch|chair · cheese","j / g|job · giant","h|house · happy","r|red · right","w|water · we","ng|sing · long","i curto / ee|ship · sheep","a|cat · man","schwa|about · banana","v|very · visit","z|zoo · easy","final seco|dog · book","-ed|walked · played · wanted","-s|cats · dogs · buses","letra muda|knee · write · know"],
 es: ["j|jamón · rojo","g (e, i)|gente · girar","ll / y|calle · yo","ñ|año · niño","rr|perro · carro","r|pero · cara","z / c|zapato · cielo","h muda|hola · hombre","v = b|vaso · bien","qu / gu|queso · guitarra","ch|leche · noche","ditongos|bueno · tiene · aire"],
 fr: ["u|tu · rue","ou|vous · rouge","r|rue · rouge","an / en|enfant · dans","on|bon · nom","in / ain|vin · pain","eu|peu · heure","oi|moi · toi","ch|chat · chien","j|je · jour","gn|agneau · montagne","é / è / ê|été · père · fête","h mudo|homme · hôtel","liaison|les amis · vous avez","final mudo|petit · grand · vous"],
 ru: ["ы|мы · ты","щ|борщ · ещё","ж|жена · жить","ч|чай · час","ш|шапка · хорошо","ц|цена · цирк","р|рот · работа","х|хорошо · хлеб","ь (suave)|мать · день","duro x mole|брат · брать","o sem força|молоко · вода","й|мой · чай","э|это · эхо","ё|её · ёлка"],
 tr: ["ı|ışık · kız","ö|göz · öğrenci","ü|gül · üç","ç|çay · çocuk","ş|şeker · kış","ğ|dağ · yağmur","c|cam · ocak","j|jilet · jüri","r|araba · kara","y|yol · yaz","harmonia 2 vias|ev-ler · okul-lar","harmonia 4 vias|ev-im · okul-um"]
};
const sndImg = lang => () => tkCap("Tabela de sons") + tkTiles(TK_SND[lang].map(x => x.split("|")), "snd");
const tkSndTasks = ["Assista ao vídeo e repare em como cada som é feito.", "Copie a tabela de sons no caderno, com as palavras de exemplo.", "Leia a tabela completa e repita cada som 3 vezes, em voz alta."];
const tkSndQ = {en:"sons do inglês que não existem em português pronúncia th", es:"sons do espanhol diferentes do português pronúncia j rr ñ", fr:"sons do francês que não existem em português pronúncia u r nasais", ru:"sons difíceis do russo pronúncia ы щ ж", tr:"sons do turco pronúncia ı ö ü ç ş ğ harmonia vocálica"};
for (const lang of ["en","es","fr","ru","tr"]) STEPT[lang].A1[2] = {vid: tkSndQ[lang], img: sndImg(lang), tasks: tkSndTasks};

/* texto simplificado das etapas de tarefa */
const TK_DO = {en:"do inglês", es:"do espanhol", fr:"do francês", ru:"do russo", tr:"do turco"};
const TK_WHAT = {1:"as letras", 2:"os sons e as palavras", 4:"os números, os dias e os meses"};
for (const lang in STEPT) for (const k in STEPT[lang].A1){
  const t = STEPT[lang].A1[k], w = TK_WHAT[k] || "a tabela", kk = +k;
  t.what = `Escreva ${w} da tabela abaixo e pronuncie-${kk === 1 ? "as" : "os"} da forma correta ${TK_DO[lang]}. Repita 3 vezes e conclua.`;
  t.tasks = [`Escrevi ${w} da tabela no caderno.`, `Pronunciei ${kk === 1 ? "as letras" : "tudo"} da forma correta ${TK_DO[lang]}.`, "Repeti 3 vezes."];
}

/* ---------- árabe: alfabeto com as formas das letras, sons e números ---------- */
TK_DO.ar = "do árabe";
const AR_LET = "ا:alif,ب:baa,ت:taa,ث:thaa,ج:jiim,ح:Haa,خ:khaa,د:daal,ذ:dhaal,ر:raa,ز:zaay,س:siin,ش:shiin,ص:Saad,ض:Daad,ط:Taa,ظ:Zaa,ع:'ayn,غ:ghayn,ف:faa,ق:qaaf,ك:kaaf,ل:laam,م:miim,ن:nuun,ه:haa,و:waaw,ي:yaa".split(",").map(x => x.split(":"));
const AR_NOCONN = "ادذرزو";
const arLetImg = () => tkCap("Alfabeto completo · isolada, final, média, inicial") + `<div class="tkgrid ar">${AR_LET.map(([c,n]) => {
  const j = "‍", forms = AR_NOCONN.includes(c) ? [c + "", j + c].join(" ") : [j + c, j + c + j, c + j].join(" ");
  return `<div class="tkt" lang="ar"><b>${c}</b><span class="arf">${forms}</span><small lang="en" dir="ltr">${n}</small></div>`; }).join("")}</div>`;
const AR_NUM = [["0","٠","صفر"],["1","١","واحد"],["2","٢","اثنان"],["3","٣","ثلاثة"],["4","٤","أربعة"],["5","٥","خمسة"],["6","٦","ستة"],["7","٧","سبعة"],["8","٨","ثمانية"],["9","٩","تسعة"],["10","١٠","عشرة"],["11","١١","أحد عشر"],["12","١٢","اثنا عشر"],["13","١٣","ثلاثة عشر"],["14","١٤","أربعة عشر"],["15","١٥","خمسة عشر"],["16","١٦","ستة عشر"],["17","١٧","سبعة عشر"],["18","١٨","ثمانية عشر"],["19","١٩","تسعة عشر"],["20","٢٠","عشرون"],["30","٣٠","ثلاثون"],["40","٤٠","أربعون"],["50","٥٠","خمسون"],["60","٦٠","ستون"],["70","٧٠","سبعون"],["80","٨٠","ثمانون"],["90","٩٠","تسعون"],["100","١٠٠","مئة"],["1000","١٠٠٠","ألف"]];
const arTile = (big, small) => `<div class="tkt"><b>${esc(big)}</b>${small ? `<small lang="ar">${esc(small)}</small>` : ""}</div>`;
const arNumImg = () => tkCap("Números · 0 a 1000") + `<div class="tkgrid num">${AR_NUM.map(([w,a,n]) => arTile(w + " · " + a, n)).join("")}</div>` +
  tkCap("Dias da semana") + `<div class="tkgrid txt">${["الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت","الأحد"].map(x => `<div class="tkt"><b lang="ar">${x}</b></div>`).join("")}</div>` +
  tkCap("Meses") + `<div class="tkgrid txt">${["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"].map(x => `<div class="tkt"><b lang="ar">${x}</b></div>`).join("")}</div>`;
TK_SND.ar = ["ع|عَيْن · عَمَل","غ|غَرْب · غَدًا","ح|حُبّ · حَلِيب","خ|خُبْز · خَمْسَة","ق|قَلَم · قَمَر","ه|هَذَا · هُوَ","ص|صَبَاح · صَدِيق","ض|ضَوْء · ضَيْف","ط|طَالِب · طَعَام","ظ|ظُهْر · ظِلّ","ث (th de think)|ثَلَاثَة · ثَلْج","ذ (th de this)|ذَهَب · هَذَا","ش|شَمْس · شُكْرًا","ج|جَمِيل · جَدِيد","ر|رَجُل · رَبِيع","ء (hamza)|سُؤَال · مَاء","ة (ta marbuta)|مَدْرَسَة · مَكْتَبَة","ا و ي (vogais longas)|كِتَاب · نُور · كَبِير","ّ (shadda)|مُدَرِّس · كُتَّاب","ال solar|الشَّمْس · النُّور","ال lunar|الْقَمَر · الْكِتَاب"];
const arSndImg = () => tkCap("Tabela de sons") + `<div class="tkgrid snd">${TK_SND.ar.map(x => { const [a,b] = x.split("|"); return `<div class="tkt"><b lang="ar">${esc(a)}</b><small lang="ar">${esc(b)}</small></div>`; }).join("")}</div>`;
STEPT.ar = {A1:{
  1:{vid:"alfabeto árabe pronúncia completa para iniciantes", img: arLetImg},
  2:{vid:"sons do árabe que não existem em português pronúncia ع غ ح خ ق", img: arSndImg},
  4:{vid:"números de 0 a 100 em árabe pronúncia dias e meses", img: arNumImg}}};
for (const k in STEPT.ar.A1){
  const t = STEPT.ar.A1[k], w = TK_WHAT[k], kk = +k;
  t.what = `Escreva ${w} da tabela abaixo e pronuncie-${kk === 1 ? "as" : "os"} da forma correta do árabe. Repita 3 vezes e conclua.`;
  t.tasks = [`Escrevi ${w} da tabela no caderno.`, `Pronunciei ${kk === 1 ? "as letras" : "tudo"} da forma correta do árabe.`, "Repeti 3 vezes."];
}
