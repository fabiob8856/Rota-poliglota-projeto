/* ---------- vocabulário A1 por tema: pt | en | es | fr | ru | tr | ar ---------- */
const VTHEMES = {
 essencial:{t:"As palavras mais comuns", rows:[
 "eu|I|yo|je|я|ben|أنا","você|you|tú|tu|ты|sen|أنت","nós|we|nosotros|nous|мы|biz|نحن","eles|they|ellos|ils|они|onlar|هم",
 "sim|yes|sí|oui|да|evet|نعم","não|no|no|non|нет|hayır|لا","por favor|please|por favor|s'il vous plaît|пожалуйста|lütfen|من فضلك","obrigado|thank you|gracias|merci|спасибо|teşekkürler|شكرا",
 "olá|hello|hola|bonjour|привет|merhaba|مرحبا","tchau|goodbye|adiós|au revoir|до свидания|hoşça kal|مع السلامة","desculpe|sorry|perdón|pardon|извините|özür dilerim|آسف","hoje|today|hoy|aujourd'hui|сегодня|bugün|اليوم",
 "amanhã|tomorrow|mañana|demain|завтра|yarın|غدا","ontem|yesterday|ayer|hier|вчера|dün|أمس","aqui|here|aquí|ici|здесь|burada|هنا","agora|now|ahora|maintenant|сейчас|şimdi|الآن",
 "muito|very|muy|très|очень|çok|جدا","ter|to have|tener|avoir|иметь|sahip olmak|يملك","ir|to go|ir|aller|идти|gitmek|يذهب","fazer|to do|hacer|faire|делать|yapmak|يفعل",
 "querer|to want|querer|vouloir|хотеть|istemek|يريد","poder|can|poder|pouvoir|мочь|yapabilmek|يستطيع","ver|to see|ver|voir|видеть|görmek|يرى","dar|to give|dar|donner|давать|vermek|يعطي",
 "saber|to know|saber|savoir|знать|bilmek|يعرف","comer|to eat|comer|manger|есть|yemek|يأكل","beber|to drink|beber|boire|пить|içmek|يشرب","falar|to speak|hablar|parler|говорить|konuşmak|يتكلم",
 "ler|to read|leer|lire|читать|okumak|يقرأ","escrever|to write|escribir|écrire|писать|yazmak|يكتب","dormir|to sleep|dormir|dormir|спать|uyumak|ينام","trabalhar|to work|trabajar|travailler|работать|çalışmak|يعمل",
 "bom|good|bueno|bon|хороший|iyi|جيد","ruim|bad|malo|mauvais|плохой|kötü|سيء","grande|big|grande|grand|большой|büyük|كبير","pequeno|small|pequeño|petit|маленький|küçük|صغير",
 "novo|new|nuevo|nouveau|новый|yeni|جديد","velho|old|viejo|vieux|старый|eski|قديم","quente|hot|caliente|chaud|горячий|sıcak|حار","frio|cold|frío|froid|холодный|soğuk|بارد"]},
 comida:{t:"Comida e frutas", rows:[
 "maçã|apple|manzana|pomme|яблоко|elma|تفاحة","banana|banana|plátano|banane|банан|muz|موز","laranja|orange|naranja|orange|апельсин|portakal|برتقالة","uva|grape|uva|raisin|виноград|üzüm|عنب",
 "morango|strawberry|fresa|fraise|клубника|çilek|فراولة","limão|lemon|limón|citron|лимон|limon|ليمون","pão|bread|pan|pain|хлеб|ekmek|خبز","arroz|rice|arroz|riz|рис|pirinç|أرز",
 "carne|meat|carne|viande|мясо|et|لحم","frango|chicken|pollo|poulet|курица|tavuk|دجاج","peixe|fish|pescado|poisson|рыба|balık|سمك","ovo|egg|huevo|œuf|яйцо|yumurta|بيضة",
 "queijo|cheese|queso|fromage|сыр|peynir|جبن","leite|milk|leche|lait|молоко|süt|حليب","água|water|agua|eau|вода|su|ماء","café|coffee|café|café|кофе|kahve|قهوة",
 "chá|tea|té|thé|чай|çay|شاي","suco|juice|jugo|jus|сок|meyve suyu|عصير","sopa|soup|sopa|soupe|суп|çorba|شوربة","salada|salad|ensalada|salade|салат|salata|سلطة",
 "batata|potato|patata|pomme de terre|картофель|patates|بطاطس","tomate|tomato|tomate|tomate|помидор|domates|طماطم","cebola|onion|cebolla|oignon|лук|soğan|بصل","açúcar|sugar|azúcar|sucre|сахар|şeker|سكر"]},
 familia:{t:"Família e pessoas", rows:[
 "mãe|mother|madre|mère|мама|anne|أم","pai|father|padre|père|папа|baba|أب","irmão|brother|hermano|frère|брат|erkek kardeş|أخ","irmã|sister|hermana|sœur|сестра|kız kardeş|أخت",
 "filho|son|hijo|fils|сын|oğul|ابن","filha|daughter|hija|fille|дочь|kız evlat|ابنة","avô|grandfather|abuelo|grand-père|дедушка|dede|جد","avó|grandmother|abuela|grand-mère|бабушка|büyükanne|جدة",
 "tio|uncle|tío|oncle|дядя|amca|عم","tia|aunt|tía|tante|тётя|teyze|عمة","primo|cousin|primo|cousin|двоюродный брат|kuzen|ابن عم","marido|husband|marido|mari|муж|koca|زوج",
 "esposa|wife|esposa|épouse|жена|eş|زوجة","amigo|friend|amigo|ami|друг|arkadaş|صديق","homem|man|hombre|homme|мужчина|erkek|رجل","mulher|woman|mujer|femme|женщина|kadın|امرأة",
 "criança|child|niño|enfant|ребёнок|çocuk|طفل","bebê|baby|bebé|bébé|младенец|bebek|رضيع","vizinho|neighbor|vecino|voisin|сосед|komşu|جار","professor|teacher|profesor|professeur|учитель|öğretmen|معلم"]},
 casa:{t:"Casa e objetos", rows:[
 "casa|house|casa|maison|дом|ev|بيت","quarto|bedroom|dormitorio|chambre|спальня|yatak odası|غرفة نوم","cozinha|kitchen|cocina|cuisine|кухня|mutfak|مطبخ","banheiro|bathroom|baño|salle de bain|ванная|banyo|حمام",
 "sala|living room|salón|salon|гостиная|oturma odası|غرفة جلوس","porta|door|puerta|porte|дверь|kapı|باب","janela|window|ventana|fenêtre|окно|pencere|نافذة","mesa|table|mesa|table|стол|masa|طاولة",
 "cadeira|chair|silla|chaise|стул|sandalye|كرسي","cama|bed|cama|lit|кровать|yatak|سرير","sofá|sofa|sofá|canapé|диван|koltuk|أريكة","televisão|television|televisión|télévision|телевизор|televizyon|تلفاز",
 "geladeira|fridge|nevera|réfrigérateur|холодильник|buzdolabı|ثلاجة","chave|key|llave|clé|ключ|anahtar|مفتاح","livro|book|libro|livre|книга|kitap|كتاب","telefone|phone|teléfono|téléphone|телефон|telefon|هاتف",
 "computador|computer|ordenador|ordinateur|компьютер|bilgisayar|حاسوب","copo|glass|vaso|verre|стакан|bardak|كوب","prato|plate|plato|assiette|тарелка|tabak|صحن","garfo|fork|tenedor|fourchette|вилка|çatal|شوكة",
 "faca|knife|cuchillo|couteau|нож|bıçak|سكين","colher|spoon|cuchara|cuillère|ложка|kaşık|ملعقة","bolsa|bag|bolso|sac|сумка|çanta|حقيبة","relógio|clock|reloj|horloge|часы|saat|ساعة"]},
 corpo:{t:"Corpo, roupas e cores", rows:[
 "cabeça|head|cabeza|tête|голова|baş|رأس","olho|eye|ojo|œil|глаз|göz|عين","nariz|nose|nariz|nez|нос|burun|أنف","boca|mouth|boca|bouche|рот|ağız|فم",
 "orelha|ear|oreja|oreille|ухо|kulak|أذن","mão|hand|mano|main|рука|el|يد","pé|foot|pie|pied|нога|ayak|قدم","coração|heart|corazón|cœur|сердце|kalp|قلب",
 "camisa|shirt|camisa|chemise|рубашка|gömlek|قميص","calça|trousers|pantalones|pantalon|брюки|pantolon|بنطال","sapato|shoe|zapato|chaussure|туфля|ayakkabı|حذاء","vestido|dress|vestido|robe|платье|elbise|فستان",
 "chapéu|hat|sombrero|chapeau|шляпа|şapka|قبعة","casaco|coat|abrigo|manteau|пальто|ceket|معطف","vermelho|red|rojo|rouge|красный|kırmızı|أحمر","azul|blue|azul|bleu|синий|mavi|أزرق",
 "verde|green|verde|vert|зелёный|yeşil|أخضر","amarelo|yellow|amarillo|jaune|жёлтый|sarı|أصفر","preto|black|negro|noir|чёрный|siyah|أسود","branco|white|blanco|blanc|белый|beyaz|أبيض",
 "rosa|pink|rosa|rose|розовый|pembe|وردي","cinza|gray|gris|gris|серый|gri|رمادي","marrom|brown|marrón|marron|коричневый|kahverengi|بني","roxo|purple|morado|violet|фиолетовый|mor|بنفسجي"]},
 cidade:{t:"Cidade e viagem", rows:[
 "cidade|city|ciudad|ville|город|şehir|مدينة","rua|street|calle|rue|улица|sokak|شارع","loja|shop|tienda|magasin|магазин|dükkan|متجر","mercado|market|mercado|marché|рынок|pazar|سوق",
 "banco|bank|banco|banque|банк|banka|بنك","hospital|hospital|hospital|hôpital|больница|hastane|مستشفى","escola|school|escuela|école|школа|okul|مدرسة","farmácia|pharmacy|farmacia|pharmacie|аптека|eczane|صيدلية",
 "restaurante|restaurant|restaurante|restaurant|ресторан|restoran|مطعم","hotel|hotel|hotel|hôtel|гостиница|otel|فندق","aeroporto|airport|aeropuerto|aéroport|аэропорт|havalimanı|مطار","estação|station|estación|gare|вокзал|istasyon|محطة",
 "ônibus|bus|autobús|bus|автобус|otobüs|حافلة","trem|train|tren|train|поезд|tren|قطار","avião|plane|avión|avion|самолёт|uçak|طائرة","carro|car|coche|voiture|машина|araba|سيارة",
 "táxi|taxi|taxi|taxi|такси|taksi|سيارة أجرة","bilhete|ticket|billete|billet|билет|bilet|تذكرة","passaporte|passport|pasaporte|passeport|паспорт|pasaport|جواز سفر","mala|suitcase|maleta|valise|чемодан|bavul|حقيبة سفر",
 "mapa|map|mapa|carte|карта|harita|خريطة","praia|beach|playa|plage|пляж|plaj|شاطئ","parque|park|parque|parc|парк|park|حديقة","ponte|bridge|puente|pont|мост|köprü|جسر"]},
 trabalho:{t:"Trabalho e estudos", rows:[
 "trabalho|work|trabajo|travail|работа|iş|عمل","escritório|office|oficina|bureau|офис|ofis|مكتب","empresa|company|empresa|entreprise|компания|şirket|شركة","chefe|boss|jefe|chef|начальник|patron|مدير",
 "colega|colleague|colega|collègue|коллега|iş arkadaşı|زميل","reunião|meeting|reunión|réunion|встреча|toplantı|اجتماع","e-mail|email|correo electrónico|e-mail|электронная почта|e-posta|بريد إلكتروني","dinheiro|money|dinero|argent|деньги|para|مال",
 "salário|salary|salario|salaire|зарплата|maaş|راتب","profissão|profession|profesión|profession|профессия|meslek|مهنة","médico|doctor|médico|médecin|врач|doktor|طبيب","enfermeiro|nurse|enfermero|infirmier|медбрат|hemşire|ممرض",
 "engenheiro|engineer|ingeniero|ingénieur|инженер|mühendis|مهندس","estudante|student|estudiante|étudiant|студент|öğrenci|طالب","aula|class|clase|cours|урок|ders|حصة","caderno|notebook|cuaderno|cahier|тетрадь|defter|دفتر",
 "caneta|pen|bolígrafo|stylo|ручка|kalem|قلم","lápis|pencil|lápiz|crayon|карандаш|kurşun kalem|قلم رصاص","prova|test|examen|examen|экзамен|sınav|امتحان","universidade|university|universidad|université|университет|üniversite|جامعة"]}
};
