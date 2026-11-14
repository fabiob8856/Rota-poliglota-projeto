/* ---------- gramática A1: espanhol e francês (etapas 5 e 6 + aba Exercícios) ---------- */
const gc = (q, right, wr) => vChoice(q, right, wr);
const gt = (q, ans) => ({t:"type", q, a:ans.split("|")});
const GU = (title, expl, items) => ({title, expl, items});
function gDefine(lang, vid5, vid6, u5, u6){
  STEPU[lang] = STEPU[lang] || {}; STEPU[lang].A1 = STEPU[lang].A1 || {};
  const mk = (k, vid, arr) => ({vid, units: arr.map((u,i) => ({id:`su-A1-${k}-${i+1}`, title:u.title, expl:u.expl, items:u.items}))});
  STEPU[lang].A1[5] = mk(5, vid5, u5); STEPU[lang].A1[6] = mk(6, vid6, u6);
  EX_BOOKS[lang] = EX_BOOKS[lang] || {title:"Gramática essencial", units:[], vunits:[]};
  const B = EX_BOOKS[lang]; B.units = B.units || [];
  B.src = "Explicações e exercícios escritos por nós, na ordem dos temas básicos do A1.";
  u5.concat(u6).forEach((u,i) => B.units.push({id:`gx-${lang}-${i+1}`, title:`Unidade ${i+1} · ${u.title}`, lead:"Gramática do A1.", lvl:"A1", expl:u.expl, vid:vid5, items:u.items.map(it => it.t === "type" ? {t:"text", q:it.q, a:it.a} : it)}));
}
gDefine("es", "ser estar tener español para principiantes", "presente regular español verbos ar er ir principiantes", [
 GU("Ser: soy, eres, es", "<b>Ser</b> serve para identidade e origem: <b>Soy</b> brasileño. <b>Eres</b> estudiante. <b>Ella es</b> médica. <b>Somos</b> amigos.", [
  gc("Complete: Yo ___ brasileño.","soy",["eres","es","estoy"]), gc("Complete: Tú ___ estudiante.","eres",["soy","es","estás"]), gc("Complete: Ella ___ médica.","es",["soy","eres","está"]), gt("Complete: Nosotros ___ amigos. (ser)","somos")]),
 GU("Estar: estoy, estás, está", "<b>Estar</b> serve para estado e lugar: <b>Estoy</b> cansado. <b>Estás</b> en casa. <b>Mi madre está</b> en el trabajo.", [
  gc("Complete: Yo ___ cansado.","estoy",["soy","estás","es"]), gc("Complete: Ellos ___ en casa.","están",["son","estás","somos"]), gc("Complete: Tú ___ muy bien hoy.","estás",["eres","estoy","está"]), gt("Complete: Mi madre ___ en el trabajo. (estar)","está")]),
 GU("Ser ou estar?", "<b>Ser</b> = o que alguém ou algo é (profissão, origem, ser permanente). <b>Estar</b> = como está agora ou onde está.", [
  gc("“Eu sou professor”:","Soy profesor.",["Estoy profesor.","Es profesor.","Soy en profesor."]), gc("“Estou em casa”:","Estoy en casa.",["Soy en casa.","Estoy casa.","Es en casa."]), gc("Complete: La sopa ___ caliente. (agora)","está",["es","soy","están"]), gc("Complete: Madrid ___ la capital de España.","es",["está","soy","están"])]),
 GU("Tener: tengo, tienes, tiene", "<b>Tener</b> = ter: <b>tengo</b>, <b>tienes</b>, <b>tiene</b>, <b>tenemos</b>, <b>tienen</b>. Tengo una casa. Ella tiene dos hermanos.", [
  gc("Complete: Yo ___ una casa.","tengo",["soy","estoy","tiene"]), gc("Complete: Ella ___ dos hermanos.","tiene",["tengo","tienes","tienen"]), gc("Complete: Tú ___ un coche grande.","tienes",["tengo","tiene","tenemos"]), gt("Complete: Nosotros ___ hambre. (tener)","tenemos")]),
 GU("Tener: idade e sensações", "Em espanhol a idade e várias sensações usam <b>tener</b>: <b>Tengo 20 años</b>. <b>Tengo sed</b>. <b>Tienen frío</b>.", [
  gc("“Tenho 20 anos”:","Tengo 20 años.",["Soy 20 años.","Estoy 20 años.","Tiene 20 años."]), gc("“Tenho sede”:","Tengo sed.",["Soy sed.","Estoy sed.","Tengo sedo."]), gc("Complete: Ellos ___ frío.","tienen",["son","están","tiene"]), gt("Complete: ¿Cuántos años ___ tú?","tienes")]),
 GU("Negar e perguntar", "Negue com <b>no</b> antes do verbo: <b>No soy</b> brasileño. Pergunte com <b>¿…?</b>: <b>¿Eres</b> médica? <b>¿Cómo estás?</b>", [
  gc("Como se nega “Soy brasileño”?","No soy brasileño.",["Soy no brasileño.","No es brasileño.","Soy brasileño no."]), gc("“Você é médica?”","¿Eres médica?",["¿Estás médica?","¿Tienes médica?","¿Soy médica?"]), gc("“Não tenho tempo”:","No tengo tiempo.",["No soy tiempo.","Tengo no tiempo.","No tiene tiempo."]), gc("Complete: ¿___ estás? — Bien, gracias.","Cómo",["Qué","Dónde","Quién"])])
], [
 GU("Verbos em -ar: hablo, hablas, habla", "Tire <b>-ar</b> e some: <b>-o, -as, -a, -amos, -an</b>. Hablo español. Ella trabaja en casa.", [
  gc("Complete: Yo ___ español. (hablar)","hablo",["hablas","habla","hablamos"]), gc("Complete: Tú ___ mucho. (hablar)","hablas",["hablo","habla","hablan"]), gc("Complete: Ella ___ en la cocina. (trabajar)","trabaja",["trabajo","trabajas","trabajan"]), gt("Complete: Nosotros ___ en casa. (estudiar)","estudiamos")]),
 GU("Verbos em -ar: nós e eles", "<b>nosotros -amos</b>, <b>ellos/ustedes -an</b>: escuchamos, trabajan, hablan.", [
  gc("Complete: Nosotros ___ música. (escuchar)","escuchamos",["escuchan","escucho","escucha"]), gc("Complete: Ellos ___ en un banco. (trabajar)","trabajan",["trabaja","trabajamos","trabajas"]), gc("Complete: Ustedes ___ mucho. (hablar)","hablan",["hablamos","habla","hablas"]), gt("Complete: Ustedes ___ aquí. (trabajar)","trabajan")]),
 GU("Verbos em -er: como, comes, come", "Tire <b>-er</b> e some: <b>-o, -es, -e, -emos, -en</b>. Como pan. Bebes agua.", [
  gc("Complete: Yo ___ pan. (comer)","como",["comes","come","comemos"]), gc("Complete: Tú ___ agua. (beber)","bebes",["bebo","bebe","beben"]), gc("Complete: Él ___ un libro. (leer)","lee",["leo","lees","leen"]), gt("Complete: Nosotros ___ mucho. (comer)","comemos")]),
 GU("Verbos em -ir: vivo, vives, vive", "Tire <b>-ir</b> e some: <b>-o, -es, -e, -imos, -en</b>. Vivo en São Paulo. Ella escribe una carta.", [
  gc("Complete: Yo ___ en São Paulo. (vivir)","vivo",["vives","vive","vivimos"]), gc("Complete: Ella ___ una carta. (escribir)","escribe",["escribo","escribes","escriben"]), gc("Complete: Ellos ___ en Madrid. (vivir)","viven",["vive","vivimos","vives"]), gt("Complete: Tú ___ aquí. (vivir)","vives")]),
 GU("Rotina", "Use o presente para a rotina: <b>Tomo</b> café por la mañana. <b>Trabajo</b> de lunes a viernes. <b>Mi padre lee</b> el periódico.", [
  gc("“Trabalho de segunda a sexta”:","Trabajo de lunes a viernes.",["Trabajas de lunes a viernes.","Trabajo lunes viernes de.","Trabajamos de lunes a viernes."]), gc("Complete: Yo ___ café por la mañana. (tomar)","tomo",["tomas","toma","tomamos"]), gc("“Eu acordo às 7”:","Me despierto a las 7.",["Despierto me a las 7.","Me despierto en las 7.","Despiertos a las 7."]), gt("Complete: Mi padre ___ el periódico. (leer)","lee")]),
 GU("Gostar: me gusta", "<b>Me gusta</b> + singular, <b>me gustan</b> + plural: Me gusta el café. Me gustan los libros.", [
  gc("“Eu gosto de café”:","Me gusta el café.",["Gusto el café.","Yo gusto café.","Me gustan el café."]), gc("“Gosto de livros”:","Me gustan los libros.",["Me gusta los libros.","Gusto los libros.","Me gustas libros."]), gc("Complete: A ella le ___ la música.","gusta",["gustan","gusto","gustas"]), gt("Complete: Me ___ los gatos. (gustar)","gustan")])
]);
gDefine("fr", "être avoir articles français pour débutants", "verbes en er présent français débutants", [
 GU("Être: je suis, tu es, il est", "<b>Être</b> = ser/estar: <b>je suis</b>, <b>tu es</b>, <b>il/elle est</b>. Je suis brésilien. Elle est médecin.", [
  gc("Complete: Je ___ brésilien.","suis",["es","est","ai"]), gc("Complete: Tu ___ étudiant.","es",["suis","est","as"]), gc("Complete: Elle ___ médecin.","est",["suis","es","a"]), gt("Complete: Nous ___ amis. (être)","sommes")]),
 GU("Être: nous, vous, ils", "<b>nous sommes</b>, <b>vous êtes</b>, <b>ils/elles sont</b>.", [
  gc("Complete: Vous ___ en retard.","êtes",["sommes","sont","est"]), gc("Complete: Ils ___ à la maison.","sont",["est","sommes","êtes"]), gc("Complete: Mes parents ___ ici.","sont",["est","sommes","es"]), gt("Complete: Nous ___ contents. (être)","sommes")]),
 GU("Avoir: j'ai, tu as, il a", "<b>Avoir</b> = ter: <b>j'ai</b>, <b>tu as</b>, <b>il/elle a</b>, <b>nous avons</b>, <b>vous avez</b>, <b>ils ont</b>.", [
  gc("Complete: J'___ un frère.","ai",["suis","as","a"]), gc("Complete: Tu ___ un frère.","as",["ai","a","es"]), gc("Complete: Elle ___ une voiture.","a",["ai","as","est"]), gt("Complete: Nous ___ faim. (avoir)","avons")]),
 GU("Avoir: idade e plural", "A idade usa <b>avoir</b>: <b>J'ai 20 ans</b>. <b>Ils ont</b> deux enfants. <b>Vous avez</b> raison.", [
  gc("“Tenho 20 anos”:","J'ai 20 ans.",["Je suis 20 ans.","Je ai 20 ans.","J'ai 20 années."]), gc("Complete: Ils ___ deux enfants.","ont",["a","avons","sont"]), gc("Complete: Vous ___ raison.","avez",["avons","ont","êtes"]), gt("Complete: Quel âge ___-tu ? (avoir)","as")]),
 GU("Artigos definidos: le, la, les, l'", "<b>le</b> (masc.), <b>la</b> (fem.), <b>les</b> (plural), <b>l'</b> (antes de vogal): le livre, la maison, les amis, l'ami.", [
  gc("“A casa”:","la maison",["le maison","les maison","l'maison"]), gc("“O livro”:","le livre",["la livre","les livre","l'livre"]), gc("Complete: ___ amis de Paul. (os)","Les",["Le","La","L'"]), gc("“O amigo” (começa com vogal):","l'ami",["le ami","la ami","les ami"])]),
 GU("Artigos indefinidos: un, une, des", "<b>un</b> (masc.), <b>une</b> (fem.), <b>des</b> (plural): un frère, une sœur, des pommes.", [
  gc("Complete: J'ai ___ sœur. (uma)","une",["un","des","le"]), gc("Complete: Il a ___ frère. (um)","un",["une","des","la"]), gc("Complete: Elle mange ___ pommes. (umas)","des",["un","une","le"]), gc("“Uma amiga”:","une amie",["un amie","des amie","le amie"])])
], [
 GU("Verbos em -er: je parle, tu parles", "Tire <b>-er</b> e some: <b>-e, -es, -e, -ons, -ez, -ent</b>. Je parle français. Il travaille le matin.", [
  gc("Complete: Je ___ français. (parler)","parle",["parles","parlons","parlent"]), gc("Complete: Tu ___ beaucoup. (parler)","parles",["parle","parlons","parlez"]), gc("Complete: Elle ___ à la maison. (travailler)","travaille",["travaillons","travailles","travaillent"]), gt("Complete: Il ___ le matin. (travailler)","travaille")]),
 GU("Verbos em -er: nous, vous, ils", "<b>nous -ons</b>, <b>vous -ez</b>, <b>ils/elles -ent</b>: nous travaillons, vous parlez, ils parlent.", [
  gc("Complete: Nous ___ ensemble. (travailler)","travaillons",["travaillez","travaillent","travaille"]), gc("Complete: Vous ___ vite. (parler)","parlez",["parlons","parlent","parle"]), gc("Complete: Ils ___ anglais. (parler)","parlent",["parle","parlons","parlez"]), gt("Complete: Nous ___ le soir. (manger)","mangeons")]),
 GU("Negação: ne … pas", "Coloque <b>ne … pas</b> em volta do verbo: <b>Je ne parle pas</b>. <b>Je n'ai pas</b> le temps.", [
  gc("Como se nega “Je parle”?","Je ne parle pas.",["Je parle ne pas.","Je pas parle.","Ne je parle pas."]), gc("“Não tenho tempo”:","Je n'ai pas le temps.",["Je ne ai pas le temps.","Je n'ai le temps pas.","Je pas ai le temps."]), gc("Complete: Elle ne mange ___ de viande.","pas",["ne","non","sans"]), gt("Complete: Nous ne parlons ___ russe.","pas")]),
 GU("Perguntas", "Pergunte com <b>est-ce que</b> ou invertendo: <b>Est-ce que tu travailles ?</b> / <b>Parlez-vous anglais ?</b> Palavras: comment, où, quand, qui.", [
  gc("“Você fala inglês?” (inversão)","Parlez-vous anglais ?",["Vous parlez-vous anglais ?","Parlez anglais vous ?","Est-ce vous parlez anglais ?"]), gc("Qual pergunta está correta?","Est-ce que tu travailles ?",["Est-ce que travailles tu ?","Est-ce tu que travailles ?","Que est-ce tu travailles ?"]), gc("Complete: ___ vous appelez-vous ? (como)","Comment",["Quoi","Où","Quand"]), gt("Complete: ___ habites-tu ? (onde)","Où|Ou")]),
 GU("Aimer e habiter", "<b>J'aime</b> le café. <b>J'habite</b> à São Paulo. Antes de vogal, <b>je</b> vira <b>j'</b>.", [
  gc("Complete: J'___ le café. (aimer)","aime",["aimes","aimons","aiment"]), gc("Complete: Ils ___ à Paris. (habiter)","habitent",["habite","habitons","habites"]), gc("“Eu moro em São Paulo”:","J'habite à São Paulo.",["Je habite à São Paulo.","J'habites à São Paulo.","Je suis habite à São Paulo."]), gt("Complete: Tu ___ la musique. (aimer)","aimes")]),
 GU("Contrações: au, aux, du", "<b>à + le = au</b>, <b>à + les = aux</b>, <b>de + le = du</b>: Je vais <b>au</b> marché. Je viens <b>du</b> Brésil.", [
  gc("Complete: Je vais ___ marché. (ao)","au",["à le","du","de"]), gc("Complete: Je viens ___ Brésil. (do)","du",["de le","au","à"]), gc("Complete: Elle parle ___ professeur. (ao)","au",["du","à le","de"]), gt("Complete: Il parle ___ enfants. (aos)","aux")])
]);
