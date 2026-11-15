/* Estrutura da linguagem — dados: turco */
window.EST_DATA = window.EST_DATA || {};
EST_DATA.tr = {
verbNote:"O turco é <b>aglutinante</b>: o verbo recebe sufixos em sequência (raiz + negação + tempo + pessoa). Os sufixos seguem a <b>harmonia vocálica</b> (a/e, ı/i/u/ü). Não há gênero e o pronome pode ser omitido. Escolha o tempo para ver todos os verbos.",
noun:[
{n:"Como funcionam os substantivos",note:"<b>Sem gênero e sem artigos.</b> Plural: <b>-lar / -ler</b> (ev → evler, kitap → kitaplar). Depois de numeral o substantivo fica no singular (iki kitap). Casos são sufixos: veja a tabela seguinte."},
{n:"Casos (sufixos)",note:"Escolha a vogal pela harmonia: <b>a/e</b> (duas formas) ou <b>ı/i/u/ü</b> (quatro formas). Exemplos com ev (casa) e kitap (livro).",h:["Caso","Sufixo","Significado","Exemplo"],r:`Nominativo|—|sujeito|ev, kitap
Acusativo|-ı/-i/-u/-ü|objeto definido|evi, kitabı
Dativo|-a/-e (-ya/-ye)|para, em direção a|eve, kitaba
Locativo|-da/-de (-ta/-te)|em, no|evde, kitapta
Ablativo|-dan/-den (-tan/-ten)|de, a partir de|evden, kitaptan
Genitivo|-ın/-in/-un/-ün|de (posse)|evin, kitabın
Instrumental|-la/-le ou ile|com|evle, kitapla`},
{n:"Possessivos (sufixos no substantivo)",note:"Em vez de “meu livro”, o turco cola a pessoa ao final: kitap → kitabım.",h:["Pessoa","Depois de consoante","Exemplo com ev","Português"],r:`ben|-ım/-im/-um/-üm|evim|minha casa
sen|-ın/-in/-un/-ün|evin|tua casa
o|-ı/-i/-u/-ü|evi|casa dele
biz|-ımız/-imiz...|evimiz|nossa casa
siz|-ınız/-iniz...|eviniz|vossa casa
onlar|-ları/-leri|evleri|casa deles`},
{n:"Pessoas e família",h:["Turco","Português"],r:`anne|mãe
baba|pai
kız kardeş|irmã
erkek kardeş|irmão
oğul|filho
kız|filha, menina
arkadaş|amigo(a)
komşu|vizinho(a)
erkek çocuk|menino
adam|homem
kadın|mulher
çocuk|criança
dede|avô
nine / büyükanne|avó
koca|marido
eş / karı|esposa`},
{n:"Casa e objetos",h:["Turco","Português"],r:`ev|casa
oda|quarto, sala
mutfak|cozinha
kapı|porta
pencere|janela
masa|mesa
sandalye|cadeira
yatak|cama
anahtar|chave
telefon|telefone
kitap|livro
çanta|bolsa
araba|carro
saat|relógio, hora
bardak|copo
tabak|prato
bıçak|faca`},
{n:"Comida e bebida",h:["Turco","Português"],r:`ekmek|pão
su|água
süt|leite
kahve|café
çay|chá
pirinç / pilav|arroz
et|carne
tavuk|frango
balık|peixe
yumurta|ovo
peynir|queijo
meyve|fruta
elma|maçã
sebze|legume
şeker|açúcar
tuz|sal
kahvaltı|café da manhã
öğle yemeği|almoço
akşam yemeği|jantar`},
{n:"Corpo e saúde",h:["Turco","Português"],r:`baş|cabeça
göz|olho
kulak|orelha
burun|nariz
ağız|boca
el|mão
kol|braço
bacak|perna
ayak|pé
kalp|coração
sırt|costas
karın|barriga
doktor|médico
ağrı|dor
ateş|febre
ilaç|remédio`},
{n:"Cidade e lugares",h:["Turco","Português"],r:`şehir|cidade
sokak|rua
yol|estrada
köprü|ponte
dükkân|loja
pazar|mercado
banka|banco
okul|escola
hastane|hospital
havalimanı|aeroporto
istasyon|estação
restoran|restaurante
park|parque
ofis|escritório
kilise|igreja
plaj|praia
cami|mesquita`},
{n:"Tempo e calendário",h:["Turco","Português"],r:`zaman|tempo
gün|dia
hafta|semana
ay|mês, lua
yıl|ano
sabah|manhã
öğleden sonra|tarde
akşam|noite (início)
gece|noite
bugün|hoje
yarın|amanhã
dün|ontem
hafta sonu|fim de semana
tatil|férias`},
{n:"Natureza e clima",h:["Turco","Português"],r:`güneş|sol
ay|lua
gökyüzü|céu
yağmur|chuva
rüzgâr|vento
kar|neve
ağaç|árvore
çiçek|flor
nehir|rio
deniz|mar
dağ|montanha
köpek|cachorro
kedi|gato
kuş|pássaro
hava|clima, ar`},
{n:"Trabalho e escola",h:["Turco","Português"],r:`iş|trabalho
patron / müdür|chefe
meslektaş|colega
toplantı|reunião
maaş|salário
şirket|empresa
öğretmen|professor
öğrenci|aluno
ders|aula
sınav|prova
ödev|lição de casa
soru|pergunta
cevap|resposta
sorun|problema
fikir|ideia`}],
pron:[
{n:"Pronomes pessoais",h:["Nominativo","Acusativo","Dativo","Locativo","Português"],r:`ben|beni|bana|bende|eu
sen|seni|sana|sende|tu, você
o|onu|ona|onda|ele, ela, ele/ela (neutro)
biz|bizi|bize|bizde|nós
siz|sizi|size|sizde|vós, vocês
onlar|onları|onlara|onlarda|eles, elas`},
{n:"Demonstrativos",h:["Turco","Português"],r:`bu|este, esse, isto
şu|aquele (ao alcance da vista)
o|aquele, aquilo
bunlar|estes
şunlar|aqueles
onlar|eles, aqueles`},
{n:"Interrogativos",h:["Turco","Português"],r:`kim|quem
ne|o que
nere / nerede|onde
nereye|para onde
nereden|de onde
ne zaman|quando
neden / niye|por que
nasıl|como
kaç|quantos
hangi|qual
kaçıncı|qual (posição)
mı / mi / mu / mü|partícula de pergunta sim/não`},
{n:"Reflexivo e indefinidos",h:["Turco","Português"],r:`kendi|próprio, si mesmo
birisi / biri|alguém
kimse|ninguém (com negação)
bir şey|algo
hiçbir şey|nada
herkes|todos
her şey|tudo
her|cada
başka|outro
bazı|alguns
birçok|muitos
hepsi|todos eles`}],
adj:[
{n:"Como funcionam os adjetivos",note:"<b>Nunca mudam</b> e vêm antes do substantivo: büyük ev, büyük evler. Comparativo: <b>daha</b> + adjetivo (daha büyük); superlativo: <b>en</b> + adjetivo (en büyük). Muitas palavras viram adjetivo com <b>-li/-siz</b> (com/sem): tuzlu (salgado), tuzsuz (sem sal)."},
{n:"Tamanho, idade e quantidade",h:["Turco","Português"],r:`büyük|grande
küçük|pequeno
uzun|alto, longo
kısa|baixo, curto
geniş|largo
dar|estreito
eski|velho (coisa)
yaşlı|velho (pessoa)
yeni|novo
genç|jovem
ağır|pesado
hafif|leve
dolu|cheio
boş|vazio
çok|muito
az|pouco`},
{n:"Qualidade e opinião",h:["Turco","Português"],r:`iyi|bom
kötü|ruim
harika|ótimo
güzel|bonito, bom
çirkin|feio
kolay|fácil
zor|difícil
önemli|importante
ilginç|interessante
sıkıcı|chato
pahalı|caro
ucuz|barato
temiz|limpo
kirli|sujo
güvenli|seguro
tehlikeli|perigoso`},
{n:"Sentimentos e pessoas",h:["Turco","Português"],r:`mutlu|feliz
üzgün|triste
kızgın|bravo
yorgun|cansado
aç|com fome
susamış|com sede
korkmuş|com medo
endişeli|preocupado
heyecanlı|animado
sıkılmış|entediado
nazik|gentil
komik|engraçado
akıllı|inteligente
tembel|preguiçoso
dürüst|honesto
utangaç|tímido`},
{n:"Cores e características",h:["Turco","Português"],r:`kırmızı|vermelho
mavi|azul
yeşil|verde
sarı|amarelo
siyah|preto
beyaz|branco
kahverengi|marrom
gri|cinza
pembe|rosa
turuncu|laranja
sıcak|quente
soğuk|frio
yumuşak|macio
sert|duro`}],
art:[
{n:"Artigos",note:"Turco <b>não tem artigo definido</b> (o, a). O indefinido é a palavra <b>bir</b> (um, uma), colocada antes do adjetivo e do substantivo: bir ev (uma casa), güzel bir ev (uma casa bonita). O “o/a” aparece pelo contexto ou pelo sufixo do acusativo (evi gördüm = vi <b>a</b> casa).",h:["Em português","Em turco"],r:`uma casa|bir ev
a casa (sujeito)|ev
a casa (objeto definido)|evi
uma casa bonita|güzel bir ev
a casa bonita|güzel ev
um certo|bir`}],
adv:[
{n:"Como funcionam os advérbios",note:"Muitos adjetivos funcionam como advérbio sem mudar: iyi (bom/bem), hızlı (rápido/rapidamente). Também se forma com <b>-ca/-ce</b> (yavaş → yavaşça) e <b>-le</b>."},
{n:"Tempo",h:["Turco","Português"],r:`şimdi|agora
sonra|depois
o zaman|então
bugün|hoje
yarın|amanhã
dün|ontem
yakında|logo
zaten|já
hâlâ|ainda
erken|cedo
geç|tarde
geçenlerde|recentemente
nihayet|finalmente
önce|antes, primeiro`},
{n:"Frequência",h:["Turco","Português"],r:`her zaman|sempre
genellikle|geralmente
sık sık|frequentemente
bazen|às vezes
nadiren|raramente
asla / hiç|nunca
her gün|todo dia
haftada bir|uma vez por semana`},
{n:"Lugar e direção",h:["Turco","Português"],r:`burada|aqui
şurada|ali
orada|lá
her yerde|em todo lugar
hiçbir yerde|em lugar nenhum
yakın|perto
uzak|longe
içeride|dentro
dışarıda|fora
yukarıda|em cima
aşağıda|embaixo
ileride|à frente
geride|atrás`},
{n:"Modo e intensidade",h:["Turco","Português"],r:`iyi|bem
kötü|mal
hızlı|rápido
yavaş|devagar
kolayca|facilmente
birlikte|juntos
yalnız|sozinho
çok|muito
fazla|demais
oldukça|bastante
neredeyse|quase
sadece|apenas
de / da|também
belki|talvez
herhâlde|provavelmente`}],
prep:[
{n:"Pós-posições",note:"O turco usa <b>pós-posições</b>: elas vêm <b>depois</b> do substantivo. Algumas pedem caso: <b>için</b> (para), <b>ile</b> (com), <b>gibi</b> (como), <b>kadar</b> (até, tanto quanto), <b>sonra / önce</b> (depois, antes).",h:["Turco","Português","Exemplo"],r:`için|para, por|senin için (para você)
ile / -la|com|arkadaşımla (com meu amigo)
gibi|como|bir çocuk gibi
kadar|até, tanto quanto|akşama kadar
sonra|depois de|dersten sonra
önce|antes de|yemekten önce
göre|segundo|bana göre
karşı|contra, em frente a|duvara karşı
doğru|em direção a|eve doğru
beri|desde|pazartesiden beri
boyunca|durante, ao longo de|gün boyunca
rağmen|apesar de|yağmura rağmen
üzerinde|sobre|masanın üzerinde
altında|embaixo de|masanın altında
yanında|ao lado de|bankanın yanında
önünde|na frente de|evin önünde
arkasında|atrás de|evin arkasında
arasında|entre|ikisinin arasında
içinde|dentro de|kutunun içinde
dışında|fora de|evin dışında`}],
conj:[
{n:"Coordenação",h:["Turco","Português","Exemplo"],r:`ve|e|çay ve kahve
ama / fakat|mas|küçük ama güçlü
veya / ya da|ou|şimdi ya da sonra
ya … ya|ou … ou|ya sen ya ben
hem … hem|tanto … quanto|hem güzel hem ucuz
ne … ne|nem … nem|ne o ne ben
de / da|também, e|ben de
ancak|porém|ancak gidiyorum
bu yüzden|por isso|Yorgunum, bu yüzden uyuyorum.
ayrıca|além disso|ayrıca ucuz`},
{n:"Subordinação",note:"Em turco muitas ideias que o português expressa com “que”, “quando”, “porque” viram sufixos no verbo (-dığı için, -ince, -ken) em vez de conjunções separadas.",h:["Turco","Português","Exemplo"],r:`çünkü|porque|Kalıyorum çünkü yağmur yağıyor.
-dığı için|porque (sufixo)|Yorgun olduğum için uyudum.
ki|que|Biliyorum ki doğru.
eğer … -sa|se (sufixo -sa/-se)|Yağmur yağarsa kalırım.
-ince / -dığında|quando|Gelince ara.
-ken|enquanto|Yürürken dinliyorum.
-dikten sonra|depois que|yemek yedikten sonra
-meden önce|antes de|gitmeden önce
-ıncaya kadar|até que|dönünceye kadar
-sa da|embora|Geç olsa da gidiyorum.
-mek için|para (fazer)|öğrenmek için
-dığı halde|apesar de|Yorgun olduğu halde çalıştı.`}]
};
