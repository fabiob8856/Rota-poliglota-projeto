/* ---------- Conjugação e treino de verbos, em todos os idiomas e níveis ---------- */
(function(){
  const LN = {en:"inglês", es:"espanhol", fr:"francês", ru:"russo", tr:"turco", ar:"árabe"};
  const LV = ["A1","A2","B1","B2","C1","C2"];
  /* ============ INGLÊS ============ */
  const EN_P = ["I","you","he","she","we","they"], EN_BE = ["am","are","is","is","are","are"], EN_WAS = ["was","were","was","was","were","were"], EN_HAVE = ["have","have","has","has","have","have"];
  const EN_V = `be|was|been|being|ser/estar|is
have|had|had|having|ter|has
do|did|done|doing|fazer|does
go|went|gone|going|ir|goes
make|made|made|making|fazer/fabricar|makes
take|took|taken|taking|pegar/levar|takes
come|came|come|coming|vir|comes
see|saw|seen|seeing|ver|sees
get|got|got|getting|conseguir/obter|gets
give|gave|given|giving|dar|gives
know|knew|known|knowing|saber/conhecer|knows
think|thought|thought|thinking|pensar|thinks
want|wanted|wanted|wanting|querer|wants
work|worked|worked|working|trabalhar|works
play|played|played|playing|jogar/tocar|plays
study|studied|studied|studying|estudar|studies
live|lived|lived|living|morar/viver|lives
eat|ate|eaten|eating|comer|eats
drink|drank|drunk|drinking|beber|drinks
write|wrote|written|writing|escrever|writes
read|read|read|reading|ler|reads
speak|spoke|spoken|speaking|falar|speaks
buy|bought|bought|buying|comprar|buys
run|ran|run|running|correr|runs
like|liked|liked|liking|gostar|likes
need|needed|needed|needing|precisar|needs
help|helped|helped|helping|ajudar|helps
call|called|called|calling|ligar/chamar|calls
try|tried|tried|trying|tentar|tries
leave|left|left|leaving|sair/deixar|leaves
meet|met|met|meeting|encontrar|meets
bring|brought|brought|bringing|trazer|brings
feel|felt|felt|feeling|sentir|feels
find|found|found|finding|achar|finds
tell|told|told|telling|contar/dizer|tells
begin|began|begun|beginning|começar|begins
sleep|slept|slept|sleeping|dormir|sleeps
pay|paid|paid|paying|pagar|pays
sell|sold|sold|selling|vender|sells
start|started|started|starting|começar (algo)|starts
open|opened|opened|opening|abrir|opens
close|closed|closed|closing|fechar|closes
walk|walked|walked|walking|caminhar|walks
talk|talked|talked|talking|conversar|talks
watch|watched|watched|watching|assistir|watches
listen|listened|listened|listening|escutar|listens
wait|waited|waited|waiting|esperar|waits
ask|asked|asked|asking|perguntar|asks
answer|answered|answered|answering|responder|answers
use|used|used|using|usar|uses
love|loved|loved|loving|amar|loves
look|looked|looked|looking|olhar|looks
cook|cooked|cooked|cooking|cozinhar|cooks
clean|cleaned|cleaned|cleaning|limpar|cleans
learn|learned|learned|learning|aprender|learns
travel|traveled|traveled|traveling|viajar|travels
visit|visited|visited|visiting|visitar|visits
stay|stayed|stayed|staying|ficar|stays
move|moved|moved|moving|mover|moves
change|changed|changed|changing|mudar|changes
show|showed|shown|showing|mostrar|shows
believe|believed|believed|believing|acreditar|believes
remember|remembered|remembered|remembering|lembrar|remembers
wash|washed|washed|washing|lavar|washes
say|said|said|saying|dizer|says
send|sent|sent|sending|enviar|sends
sit|sat|sat|sitting|sentar|sits
stand|stood|stood|standing|ficar de pé|stands
lose|lost|lost|losing|perder|loses
win|won|won|winning|ganhar|wins
sing|sang|sung|singing|cantar|sings
swim|swam|swum|swimming|nadar|swims
fly|flew|flown|flying|voar|flies
drive|drove|driven|driving|dirigir|drives
ride|rode|ridden|riding|cavalgar|rides
wear|wore|worn|wearing|vestir|wears
understand|understood|understood|understanding|entender|understands
forget|forgot|forgotten|forgetting|esquecer|forgets
hear|heard|heard|hearing|ouvir|hears
keep|kept|kept|keeping|manter|keeps
hold|held|held|holding|segurar|holds
build|built|built|building|construir|builds
catch|caught|caught|catching|pegar|catches
choose|chose|chosen|choosing|escolher|chooses
fall|fell|fallen|falling|cair|falls`.split("\n").map(r => { const [inf, past, pp, ing, pt, s3] = r.split("|"); return {inf, past, pp, ing, pt, s3}; });
  const enForm = (v, t, p) => { const be = v.inf === "be";
    switch (t){
      case "pres": return be ? EN_BE[p] : (p === 2 || p === 3 ? v.s3 : v.inf);
      case "past": return be ? EN_WAS[p] : v.past;
      case "fut": return "will " + v.inf;
      case "pc": return EN_BE[p] + " " + v.ing;
      case "pp": return EN_HAVE[p] + " " + v.pp;
      case "pastc": return EN_WAS[p] + " " + v.ing;
      case "cond": return "would " + v.inf;
      case "pastp": return "had " + v.pp;
      case "futp": return "will have " + v.pp;
      case "ppc": return EN_HAVE[p] + " been " + v.ing;
      case "condp": return "would have " + v.pp;
    } };
  const EN_T = [
    {id:"pres", n:"presente simples", lvl:"A1", r:"No presente simples o verbo fica na forma base e só ganha -s (ou -es) com he/she: <b>he works</b>, <b>she studies</b>, <b>he goes</b>. Os verbos be e have têm formas próprias."},
    {id:"past", n:"passado simples", lvl:"A2", r:"O passado simples usa a mesma forma para todas as pessoas. Verbos regulares ganham -ed (worked); os irregulares mudam (go → went, eat → ate). Só o verbo be tem duas formas: was e were."},
    {id:"fut", n:"futuro com will", lvl:"A2", r:"O futuro com <b>will</b> usa will + verbo base, igual para todas as pessoas: I will work, she will work."},
    {id:"pc", n:"presente contínuo", lvl:"A2", r:"O presente contínuo é <b>am/is/are + verbo com -ing</b>: I am working, she is working, they are working."},
    {id:"pp", n:"present perfect", lvl:"B1", r:"O present perfect é <b>have/has + particípio</b> (I have worked, she has gone). Usamos para experiências e para algo que começou antes e ainda importa agora."},
    {id:"pastc", n:"passado contínuo", lvl:"B1", r:"O passado contínuo é <b>was/were + verbo com -ing</b>: I was working, they were working. Descreve uma ação em andamento no passado."},
    {id:"cond", n:"condicional (would)", lvl:"B2", r:"O condicional usa <b>would + verbo base</b>: I would work, she would go. Expressa hipóteses e pedidos educados."},
    {id:"pastp", n:"past perfect", lvl:"B2", r:"O past perfect é <b>had + particípio</b>, igual para todas as pessoas: I had worked. Mostra o que aconteceu antes de outro momento do passado."},
    {id:"futp", n:"future perfect", lvl:"C1", r:"O future perfect é <b>will have + particípio</b>: I will have worked. Indica algo que já estará concluído até certo momento do futuro."},
    {id:"ppc", n:"present perfect contínuo", lvl:"C1", r:"O present perfect contínuo é <b>have/has been + verbo com -ing</b>: I have been working. Enfatiza a duração de uma ação até agora."},
    {id:"condp", n:"condicional perfeito", lvl:"C2", r:"O condicional perfeito é <b>would have + particípio</b>: I would have gone. Fala do que teria acontecido no passado, mas não aconteceu."}];
  /* ============ ESPANHOL ============ */
  const ES_P = ["yo","tú","él","nosotros","vosotros","ellos"];
  const E = (a, b, c) => a.map(x => x);
  const esReg = {
    pres:{ar:["o","as","a","amos","áis","an"], er:["o","es","e","emos","éis","en"], ir:["o","es","e","imos","ís","en"]},
    indef:{ar:["é","aste","ó","amos","asteis","aron"], er:["í","iste","ió","imos","isteis","ieron"], ir:["í","iste","ió","imos","isteis","ieron"]},
    imperf:{ar:["aba","abas","aba","ábamos","abais","aban"], er:["ía","ías","ía","íamos","íais","ían"], ir:["ía","ías","ía","íamos","íais","ían"]},
    subj:{ar:["e","es","e","emos","éis","en"], er:["a","as","a","amos","áis","an"], ir:["a","as","a","amos","áis","an"]}};
  const esFutE = ["é","ás","á","emos","éis","án"], esCondE = ["ía","ías","ía","íamos","íais","ían"];
  const HABER = {pres:["he","has","ha","hemos","habéis","han"], imperf:["había","habías","había","habíamos","habíais","habían"], fut:["habré","habrás","habrá","habremos","habréis","habrán"], cond:["habría","habrías","habría","habríamos","habríais","habrían"], subj:["haya","hayas","haya","hayamos","hayáis","hayan"]};
  const S6 = s => s.split(" ");
  const ES_IRR = {
    ser:{pt:"ser", pres:S6("soy eres es somos sois son"), indef:S6("fui fuiste fue fuimos fuisteis fueron"), imperf:S6("era eras era éramos erais eran"), subj:S6("sea seas sea seamos seáis sean"), pp:"sido"},
    estar:{pt:"estar", pres:S6("estoy estás está estamos estáis están"), indef:S6("estuve estuviste estuvo estuvimos estuvisteis estuvieron"), subj:S6("esté estés esté estemos estéis estén"), pp:"estado"},
    tener:{pt:"ter", pres:S6("tengo tienes tiene tenemos tenéis tienen"), indef:S6("tuve tuviste tuvo tuvimos tuvisteis tuvieron"), fs:"tendr", subj:S6("tenga tengas tenga tengamos tengáis tengan"), pp:"tenido"},
    ir:{pt:"ir", pres:S6("voy vas va vamos vais van"), indef:S6("fui fuiste fue fuimos fuisteis fueron"), imperf:S6("iba ibas iba íbamos ibais iban"), subj:S6("vaya vayas vaya vayamos vayáis vayan"), pp:"ido"},
    hacer:{pt:"fazer", pres:S6("hago haces hace hacemos hacéis hacen"), indef:S6("hice hiciste hizo hicimos hicisteis hicieron"), fs:"har", subj:S6("haga hagas haga hagamos hagáis hagan"), pp:"hecho"},
    poder:{pt:"poder", pres:S6("puedo puedes puede podemos podéis pueden"), indef:S6("pude pudiste pudo pudimos pudisteis pudieron"), fs:"podr", subj:S6("pueda puedas pueda podamos podáis puedan"), pp:"podido"},
    querer:{pt:"querer", pres:S6("quiero quieres quiere queremos queréis quieren"), indef:S6("quise quisiste quiso quisimos quisisteis quisieron"), fs:"querr", subj:S6("quiera quieras quiera queramos queráis quieran"), pp:"querido"},
    decir:{pt:"dizer", pres:S6("digo dices dice decimos decís dicen"), indef:S6("dije dijiste dijo dijimos dijisteis dijeron"), fs:"dir", subj:S6("diga digas diga digamos digáis digan"), pp:"dicho"},
    venir:{pt:"vir", pres:S6("vengo vienes viene venimos venís vienen"), indef:S6("vine viniste vino vinimos vinisteis vinieron"), fs:"vendr", subj:S6("venga vengas venga vengamos vengáis vengan"), pp:"venido"},
    ver:{pt:"ver", pres:S6("veo ves ve vemos veis ven"), indef:S6("vi viste vio vimos visteis vieron"), imperf:S6("veía veías veía veíamos veíais veían"), subj:S6("vea veas vea veamos veáis vean"), pp:"visto"},
    dar:{pt:"dar", pres:S6("doy das da damos dais dan"), indef:S6("di diste dio dimos disteis dieron"), subj:S6("dé des dé demos deis den"), pp:"dado"},
    saber:{pt:"saber", pres:S6("sé sabes sabe sabemos sabéis saben"), indef:S6("supe supiste supo supimos supisteis supieron"), fs:"sabr", subj:S6("sepa sepas sepa sepamos sepáis sepan"), pp:"sabido"},
    poner:{pt:"pôr", pres:S6("pongo pones pone ponemos ponéis ponen"), indef:S6("puse pusiste puso pusimos pusisteis pusieron"), fs:"pondr", subj:S6("ponga pongas ponga pongamos pongáis pongan"), pp:"puesto"},
    salir:{pt:"sair", pres:S6("salgo sales sale salimos salís salen"), fs:"saldr", subj:S6("salga salgas salga salgamos salgáis salgan"), pp:"salido"}};
  const ES_REG = "hablar|falar,trabajar|trabalhar,estudiar|estudar,comprar|comprar,caminar|caminhar,cantar|cantar,bailar|dançar,ayudar|ajudar,llamar|chamar,necesitar|precisar,comer|comer,beber|beber,aprender|aprender,correr|correr,vender|vender,vivir|viver,escribir|escrever,abrir|abrir,recibir|receber,decidir|decidir,escuchar|ouvir,mirar|olhar,cocinar|cozinhar,limpiar|limpar,viajar|viajar,pasear|passear,esperar|esperar,usar|usar,tomar|tomar,llevar|levar,dejar|deixar,nadar|nadar,terminar|terminar,olvidar|esquecer,preguntar|perguntar,contestar|responder,cambiar|mudar,enseñar|ensinar,visitar|visitar,comprender|compreender,responder|responder,deber|dever,meter|meter,subir|subir,partir|partir,compartir|compartilhar,permitir|permitir,discutir|discutir,sufrir|sofrer".split(",").map(x => x.split("|"));
  const ES_V = ES_REG.map(([inf, pt]) => ({inf, pt})).concat(Object.keys(ES_IRR).map(k => ({inf:k, pt:ES_IRR[k].pt, irr:ES_IRR[k]})));
  const esPP = v => v.irr && v.irr.pp ? v.irr.pp : (v.inf === "escribir" ? "escrito" : v.inf === "abrir" ? "abierto" : v.inf.slice(0, -2) + (v.inf.endsWith("ar") ? "ado" : "ido"));
  const esForm = (v, t, p) => { const ty = v.inf.slice(-2), st = v.inf.slice(0, -2), I = v.irr;
    switch (t){
      case "pres": return I ? I.pres[p] : st + esReg.pres[ty][p];
      case "indef": return I && I.indef ? I.indef[p] : st + esReg.indef[ty][p];
      case "imperf": return I && I.imperf ? I.imperf[p] : st + esReg.imperf[ty][p];
      case "fut": return (I && I.fs ? I.fs : v.inf) + esFutE[p];
      case "cond": return (I && I.fs ? I.fs : v.inf) + esCondE[p];
      case "subj": return I && I.subj ? I.subj[p] : st + esReg.subj[ty][p];
      case "perf": return HABER.pres[p] + " " + esPP(v);
      case "pluc": return HABER.imperf[p] + " " + esPP(v);
      case "futp": return HABER.fut[p] + " " + esPP(v);
      case "condp": return HABER.cond[p] + " " + esPP(v);
      case "subjp": return HABER.subj[p] + " " + esPP(v);
    } };
  const ES_T = [
    {id:"pres", n:"presente", lvl:"A1", r:"No presente, a terminação mostra a pessoa: -ar → hablo, hablas, habla, hablamos, habláis, hablan. Os verbos em -er e -ir têm terminações um pouco diferentes. Muitos verbos comuns são irregulares (ser, tener, ir, hacer...)."},
    {id:"indef", n:"pretérito indefinido", lvl:"A2", r:"O indefinido conta ações concluídas no passado. Regulares: -ar → hablé, hablaste, habló, hablamos, hablasteis, hablaron; -er/-ir → comí, comiste, comió... Vários verbos têm raiz irregular (tuve, hice, fui)."},
    {id:"imperf", n:"pretérito imperfecto", lvl:"A2", r:"O imperfeito descreve hábitos e cenários no passado: hablaba, hablabas...; comía, comías... Só ser (era), ir (iba) e ver (veía) são irregulares."},
    {id:"fut", n:"futuro simples", lvl:"B1", r:"O futuro é o <b>infinitivo + é, ás, á, emos, éis, án</b>: hablaré, hablarás. Alguns verbos usam raiz própria (tendré, haré, podré, diré, vendré)."},
    {id:"perf", n:"pretérito perfecto compuesto", lvl:"B1", r:"É <b>haber no presente + particípio</b>: he hablado, has comido. O particípio de -ar termina em -ado e o de -er/-ir em -ido (com irregulares como hecho, dicho, visto)."},
    {id:"cond", n:"condicional", lvl:"B2", r:"O condicional é o <b>infinitivo + ía, ías, ía, íamos, íais, ían</b>: hablaría, comería. Usa as mesmas raízes irregulares do futuro (tendría, haría)."},
    {id:"subj", n:"presente de subjuntivo", lvl:"B2", r:"O subjuntivo troca a vogal: -ar usa <b>-e</b> (hable, hables) e -er/-ir usam <b>-a</b> (coma, viva). Aparece depois de quiero que, espero que, es posible que..."},
    {id:"pluc", n:"pluscuamperfecto", lvl:"C1", r:"É <b>haber no imperfeito + particípio</b>: había hablado, habías comido. Mostra o que já tinha acontecido antes de outro momento do passado."},
    {id:"futp", n:"futuro perfecto", lvl:"C1", r:"É <b>haber no futuro + particípio</b>: habré hablado. Indica algo que já terá acontecido até certo momento."},
    {id:"condp", n:"condicional perfecto", lvl:"C2", r:"É <b>haber no condicional + particípio</b>: habría hablado. Fala do que teria acontecido."},
    {id:"subjp", n:"pretérito perfecto de subjuntivo", lvl:"C2", r:"É <b>haber no presente do subjuntivo + particípio</b>: haya hablado, hayas comido. Aparece depois de expressões como espero que, no creo que..."}];
  /* ============ FRANCÊS ============ */
  const FR_P = ["je","tu","il","nous","vous","ils"];
  const FR_REG = "parler|falar|er,regarder|olhar|er,aimer|gostar|er,travailler|trabalhar|er,chanter|cantar|er,danser|dançar|er,écouter|escutar|er,habiter|morar|er,étudier|estudar|er,donner|dar|er,finir|terminar|ir,choisir|escolher|ir,réussir|conseguir|ir,grandir|crescer|ir,vendre|vender|re,attendre|esperar|re,répondre|responder|re,entendre|ouvir|re,perdre|perder|re,marcher|andar|er,chercher|procurar|er,trouver|achar|er,porter|carregar|er,penser|pensar|er,jouer|jogar|er,demander|pedir|er,montrer|mostrar|er,cuisiner|cozinhar|er,laver|lavar|er,fermer|fechar|er,visiter|visitar|er,téléphoner|telefonar|er,utiliser|usar|er,oublier|esquecer|er,préparer|preparar|er,expliquer|explicar|er,continuer|continuar|er,aider|ajudar|er,inviter|convidar|er,garder|guardar|er,remplir|encher|ir,obéir|obedecer|ir,réfléchir|refletir|ir,grossir|engordar|ir,maigrir|emagrecer|ir,agir|agir|ir,rendre|devolver|re,défendre|defender|re,confondre|confundir|re".split(",").map(x => x.split("|"));
  const FR_IRR = {
    "être":{pt:"ser/estar", pres:S6("suis es est sommes êtes sont"), imp:"ét", fs:"ser", pp:"été", subj:S6("sois sois soit soyons soyez soient"), aux:"avoir"},
    "avoir":{pt:"ter", pres:S6("ai as a avons avez ont"), imp:"av", fs:"aur", pp:"eu", subj:S6("aie aies ait ayons ayez aient"), aux:"avoir"},
    "aller":{pt:"ir", pres:S6("vais vas va allons allez vont"), imp:"all", fs:"ir", pp:"allé", subj:S6("aille ailles aille allions alliez aillent"), aux:"être"},
    "faire":{pt:"fazer", pres:S6("fais fais fait faisons faites font"), imp:"fais", fs:"fer", pp:"fait", subj:S6("fasse fasses fasse fassions fassiez fassent"), aux:"avoir"},
    "pouvoir":{pt:"poder", pres:S6("peux peux peut pouvons pouvez peuvent"), imp:"pouv", fs:"pourr", pp:"pu", subj:S6("puisse puisses puisse puissions puissiez puissent"), aux:"avoir"},
    "vouloir":{pt:"querer", pres:S6("veux veux veut voulons voulez veulent"), imp:"voul", fs:"voudr", pp:"voulu", subj:S6("veuille veuilles veuille voulions vouliez veuillent"), aux:"avoir"},
    "venir":{pt:"vir", pres:S6("viens viens vient venons venez viennent"), imp:"ven", fs:"viendr", pp:"venu", subj:S6("vienne viennes vienne venions veniez viennent"), aux:"être"},
    "voir":{pt:"ver", pres:S6("vois vois voit voyons voyez voient"), imp:"voy", fs:"verr", pp:"vu", subj:S6("voie voies voie voyions voyiez voient"), aux:"avoir"},
    "prendre":{pt:"pegar/tomar", pres:S6("prends prends prend prenons prenez prennent"), imp:"pren", fs:"prendr", pp:"pris", subj:S6("prenne prennes prenne prenions preniez prennent"), aux:"avoir"},
    "dire":{pt:"dizer", pres:S6("dis dis dit disons dites disent"), imp:"dis", fs:"dir", pp:"dit", subj:S6("dise dises dise disions disiez disent"), aux:"avoir"},
    "savoir":{pt:"saber", pres:S6("sais sais sait savons savez savent"), imp:"sav", fs:"saur", pp:"su", subj:S6("sache saches sache sachions sachiez sachent"), aux:"avoir"},
    "devoir":{pt:"dever", pres:S6("dois dois doit devons devez doivent"), imp:"dev", fs:"devr", pp:"dû", subj:S6("doive doives doive devions deviez doivent"), aux:"avoir"}};
  const FR_V = FR_REG.map(([inf, pt, g]) => ({inf, pt, g})).concat(Object.keys(FR_IRR).map(k => ({inf:k, pt:FR_IRR[k].pt, irr:FR_IRR[k]})));
  const frReg = {er:["e","es","e","ons","ez","ent"], ir:["is","is","it","issons","issez","issent"], re:["s","s","","ons","ez","ent"]};
  const frSubjReg = {er:["e","es","e","ions","iez","ent"], ir:["isse","isses","isse","issions","issiez","issent"], re:["e","es","e","ions","iez","ent"]};
  const frImpE = ["ais","ais","ait","ions","iez","aient"], frFutE = ["ai","as","a","ons","ez","ont"];
  const AVOIR = {pres:S6("ai as a avons avez ont"), imp:S6("avais avais avait avions aviez avaient"), fut:S6("aurai auras aura aurons aurez auront"), cond:S6("aurais aurais aurait aurions auriez auraient"), subj:S6("aie aies ait ayons ayez aient")};
  const ETRE = {pres:S6("suis es est sommes êtes sont"), imp:S6("étais étais était étions étiez étaient"), fut:S6("serai seras sera serons serez seront"), cond:S6("serais serais serait serions seriez seraient"), subj:S6("sois sois soit soyons soyez soient")};
  const frStem = v => v.irr ? null : v.inf.slice(0, -(v.g === "re" ? 2 : 2));
  const frPP = v => v.irr ? v.irr.pp : (v.g === "er" ? v.inf.slice(0, -2) + "é" : v.g === "ir" ? v.inf.slice(0, -1) : v.inf.slice(0, -2) + "u");
  const frAuxSet = v => (v.irr && v.irr.aux === "être") ? ETRE : AVOIR;
  const frPPp = (v, p) => { const b = frPP(v); return (v.irr && v.irr.aux === "être" && p >= 3) ? b + "s" : b; };
  const frForm = (v, t, p) => { const g = v.g, I = v.irr;
    switch (t){
      case "pres": return I ? I.pres[p] : (g === "re" ? v.inf.slice(0, -2) : v.inf.slice(0, -g.length)) + frReg[g][p];
      case "imp": { const st = I ? I.imp : (g === "ir" ? v.inf.slice(0, -1) + "ss" : g === "er" ? v.inf.slice(0, -2) : v.inf.slice(0, -2)); return st + frImpE[p]; }
      case "fut": case "cond": { const st = I ? I.fs : (g === "re" ? v.inf.slice(0, -1) : v.inf); return st + (t === "fut" ? frFutE[p] : frImpE[p]); }
      case "subj": return I ? I.subj[p] : v.inf.slice(0, -2) + frSubjReg[g][p];
      case "pc": return frAuxSet(v).pres[p] + " " + frPPp(v, p);
      case "plus": return frAuxSet(v).imp[p] + " " + frPPp(v, p);
      case "futa": return frAuxSet(v).fut[p] + " " + frPPp(v, p);
      case "condp": return frAuxSet(v).cond[p] + " " + frPPp(v, p);
      case "subjp": return frAuxSet(v).subj[p] + " " + frPPp(v, p);
    } };
  const FR_T = [
    {id:"pres", n:"présent", lvl:"A1", r:"No présent: -er → e, es, e, ons, ez, ent (je parle); -ir → is, is, it, issons, issez, issent (je finis); -re → s, s, —, ons, ez, ent (je vends). Os verbos mais usados são irregulares: être, avoir, aller, faire."},
    {id:"pc", n:"passé composé", lvl:"A2", r:"O passé composé é <b>avoir (ou être) no presente + particípio</b>: j’ai parlé, nous avons fini. Aller e venir usam être e o particípio concorda com o sujeito; aqui usamos o masculino (il est allé, ils sont allés)."},
    {id:"imp", n:"imparfait", lvl:"A2", r:"O imparfait usa o radical de <b>nous</b> no presente + ais, ais, ait, ions, iez, aient: nous parlons → je parlais. Só être é irregular (j’étais)."},
    {id:"fut", n:"futur simple", lvl:"B1", r:"O futur é o <b>infinitivo + ai, as, a, ons, ez, ont</b> (je parlerai; nos verbos em -re some o e: je vendrai). Alguns têm raiz própria: serai, aurai, irai, ferai, pourrai, viendrai."},
    {id:"cond", n:"conditionnel présent", lvl:"B2", r:"O condicional usa a mesma raiz do futuro + as terminações do imparfait: je parlerais, nous irions, ils auraient."},
    {id:"subj", n:"subjonctif présent", lvl:"B2", r:"O subjuntivo vem depois de que em ideias de vontade, dúvida e necessidade (il faut que...). Usa a raiz de ils no presente + e, es, e, ions, iez, ent: que je parle. Vários verbos são irregulares (que je sois, que j’aie)."},
    {id:"plus", n:"plus-que-parfait", lvl:"C1", r:"É <b>avoir (ou être) no imparfait + particípio</b>: j’avais parlé, il était allé. Mostra o que já tinha acontecido antes de outro momento do passado."},
    {id:"futa", n:"futur antérieur", lvl:"C1", r:"É <b>avoir (ou être) no futuro + particípio</b>: j’aurai fini. Indica algo que já terá acontecido até certo momento."},
    {id:"condp", n:"conditionnel passé", lvl:"C2", r:"É <b>avoir (ou être) no condicional + particípio</b>: j’aurais parlé. Fala do que teria acontecido."},
    {id:"subjp", n:"subjonctif passé", lvl:"C2", r:"É <b>avoir (ou être) no subjuntivo + particípio</b>: que j’aie parlé, qu’il soit allé. Mostra uma ação já concluída em frases de dúvida ou sentimento."}];
  /* ============ RUSSO ============ */
  const RU_P = ["я","ты","он","мы","вы","они"], RU_PAST = ["я (m.)","я (f.)","он","она","оно","они"];
  const RU_V = [
    ["читать","ler","читаю читаешь читает читаем читаете читают","читал","читала","читало","читали","прочитать","прочитаю прочитаешь прочитает прочитаем прочитаете прочитают","прочитал","прочитала","прочитало","прочитали","читай","читайте"],
    ["работать","trabalhar","работаю работаешь работает работаем работаете работают","работал","работала","работало","работали","","","","","","","работай","работайте"],
    ["делать","fazer","делаю делаешь делает делаем делаете делают","делал","делала","делало","делали","сделать","сделаю сделаешь сделает сделаем сделаете сделают","сделал","сделала","сделало","сделали","делай","делайте"],
    ["знать","saber","знаю знаешь знает знаем знаете знают","знал","знала","знало","знали","","","","","","","знай","знайте"],
    ["думать","pensar","думаю думаешь думает думаем думаете думают","думал","думала","думало","думали","","","","","","","думай","думайте"],
    ["играть","jogar/tocar","играю играешь играет играем играете играют","играл","играла","играло","играли","","","","","","","играй","играйте"],
    ["говорить","falar","говорю говоришь говорит говорим говорите говорят","говорил","говорила","говорило","говорили","сказать","скажу скажешь скажет скажем скажете скажут","сказал","сказала","сказало","сказали","говори","говорите"],
    ["любить","amar/gostar","люблю любишь любит любим любите любят","любил","любила","любило","любили","","","","","","","люби","любите"],
    ["видеть","ver","вижу видишь видит видим видите видят","видел","видела","видело","видели","увидеть","увижу увидишь увидит увидим увидите увидят","увидел","увидела","увидело","увидели","",""],
    ["смотреть","olhar/assistir","смотрю смотришь смотрит смотрим смотрите смотрят","смотрел","смотрела","смотрело","смотрели","посмотреть","посмотрю посмотришь посмотрит посмотрим посмотрите посмотрят","посмотрел","посмотрела","посмотрело","посмотрели","смотри","смотрите"],
    ["жить","morar/viver","живу живёшь живёт живём живёте живут","жил","жила","жило","жили","","","","","","","живи","живите"],
    ["писать","escrever","пишу пишешь пишет пишем пишете пишут","писал","писала","писало","писали","написать","напишу напишешь напишет напишем напишете напишут","написал","написала","написало","написали","пиши","пишите"],
    ["идти","ir (a pé)","иду идёшь идёт идём идёте идут","шёл","шла","шло","шли","","","","","","","иди","идите"],
    ["хотеть","querer","хочу хочешь хочет хотим хотите хотят","хотел","хотела","хотело","хотели","","","","","","","",""],
    ["мочь","poder","могу можешь может можем можете могут","мог","могла","могло","могли","","","","","","","",""],
    ["пить","beber","пью пьёшь пьёт пьём пьёте пьют","пил","пила","пило","пили","выпить","выпью выпьешь выпьет выпьем выпьете выпьют","выпил","выпила","выпило","выпили","пей","пейте"],
    ["купить","comprar (perfectivo)","","","","","","купить","куплю купишь купит купим купите купят","купил","купила","купило","купили","купи","купите"],
    ["открыть","abrir (perfectivo)","","","","","","открыть","открою откроешь откроет откроем откроете откроют","открыл","открыла","открыло","открыли","открой","откройте"],
    ["понять","entender (perfectivo)","","","","","","понять","пойму поймёшь поймёт поймём поймёте поймут","понял","поняла","поняло","поняли","пойми","поймите"],
    ["решить","decidir (perfectivo)","","","","","","решить","решу решишь решит решим решите решат","решил","решила","решило","решили","реши","решите"],
    ["учить","aprender/ensinar","учу учишь учит учим учите учат","учил","учила","учило","учили","","","","","","","учи","учите"],
    ["готовить","cozinhar","готовлю готовишь готовит готовим готовите готовят","готовил","готовила","готовило","готовили","","","","","","","готовь","готовьте"],
    ["ждать","esperar","жду ждёшь ждёт ждём ждёте ждут","ждал","ждала","ждало","ждали","","","","","","","жди","ждите"],
    ["помнить","lembrar","помню помнишь помнит помним помните помнят","помнил","помнила","помнило","помнили","","","","","","","помни","помните"],
    ["спать","dormir","сплю спишь спит спим спите спят","спал","спала","спало","спали","","","","","","","спи","спите"],
    ["ехать","ir (de veículo)","еду едешь едет едем едете едут","ехал","ехала","ехало","ехали","","","","","","","поезжай","поезжайте"],
    ["бежать","correr","бегу бежишь бежит бежим бежите бегут","бежал","бежала","бежало","бежали","","","","","","","беги","бегите"],
    ["стоять","ficar de pé","стою стоишь стоит стоим стоите стоят","стоял","стояла","стояло","стояли","","","","","","","стой","стойте"],
    ["сидеть","estar sentado","сижу сидишь сидит сидим сидите сидят","сидел","сидела","сидело","сидели","","","","","","","сиди","сидите"],
    ["ходить","ir (habitual, a pé)","хожу ходишь ходит ходим ходите ходят","ходил","ходила","ходило","ходили","","","","","","","ходи","ходите"],
    ["ездить","ir (habitual, de veículo)","езжу ездишь ездит ездим ездите ездят","ездил","ездила","ездило","ездили","","","","","","","езди","ездите"],
    ["учиться","estudar","учусь учишься учится учимся учитесь учатся","учился","училась","училось","учились","","","","","","","учись","учитесь"],
    ["слушать","escutar","слушаю слушаешь слушает слушаем слушаете слушают","слушал","слушала","слушало","слушали","","","","","","","слушай","слушайте"],
    ["гулять","passear","гуляю гуляешь гуляет гуляем гуляете гуляют","гулял","гуляла","гуляло","гуляли","","","","","","","гуляй","гуляйте"],
    ["отдыхать","descansar","отдыхаю отдыхаешь отдыхает отдыхаем отдыхаете отдыхают","отдыхал","отдыхала","отдыхало","отдыхали","","","","","","","отдыхай","отдыхайте"],
    ["помогать","ajudar","помогаю помогаешь помогает помогаем помогаете помогают","помогал","помогала","помогало","помогали","","","","","","","помогай","помогайте"],
    ["спрашивать","perguntar","спрашиваю спрашиваешь спрашивает спрашиваем спрашиваете спрашивают","спрашивал","спрашивала","спрашивало","спрашивали","","","","","","","спрашивай","спрашивайте"],
    ["отвечать","responder","отвечаю отвечаешь отвечает отвечаем отвечаете отвечают","отвечал","отвечала","отвечало","отвечали","","","","","","","отвечай","отвечайте"],
    ["начинать","começar","начинаю начинаешь начинает начинаем начинаете начинают","начинал","начинала","начинало","начинали","","","","","","","начинай","начинайте"],
    ["изучать","estudar (a fundo)","изучаю изучаешь изучает изучаем изучаете изучают","изучал","изучала","изучало","изучали","","","","","","","изучай","изучайте"],
    ["звонить","ligar","звоню звонишь звонит звоним звоните звонят","звонил","звонила","звонило","звонили","","","","","","","звони","звоните"],
    ["есть","comer","ем ешь ест едим едите едят","ел","ела","ело","ели","","","","","","","ешь","ешьте"],
    ["брать","pegar","беру берёшь берёт берём берёте берут","брал","брала","брало","брали","","","","","","","бери","берите"]
  ].map(r => ({inf:r[0], pt:r[1], pres:r[2] ? r[2].split(" ") : null, past:[r[3], r[4], r[5], r[6]], pinf:r[7], pfut:r[8] ? r[8].split(" ") : null, ppast:[r[9], r[10], r[11], r[12]], imp:[r[13], r[14]]}));
  const RU_BUDU = ["буду","будешь","будет","будем","будете","будут"];
  const ruForm = (v, t, p) => { const x = t === "pres" ? v.pres[p] : t === "fut" ? RU_BUDU[p] + " " + v.inf : t === "pfut" ? v.pfut[p] : t === "pastp" ? v.ppast[[0,1,2,3,2,3][p]] : null;
    if (t === "past") return v.past[[0,1,2,3,2,3][p]];
    return x; };
  /* ============ TURCO ============ */
  const TR_P = ["ben","sen","o","biz","siz","onlar"];
  const V_BACK = "aıou", V_ALL = "aıoueiöü", h4 = v => ({a:"ı", "ı":"ı", e:"i", i:"i", o:"u", u:"u", "ö":"ü", "ü":"ü"})[v], h2 = v => "aıou".includes(v) ? "a" : "e";
  const lastV = s => { for (let i = s.length - 1; i >= 0; i--) if (V_ALL.includes(s[i])) return s[i]; return "e"; };
  const endsV = s => V_ALL.includes(s[s.length - 1]);
  const TR_V = [
    ["gelmek","vir","gel","gel","gel","gelir"],["gitmek","ir","git","gid","git","gider"],["yapmak","fazer","yap","yap","yap","yapar"],["yazmak","escrever","yaz","yaz","yaz","yazar"],
    ["okumak","ler","oku","oku","oku","okur"],["almak","pegar/comprar","al","al","al","alır"],["vermek","dar","ver","ver","ver","verir"],["görmek","ver","gör","gör","gör","görür"],
    ["bilmek","saber","bil","bil","bil","bilir"],["bulmak","achar","bul","bul","bul","bulur"],["kalmak","ficar","kal","kal","kal","kalır"],["bakmak","olhar","bak","bak","bak","bakar"],
    ["anlamak","entender","anla","anla","anla","anlar"],["başlamak","começar","başla","başla","başla","başlar"],["çalışmak","trabalhar","çalış","çalış","çalış","çalışır"],
    ["konuşmak","falar","konuş","konuş","konuş","konuşur"],["oturmak","sentar","otur","otur","otur","oturur"],["sevmek","amar","sev","sev","sev","sever"],["istemek","querer","iste","iste","iste","ister"],
    ["içmek","beber","iç","iç","iç","içer"],["etmek","fazer (aux.)","et","ed","et","eder"],["yemek","comer","ye","yi","ye","yer","yi"],["demek","dizer","de","di","de","der","di"],["açmak","abrir","aç","aç","aç","açar"],["kapamak","fechar","kapa","kapa","kapa","kapar"],["düşünmek","pensar","düşün","düşün","düşün","düşünür"],["beklemek","esperar","bekle","bekle","bekle","bekler"],["öğrenmek","aprender","öğren","öğren","öğren","öğrenir"],["öğretmek","ensinar","öğret","öğret","öğret","öğretir"],["sormak","perguntar","sor","sor","sor","sorar"],["durmak","parar","dur","dur","dur","durur"],["koşmak","correr","koş","koş","koş","koşar"],["yürümek","caminhar","yürü","yürü","yürü","yürür"],["uyumak","dormir","uyu","uyu","uyu","uyur"],["kalkmak","levantar","kalk","kalk","kalk","kalkar"],["girmek","entrar","gir","gir","gir","girer"],["çıkmak","sair","çık","çık","çık","çıkar"],["gülmek","rir","gül","gül","gül","güler"],["ağlamak","chorar","ağla","ağla","ağla","ağlar"],["satmak","vender","sat","sat","sat","satar"],["taşımak","carregar","taşı","taşı","taşı","taşır"],["kullanmak","usar","kullan","kullan","kullan","kullanır"],["aramak","procurar/ligar","ara","ara","ara","arar"],["unutmak","esquecer","unut","unut","unut","unutur"],["hatırlamak","lembrar","hatırla","hatırla","hatırla","hatırlar"],["seçmek","escolher","seç","seç","seç","seçer"],["göndermek","enviar","gönder","gönder","gönder","gönderir"],["değiştirmek","mudar","değiştir","değiştir","değiştir","değiştirir"],["bitirmek","terminar","bitir","bitir","bitir","bitirir"],["dinlemek","escutar","dinle","dinle","dinle","dinler"],["izlemek","assistir","izle","izle","izle","izler"],["pişirmek","cozinhar","pişir","pişir","pişir","pişirir"],["yıkamak","lavar","yıka","yıka","yıka","yıkar"],["temizlemek","limpar","temizle","temizle","temizle","temizler"],["gezmek","passear","gez","gez","gez","gezer"],["binmek","embarcar","bin","bin","bin","biner"],["inmek","descer","in","in","in","iner"],["ulaşmak","chegar","ulaş","ulaş","ulaş","ulaşır"],["kazanmak","ganhar","kazan","kazan","kazan","kazanır"],["kaybetmek","perder","kaybet","kaybed","kaybet","kaybeder"],["buluşmak","encontrar-se","buluş","buluş","buluş","buluşur"],["anlatmak","contar","anlat","anlat","anlat","anlatır"],["çizmek","desenhar","çiz","çiz","çiz","çizer"]
  ].map(r => ({inf:r[0], pt:r[1], stem:r[2], vs:r[3], base:r[4], aor:r[5], prS:r[6] || null}));
  const trPers = {pres:["um","sun","","uz","sunuz","lar"]};
  const trForm = (v, t, p) => {
    const bare = v.base;
    if (t === "pres"){ let b = v.prS || v.vs; // raiz antes de -yor
      let core; if (v.prS) core = b + "yor"; else if (/[ae]$/.test(b)) core = b.slice(0, -1) + h4(b[b.length - 1]) + "yor"; else if (endsV(b)) core = b + "yor"; else core = b + h4(lastV(b)) + "yor";
      return core + trPers.pres[p]; }
    if (t === "past"){ const b = bare, tt = "çfhkpsşt".includes(b[b.length - 1]) ? "t" : "d", vv = h4(lastV(b)), core = b + tt + vv;
      return core + ["m","n","","k", "n" + vv + "z", "ler".replace("e", h2(lastV(core)))][p].replace(/^lar$/, "lar") ; }
    if (t === "fut"){ let b = v.prS || v.vs, a = h2(lastV(b)) === "a" ? "acak" : "ecek"; if (endsV(b) && !v.prS) b += "y"; else if (v.prS) b = v.prS + "y";
      const core = b + a, vv = h4(a[0]); return p === 0 ? b + a.slice(0, -1) + "ğ" + vv + "m" : p === 1 ? core + "s" + vv + "n" : p === 2 ? core : p === 3 ? b + a.slice(0, -1) + "ğ" + vv + "z" : p === 4 ? core + "s" + vv + "n" + vv + "z" : core + (a[0] === "a" ? "lar" : "ler"); }
    if (t === "aor"){ const a = v.aor, vv = h4(lastV(a)); return p === 0 ? a + vv + "m" : p === 1 ? a + "s" + vv + "n" : p === 2 ? a : p === 3 ? a + vv + "z" : p === 4 ? a + "s" + vv + "n" + vv + "z" : a + (h2(lastV(a)) === "a" ? "lar" : "ler"); }
    if (t === "negpres"){ const vv = h4(lastV(bare)), core = bare + "m" + vv + "yor"; return core + trPers.pres[p]; }
    if (t === "negpast"){ const m = bare + "m" + h2(lastV(bare)), vv = h4(lastV(m)), core = m + "d" + vv; return core + ["m","n","","k", "n" + vv + "z", h2(lastV(core)) === "a" ? "lar" : "ler"][p]; }
  };
  /* ============ ÁRABE (verbos regulares, sem vogais curtas) ============ */
  const AR_P = ["أنا","أنتَ","هو","هي","نحن","هم"];
  const AR_V = "كتب|escrever,درس|estudar,فتح|abrir,شرب|beber,دخل|entrar,خرج|sair,جلس|sentar-se,ذهب|ir,سمع|ouvir,فهم|entender,عمل|trabalhar,سكن|morar,نزل|descer,ركب|montar/embarcar,لعب|jogar,طلب|pedir,حمل|carregar,سأل|perguntar,قرأ|ler,رسم|desenhar,سبح|nadar,ضحك|rir,علم|saber,جمع|juntar,حفظ|memorizar,دفع|pagar,رفع|levantar,شكر|agradecer,ضرب|bater,طبخ|cozinhar,غسل|lavar,قطع|cortar,كسر|quebrar,لبس|vestir,نظر|olhar,هرب|fugir,سرق|roubar,حضر|comparecer,عبر|atravessar,صنع|fabricar,منع|proibir,رجع|voltar,سمح|permitir".split(",").map(x => { const [r, pt] = x.split("|"); return {inf:r, pt}; });
  const arPres = (r, p) => p === 0 ? "أ" + r : p === 1 || p === 3 ? "ت" + r : p === 2 ? "ي" + r : p === 4 ? "ن" + r : "ي" + r + "ون";
  const arForm = (v, t, p) => { const r = v.inf;
    if (t === "pres") return arPres(r, p);
    if (t === "past") return p === 2 ? r : p === 4 ? r + "نا" : p === 5 ? r + "وا" : r + "ت";
    if (t === "fut") return "س" + arPres(r, p);
    if (t === "negpres") return "لا " + arPres(r, p);
    if (t === "negpast") return "لم " + (p === 5 ? "ي" + r + "وا" : arPres(r, p));
    if (t === "imp") return p === 0 ? "ا" + r : p === 1 ? "ا" + r + "ي" : "ا" + r + "وا"; };
  const AR_T = [
    {id:"pres", n:"presente", lvl:"A1", r:"O presente usa um prefixo que mostra a pessoa: أ (eu), ت (você/ela), ي (ele), ن (nós), e ي ... ون para “eles”: أكتب، تكتب، يكتب، نكتب، يكتبون. A raiz do verbo (três consoantes) fica no meio. Aqui escrevemos sem os sinais de vogal curta."},
    {id:"past", n:"passado", lvl:"A2", r:"No passado, a raiz fica sozinha para “ele” (كتب) e ganha terminações para as outras pessoas: ت (ela, eu, você), نا (nós) e وا (eles): كتبت، كتبنا، كتبوا. Sem os sinais de vogal, eu e você escrevem-se igual."},
    {id:"fut", n:"futuro", lvl:"B1", r:"O futuro é o presente com <b>س</b> colado no começo: سأكتب (escreverei)، ستكتب، سيكتب، سنكتب، سيكتبون."},
    {id:"negpres", n:"negação no presente", lvl:"B2", r:"Para negar o presente, coloque <b>لا</b> antes do verbo: لا أكتب (eu não escrevo)، لا يكتب."},
    {id:"negpast", n:"negação no passado (لم)", lvl:"C1", r:"Para negar o passado usa-se <b>لم</b> + o presente: لم أكتب (eu não escrevi)، لم يكتب. Para “eles”, o ون final vira وا: لم يكتبوا."},
    {id:"imp", n:"imperativo", lvl:"C2", r:"O imperativo (ordem) para você, masculino, é <b>ا + raiz</b>: اكتب! Para feminino acrescenta ي (اكتبي) e, para vocês, وا (اكتبوا)."}];
  /* ============ montagem ============ */
  const CFG = {
    en:{P:EN_P, V:EN_V, T:EN_T, form:enForm, skip:{pc:["be"],pastc:["be"],ppc:["be"]}},
    es:{P:ES_P, V:ES_V, T:ES_T, form:esForm},
    fr:{P:FR_P, V:FR_V, T:FR_T, form:frForm},
    tr:{P:TR_P, V:TR_V, T:[
      {id:"pres", n:"presente contínuo (-yor)", lvl:"A1", r:"O presente usa a raiz + <b>-(ı/i/u/ü)yor</b> + a terminação da pessoa: geliyorum, geliyorsun, geliyor, geliyoruz, geliyorsunuz, geliyorlar. A vogal segue a harmonia da última vogal da raiz."},
      {id:"past", n:"passado (-di)", lvl:"A2", r:"O passado é raiz + <b>-dı/-di/-du/-dü</b> (ou -tı/-ti... depois de ç f h k p s ş t) + pessoa: geldim, geldin, geldi, geldik, geldiniz, geldiler."},
      {id:"fut", n:"futuro (-ecek)", lvl:"B1", r:"O futuro é raiz + <b>-acak/-ecek</b> + pessoa. O k vira ğ antes de vogal: geleceğim, geleceksin, gelecek, geleceğiz, geleceksiniz, gelecekler."},
      {id:"aor", n:"aoristo (hábito)", lvl:"B2", r:"O aoristo mostra hábitos e fatos gerais: geli<b>r</b>im, gelirsin, gelir, geliriz, gelirsiniz, gelirler. A forma de 3ª pessoa varia por verbo (gelir, yapar, okur) e precisa ser aprendida junto com o verbo."},
      {id:"negpres", n:"presente negativo", lvl:"C1", r:"A negação vem logo depois da raiz: <b>-mı/-mi/-mu/-mü</b> + yor: gelmiyorum, yapmıyorum, okumuyorum."},
      {id:"negpast", n:"passado negativo", lvl:"C2", r:"A negação do passado é raiz + <b>-ma/-me</b> + -dı/-di + pessoa: gelmedim, yapmadım, okumadım."}], form:trForm},
    ru:{P:RU_P, V:RU_V, T:[
      {id:"pres", n:"presente", lvl:"A1", r:"No presente o verbo muda de terminação para cada pessoa: читать → я читаю, ты читаешь, он читает, мы читаем, вы читаете, они читают. Verbos em -ить costumam fazer -ю/-у, -ишь, -ит, -им, -ите, -ят/-ат."},
      {id:"past", n:"passado", lvl:"A2", r:"O passado não muda por pessoa, e sim por gênero e número: -л (masculino), -ла (feminino), -ло (neutro), -ли (plural): он читал, она читала, оно читало, они читали."},
      {id:"fut", n:"futuro composto", lvl:"B1", r:"Com verbos imperfectivos o futuro é <b>быть + infinitivo</b>: я буду читать, ты будешь читать, он будет читать, мы будем, вы будете, они будут."},
      {id:"pfut", n:"futuro perfectivo", lvl:"B2", r:"Os verbos perfectivos (прочитать, сделать) usam as terminações do presente, mas significam futuro: я прочитаю = vou ler (e terminar)."},
      {id:"pastp", n:"passado perfectivo", lvl:"C1", r:"O passado perfectivo usa as mesmas terminações de gênero (-л, -ла, -ло, -ли) sobre o verbo perfectivo: он прочитал, она прочитала. Indica ação concluída, com resultado."},
      {id:"imp", n:"imperativo", lvl:"C2", r:"O imperativo termina em -й / -и (ты) e acrescenta -те para vocês: читай! читайте! Aqui você escreve a forma de ты e de вы de cada verbo."}], form:ruForm},
    ar:{P:AR_P, V:AR_V, T:AR_T, form:arForm}
  };
  const hash = s => { let h = 5; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) | 0; return Math.abs(h); };
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const vowelStart = s => /^[aeiouhéèêàâîôûäëïöü]/i.test(s);
  const alts = (lang, f) => { const a = [f]; if (lang === "ru" && /ё/.test(f)) a.push(f.replace(/ё/g, "е")); if (lang === "en") a.push(f.replace(/^will /, "'ll ")); return a; };
  /* usa só verbos que têm a forma para aquele tempo */
  const usable = (lang, t, v) => {
    if (lang === "ru"){ if (t.id === "pres" || t.id === "past" || t.id === "fut") return !!v.pres; if (t.id === "pfut") return !!v.pfut; if (t.id === "pastp") return !!v.pfut; if (t.id === "imp") return !!v.imp[0]; }
    if (lang === "en" && CFG.en.skip[t.id] && CFG.en.skip[t.id].includes(v.inf)) return false;
    if (lang === "fr" && t.id === "subj" && v.g === "re" ) return true;
    return true; };
  for (const lang of Object.keys(CFG)){
    const C = CFG[lang], B = EX_BOOKS[lang]; if (!B) continue;
    const note = lang === "en" ? "" : " (conteúdo novo, ainda sem revisão de falante nativo)";
    LV.forEach(lvl => {
      const ts = C.T.filter(t => t.lvl === lvl); let made = 0;
      ts.forEach((t, ti) => {
        const per = (lang === "ar" && t.id === "imp") ? 3 : (lang === "ru" && t.id === "imp") ? 2 : (lang === "ru" && (t.id === "past" || t.id === "pastp")) ? 4 : 6;
        const verbs = C.V.filter(v => usable(lang, t, v));
        const cap = Math.max(6, Math.ceil(22 / ts.length));
        const start = hash(lang + lvl + t.id) % Math.max(1, verbs.length);
        const rot = verbs.slice(start).concat(verbs.slice(0, start));
        const perUnit = per >= 6 ? 1 : Math.ceil(6 / per);
        for (let k = 0, n = 0; k < rot.length && n < cap; k += perUnit, n++){
          const grp = rot.slice(k, k + perUnit); if (grp.length < perUnit && per < 6 && !grp.length) break;
          const items = [];
          grp.forEach(v => {
            const idx = lang === "ru" && t.id === "past" ? [0,1,2,3] : lang === "ru" && t.id === "pastp" ? [0,1,2,3] : lang === "ru" && t.id === "imp" ? [0,1] : lang === "ar" && t.id === "imp" ? [0,1,2] : [0,1,2,3,4,5];
            idx.forEach((pi, ii) => { let f, pron;
              if (lang === "ru" && t.id === "imp"){ f = v.imp[ii]; pron = ii === 0 ? "ты" : "вы"; }
              else if (lang === "ru" && (t.id === "past" || t.id === "pastp")){ f = t.id === "past" ? v.past[ii] : v.ppast[ii]; pron = ["он (masc.)","она (fem.)","оно (neutro)","они (plural)"][ii]; }
              else if (lang === "ar" && t.id === "imp"){ f = C.form(v, t.id, ii); pron = ["أنتَ (masc.)","أنتِ (fem.)","أنتم (vocês)"][ii]; }
              else { f = C.form(v, t.id, pi); pron = C.P[pi]; }
              if (!f) return;
              const inf = lang === "ru" && (t.id === "pfut" || t.id === "pastp") ? v.pinf : v.inf;
              if (lang === "fr" && pi === 0 && vowelStart(f.split(" ")[0])) pron = "j’";
              const lbl = lang === "ru" && t.id === "fut" ? `${pron} ___ (+ ${inf})` : `${pron} ___`;
              items.push({t:"text", q:`${lbl}  ·  ${inf} (${v.pt}) — ${t.n}`, a:alts(lang, lang === "ru" && t.id === "fut" ? f : f), hint:`Começa com “${Array.from(f)[0]}”`}); });
          });
          if (items.length < 4) continue;
          const title = `${lvl} · Conjugação · ${grp.map(g => g.inf).join(" / ")} · ${t.n}`;
          const u = {id:`cj-${lang}-${lvl}-${t.id}-${n + 1}`, title, lvl, lead:"Escreva a forma do verbo para cada pessoa." + note,
            expl:`<div class="exintro2"><b>Regra: ${esc(t.n)}</b><p>${t.r}</p></div>`, items};
          B.units.push(u); made++;
        }
      });
    });
  }

  /* tabela completa por tempo, usada pelo bloco "Estrutura da linguagem" */
  window.CONJ_TABLE = function(lang, tid){
    const C = CFG[lang], t = C.T.find(x => x.id === tid); if (!t) return null;
    const hd = lang === "ru" && (tid === "past" || tid === "pastp") ? ["он (m.)","она (f.)","оно (n.)","они"] : lang === "ru" && tid === "imp" ? ["ты","вы"] : lang === "ar" && tid === "imp" ? ["أنتَ","أنتِ","أنتم"] : C.P.slice();
    const rows = [];
    C.V.filter(v => usable(lang, t, v)).forEach(v => {
      const cells = hd.map((_, i) => {
        if (lang === "ru" && tid === "imp") return v.imp[i];
        if (lang === "ru" && tid === "past") return v.past[i];
        if (lang === "ru" && tid === "pastp") return v.ppast[i];
        if (lang === "ar" && tid === "imp") return C.form(v, tid, i);
        return C.form(v, tid, i); });
      const inf = lang === "ru" && (tid === "pfut" || tid === "pastp") ? v.pinf : v.inf;
      rows.push([inf, v.pt].concat(cells));
    });
    return {t, head: hd, rows};
  };
  window.CONJ_TENSES = lang => CFG[lang].T;
})();
