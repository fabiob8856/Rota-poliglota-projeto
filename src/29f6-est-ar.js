/* Estrutura da linguagem — dados: árabe (escrito sem os sinais de vogal curta) */
window.EST_DATA = window.EST_DATA || {};
EST_DATA.ar = {
verbNote:"Os verbos árabes se constroem sobre uma <b>raiz de 3 consoantes</b> (ك-ت-ب = escrever). O passado usa terminações (كتبت), o presente usa prefixos (أكتب), e o gênero também aparece no verbo. Aqui os verbos aparecem sem os sinais de vogal curta. Escolha o tempo para ver os verbos conjugados.",
noun:[
{n:"Como funcionam os substantivos",note:"Dois gêneros: <b>masculino</b> e <b>feminino</b>. A maioria dos femininos termina em <b>ـة</b> (مدرسة, escola). Além do singular e do plural, existe o <b>dual</b> (dois): sufixo <b>ـان</b> / <b>ـين</b> (كتابان = dois livros). Plurais podem ser <b>regulares</b> (معلم → معلمون, معلمة → معلمات) ou <b>quebrados</b>, em que a palavra muda por dentro (كتاب → كتب, رجل → رجال) e precisam ser memorizados. O artigo definido <b>ال</b> se cola no começo (الكتاب = o livro)."},
{n:"Pessoas e família",h:["Árabe","Português"],r:`أم|mãe
أب|pai
أخت|irmã
أخ|irmão
ابن|filho
ابنة|filha
صديق|amigo
جار|vizinho
ولد|menino
بنت|menina
رجل|homem
امرأة|mulher
طفل|criança
جد|avô
جدة|avó
زوج|marido
زوجة|esposa`},
{n:"Casa e objetos",h:["Árabe","Português"],r:`بيت|casa
غرفة|quarto
مطبخ|cozinha
باب|porta
نافذة|janela
طاولة|mesa
كرسي|cadeira
سرير|cama
مفتاح|chave
هاتف|telefone
كتاب|livro
حقيبة|bolsa
سيارة|carro
ساعة|relógio, hora
كوب|copo
صحن|prato
سكين|faca`},
{n:"Comida e bebida",h:["Árabe","Português"],r:`خبز|pão
ماء|água
حليب|leite
قهوة|café
شاي|chá
أرز|arroz
لحم|carne
دجاج|frango
سمك|peixe
بيضة|ovo
جبن|queijo
فاكهة|fruta
تفاحة|maçã
خضار|legumes
سكر|açúcar
ملح|sal
فطور|café da manhã
غداء|almoço
عشاء|jantar`},
{n:"Corpo e saúde",h:["Árabe","Português"],r:`رأس|cabeça
عين|olho
أذن|orelha
أنف|nariz
فم|boca
يد|mão
ذراع|braço
رجل|perna, pé
قلب|coração
ظهر|costas
بطن|barriga
طبيب|médico
ألم|dor
حمى|febre
دواء|remédio`},
{n:"Cidade e lugares",h:["Árabe","Português"],r:`مدينة|cidade
شارع|rua
طريق|estrada
جسر|ponte
متجر|loja
سوق|mercado
بنك|banco
مدرسة|escola
مستشفى|hospital
مطار|aeroporto
محطة|estação
مطعم|restaurante
حديقة|parque
مكتب|escritório
مسجد|mesquita
كنيسة|igreja
شاطئ|praia`},
{n:"Tempo e calendário",h:["Árabe","Português"],r:`وقت|tempo
يوم|dia
أسبوع|semana
شهر|mês
سنة|ano
صباح|manhã
ظهر|meio-dia
مساء|tarde, noite
ليل|noite
اليوم|hoje
غدا|amanhã
أمس|ontem
نهاية الأسبوع|fim de semana
عطلة|férias`},
{n:"Natureza e clima",h:["Árabe","Português"],r:`شمس|sol
قمر|lua
سماء|céu
مطر|chuva
ريح|vento
ثلج|neve
شجرة|árvore
زهرة|flor
نهر|rio
بحر|mar
جبل|montanha
كلب|cachorro
قطة|gata
طائر|pássaro
طقس|clima`},
{n:"Trabalho e escola",h:["Árabe","Português"],r:`عمل|trabalho
مدير|chefe, diretor
زميل|colega
اجتماع|reunião
راتب|salário
شركة|empresa
معلم|professor
طالب|aluno
درس|aula
امتحان|prova
واجب|lição de casa
سؤال|pergunta
جواب|resposta
مشكلة|problema
فكرة|ideia`}],
pron:[
{n:"Pronomes pessoais (separados)",note:"O árabe distingue masculino e feminino também em “você”, e tem formas para dois (dual).",h:["Árabe","Português"],r:`أنا|eu
أنتَ|você (masc.)
أنتِ|você (fem.)
هو|ele
هي|ela
نحن|nós
أنتم|vocês (masc.)
أنتنّ|vocês (fem.)
هم|eles
هنّ|elas`},
{n:"Pronomes anexados (possessivo e objeto)",note:"Colam-se ao fim da palavra: كتاب + ي = كتابي (meu livro). Depois de verbos indicam o objeto: رأيته (eu o vi).",h:["Sufixo","Com كتاب","Português"],r:`ـي|كتابي|meu livro
ـكَ|كتابك|teu livro (masc.)
ـكِ|كتابك|teu livro (fem.)
ـه|كتابه|livro dele
ـها|كتابها|livro dela
ـنا|كتابنا|nosso livro
ـكم|كتابكم|livro de vocês
ـهم|كتابهم|livro deles
ـهنّ|كتابهنّ|livro delas`},
{n:"Demonstrativos",h:["Árabe","Português"],r:`هذا|este (masc.)
هذه|esta (fem.)
هؤلاء|estes, estas (pessoas)
ذلك|aquele (masc.)
تلك|aquela (fem.)
أولئك|aqueles (pessoas)`},
{n:"Interrogativos",h:["Árabe","Português"],r:`من|quem
ما / ماذا|o que
أين|onde
متى|quando
لماذا|por quê
كيف|como
كم|quanto(s)
أي|qual
هل|partícula de pergunta sim/não
لمن|de quem
من أين|de onde
إلى أين|para onde`},
{n:"Relativos e indefinidos",h:["Árabe","Português"],r:`الذي|que, o qual (masc.)
التي|que, a qual (fem.)
الذين|os quais (masc. pl.)
اللواتي|as quais (fem. pl.)
كل|todo, cada
بعض|alguns
أحد|alguém, um
لا أحد|ninguém
شيء|coisa
لا شيء|nada
آخر|outro
نفس|mesmo`}],
adj:[
{n:"Como funcionam os adjetivos",note:"O adjetivo vem <b>depois</b> do substantivo e concorda em gênero, número e definitude: بيت كبير (uma casa grande), البيت الكبير (a casa grande), سيارة كبيرة (um carro grande, feminino). Feminino: <b>+ة</b>. Plural de coisas é tratado como feminino singular: كتب كبيرة. Comparativo e superlativo usam a forma <b>أفعل</b> (كبير → أكبر = maior)."},
{n:"Tamanho, idade e quantidade",h:["Masculino","Feminino","Português"],r:`كبير|كبيرة|grande
صغير|صغيرة|pequeno
طويل|طويلة|alto, longo
قصير|قصيرة|baixo, curto
واسع|واسعة|largo
ضيق|ضيقة|estreito
قديم|قديمة|velho (coisa)
جديد|جديدة|novo
شاب|شابة|jovem
ثقيل|ثقيلة|pesado
خفيف|خفيفة|leve
ممتلئ|ممتلئة|cheio
فارغ|فارغة|vazio`},
{n:"Qualidade e opinião",h:["Masculino","Feminino","Português"],r:`جيد|جيدة|bom
سيئ|سيئة|ruim
رائع|رائعة|ótimo
جميل|جميلة|bonito
قبيح|قبيحة|feio
سهل|سهلة|fácil
صعب|صعبة|difícil
مهم|مهمة|importante
مثير|مثيرة|interessante
ممل|مملة|chato
غالي|غالية|caro
رخيص|رخيصة|barato
نظيف|نظيفة|limpo
وسخ|وسخة|sujo
آمن|آمنة|seguro
خطير|خطيرة|perigoso`},
{n:"Sentimentos e pessoas",h:["Masculino","Feminino","Português"],r:`سعيد|سعيدة|feliz
حزين|حزينة|triste
غاضب|غاضبة|bravo
متعب|متعبة|cansado
جائع|جائعة|com fome
عطشان|عطشانة|com sede
خائف|خائفة|com medo
قلق|قلقة|preocupado
لطيف|لطيفة|gentil
مضحك|مضحكة|engraçado
ذكي|ذكية|inteligente
كسول|كسولة|preguiçoso
صادق|صادقة|honesto
خجول|خجولة|tímido`},
{n:"Cores",note:"As cores têm formato próprio: masculino <b>أفعل</b>, feminino <b>فعلاء</b>.",h:["Masculino","Feminino","Português"],r:`أحمر|حمراء|vermelho
أزرق|زرقاء|azul
أخضر|خضراء|verde
أصفر|صفراء|amarelo
أسود|سوداء|preto
أبيض|بيضاء|branco
بني|بنية|marrom
رمادي|رمادية|cinza
وردي|وردية|rosa
برتقالي|برتقالية|laranja
ساخن|ساخنة|quente
بارد|باردة|frio`}],
art:[
{n:"Artigo",note:"O árabe tem apenas o artigo <b>definido ال</b>, que se cola à palavra e não varia por gênero ou número: الكتاب (o livro), المدرسة (a escola). Diante das chamadas <b>letras solares</b> (ت ث د ذ ر ز س ش ص ض ط ظ ل ن) o ل não se pronuncia e a letra seguinte é dobrada (الشمس lê-se ash-shams). Não há artigo indefinido: كتاب = um livro (substantivo sem ال).",h:["Árabe","Português"],r:`ال + كتاب = الكتاب|o livro
ال + بنت = البنت|a menina
ال + شمس = الشمس|o sol (ل muda)
ال + قمر = القمر|a lua (ل pronunciado)
كتاب|um livro
بنت|uma menina`}],
adv:[
{n:"Como funcionam os advérbios",note:"Muitos advérbios são substantivos terminados em <b>ـاً</b> (tanwin com alif): جدا (muito), سريعا (rapidamente), دائما (sempre). Também se usa a construção <b>بـ + substantivo</b> (بسرعة = com rapidez)."},
{n:"Tempo",h:["Árabe","Português"],r:`الآن|agora
بعد ذلك|depois
حينئذ|então
اليوم|hoje
غدا|amanhã
أمس|ontem
قريبا|logo
بالفعل|já
ما زال|ainda
مبكرا|cedo
متأخرا|tarde
مؤخرا|recentemente
أخيرا|finalmente
قبل|antes`},
{n:"Frequência",h:["Árabe","Português"],r:`دائما|sempre
عادة|geralmente
غالبا|frequentemente
أحيانا|às vezes
نادرا|raramente
أبدا|nunca
كل يوم|todo dia
مرة في الأسبوع|uma vez por semana`},
{n:"Lugar e direção",h:["Árabe","Português"],r:`هنا|aqui
هناك|lá
في كل مكان|em todo lugar
لا مكان|em lugar nenhum
قريب|perto
بعيد|longe
داخل|dentro
خارج|fora
فوق|em cima
تحت|embaixo
أمام|na frente
خلف|atrás`},
{n:"Modo e intensidade",h:["Árabe","Português"],r:`جيدا|bem
بشكل سيئ|mal
بسرعة|rapidamente
ببطء|devagar
بسهولة|facilmente
معا|juntos
وحده|sozinho
جدا|muito
كثيرا|bastante, muito
أكثر من اللازم|demais
تقريبا|quase
فقط|apenas
أيضا|também
ربما|talvez
غالبا|provavelmente`}],
prep:[
{n:"As principais",note:"Depois de uma preposição o substantivo fica no caso genitivo (terminação ـِ). Várias preposições aceitam pronomes anexados: لي (para mim), معه (com ele), منها (dela).",h:["Árabe","Português","Exemplo"],r:`في|em, dentro de|في البيت
على|sobre, em cima de|على الطاولة
من|de (origem)|من البرازيل
إلى|para, até|إلى المدرسة
مع|com|مع صديقي
بدون / بلا|sem|بدون سكر
عن|sobre, de|عن التاريخ
ب|com, em, por|بالسيارة (de carro)
ل|para, de (posse)|للطالب
ك|como|كالطفل
قبل|antes de|قبل الغداء
بعد|depois de|بعد العمل
حتى|até|حتى الصباح
منذ|desde|منذ الاثنين
خلال|durante|خلال الدرس
بين|entre|بين البيتين
أمام|na frente de|أمام الباب
خلف|atrás de|خلف البيت
فوق|em cima de|فوق الطاولة
تحت|embaixo de|تحت السرير
عند|junto a, na casa de|عند الباب
ضد|contra|ضد الحائط
نحو|em direção a|نحو المدينة`}],
conj:[
{n:"Coordenação",h:["Árabe","Português","Exemplo"],r:`و|e|شاي وقهوة
أو|ou|الآن أو لاحقا
لكن|mas|صغير لكن قوي
ثم|depois, então|أكلت ثم نمت
ف|então, e logo|دخلت فجلست
أم|ou (em pergunta dupla)|أهذا أم ذاك؟
بل|e sim|ليس أحمر بل أزرق
لذلك|por isso|أنا متعب لذلك أنام
أيضا|também|أنا أيضا
ومع ذلك|mesmo assim|ومع ذلك سأذهب
بالإضافة إلى ذلك|além disso|بالإضافة إلى ذلك، هو رخيص`},
{n:"Subordinação",h:["Árabe","Português","Exemplo"],r:`أن / أنّ|que|أعتقد أنه صحيح
لأن|porque|أبقى لأن المطر ينزل
إذا|se (real)|إذا أمطرت بقيت
لو|se (irreal)|لو عرفت لقلت
عندما|quando|اتصل بي عندما تصل
بينما|enquanto|أقرأ بينما تطبخ
حتى|até que, para que|انتظر حتى أعود
قبل أن|antes que|قبل أن تذهب
بعد أن|depois que|بعد أن أكلنا
مع أن|embora|مع أنه متأخر سأذهب
كي / لكي|para que|أتكلم ببطء لكي تفهم
حيث|onde, já que|حيث إنه صعب
كما|como, assim como|كما قلت`}]
};
