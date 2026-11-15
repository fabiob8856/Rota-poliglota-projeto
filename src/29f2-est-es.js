/* Estrutura da linguagem — dados: espanhol */
window.EST_DATA = window.EST_DATA || {};
EST_DATA.es = {
verbNote:"Os verbos espanhóis terminam em <b>-ar, -er ou -ir</b> e a terminação mostra a pessoa, por isso o pronome pode ser omitido (hablo = eu falo). Muitos verbos comuns são irregulares. Escolha o tempo para ver todos os verbos conjugados.",
noun:[
{n:"Como funcionam os substantivos",note:"Todo substantivo é <b>masculino ou feminino</b>. Em geral, -o é masculino (el libro) e -a é feminino (la casa), mas há exceções: <b>el día, el mapa, la mano, la foto</b>. Plural: +s depois de vogal (casas), +es depois de consoante (ciudades); -z vira -ces (lápiz → lápices). Cuidado com falsos amigos: <b>el problema, el idioma, el tema</b> são masculinos."},
{n:"Pessoas e família",h:["Espanhol","Português"],r:`la madre|a mãe
el padre|o pai
la hermana|a irmã
el hermano|o irmão
el hijo|o filho
la hija|a filha
el amigo|o amigo
el vecino|o vizinho
el niño|o menino
la niña|a menina
el hombre|o homem
la mujer|a mulher
el abuelo|o avô
la abuela|a avó
el esposo|o marido
la esposa|a esposa`},
{n:"Casa e objetos",h:["Espanhol","Português"],r:`la casa|a casa
la habitación|o quarto
la cocina|a cozinha
la puerta|a porta
la ventana|a janela
la mesa|a mesa
la silla|a cadeira
la cama|a cama
la llave|a chave
el teléfono|o telefone
el libro|o livro
la mochila|a mochila
el coche|o carro
el reloj|o relógio
el vaso|o copo
el plato|o prato
el cuchillo|a faca`},
{n:"Comida e bebida",h:["Espanhol","Português"],r:`el pan|o pão
el agua (f.)|a água
la leche|o leite
el café|o café
el té|o chá
el arroz|o arroz
la carne|a carne
el pollo|o frango
el pescado|o peixe
el huevo|o ovo
el queso|o queijo
la fruta|a fruta
la manzana|a maçã
la verdura|a verdura
el azúcar|o açúcar
la sal|o sal
el desayuno|o café da manhã
el almuerzo|o almoço
la cena|o jantar`},
{n:"Corpo e saúde",h:["Espanhol","Português"],r:`la cabeza|a cabeça
el ojo|o olho
la oreja|a orelha
la nariz|o nariz
la boca|a boca
la mano|a mão
el brazo|o braço
la pierna|a perna
el pie|o pé
el corazón|o coração
la espalda|as costas
el estómago|o estômago
el médico|o médico
el dolor|a dor
la fiebre|a febre
la medicina|o remédio`},
{n:"Cidade e lugares",h:["Espanhol","Português"],r:`la ciudad|a cidade
la calle|a rua
la carretera|a estrada
el puente|a ponte
la tienda|a loja
el mercado|o mercado
el banco|o banco
la escuela|a escola
el hospital|o hospital
el aeropuerto|o aeroporto
la estación|a estação
el restaurante|o restaurante
el parque|o parque
la oficina|o escritório
la iglesia|a igreja
la playa|a praia`},
{n:"Tempo e calendário",h:["Espanhol","Português"],r:`el tiempo|o tempo
el día|o dia
la semana|a semana
el mes|o mês
el año|o ano
la mañana|a manhã
la tarde|a tarde
la noche|a noite
hoy|hoje
mañana|amanhã
ayer|ontem
el fin de semana|o fim de semana
las vacaciones|as férias`},
{n:"Natureza e clima",h:["Espanhol","Português"],r:`el sol|o sol
la luna|a lua
el cielo|o céu
la lluvia|a chuva
el viento|o vento
la nieve|a neve
el árbol|a árvore
la flor|a flor
el río|o rio
el mar|o mar
la montaña|a montanha
el perro|o cachorro
el gato|o gato
el pájaro|o pássaro
el clima|o clima`},
{n:"Trabalho e escola",h:["Espanhol","Português"],r:`el trabajo|o trabalho
el empleo|o emprego
el jefe|o chefe
el compañero|o colega
la reunión|a reunião
el sueldo|o salário
la empresa|a empresa
el profesor|o professor
el alumno|o aluno
la clase|a aula
el examen|a prova
la tarea|a lição de casa
la pregunta|a pergunta
la respuesta|a resposta
el problema|o problema
la idea|a ideia`}],
pron:[
{n:"Pronomes pessoais (sujeito)",note:"Costumam ser omitidos, porque o verbo já indica a pessoa. Em boa parte da América Latina usa-se <b>ustedes</b> no lugar de vosotros.",h:["Espanhol","Português"],r:`yo|eu
tú|tu, você (informal)
usted|o senhor, a senhora (formal)
él|ele
ella|ela
nosotros / nosotras|nós
vosotros / vosotras|vós, vocês (Espanha)
ustedes|vocês
ellos / ellas|eles, elas`},
{n:"Objeto direto e indireto",h:["Espanhol","Português"],r:`me|me
te|te
lo / la|o, a
le|lhe (indireto)
nos|nos
os|vos
los / las|os, as
les|lhes (indireto)
se|se (reflexivo; lhe + lo → se lo)`},
{n:"Depois de preposição",h:["Espanhol","Português"],r:`mí|mim (para mí)
ti|ti (para ti)
usted|o senhor
él / ella|ele, ela
nosotros|nós
vosotros|vós
ellos / ellas|eles, elas
conmigo|comigo
contigo|contigo
consigo|consigo`},
{n:"Possessivos",note:"Antes do substantivo concordam em número (mi/mis); após o substantivo ou sozinhos concordam em gênero e número.",h:["Antes do substantivo","Depois / sozinho","Português"],r:`mi, mis|mío(s), mía(s)|meu, minha
tu, tus|tuyo(s), tuya(s)|teu, tua
su, sus|suyo(s), suya(s)|dele, dela, seu
nuestro(a)(s)|nuestro(a)(s)|nosso
vuestro(a)(s)|vuestro(a)(s)|vosso
su, sus|suyo(s), suya(s)|deles, delas`},
{n:"Demonstrativos",h:["Masculino","Feminino","Neutro","Português"],r:`este / estos|esta / estas|esto|este (perto)
ese / esos|esa / esas|eso|esse (médio)
aquel / aquellos|aquella / aquellas|aquello|aquele (longe)`},
{n:"Interrogativos",note:"Sempre levam acento escrito e vêm entre pontos de interrogação invertidos.",h:["Espanhol","Português"],r:`¿qué?|o que
¿quién? / ¿quiénes?|quem
¿cuál? / ¿cuáles?|qual, quais
¿dónde?|onde
¿cuándo?|quando
¿cómo?|como
¿por qué?|por que
¿cuánto(a)(s)?|quanto(s)
¿para qué?|para quê
¿de quién?|de quem`},
{n:"Indefinidos",h:["Espanhol","Português"],r:`alguien|alguém
nadie|ninguém
algo|algo
nada|nada
todo / todos|tudo, todos
alguno(a)(s)|algum
ninguno(a)|nenhum
cada|cada
otro(a)(s)|outro
mucho(a)(s)|muito
poco(a)(s)|pouco
varios|vários
cualquier|qualquer`}],
adj:[
{n:"Como funcionam os adjetivos",note:"O adjetivo concorda em <b>gênero e número</b> com o substantivo e normalmente vem <b>depois</b> dele: una casa grande, unos libros interesantes. Os que terminam em -o têm quatro formas (alto, alta, altos, altas); os terminados em -e ou consoante têm duas (grande/grandes, fácil/fáciles). Alguns encurtam antes do substantivo: <b>buen</b> amigo, <b>gran</b> ciudad. Comparativo: <b>más … que</b>; irregulares: mejor, peor, mayor, menor."},
{n:"Tamanho, idade e quantidade",h:["Masculino","Feminino","Português"],r:`grande|grande|grande
pequeño|pequeña|pequeno
alto|alta|alto
bajo|baja|baixo
largo|larga|longo
corto|corta|curto
ancho|ancha|largo
estrecho|estrecha|estreito
viejo|vieja|velho
nuevo|nueva|novo
joven|joven|jovem
pesado|pesada|pesado
ligero|ligera|leve
lleno|llena|cheio
vacío|vacía|vazio`},
{n:"Qualidade e opinião",h:["Masculino","Feminino","Português"],r:`bueno|buena|bom
malo|mala|ruim
excelente|excelente|excelente
bonito|bonita|bonito
feo|fea|feio
fácil|fácil|fácil
difícil|difícil|difícil
importante|importante|importante
interesante|interesante|interessante
aburrido|aburrida|chato
caro|cara|caro
barato|barata|barato
limpio|limpia|limpo
sucio|sucia|sujo
seguro|segura|seguro
peligroso|peligrosa|perigoso`},
{n:"Sentimentos e pessoas",note:"Para estados passageiros usa-se <b>estar</b> (estoy cansado); para características, <b>ser</b> (soy simpático).",h:["Masculino","Feminino","Português"],r:`feliz|feliz|feliz
triste|triste|triste
enojado|enojada|bravo
cansado|cansada|cansado
contento|contenta|contente
preocupado|preocupada|preocupado
nervioso|nerviosa|nervoso
aburrido|aburrida|entediado
amable|amable|gentil
gracioso|graciosa|engraçado
inteligente|inteligente|inteligente
perezoso|perezosa|preguiçoso
honesto|honesta|honesto
tímido|tímida|tímido
simpático|simpática|simpático`},
{n:"Cores",h:["Masculino","Feminino","Português"],r:`rojo|roja|vermelho
azul|azul|azul
verde|verde|verde
amarillo|amarilla|amarelo
negro|negra|preto
blanco|blanca|branco
marrón|marrón|marrom
gris|gris|cinza
rosa|rosa|rosa
naranja|naranja|laranja
caliente|caliente|quente
frío|fría|frio`}],
art:[
{n:"Artigos",note:"Concordam com o substantivo. <b>El</b> é usado antes de substantivo feminino que começa com <b>a</b> tônico (el agua, el águila). <b>A + el = al</b>; <b>de + el = del</b>. O neutro <b>lo</b> transforma adjetivos em ideias abstratas (lo bueno = o bom).",h:["Espanhol","Português","Exemplo"],r:`el|o|el libro
la|a|la casa
los|os|los libros
las|as|las casas
un|um|un amigo
una|uma|una amiga
unos|uns|unos libros
unas|umas|unas casas
lo|o (neutro)|lo importante
al|a + o|voy al cine
del|de + o|el libro del niño`}],
adv:[
{n:"Como funcionam os advérbios",note:"Advérbios de modo se formam com <b>adjetivo feminino + -mente</b> (rápida → rápidamente, fácil → fácilmente). Muy modifica adjetivos e advérbios (muy bien); mucho modifica verbos (trabajo mucho)."},
{n:"Tempo",h:["Espanhol","Português"],r:`ahora|agora
entonces|então
hoy|hoje
mañana|amanhã
ayer|ontem
pronto|logo, cedo
luego|depois
ya|já
todavía|ainda
aún|ainda
temprano|cedo
tarde|tarde
recientemente|recentemente
por fin|finalmente`},
{n:"Frequência",h:["Espanhol","Português"],r:`siempre|sempre
normalmente|normalmente
a menudo|frequentemente
a veces|às vezes
raramente|raramente
casi nunca|quase nunca
nunca|nunca
todos los días|todo dia
una vez por semana|uma vez por semana`},
{n:"Lugar",h:["Espanhol","Português"],r:`aquí|aqui
allí|ali
allá|lá
acá|cá
cerca|perto
lejos|longe
dentro|dentro
fuera|fora
arriba|em cima
abajo|embaixo
delante|na frente
detrás|atrás
en todas partes|em todo lugar`},
{n:"Modo e intensidade",h:["Espanhol","Português"],r:`bien|bem
mal|mal
rápido|rápido
despacio|devagar
fácilmente|facilmente
juntos|juntos
solo|sozinho, só
muy|muito (+ adj./adv.)
mucho|muito (com verbo)
demasiado|demais
bastante|bastante
casi|quase
apenas|mal, apenas
también|também
tampoco|tampouco
quizás / tal vez|talvez
probablemente|provavelmente`}],
prep:[
{n:"As principais",note:"<b>Por</b> e <b>para</b> confundem muito: <b>para</b> indica destino, finalidade e prazo (para ti, para estudiar); <b>por</b> indica causa, meio, troca e trajeto (por la calle, por teléfono, gracias por todo). <b>A</b> também marca o objeto direto de pessoa (veo <b>a</b> María).",h:["Espanhol","Português","Exemplo"],r:`a|a, para (destino)|voy a Madrid
de|de|la casa de Ana
en|em, no|estoy en casa
con|com|con mi amigo
sin|sem|sin azúcar
para|para|un regalo para ti
por|por, pelo|por la mañana
desde|desde, de|desde las ocho
hasta|até|hasta mañana
hacia|em direção a|hacia el centro
entre|entre|entre tú y yo
sobre|sobre|sobre la mesa
bajo|sob|bajo la lluvia
contra|contra|contra la pared
según|segundo|según él
durante|durante|durante la clase
antes de|antes de|antes de comer
después de|depois de|después de trabajar
cerca de|perto de|cerca de aquí
lejos de|longe de|lejos de casa
delante de|na frente de|delante de mí
detrás de|atrás de|detrás de la puerta
encima de|em cima de|encima de la mesa
debajo de|embaixo de|debajo de la cama
al lado de|ao lado de|al lado del banco`}],
conj:[
{n:"Coordenação",h:["Espanhol","Português","Exemplo"],r:`y (e antes de i-, hi-)|e|té y café
o (u antes de o-, ho-)|ou|ahora o luego
pero|mas|pequeño pero fuerte
sino|e sim, mas (após negação)|no es rojo, sino azul
ni|nem|ni uno ni otro
así que|então|Estaba cansado, así que dormí.
por eso|por isso|por eso llegué tarde
sin embargo|no entanto|sin embargo, voy
además|além disso|además, es barato`},
{n:"Subordinação",h:["Espanhol","Português","Exemplo"],r:`que|que|Creo que es verdad.
porque|porque|Me quedo porque llueve.
como|como, já que|Como llueve, me quedo.
aunque|embora, mesmo que|Aunque es tarde, voy.
cuando|quando|Llámame cuando llegues.
mientras|enquanto|Leo mientras cocinas.
si|se|Si llueve, me quedo.
a menos que|a menos que|a menos que ayudes
para que|para que|Hablo despacio para que entiendas.
antes de que|antes que|antes de que te vayas
después de que|depois que|después de que comamos
hasta que|até que|hasta que pare
en cuanto|assim que|en cuanto pueda
puesto que|já que|puesto que lo sabes
de modo que|de modo que|de modo que lo entiendas`}]
};
