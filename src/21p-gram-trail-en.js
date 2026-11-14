/* ---------- trilha de gramática em subtemas (inglês): cada nível vira 7–8 etapas em sequência ---------- */
const GTRAIL_EN = {
 A1:[["Ser, estar e presente",0,4],["Ter, existir e apontar",5,11],["Lugar, tempo e passado",12,18],["Quantidade e perguntas",19,23],["Base da língua",24,31],["Descrever o dia a dia",32,39],["Situações comuns",40,49]],
 A2:[["Presente e futuro",0,2],["Comparações",3,5],["Obrigação e possibilidade",6,8],["Passado e present perfect",9,13],["Quantidade, verbos e condição",14,20],["Pronomes e perguntas",21,28],["Contrastes e situações",29,38],["Viagem, trabalho e conectores",39,49]],
 B1:[["Perfect e passado",0,3],["Passiva, condicional e relato",4,9],["Verbos, preposições e conectores",10,15],["Futuro e wish",16,19],["Passiva e relato avançados",20,24],["Modais e comparações",25,31],["Verbos e phrasal verbs",32,39],["Expressões e escrita",40,49]],
 B2:[["Condicionais, deduções e modais",0,5],["Relato, relativas e particípios",6,12],["Preposições e condicionais",13,19],["Relativas e passivas",20,25],["Conectores e tempos",26,33],["Artigos e phrasal verbs",34,39],["Collocations e uso",40,45],["Escrita e opinião",46,49]],
 C1:[["Inversão e ênfase",0,5],["Condicionais e inversões",6,12],["Passiva e fronting",13,19],["Futuro e modais",20,25],["Gradação e hedging",26,31],["Formalidade e conectores",32,37],["Idioms e phrasal verbs",38,43],["Palavras e erros comuns",44,49]],
 C2:[["Estruturas literárias",0,5],["Registro e inversões",6,12],["Ênfase e modais",13,19],["Estruturas formais",20,26],["Linguagem formal",27,32],["Idioms e phrasal verbs",33,39],["Confusões e uso",40,45],["Escrita acadêmica",46,49]]};
const flowGramIds = (lvl, n) => { const base = lvl === "A1" ? 23 : 22, out = [5,6]; for (let i = 0; i < n - 2; i++) out.push(base + i); return out; };
Object.keys(GTRAIL_EN).forEach(lvl => {
  const gu = (EX_BOOKS.en.units || []).filter(u => u.lvl === lvl), tr = GTRAIL_EN[lvl], ids = flowGramIds(lvl, tr.length), A = LANG.en.levels[lvl].steps;
  tr.forEach(([nm, a, b], i) => {
    const k = ids[i], arr = gu.slice(a, b + 1); if (!arr.length) return;
    STEPU.en[lvl][k] = {vid:`gramática inglês ${nm.toLowerCase()} nível ${lvl}`, units:arr.map((u,j) => ({id:`su-${lvl}-${k}-${j+1}`, title:u.title, expl:u.expl || "", items:u.items}))};
    const stp = ST(`Gramática: ${nm.toLowerCase()}`, [`Faça as sessões do dia: ${arr.length} unidades de ${nm.toLowerCase()}.`, "Escreva 3 frases suas usando cada estrutura nova."], "Você acerta as unidades do tema sem consultar a explicação.");
    if (k <= A.length) A[k-1] = stp; else A[k-1] = stp;
  });
  const P = FLOW_PLAN[lvl]; FLOW_PLAN["en:" + lvl] = JSON.parse(JSON.stringify(P));
  FLOW_PLAN["en:" + lvl].stages.forEach(s => s.areas.forEach(a => { if (a.g === 2){ a.t = "Gramática"; a.steps = ids.slice(); } }));
});
