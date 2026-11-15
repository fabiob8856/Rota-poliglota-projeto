/* Pacote de cenas A1: pt|en|es|fr|ru|tr|ar — a palavra entre [colchetes] vira a lacuna */
const PKDATA = {};
PKDATA.A1 = `
# Apresentações
Olá, eu me chamo Ana.|Hello, my [name] is Ana.|Hola, me [llamo] Ana.|Bonjour, je [m'appelle] Ana.|Привет, меня [зовут] Ана.|Merhaba, benim [adım] Ana.|مرحبا، [اسمي] آنا.
Prazer em conhecer você.|[Nice] to meet you.|[Mucho] gusto.|[Enchanté] de faire votre connaissance.|[Приятно] познакомиться с вами.|Tanıştığımıza [memnun] oldum.|[تشرفت] بمعرفتك.
Eu sou do Brasil.|I am [from] Brazil.|Soy [de] Brasil.|Je [suis] du Brésil.|Я [из] Бразилии.|Ben [Brezilyalıyım].|أنا [من] البرازيل.
Eu moro em São Paulo.|I [live] in São Paulo.|[Vivo] en São Paulo.|J'[habite] à São Paulo.|Я [живу] в Сан-Паулу.|São Paulo'da [yaşıyorum].|أنا [أسكن] في ساو باولو.
Como você se chama?|What is your [name]?|¿Cómo te [llamas]?|Comment tu [t'appelles]?|Как тебя [зовут]?|Senin [adın] ne?|ما [اسمك] الكريم؟
Eu sou estudante.|I am a [student].|Soy [estudiante].|Je suis [étudiant].|Я [студент].|Ben [öğrenciyim].|أنا [طالب].
# Família
Esta é a minha família.|This is my [family].|Esta es mi [familia].|Voici ma [famille].|Это моя [семья].|Bu benim [ailem].|هذه [عائلتي].
Eu tenho dois irmãos.|I have two [brothers].|Tengo dos [hermanos].|J'ai deux [frères].|У меня два [брата].|İki [erkek kardeşim] var.|عندي [أخوان].
Minha mãe é professora.|My [mother] is a teacher.|Mi [madre] es profesora.|Ma [mère] est professeure.|Моя [мама] учительница.|[Annem] öğretmen.|[أمي] معلمة.
Meu pai trabalha em casa.|My [father] works at home.|Mi [padre] trabaja en casa.|Mon [père] travaille à la maison.|Мой [папа] работает дома.|Babam evde [çalışıyor].|[أبي] يعمل في البيت.
Você tem filhos?|Do you have [children]?|¿Tienes [hijos]?|Tu as des [enfants]?|У тебя есть [дети]?|Çocukların [var] mı?|هل عندك [أولاد]؟
Eu amo a minha família.|I [love] my family.|[Amo] a mi familia.|J'[aime] ma famille.|Я [люблю] свою семью.|Ailemi [seviyorum].|أنا [أحب] عائلتي.
# Comida e bebida
Eu quero um café, por favor.|I [want] a coffee, please.|[Quiero] un café, por favor.|Je [voudrais] un café, s'il vous plaît.|Я [хочу] кофе, пожалуйста.|Bir kahve [istiyorum], lütfen.|[أريد] قهوة من فضلك.
Eu bebo água todos os dias.|I [drink] water every day.|[Bebo] agua todos los días.|Je [bois] de l'eau tous les jours.|Я [пью] воду каждый день.|Her gün su [içiyorum].|أنا [أشرب] الماء كل يوم.
Você gosta de pizza?|Do you [like] pizza?|¿Te [gusta] la pizza?|Tu [aimes] la pizza?|Тебе [нравится] пицца?|Pizzayı [sever] misin?|هل [تحب] البيتزا؟
O pão está na mesa.|The [bread] is on the table.|El [pan] está en la mesa.|Le [pain] est sur la table.|[Хлеб] лежит на столе.|[Ekmek] masanın üstünde.|[الخبز] على الطاولة.
Eu não como carne.|I don't [eat] meat.|No [como] carne.|Je ne [mange] pas de viande.|Я не [ем] мясо.|Ben et [yemiyorum].|أنا لا [آكل] اللحم.
Pode trazer a conta, por favor?|Can you bring the [bill], please?|¿Puede traer la [cuenta], por favor?|Pouvez-vous apporter l'[addition], s'il vous plaît?|Принесите, пожалуйста, [счёт].|Hesabı [getirir] misiniz, lütfen?|هل يمكن أن تحضر [الحساب] من فضلك؟
# Horas e rotina
Eu acordo às sete horas.|I [wake] up at seven.|Me [despierto] a las siete.|Je me [réveille] à sept heures.|Я [просыпаюсь] в семь часов.|Saat yedide [uyanıyorum].|أنا [أستيقظ] في السابعة.
Que horas são agora?|What [time] is it now?|¿Qué [hora] es ahora?|Quelle [heure] est-il maintenant?|Сколько сейчас [времени]?|Şu an saat [kaç]?|كم [الساعة] الآن؟
Eu trabalho de segunda a sexta.|I [work] from Monday to Friday.|[Trabajo] de lunes a viernes.|Je [travaille] du lundi au vendredi.|Я [работаю] с понедельника по пятницу.|Pazartesiden cumaya kadar [çalışıyorum].|أنا [أعمل] من الاثنين إلى الجمعة.
Eu almoço ao meio-dia.|I have [lunch] at noon.|[Almuerzo] al mediodía.|Je [déjeune] à midi.|Я [обедаю] в полдень.|Öğle yemeğini [yerim].|أنا [أتناول] الغداء ظهرا.
Eu vou dormir às dez.|I go to [bed] at ten.|Me [acuesto] a las diez.|Je vais me [coucher] à dix heures.|Я [ложусь] спать в десять.|Saat onda [yatıyorum].|أنا [أنام] في العاشرة.
Hoje é domingo.|Today is [Sunday].|Hoy es [domingo].|Aujourd'hui, c'est [dimanche].|Сегодня у нас [воскресенье].|Bugün günlerden [pazar].|اليوم هو [الأحد].
# Compras simples
Quanto custa isto?|How [much] is this?|¿Cuánto [cuesta] esto?|Combien ça [coûte]?|Сколько это [стоит]?|Bu ne [kadar]?|كم [سعر] هذا؟
É muito caro.|It is very [expensive].|Es muy [caro].|C'est très [cher].|Это очень [дорого].|Bu çok [pahalı].|هذا [غالٍ] جدا.
Eu quero comprar uma camisa.|I want to [buy] a shirt.|Quiero [comprar] una camisa.|Je veux [acheter] une chemise.|Я хочу [купить] рубашку.|Bir gömlek [almak] istiyorum.|أريد أن [أشتري] قميصا.
Posso pagar com cartão?|Can I pay by [card]?|¿Puedo pagar con [tarjeta]?|Puis-je payer par [carte]?|Можно заплатить [картой]?|[Kartla] ödeyebilir miyim?|هل يمكنني الدفع [بالبطاقة]؟
Tem em tamanho menor?|Do you have a [smaller] size?|¿Tiene una [talla] más pequeña?|Avez-vous une [taille] plus petite?|Есть ли [размер] поменьше?|Daha küçük [beden] var mı?|هل يوجد [مقاس] أصغر؟
Eu só estou olhando, obrigado.|I'm just [looking], thanks.|Solo estoy [mirando], gracias.|Je [regarde] seulement, merci.|Я просто [смотрю], спасибо.|Sadece [bakıyorum], teşekkürler.|أنا فقط [أنظر] شكرا.
# Cidade e lugares
Com licença, onde fica o banheiro?|Excuse me, where is the [bathroom]?|Perdón, ¿dónde está el [baño]?|Excusez-moi, où sont les [toilettes]?|Извините, где здесь [туалет]?|Affedersiniz, [tuvalet] nerede?|من فضلك، أين [الحمام]؟
O banco fica perto da estação.|The bank is [near] the station.|El banco está [cerca] de la estación.|La banque est [près] de la gare.|Банк находится [рядом] с вокзалом.|Banka istasyonun [yanında].|البنك [قرب] المحطة.
Vire à direita aqui.|Turn [right] here.|Gira a la [derecha] aquí.|Tourne à [droite] ici.|Поверните [направо] здесь.|Burada [sağa] dön.|اتجه [يمينا] هنا.
A escola da minha cidade é grande.|The school in my town is [big].|La escuela de mi ciudad es [grande].|L'école de ma ville est [grande].|Школа в моём городе [большая].|Benim şehrimdeki okul [büyük].|المدرسة في مدينتي [كبيرة].
Eu vou ao mercado a pé.|I go to the market on [foot].|Voy al mercado a [pie].|Je vais au marché à [pied].|Я иду на рынок [пешком].|Pazara [yürüyerek] gidiyorum.|أذهب إلى السوق [مشيا].
O ônibus chega em cinco minutos.|The [bus] arrives in five minutes.|El [autobús] llega en cinco minutos.|Le [bus] arrive dans cinq minutes.|[Автобус] приходит через пять минут.|[Otobüs] beş dakikada geliyor.|[الحافلة] تصل بعد خمس دقائق.
# Casa
Minha casa nova é pequena.|My new house is [small].|Mi casa nueva es [pequeña].|Ma nouvelle maison est [petite].|Мой новый дом [маленький].|Yeni evim [küçük].|بيتي الجديد [صغير].
Há um sofá na sala.|There is a [sofa] in the living room.|Hay un [sofá] en la sala.|Il y a un [canapé] dans le salon.|В гостиной есть [диван].|Oturma odasında bir [koltuk] var.|توجد [أريكة] في غرفة المعيشة.
A cozinha fica ao lado do quarto.|The kitchen is [next] to the bedroom.|La cocina está al [lado] del dormitorio.|La cuisine est à [côté] de la chambre.|Кухня [рядом] со спальней.|Mutfak yatak odasının [yanında].|المطبخ [بجانب] غرفة النوم.
Eu durmo no meu quarto.|I [sleep] in my bedroom.|[Duermo] en mi habitación.|Je [dors] dans ma chambre.|Я [сплю] в своей комнате.|Yatak odamda [uyuyorum].|أنا [أنام] في غرفتي.
A janela da sala está aberta.|The living room [window] is open.|La [ventana] de la sala está abierta.|La [fenêtre] du salon est ouverte.|Окно в гостиной [открыто].|Oturma odasının [penceresi] açık.|[نافذة] غرفة المعيشة مفتوحة.
Eu moro em um apartamento.|I live in an [apartment].|Vivo en un [apartamento].|J'habite dans un [appartement].|Я живу в [квартире].|Bir [dairede] yaşıyorum.|أسكن في [شقة].
# Tempo e clima
Hoje está calor.|It is [hot] today.|Hoy hace [calor].|Il fait [chaud] aujourd'hui.|Сегодня [жарко].|Bugün hava [sıcak].|الجو [حار] اليوم.
Está chovendo agora.|It is [raining] now.|Ahora está [lloviendo].|Il [pleut] maintenant.|Сейчас [идёт] дождь.|Şimdi yağmur [yağıyor].|[تمطر] السماء الآن.
No inverno faz frio.|In [winter] it is cold.|En [invierno] hace frío.|En [hiver], il fait froid.|Зимой [холодно].|[Kışın] hava soğuk.|في [الشتاء] الجو بارد.
Eu gosto muito do verão.|I really like [summer].|Me gusta mucho el [verano].|J'aime beaucoup l'[été].|Я очень люблю [лето].|Yazı çok [severim].|أحب [الصيف] كثيرا.
Está nublado hoje.|It is [cloudy] today.|Hoy está [nublado].|Il y a des [nuages] aujourd'hui.|Сегодня на улице [облачно].|Bugün hava [bulutlu].|الجو [غائم] اليوم.
Amanhã vai fazer bom tempo.|Tomorrow the weather will be [nice].|Mañana hará [buen] tiempo.|Demain, il fera [beau].|Завтра будет [хорошая] погода.|Yarın hava [güzel] olacak.|غدا سيكون الطقس [جميلا].
# Pedir ajuda
Você pode me ajudar?|Can you [help] me?|¿Puedes [ayudarme]?|Tu peux m'[aider]?|Ты можешь мне [помочь]?|Bana [yardım] edebilir misin?|هل يمكنك أن [تساعدني]؟
Eu não entendo esta palavra.|I don't [understand] this word.|No [entiendo] esta palabra.|Je ne [comprends] pas ce mot.|Я не [понимаю] это слово.|Bu kelimeyi [anlamıyorum].|لا [أفهم] هذه الكلمة.
Pode repetir, por favor?|Can you [repeat], please?|¿Puede [repetir], por favor?|Pouvez-vous [répéter], s'il vous plaît?|Повторите, [пожалуйста], ещё раз.|Tekrar [eder] misiniz, lütfen?|هل يمكنك أن [تعيد] من فضلك؟
Fale mais devagar, por favor.|Please speak more [slowly].|Habla más [despacio], por favor.|Parle plus [lentement], s'il te plaît.|Говорите [медленнее], пожалуйста.|Lütfen daha [yavaş] konuşun.|تكلم [ببطء] من فضلك.
Eu ainda não falo muito bem.|I don't speak very [well] yet.|Todavía no hablo muy [bien].|Je ne parle pas encore très [bien].|Я пока не очень хорошо [говорю].|Henüz çok iyi [konuşamıyorum].|لا [أتكلم] جيدا بعد.
Muito obrigado pela ajuda.|Thank you very much for the [help].|Muchas gracias por la [ayuda].|Merci beaucoup pour l'[aide].|Большое спасибо за [помощь].|Yardımın için çok [teşekkürler].|شكرا جزيلا على [المساعدة].
# Hobbies
Eu gosto de ler livros.|I like [reading] books.|Me gusta [leer] libros.|J'aime [lire] des livres.|Я люблю [читать] книги.|Kitap [okumayı] severim.|أحب [قراءة] الكتب.
Eu adoro jogar futebol.|I love [playing] football.|Me encanta [jugar] al fútbol.|J'adore [jouer] au football.|Я обожаю [играть] в футбол.|Futbol [oynamayı] çok severim.|أحب [لعب] كرة القدم.
No fim de semana eu assisto a filmes.|On the weekend I [watch] movies.|El fin de semana [veo] películas.|Le week-end, je [regarde] des films.|На выходных я [смотрю] фильмы.|Hafta sonu film [izlerim].|في عطلة نهاية الأسبوع [أشاهد] الأفلام.
Você toca algum instrumento?|Do you [play] an instrument?|¿[Tocas] algún instrumento?|Tu [joues] d'un instrument?|Ты [играешь] на каком-нибудь инструменте?|Bir enstrüman [çalıyor] musun?|هل [تعزف] على آلة موسيقية؟
Eu corro no parque toda manhã.|I [run] in the park every morning.|[Corro] en el parque cada mañana.|Je [cours] dans le parc chaque matin.|Я [бегаю] в парке каждое утро.|Her sabah parkta [koşarım].|أنا [أجري] في الحديقة كل صباح.
Eu viajo com meus amigos.|I [travel] with my friends.|[Viajo] con mis amigos.|Je [voyage] avec mes amis.|Я [путешествую] с друзьями.|Arkadaşlarımla [seyahat] ederim.|أنا [أسافر] مع أصدقائي.
`;
