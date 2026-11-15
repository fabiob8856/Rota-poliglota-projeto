/* Estrutura da linguagem — dados: russo (acentos tônicos omitidos) */
window.EST_DATA = window.EST_DATA || {};
EST_DATA.ru = {
verbNote:"Verbos russos têm <b>aspecto</b>: imperfectivo (ação em andamento ou hábito: читать) e perfectivo (ação concluída: прочитать). Mudam por pessoa no presente e por <b>gênero</b> no passado (-л, -ла, -ло, -ли). Escolha o tempo para ver todos os verbos.",
noun:[
{n:"Como funcionam os substantivos",note:"Não há artigos. Há 3 gêneros: <b>masculino</b> (termina em consoante: стол, дом), <b>feminino</b> (-а, -я: книга, неделя) e <b>neutro</b> (-о, -е: окно, море). Substantivos em <b>-ь</b> podem ser masculinos (день) ou femininos (ночь). Os substantivos mudam de forma em <b>6 casos</b> (veja a tabela da seção seguinte)."},
{n:"Os 6 casos (exemplo: стол, книга, окно)",note:"Cada caso responde a uma pergunta e marca a função da palavra na frase.",h:["Caso","Pergunta / uso","Masc.","Fem.","Neutro"],r:`Nominativo|кто? что? — sujeito|стол|книга|окно
Genitivo|кого? чего? — posse, ausência, “de”|стола|книги|окна
Dativo|кому? чему? — a quem, “para”|столу|книге|окну
Acusativo|кого? что? — objeto direto|стол|книгу|окно
Instrumental|кем? чем? — “com”, instrumento|столом|книгой|окном
Preposicional|о ком? о чём? — depois de в, на, о|столе|книге|окне`},
{n:"Plural dos substantivos",h:["Regra","Exemplo"],r:`masculino: +ы / +и|стол → столы, дом → дома (irregular)
feminino: -а → -ы / -и|книга → книги, школа → школы
feminino em -я: → -и|неделя → недели
neutro: -о → -а|окно → окна
neutro: -е → -я|море → моря
irregulares comuns|человек → люди, ребёнок → дети, друг → друзья`},
{n:"Pessoas e família",h:["Russo","Português"],r:`мама|mãe
папа|pai
сестра|irmã
брат|irmão
сын|filho
дочь|filha
друг / подруга|amigo / amiga
сосед|vizinho
мальчик|menino
девочка|menina
мужчина|homem
женщина|mulher
ребёнок|criança
дедушка|avô
бабушка|avó
муж|marido
жена|esposa`},
{n:"Casa e objetos",h:["Russo","Português"],r:`дом|casa, prédio
комната|quarto, cômodo
кухня|cozinha
дверь|porta
окно|janela
стол|mesa
стул|cadeira
кровать|cama
ключ|chave
телефон|telefone
книга|livro
сумка|bolsa
машина|carro
часы|relógio
стакан|copo
тарелка|prato
нож|faca`},
{n:"Comida e bebida",h:["Russo","Português"],r:`хлеб|pão
вода|água
молоко|leite
кофе (м.)|café
чай|chá
рис|arroz
мясо|carne
курица|frango
рыба|peixe
яйцо|ovo
сыр|queijo
фрукт|fruta
яблоко|maçã
овощ|legume
сахар|açúcar
соль|sal
завтрак|café da manhã
обед|almoço
ужин|jantar`},
{n:"Corpo e saúde",h:["Russo","Português"],r:`голова|cabeça
глаз|olho
ухо|orelha
нос|nariz
рот|boca
рука|mão, braço
нога|perna, pé
сердце|coração
спина|costas
живот|barriga
врач|médico
боль|dor
температура|febre
лекарство|remédio`},
{n:"Cidade e lugares",h:["Russo","Português"],r:`город|cidade
улица|rua
дорога|estrada, caminho
мост|ponte
магазин|loja
рынок|mercado
банк|banco
школа|escola
больница|hospital
аэропорт|aeroporto
вокзал|estação de trem
ресторан|restaurante
парк|parque
офис|escritório
церковь|igreja
пляж|praia`},
{n:"Tempo e calendário",h:["Russo","Português"],r:`время|tempo, hora
день|dia
неделя|semana
месяц|mês
год|ano
утро|manhã
вечер|noite (início)
ночь|noite
сегодня|hoje
завтра|amanhã
вчера|ontem
выходные|fim de semana
отпуск|férias`},
{n:"Natureza e clima",h:["Russo","Português"],r:`солнце|sol
луна|lua
небо|céu
дождь|chuva
ветер|vento
снег|neve
дерево|árvore
цветок|flor
река|rio
море|mar
гора|montanha
собака|cachorro
кошка|gato
птица|pássaro
погода|clima`},
{n:"Trabalho e escola",h:["Russo","Português"],r:`работа|trabalho
начальник|chefe
коллега|colega
встреча|reunião
зарплата|salário
компания|empresa
учитель|professor
студент|estudante
урок|aula
экзамен|prova
вопрос|pergunta
ответ|resposta
проблема|problema
идея|ideia`}],
pron:[
{n:"Pronomes pessoais (6 casos)",h:["Nom.","Gen.","Dat.","Acus.","Instr.","Prep.","Português"],r:`я|меня|мне|меня|мной|мне|eu
ты|тебя|тебе|тебя|тобой|тебе|tu
он|его|ему|его|им|нём|ele
она|её|ей|её|ей|ней|ela
оно|его|ему|его|им|нём|ele/ela (neutro)
мы|нас|нам|нас|нами|нас|nós
вы|вас|вам|вас|вами|вас|vós, vocês
они|их|им|их|ими|них|eles, elas`},
{n:"Possessivos",note:"Concordam com o substantivo possuído em gênero, número e caso (формы do nominativo abaixo). Его, её, их <b>nunca mudam</b>.",h:["Masc.","Fem.","Neutro","Plural","Português"],r:`мой|моя|моё|мои|meu
твой|твоя|твоё|твои|teu
наш|наша|наше|наши|nosso
ваш|ваша|ваше|ваши|vosso
его|его|его|его|dele
её|её|её|её|dela
их|их|их|их|deles`},
{n:"Demonstrativos",h:["Masc.","Fem.","Neutro","Plural","Português"],r:`этот|эта|это|эти|este, esse
тот|та|то|те|aquele`},
{n:"Interrogativos",h:["Russo","Português"],r:`кто|quem
что|o que
какой|qual, que tipo de
который|qual (entre vários)
где|onde
куда|para onde
откуда|de onde
когда|quando
почему|por quê
зачем|para quê
как|como
сколько|quanto(s)
чей|de quem`},
{n:"Reflexivo e indefinidos",h:["Russo","Português"],r:`себя|se, si mesmo
сам|ele mesmo
кто-то|alguém
что-то|algo
никто|ninguém
ничто / ничего|nada
все|todos
всё|tudo
каждый|cada
другой|outro
такой|tal, assim
весь|todo`}],
adj:[
{n:"Como funcionam os adjetivos",note:"Concordam em <b>gênero, número e caso</b>. No nominativo: masc. <b>-ый / -ий / -ой</b>, fem. <b>-ая / -яя</b>, neutro <b>-ое / -ее</b>, plural <b>-ые / -ие</b>. O adjetivo vem antes do substantivo: новый дом, новая книга, новое окно, новые книги. Comparativo: <b>более</b> + adjetivo ou forma curta em -ее (быстрый → быстрее). Irregulares: хороший → лучше, плохой → хуже."},
{n:"Tamanho, idade e quantidade",h:["Masc.","Fem.","Neutro","Plural","Português"],r:`большой|большая|большое|большие|grande
маленький|маленькая|маленькое|маленькие|pequeno
высокий|высокая|высокое|высокие|alto
низкий|низкая|низкое|низкие|baixo
длинный|длинная|длинное|длинные|longo
короткий|короткая|короткое|короткие|curto
старый|старая|старое|старые|velho
новый|новая|новое|новые|novo
молодой|молодая|молодое|молодые|jovem
тяжёлый|тяжёлая|тяжёлое|тяжёлые|pesado
лёгкий|лёгкая|лёгкое|лёгкие|leve
полный|полная|полное|полные|cheio
пустой|пустая|пустое|пустые|vazio`},
{n:"Qualidade e opinião",h:["Masc.","Fem.","Neutro","Plural","Português"],r:`хороший|хорошая|хорошее|хорошие|bom
плохой|плохая|плохое|плохие|ruim
красивый|красивая|красивое|красивые|bonito
лёгкий|лёгкая|лёгкое|лёгкие|fácil
трудный|трудная|трудное|трудные|difícil
важный|важная|важное|важные|importante
интересный|интересная|интересное|интересные|interessante
скучный|скучная|скучное|скучные|chato
дорогой|дорогая|дорогое|дорогие|caro
дешёвый|дешёвая|дешёвое|дешёвые|barato
чистый|чистая|чистое|чистые|limpo
грязный|грязная|грязное|грязные|sujo
опасный|опасная|опасное|опасные|perigoso`},
{n:"Sentimentos e pessoas",note:"Para estados usa-se a <b>forma curta</b> (рад, устал, готов).",h:["Masc.","Fem.","Português"],r:`счастливый|счастливая|feliz
грустный|грустная|triste
весёлый|весёлая|alegre
добрый|добрая|bondoso
умный|умная|inteligente
ленивый|ленивая|preguiçoso
честный|честная|honesto
рад|рада|contente (forma curta)
устал|устала|cansado (forma curta)
голоден|голодна|com fome (forma curta)
болен|больна|doente (forma curta)`},
{n:"Cores",h:["Masc.","Fem.","Neutro","Plural","Português"],r:`красный|красная|красное|красные|vermelho
синий|синяя|синее|синие|azul escuro
голубой|голубая|голубое|голубые|azul claro
зелёный|зелёная|зелёное|зелёные|verde
жёлтый|жёлтая|жёлтое|жёлтые|amarelo
чёрный|чёрная|чёрное|чёрные|preto
белый|белая|белое|белые|branco
серый|серая|серое|серые|cinza
коричневый|коричневая|коричневое|коричневые|marrom
оранжевый|оранжевая|оранжевое|оранжевые|laranja
горячий|горячая|горячее|горячие|quente
холодный|холодная|холодное|холодные|frio`}],
art:[
{n:"Artigos",note:"<b>O russo não tem artigos.</b> A ideia de “um” ou “o” vem do contexto, da ordem das palavras e, às vezes, de palavras como один (um), этот (este) e какой-то (algum). Exemplo: Я читаю книгу = Eu leio um/o livro.",h:["Em português","Em russo"],r:`o livro / um livro|книга
a casa / uma casa|дом
um certo (alguém, algum)|какой-то, один
este / esse|этот
sem artigo|—`}],
adv:[
{n:"Como funcionam os advérbios",note:"Muitos advérbios de modo são a <b>forma curta neutra</b> do adjetivo, terminada em -о: хороший → хорошо, быстрый → быстро, плохой → плохо. Não variam."},
{n:"Tempo",h:["Russo","Português"],r:`сейчас|agora
потом|depois
тогда|então
сегодня|hoje
завтра|amanhã
вчера|ontem
скоро|logo
уже|já
ещё|ainda
давно|há muito tempo
рано|cedo
поздно|tarde
недавно|recentemente
наконец|finalmente`},
{n:"Frequência",h:["Russo","Português"],r:`всегда|sempre
обычно|geralmente
часто|frequentemente
иногда|às vezes
редко|raramente
никогда|nunca (com не)
каждый день|todo dia
раз в неделю|uma vez por semana`},
{n:"Lugar e direção",h:["Russo","Português"],r:`здесь|aqui
тут|aqui (coloquial)
там|lá
везде|em todo lugar
нигде|em lugar nenhum
близко|perto
далеко|longe
внутри|dentro
снаружи|fora
наверху|em cima
внизу|embaixo
впереди|na frente
сзади|atrás
сюда|para cá
туда|para lá`},
{n:"Modo e intensidade",h:["Russo","Português"],r:`хорошо|bem
плохо|mal
быстро|rápido
медленно|devagar
легко|facilmente
вместе|juntos
один / одна|sozinho(a)
очень|muito
много|muito (quantidade)
слишком|demais
довольно|bastante
почти|quase
только|apenas
тоже|também
может быть|talvez
наверное|provavelmente`}],
prep:[
{n:"As principais e o caso que pedem",note:"Cada preposição pede um caso. Algumas mudam de caso conforme o sentido: <b>в / на</b> + preposicional = onde está (в доме); + acusativo = para onde vai (в дом).",h:["Russo","Português","Caso"],r:`в|em, para dentro|prep. (onde) / acus. (para onde)
на|em cima de, em, para|prep. / acus.
из|de dentro de|gen.
с|de, desde (em cima); com|gen. / instr.
к|em direção a, para junto de|dat.
от|de (afastamento)|gen.
у|perto de; (ter) у меня есть|gen.
до|até, antes de|gen.
для|para|gen.
без|sem|gen.
после|depois de|gen.
около|perto de, cerca de|gen.
из-за|por causa de|gen.
по|por, ao longo de, conforme|dat.
благодаря|graças a|dat.
за|atrás de, por|instr. / acus.
перед|diante de, antes de|instr.
над|sobre (acima)|instr.
под|sob, embaixo de|instr. / acus.
между|entre|instr.
о / об|sobre (assunto)|prep.
при|junto a, durante|prep.
через|através de, daqui a|acus.
про|sobre (coloquial)|acus.`}],
conj:[
{n:"Coordenação",h:["Russo","Português","Exemplo"],r:`и|e|чай и кофе
а|e, mas (contraste suave)|Я дома, а ты на работе.
но|mas|маленький, но сильный
или|ou|сейчас или потом
либо … либо|ou … ou|либо ты, либо я
ни … ни|nem … nem|ни он, ни она
тоже / также|também|я тоже
поэтому|por isso|Я устал, поэтому сплю.
однако|no entanto|однако я иду
кроме того|além disso|кроме того, это дёшево`},
{n:"Subordinação",h:["Russo","Português","Exemplo"],r:`что|que|Я думаю, что это правда.
чтобы|para que, a fim de|Я говорю медленно, чтобы ты понял.
потому что|porque|Я остаюсь, потому что идёт дождь.
так как|já que|Так как поздно, я иду.
хотя|embora|Хотя поздно, я иду.
когда|quando|Позвони, когда придёшь.
пока|enquanto, até que|Я читаю, пока ты готовишь.
если|se|Если будет дождь, я останусь.
если бы|se (hipotético)|Если бы я знал…
как только|assim que|как только смогу
прежде чем|antes de|прежде чем уйти
после того как|depois que|после того как мы поели
как|como|Делай, как я.
ли|se (dúvida)|Не знаю, придёт ли он.`}]
};
