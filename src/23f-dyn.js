/* Tradução dos títulos dinâmicos das missões (blockText) — ordem: en|es|fr|ru|tr|ar */
const MT_SUB = {en:"English subtitles", es:"subtítulos en español", fr:"sous-titres en français", ru:"русскими субтитрами", tr:"Türkçe altyazı", ar:"ترجمة بالعربية"};
const DX = s => s.split("|").map(x => x.trim());
/* frases fixas (chave = título em PT com "em inglês/espanhol/..." normalizado para "em {L}") */
const DT = {
"Ouça um vídeo para iniciantes":DX("Listen to a video for beginners|Escucha un vídeo para principiantes|Écoute une vidéo pour débutants|Послушай видео для начинающих|Yeni başlayanlar için bir video dinle|استمع إلى فيديو للمبتدئين"),
"Fale sobre você mesmo: nome, cidade, trabalho e um hobby":DX("Talk about yourself: name, city, job and a hobby|Habla de ti: nombre, ciudad, trabajo y un pasatiempo|Parle de toi : nom, ville, travail et un loisir|Расскажи о себе: имя, город, работа и хобби|Kendin hakkında konuş: ad, şehir, iş ve bir hobi|تحدّث عن نفسك: الاسم والمدينة والعمل وهواية"),
"Pergunte e responda em voz alta":DX("Ask and answer out loud|Pregunta y responde en voz alta|Pose des questions et réponds à voix haute|Задавай вопросы и отвечай вслух|Yüksek sesle sor ve cevapla|اسأل وأجب بصوت عالٍ"),
"Leia um texto curto de nível A1":DX("Read a short A1-level text|Lee un texto corto de nivel A1|Lis un texte court de niveau A1|Прочитай короткий текст уровня A1|A1 seviyesinde kısa bir metin oku|اقرأ نصًّا قصيرًا بمستوى A1"),
"Escreva um resumo de 3 frases":DX("Write a 3-sentence summary|Escribe un resumen de 3 frases|Écris un résumé en 3 phrases|Напиши краткое изложение из 3 предложений|3 cümlelik bir özet yaz|اكتب ملخصًا من 3 جمل"),
"Escreva 5 frases simples sobre você":DX("Write 5 simple sentences about yourself|Escribe 5 frases simples sobre ti|Écris 5 phrases simples sur toi|Напиши 5 простых предложений о себе|Kendin hakkında 5 basit cümle yaz|اكتب 5 جمل بسيطة عن نفسك"),
"Assista um desenho ou vídeo curto com legenda em {L}":DX("Watch a cartoon or short video with {SUB}|Mira un dibujo animado o vídeo corto con {SUB}|Regarde un dessin animé ou une courte vidéo avec {SUB}|Посмотри мультфильм или короткое видео с {SUB}|{SUB} ile bir çizgi film ya da kısa video izle|شاهد رسومًا متحركة أو فيديو قصيرًا مع {SUB}"),
"Fale sobre o que você fez ontem":DX("Talk about what you did yesterday|Habla de lo que hiciste ayer|Parle de ce que tu as fait hier|Расскажи, что ты делал(а) вчера|Dün ne yaptığını anlat|تحدّث عمّا فعلته أمس"),
"Converse por voz com uma IA":DX("Have a voice conversation with an AI|Conversa por voz con una IA|Discute à voix haute avec une IA|Поговори голосом с ИИ|Bir yapay zekâyla sesli sohbet et|تحدّث صوتيًّا مع ذكاء اصطناعي"),
"Leia 10 páginas de um livro graded A2":DX("Read 10 pages of a graded A2 book|Lee 10 páginas de un libro graduado A2|Lis 10 pages d'un livre gradué A2|Прочитай 10 страниц адаптированной книги A2|A2 seviyesinde uyarlanmış bir kitaptan 10 sayfa oku|اقرأ 10 صفحات من كتاب مبسّط بمستوى A2"),
"Leia 10 páginas de um livro graduado A2 ou um texto curto":DX("Read 10 pages of a graded A2 book or a short text|Lee 10 páginas de un libro graduado A2 o un texto corto|Lis 10 pages d'un livre gradué A2 ou un texte court|Прочитай 10 страниц книги A2 или короткий текст|A2 kitabından 10 sayfa ya da kısa bir metin oku|اقرأ 10 صفحات من كتاب مبسّط بمستوى A2 أو نصًّا قصيرًا"),
"Escreva um resumo de 3 a 5 frases":DX("Write a 3-to-5-sentence summary|Escribe un resumen de 3 a 5 frases|Écris un résumé de 3 à 5 phrases|Напиши краткое изложение из 3–5 предложений|3–5 cümlelik bir özet yaz|اكتب ملخصًا من 3 إلى 5 جمل"),
"Escreva 5 frases sobre o seu dia":DX("Write 5 sentences about your day|Escribe 5 frases sobre tu día|Écris 5 phrases sur ta journée|Напиши 5 предложений о своём дне|Gününle ilgili 5 cümle yaz|اكتب 5 جمل عن يومك"),
"Assista um episódio de série com legenda em {L}":DX("Watch a series episode with {SUB}|Mira un episodio de una serie con {SUB}|Regarde un épisode de série avec {SUB}|Посмотри серию сериала с {SUB}|{SUB} ile bir dizi bölümü izle|شاهد حلقة من مسلسل مع {SUB}"),
"Fale sobre uma história de 3 minutos":DX("Tell a 3-minute story|Cuenta una historia de 3 minutos|Raconte une histoire de 3 minutes|Расскажи историю на 3 минуты|3 dakikalık bir hikâye anlat|احكِ قصة مدتها 3 دقائق"),
"Converse com um tutor ou parceiro de troca":DX("Talk with a tutor or exchange partner|Conversa con un tutor o compañero de intercambio|Discute avec un tuteur ou un partenaire d'échange|Поговори с репетитором или партнёром по обмену|Bir öğretmen ya da dil değişim partneriyle konuş|تحدّث مع مدرّس أو شريك تبادل لغوي"),
"Leia um capítulo de livro graded B1 ou um artigo curto de tecnologia":DX("Read a chapter of a graded B1 book or a short tech article|Lee un capítulo de un libro graduado B1 o un artículo corto de tecnología|Lis un chapitre d'un livre gradué B1 ou un court article de technologie|Прочитай главу книги B1 или короткую статью о технологиях|B1 kitabından bir bölüm ya da kısa bir teknoloji makalesi oku|اقرأ فصلًا من كتاب مبسّط بمستوى B1 أو مقالًا قصيرًا عن التقنية"),
"Leia um capítulo de livro graded B1 ou uma notícia da BBC Mundo":DX("|Lee un capítulo de un libro graduado B1 o una noticia de BBC Mundo||||"),
"Leia um capítulo de livro graded B1 ou um artigo do 1jour1actu":DX("||Lis un chapitre d'un livre gradué B1 ou un article de 1jour1actu|||"),
"Leia um capítulo de livro graduado B1 ou um artigo curto":DX("||||| اقرأ فصلًا من كتاب مبسّط بمستوى B1 أو مقالًا قصيرًا".trim()),
"Escreva um resumo de um parágrafo":DX("Write a one-paragraph summary|Escribe un resumen de un párrafo|Écris un résumé d'un paragraphe|Напиши краткое изложение в один абзац|Bir paragraflık özet yaz|اكتب ملخصًا من فقرة واحدة"),
"Escreva 8 frases com conectores":DX("Write 8 sentences with connectors|Escribe 8 frases con conectores|Écris 8 phrases avec des connecteurs|Напиши 8 предложений со связками|Bağlaçlarla 8 cümle yaz|اكتب 8 جمل باستخدام أدوات الربط"),
"Ouça um episódio de podcast para nativos do seu tema":DX("Listen to a native-speaker podcast episode on your topic|Escucha un episodio de un pódcast para nativos sobre tu tema|Écoute un épisode de podcast pour natifs sur ton sujet|Послушай выпуск подкаста для носителей языка по твоей теме|Konunla ilgili, anadili konuşanlar için bir podcast bölümü dinle|استمع إلى حلقة بودكاست للناطقين الأصليين في مجالك"),
"Fale sobre um projeto ou dashboard seu, como numa reunião":DX("Talk about a project or dashboard of yours, as in a meeting|Habla de un proyecto o dashboard tuyo, como en una reunión|Parle d'un de tes projets ou dashboards, comme en réunion|Расскажи о своём проекте или дашборде, как на встрече|Kendi projen ya da dashboard'un hakkında bir toplantıdaymış gibi konuş|تحدّث عن مشروع أو لوحة بيانات خاصة بك كما في اجتماع"),
"Fale sobre um projeto ou relatório seu, como numa reunião":DX("Talk about a project or report of yours, as in a meeting|Habla de un proyecto o informe tuyo, como en una reunión|Parle d'un de tes projets ou rapports, comme en réunion|Расскажи о своём проекте или отчёте, как на встрече|Kendi projen ya da raporun hakkında bir toplantıdaymış gibi konuş|تحدّث عن مشروع أو تقرير خاص بك كما في اجتماع"),
"Simule uma reunião em {L}":DX("Simulate a meeting {in}|Simula una reunión {in}|Simule une réunion {in}|Проведи пробную встречу {in}|{in} bir toplantıyı canlandır|حاكِ اجتماعًا {in}"),
"Leia um artigo técnico de dados ou uma notícia da BBC":DX("Read a technical data article or a BBC news story|Lee un artículo técnico de datos o una noticia de la BBC|Lis un article technique sur les données ou une actualité de la BBC|Прочитай техническую статью о данных или новость BBC|Veri ile ilgili teknik bir makale ya da bir BBC haberi oku|اقرأ مقالًا تقنيًّا عن البيانات أو خبرًا من BBC"),
"Escreva um e-mail profissional":DX("Write a professional email|Escribe un correo profesional|Écris un e-mail professionnel|Напиши деловое письмо|Profesyonel bir e-posta yaz|اكتب بريدًا إلكترونيًّا مهنيًّا"),
"Assista um episódio de série sem legenda em português":DX("Watch a series episode without Portuguese subtitles|Mira un episodio de una serie sin subtítulos en portugués|Regarde un épisode de série sans sous-titres en portugais|Посмотри серию сериала без португальских субтитров|Portekizce altyazı olmadan bir dizi bölümü izle|شاهد حلقة من مسلسل دون ترجمة برتغالية"),
"Assista um episódio de série turca sem legenda em português":DX("|||| Portekizce altyazı olmadan bir Türk dizisi bölümü izle|".replace("| ","|")),
"Ouça um podcast nativo na velocidade normal":DX("Listen to a native podcast at normal speed|Escucha un pódcast nativo a velocidad normal|Écoute un podcast natif à vitesse normale|Послушай подкаст для носителей в обычном темпе|Normal hızda anadili konuşanlar için bir podcast dinle|استمع إلى بودكاست أصلي بالسرعة العادية"),
"Ouça um podcast ou debate na velocidade normal":DX("Listen to a podcast or debate at normal speed|Escucha un pódcast o debate a velocidad normal|Écoute un podcast ou un débat à vitesse normale|Послушай подкаст или дебаты в обычном темпе|Normal hızda bir podcast ya da tartışma dinle|استمع إلى بودكاست أو نقاش بالسرعة العادية"),
"Fale sobre um tema polêmico, defendendo um lado":DX("Talk about a controversial topic, defending one side|Habla de un tema polémico defendiendo una postura|Parle d'un sujet polémique en défendant un camp|Расскажи о спорной теме, защищая одну сторону|Tartışmalı bir konuyu bir tarafı savunarak anlat|تحدّث عن موضوع مثير للجدل مدافعًا عن أحد الطرفين"),
"Debata um tema com alguém":DX("Debate a topic with someone|Debate un tema con alguien|Débats d'un sujet avec quelqu'un|Обсуди тему с кем-нибудь в формате дебатов|Biriyle bir konu üzerinde tartış|ناقش موضوعًا مع شخص ما"),
"Escreva um texto argumentativo de 250 palavras":DX("Write a 250-word argumentative text|Escribe un texto argumentativo de 250 palabras|Écris un texte argumentatif de 250 mots|Напиши аргументативный текст на 250 слов|250 kelimelik bir tartışma metni yaz|اكتب نصًّا حِجاجيًّا من 250 كلمة"),
"Assista um episódio de série sem legenda":DX("Watch a series episode without subtitles|Mira un episodio de una serie sin subtítulos|Regarde un épisode de série sans sous-titres|Посмотри серию сериала без субтитров|Altyazısız bir dizi bölümü izle|شاهد حلقة من مسلسل بدون ترجمة"),
"Fale sobre um tema complexo, improvisando sem roteiro":DX("Talk about a complex topic, improvising without a script|Habla de un tema complejo improvisando, sin guion|Parle d'un sujet complexe en improvisant, sans notes|Расскажи о сложной теме, импровизируя без сценария|Karmaşık bir konuyu plansız, doğaçlama anlat|تحدّث عن موضوع معقّد مرتجلًا دون نص مكتوب"),
"Converse longamente com nativos":DX("Have a long conversation with native speakers|Conversa largo rato con nativos|Discute longuement avec des natifs|Долго поговори с носителями языка|Anadili konuşanlarla uzun uzun sohbet et|تحدّث مطوّلًا مع ناطقين أصليين"),
"Leia um capítulo de literatura ou um ensaio em {L}":DX("Read a chapter of literature or an essay {in}|Lee un capítulo de literatura o un ensayo {in}|Lis un chapitre de littérature ou un essai {in}|Прочитай главу литературы или эссе {in}|{in} bir edebiyat bölümü ya da deneme oku|اقرأ فصلًا أدبيًّا أو مقالة {in}"),
"Escreva um resumo de dois parágrafos":DX("Write a two-paragraph summary|Escribe un resumen de dos párrafos|Écris un résumé de deux paragraphes|Напиши краткое изложение в два абзаца|İki paragraflık özet yaz|اكتب ملخصًا من فقرتين"),
"Escreva um texto com estilo próprio":DX("Write a text in your own style|Escribe un texto con estilo propio|Écris un texte avec ton propre style|Напиши текст в собственном стиле|Kendi üslubunla bir metin yaz|اكتب نصًّا بأسلوبك الخاص"),
"Assista um filme com gírias e sotaques variados":DX("Watch a film with slang and varied accents|Mira una película con jerga y acentos variados|Regarde un film avec de l'argot et des accents variés|Посмотри фильм с сленгом и разными акцентами|Argo ve farklı aksanlar içeren bir film izle|شاهد فيلمًا بعامية ولهجات متنوعة"),
"Assista um filme com gírias e fala rápida":DX("Watch a film with slang and fast speech|Mira una película con jerga y habla rápida|Regarde un film avec de l'argot et un débit rapide|Посмотри фильм с сленгом и быстрой речью|Argo ve hızlı konuşma içeren bir film izle|شاهد فيلمًا بعامية وكلام سريع"),
"Assista um filme com humor e fala rápida":DX("Watch a film with humor and fast speech|Mira una película con humor y habla rápida|Regarde un film avec de l'humour et un débit rapide|Посмотри фильм с юмором и быстрой речью|Mizah ve hızlı konuşma içeren bir film izle|شاهد فيلمًا بروح الدعابة وكلام سريع"),
"Assista um desenho ou programa infantil em árabe padrão":DX("||||| شاهد رسومًا متحركة أو برنامج أطفال بالعربية الفصحى".trim()),
"Assista um episódio de série ou documentário com legenda em {L}":DX("||||| شاهد حلقة من مسلسل أو فيلم وثائقي مع {SUB}".trim()),
"Assista um episódio de um canal de árabe para iniciantes com legenda":DX("||||| شاهد حلقة من قناة لتعلّم العربية للمبتدئين مع ترجمة".trim()),
"Assista um episódio de série espanhola ou latina com legenda em {L}":DX("|Mira un episodio de una serie española o latinoamericana con {SUB}||||"),
"Assista um episódio de série francesa com legenda em {L}":DX("||Regarde un épisode d'une série française avec {SUB}|||"),
"Assista um episódio de série russa com legenda em {L}":DX("|||Посмотри серию русского сериала с {SUB}||"),
"Assista um episódio de série turca com legenda em {L}":DX("||||{SUB} ile bir Türk dizisi bölümü izle|"),
"Assista um episódio de Easy Russian ou de um desenho russo com legenda":DX("|||Посмотри серию Easy Russian или русского мультфильма с субтитрами||"),
"Assista um episódio de Easy Turkish ou de um desenho turco com legenda":DX("||||Altyazılı bir Easy Turkish bölümü ya da Türk çizgi filmi izle|"),
"Leia um capítulo de literatura":DX("|Lee un capítulo de literatura|||| "),
"Leia um capítulo de literatura clássica ou contemporânea":DX("Read a chapter of classic or contemporary literature|Lee un capítulo de literatura clásica o contemporánea|Lis un chapitre de littérature classique ou contemporaine|Прочитай главу классической или современной литературы|Klasik ya da çağdaş edebiyattan bir bölüm oku|اقرأ فصلًا من الأدب الكلاسيكي أو المعاصر"),
"Leia um capítulo de literatura turca":DX("||||Türk edebiyatından bir bölüm oku|"),
"Leia um artigo de tecnologia ou dados em {L}":DX("|||Прочитай статью о технологиях или данных на русском|| "),
"Leia um artigo de tecnologia ou economia em {L}":DX("||||Türkçe teknoloji ya da ekonomi makalesi oku|"),
"Leia um artigo longo ou um ensaio em {L}":DX("Read a long article or an essay {in}|Lee un artículo largo o un ensayo {in}|Lis un long article ou un essai {in}|Прочитай длинную статью или эссе {in}|{in} uzun bir makale ya da deneme oku|اقرأ مقالًا طويلًا أو مقالة {in}"),
"Leia uma notícia ou artigo de tecnologia em {L}":DX("||||| اقرأ خبرًا أو مقالًا عن التقنية {in}".trim()),
"Leia um texto curto com vogais marcadas":DX("||||| اقرأ نصًّا قصيرًا مع التشكيل".trim()),
"Escreva 5 frases simples sobre você, em cirílico":DX("|||Напиши 5 простых предложений о себе кириллицей||"),
"Escreva 5 frases simples sobre você, em árabe":DX("||||| اكتب 5 جمل بسيطة عن نفسك بالعربية".trim()),
"Ouça um programa de rádio ao vivo":DX("|Escucha un programa de radio en directo|||| "),
"Ouça um programa de rádio ou um debate ao vivo em {L}":DX("||||Canlı bir radyo programı ya da tartışma dinle (Türkçe)|".replace("| ","|")),
"Ouça um episódio de podcast para iniciantes":DX("||||| استمع إلى حلقة بودكاست للمبتدئين".trim()),
"Ouça um episódio de podcast em árabe padrão":DX("||||| استمع إلى حلقة بودكاست بالعربية الفصحى".trim()),
"Ouça um episódio de podcast ou telejornal em árabe padrão":DX("||||| استمع إلى حلقة بودكاست أو نشرة أخبار بالعربية الفصحى".trim())
};
/* ajustes de itens específicos por idioma (preenche as lacunas acima) */
(function(){
  const set=(k,ix,v)=>{(DT[k]=DT[k]||[null,null,null,null,null,null])[ix]=v};
  set("Assista um episódio de série turca sem legenda em português",4,"Portekizce altyazı olmadan bir Türk dizisi bölümü izle");
  set("Leia um capítulo de livro graded B1 ou uma notícia da BBC Mundo",1,"Lee un capítulo de un libro graduado B1 o una noticia de BBC Mundo");
  set("Leia um capítulo de livro graded B1 ou um artigo do 1jour1actu",2,"Lis un chapitre d'un livre gradué B1 ou un article de 1jour1actu");
  set("Leia um capítulo de livro graduado B1 ou um artigo curto",5,"اقرأ فصلًا من كتاب مبسّط بمستوى B1 أو مقالًا قصيرًا");
  set("Leia um capítulo de literatura",1,"Lee un capítulo de literatura");
  set("Leia um artigo de tecnologia ou dados em {L}",3,"Прочитай статью о технологиях или данных на русском");
  set("Ouça um programa de rádio ou um debate ao vivo em {L}",3,"Послушай радиопрограмму или дебаты в прямом эфире на русском");
  set("Ouça um programa de rádio ou um debate ao vivo em {L}",4,"Canlı bir radyo programı ya da tartışma dinle (Türkçe)");
  set("Ouça um programa de rádio ou um debate ao vivo em {L}",5,"استمع إلى برنامج إذاعي أو نقاش مباشر بالعربية");
  set("Ouça um programa de rádio ao vivo",1,"Escucha un programa de radio en directo");
  /* em/fr/en usam o mesmo texto de "programa de rádio ou debate" via regex abaixo */
})();
/* modelos com nome próprio capturado ($1, $2) — ordem en|es|fr|ru|tr|ar */
const DR = [
 [/^Ouça um vídeo para iniciantes$/, null],
 [/^Ouça um episódio do (.+)$/, DX("Listen to an episode of $1|Escucha un episodio de $1|Écoute un épisode de $1|Послушай выпуск $1|$1 bölümünü dinle|استمع إلى حلقة من $1")],
 [/^Assista um episódio de (Friends)(?: com legenda em \{L\})$/, DX("Watch an episode of $1 with {SUB}|||||")],
 [/^Assista um episódio de (Easy \w+) com legenda$/, DX("Watch an episode of $1 with subtitles|Mira un episodio de $1 con subtítulos|Regarde un épisode de $1 avec sous-titres|Посмотри серию $1 с субтитрами|Altyazılı bir $1 bölümü izle|شاهد حلقة من $1 مع ترجمة")],
 [/^Assista um episódio de (Extra en \S+) ou um vídeo do (.+)$/, DX("Watch an episode of $1 or a video from $2|Mira un episodio de $1 o un vídeo de $2|Regarde un épisode d'$1 ou une vidéo de $2|Посмотри серию $1 или видео $2|$1 bölümü ya da $2 videosu izle|شاهد حلقة من $1 أو فيديو من $2")],
 [/^Assista um episódio de ([A-Z]\S*(?: \S+)*)$/, DX("Watch an episode of $1|Mira un episodio de $1|Regarde un épisode de $1|Посмотри серию $1|$1 bölümü izle|شاهد حلقة من $1")],
 [/^Assista um vídeo curto do canal (.+)$/, DX("Watch a short video from the channel $1|Mira un vídeo corto del canal $1|Regarde une courte vidéo de la chaîne $1|Посмотри короткое видео с канала $1|$1 kanalından kısa bir video izle|شاهد فيديو قصيرًا من قناة $1")],
 [/^Assista um vídeo curto do (.+)$/, DX("Watch a short video from $1|Mira un vídeo corto de $1|Regarde une courte vidéo de $1|Посмотри короткое видео от $1|$1 kanalından kısa bir video izle|شاهد فيديو قصيرًا من $1")],
 [/^Leia um artigo longo do (.+?) ou da revista (.+)$/, DX("Read a long article from $1 or the magazine $2|Lee un artículo largo de $1 o de la revista $2|Lis un long article de $1 ou du magazine $2|Прочитай длинную статью из $1 или журнала $2|$1 ya da $2 dergisinden uzun bir makale oku|اقرأ مقالًا طويلًا من $1 أو من مجلة $2")],
 [/^Leia um artigo longo do (.+?) ou do (.+)$/, DX("Read a long article from $1 or $2|Lee un artículo largo de $1 o de $2|Lis un long article du $1 ou du $2|Прочитай длинную статью из $1 или $2|$1 ya da $2'den uzun bir makale oku|اقرأ مقالًا طويلًا من $1 أو $2")],
 [/^Leia um artigo do (.+?) ou um texto técnico da sua área$/, DX("Read an article from $1 or a technical text from your field|Lee un artículo de $1 o un texto técnico de tu área|Lis un article du $1 ou un texte technique de ton domaine|Прочитай статью из $1 или технический текст по своей специальности|$1 ya da alanınla ilgili teknik bir metin oku|اقرأ مقالًا من $1 أو نصًّا تقنيًّا في مجالك")],
 [/^Ouça um programa d[ae] (.+?) ou um debate ao vivo$/, DX("Listen to a $1 programme or a live debate|Escucha un programa de $1 o un debate en directo|Écoute une émission de $1 ou un débat en direct|Послушай программу $1 или дебаты в прямом эфире|$1 programını ya da canlı bir tartışmayı dinle|استمع إلى برنامج $1 أو نقاش مباشر")]
];
/* sufixos após vírgula e parênteses finais */
const DSUF = {
 ", sem legenda":DX(", without subtitles|, sin subtítulos|, sans sous-titres|, без субтитров|, altyazısız|، بدون ترجمة"),
 ", com legenda":DX(", with subtitles|, con subtítulos|, avec sous-titres|, с субтитрами|, altyazılı|، مع ترجمة")
};
const DPAR = {
 "nível fácil":DX("easy level|nivel fácil|niveau facile|лёгкий уровень|kolay seviye|مستوى سهل"),
 "nível iniciante":DX("beginner level|nivel principiante|niveau débutant|начальный уровень|başlangıç seviyesi|مستوى مبتدئ"),
 "intermediário":DX("intermediate|intermedio|intermédiaire|средний уровень|orta seviye|متوسط"),
 "nível superbeginner":DX("superbeginner level|nivel superbeginner|niveau superbeginner|уровень superbeginner|superbeginner seviyesi|مستوى superbeginner"),
 "viagem, trabalho ou filme":DX("trip, work or film|viaje, trabajo o película|voyage, travail ou film|поездка, работа или фильм|seyahat, iş veya film|سفر أو عمل أو فيلم"),
 "artigo ou post longo":DX("article or long post|artículo o post largo|article ou long post|статья или длинный пост|makale ya da uzun gönderi|مقال أو تدوينة طويلة")
};
const D_OR = DX("or|o|ou|или|veya|أو"), D_EX = DX("for example|por ejemplo|par exemple|например|örneğin|مثلًا"), D_SEARCH = DX("search|busca|cherche|найди|ara:|ابحث عن");
/* nomes de etapas (gramática / pronúncia): frases e palavras em PT -> idiomas */
const DW = {
 "gramática":"Grammar|Gramática|Grammaire|Грамматика|Dilbilgisi|النحو",
 "passado reportado":"reported past|pasado reportado|passé rapporté|косвенное прошедшее|rivayet geçmişi|الماضي المنقول",
 "futuro próximo":"near future|futuro próximo|futur proche|ближайшее будущее|yakın gelecek|المستقبل القريب",
 "estruturas literárias":"literary structures|estructuras literarias|structures littéraires|литературные конструкции|edebî yapılar|التراكيب الأدبية",
 "estruturas complexas":"complex structures|estructuras complejas|structures complexes|сложные конструкции|karmaşık yapılar|التراكيب المعقدة",
 "voz passiva e estruturas":"passive voice and structures|voz pasiva y estructuras|voix passive et structures|страдательный залог и конструкции|edilgen çatı ve yapılar|المبني للمجهول والتراكيب",
 "voz passiva":"passive voice|voz pasiva|voix passive|страдательный залог|edilgen çatı|المبني للمجهول",
 "frase nominal":"nominal sentence|oración nominal|phrase nominale|именное предложение|isim cümlesi|الجملة الاسمية",
 "formas verbais":"verb forms|formas verbales|formes verbales|формы глагола|fiil biçimleri|صيغ الأفعال",
 "estilo e fraseologia":"style and phraseology|estilo y fraseología|style et phraséologie|стиль и фразеология|üslup ve deyimler|الأسلوب والعبارات الاصطلاحية",
 "estilo e registro":"style and register|estilo y registro|style et registre|стиль и регистр|üslup ve kullanım düzeyi|الأسلوب والمستوى اللغوي",
 "estilo e retórica":"style and rhetoric|estilo y retórica|style et rhétorique|стиль и риторика|üslup ve retorik|الأسلوب والبلاغة",
 "condicionais e concessão":"conditionals and concession|condicionales y concesión|conditionnels et concession|условные предложения и уступка|koşul ve karşıtlık|الجمل الشرطية والاستدراك",
 "condicionais, deduções e modais":"conditionals, deductions and modals|condicionales, deducciones y modales|conditionnels, déductions et modaux|условные предложения, выводы и модальные глаголы|koşul cümleleri, çıkarımlar ve kip fiilleri|الجمل الشرطية والاستنتاجات والأفعال الناقصة",
 "inversão e ênfase":"inversion and emphasis|inversión y énfasis|inversion et emphase|инверсия и усиление|devrik cümle ve vurgu|التقديم والتأخير والتوكيد",
 "pronomes, gênero e verbos":"pronouns, gender and verbs|pronombres, género y verbos|pronoms, genre et verbes|местоимения, род и глаголы|zamirler, cinsiyet ve fiiller|الضمائر والجنس والأفعال",
 "casos e passado":"cases and past tense|casos y pasado|cas et passé|падежи и прошедшее время|haller ve geçmiş zaman|الحالات الإعرابية والماضي",
 "dativo e instrumental":"dative and instrumental|dativo e instrumental|datif et instrumental|дательный и творительный падежи|yönelme ve araç hâli|الجار والمجرور والأداة",
 "locativo, dativo e ablativo":"locative, dative and ablative|locativo, dativo y ablativo|locatif, datif et ablatif|местный, дательный и исходный падежи|bulunma, yönelme ve ayrılma hâli|الظرف والجار والمجرور والابتداء",
 "particípios e gerúndios":"participles and gerunds|participios y gerundios|participes et gérondifs|причастия и деепричастия|ortaçlar ve ulaçlar|الصفات المشتقة والحال",
 "passado e presente":"past and present|pasado y presente|passé et présent|прошедшее и настоящее|geçmiş ve şimdiki zaman|الماضي والمضارع",
 "futuro e negação":"future and negation|futuro y negación|futur et négation|будущее и отрицание|gelecek zaman ve olumsuzlama|المستقبل والنفي",
 "presente e futuro":"present and future|presente y futuro|présent et futur|настоящее и будущее|şimdiki ve gelecek zaman|المضارع والمستقبل",
 "perfect e passado":"perfect and past|perfecto y pasado|parfait et passé|перфект и прошедшее|perfect ve geçmiş|الماضي التام والبسيط",
 "ser, estar e presente":"to be and present|ser, estar y presente|être et présent|быть и настоящее время|olmak ve şimdiki zaman|الكينونة والمضارع",
 "ser, harmonia e presente":"to be, vowel harmony and present|ser, armonía y presente|être, harmonie et présent|быть, гармония и настоящее время|olmak, ünlü uyumu ve şimdiki zaman|الكينونة والتوافق والمضارع",
 "passado e futuro próximo":"past and near future|pasado y futuro próximo|passé et futur proche|прошедшее и ближайшее будущее|geçmiş ve yakın gelecek|الماضي والمستقبل القريب",
 "passado reportado e contínuo":"reported past and continuous|pasado reportado y continuo|passé rapporté et continu|косвенное прошедшее и длительное|rivayet geçmişi ve sürekli zaman|الماضي المنقول والمستمر",
 "o alfabeto em inglês":"the English alphabet|||||",
 "o -ed do passado":"the past-tense -ed|||||",
 "o alfabeto e a leitura":"the alphabet and reading|el alfabeto y la lectura|l'alphabet et la lecture|алфавит и чтение|alfabe ve okuma|الأبجدية والقراءة",
 "o alfabeto cirílico":"|||кириллица и её звуки||",
 "o alfabeto turco":"||||Türk alfabesi|",
 "o alfabeto árabe":"|||||الأبجدية العربية",
 "acento tônico e tilde":"|acento tónico y tilde||||",
 "ligação entre palavras":"linking between words|enlace entre palabras|liaison entre les mots|связь между словами|sözcükler arası bağlantı|الوصل بين الكلمات",
 "sons ligados":"linked sounds|sonidos ligados|sons liés|связанные звуки|bağlanan sesler|الأصوات المتصلة",
 "ritmo do inglês":"English rhythm|||||",
 "ritmo do espanhol":"|el ritmo del español||||",
 "ritmo e grupos rítmicos":"||rythme et groupes rythmiques|||",
 "ritmo e grupos de palavras":"rhythm and word groups|ritmo y grupos de palabras|rythme et groupes de mots|ритм и группы слов|ritim ve sözcük grupları|الإيقاع ومجموعات الكلمات",
 "ritmo e acento":"rhythm and stress|ritmo y acento|rythme et accent|ритм и ударение|ritim ve vurgu|الإيقاع والنبر",
 "ritmo e pausas":"rhythm and pauses|ritmo y pausas|rythme et pauses|ритм и паузы|ritim ve duraksamalar|الإيقاع والوقفات",
 "francês falado rápido":"||fast spoken French||||",
 "ğ e vogais longas":"||||ğ ve uzun ünlüler|",
 "vogais átonas":"unstressed vowels|vocales átonas|voyelles atones|безударные гласные|vurgusuz ünlüler|الحروف الصائتة غير المشدّدة",
 "vogais longas e curtas":"long and short vowels|vocales largas y cortas|voyelles longues et courtes|долгие и краткие гласные|uzun ve kısa ünlüler|الحركات الطويلة والقصيرة",
 "sotaques regionais":"regional accents|acentos regionales|accents régionaux|региональные акценты|bölgesel aksanlar|اللهجات الإقليمية",
 "sotaques difíceis":"difficult accents|acentos difíciles|accents difficiles|трудные акценты|zor aksanlar|لهجات صعبة",
 "sotaques francófonos":"||francophone accents||||",
 "sotaques e variantes":"accents and variants|acentos y variantes|accents et variantes|акценты и варианты|aksanlar ve varyantlar|اللهجات والصيغ المتنوعة",
 "dialetos e variantes":"dialects and variants|dialectos y variantes|dialectes et variantes|диалекты и варианты|lehçeler ve varyantlar|اللهجات والصيغ المتنوعة",
 "falantes difíceis":"difficult speakers|hablantes difíciles|locuteurs difficiles|трудные собеседники|zor konuşmacılar|متحدثون صعبون",
 "fala rápida":"fast speech|habla rápida|parole rapide|быстрая речь|hızlı konuşma|الكلام السريع",
 "sotaques":"accents|acentos|accents|акценты|aksanlar|اللهجات",
 "artigos":"articles|artículos|articles|артикли|artikeller|أدوات التعريف",
 "conjetura":"conjecture|conjetura|conjecture|предположение|tahmin|التخمين",
 "hipótese":"hypothesis|hipótesis|hypothèse|гипотеза|varsayım|الفرضية",
 "pronomes":"pronouns|pronombres|pronoms|местоимения|zamirler|الضمائر",
 "a estrutura de hoje":"today's structure|la estructura de hoy|la structure du jour|сегодняшнюю конструкцию|bugünün yapısını|تركيب اليوم",
 "e":"and|y|et|и|ve|و"
};
const DWK = Object.keys(DW).sort((a,b)=>b.length-a.length);
const DSTEP_PRE = {
 gram:(x=>x.split("|"))("Study: |Estudia: |Étudie : |Изучай: |Çalış: |ادرس: "),
 pron:(x=>x.split("|"))("Practise: |Practica: |Entraîne-toi : |Потренируй: |Çalış: |تدرّب على: "),
 wr:(x=>x.split("|"))("Write 5 sentences using |Escribe 5 frases usando |Écris 5 phrases en utilisant |Напиши 5 предложений, используя |Şunu kullanarak 5 cümle yaz: |اكتب 5 جمل باستخدام ")
};
function dStep(txt, ix){
  /* "Gramática: X" -> "Grammar: X" ; mantém termos do idioma-alvo; traduz o resto por frases */
  const low = txt.toLowerCase(); let m = /^gramática: (.+)$/.exec(low);
  const body = m ? m[1] : low, key = body;
  const own = DW[key]; let tr;
  if (own && own.split("|")[ix]) tr = own.split("|")[ix];
  else {
    const parts = body.split(/(\s+e\s+|, )/);
    tr = parts.map(p=>{ if(p===" e "||/^\s+e\s+$/.test(p)) return " "+DW.e.split("|")[ix]+" "; if(p===", ") return p; const k=DW[p.trim()]; const v=k&&k.split("|")[ix]; return v||p; }).join("");
  }
  tr = tr.replace(/(\S)\s{2,}/g,"$1 ");
  if (m){ const g = DW["gramática"].split("|")[ix]; return g + ": " + tr; }
  return tr;
}
function mDyn(pt, ix){
  if (!pt || ix == null) return null;
  const up = s => s.charAt(0).toUpperCase() + s.slice(1);
  let m;
  if ((m = /^Estude: (.+)$/.exec(pt))) return DSTEP_PRE.gram[ix] + dStep(m[1], ix);
  if ((m = /^Treine: (.+)$/.exec(pt))) return DSTEP_PRE.pron[ix] + up(dStep(m[1], ix));
  if ((m = /^Escreva 5 frases usando (.+)$/.exec(pt))) { let d = dStep(m[1], ix); if (ix===3) d = d.replace(/^Грамматика/,"грамматику"); return DSTEP_PRE.wr[ix] + d.charAt(0).toLowerCase() + d.slice(1); }
  /* sufixo após vírgula e parêntese final */
  let main = pt, suf = "", par = "";
  const pm = / \(([^()]*)\)$/.exec(main);
  if (pm){ main = main.slice(0, pm.index); par = pm[1]; }
  for (const k in DSUF){ if (main.endsWith(k)){ main = main.slice(0, -k.length); suf = DSUF[k][ix]; break; } }
  main = main.replace(/ em (inglês|espanhol|francês|russo|turco|árabe)\b(?! padrão)/g, " em {L}");
  let out = null;
  const arr = DT[main] || DT[pt];
  if (arr && arr[ix]) out = arr[ix];
  if (!out){
    for (const [re, tpl] of DR){
      if (!tpl) continue; const mm = re.exec(main);
      if (mm && tpl[ix]){ out = tpl[ix].replace(/\$(\d)/g, (a,n)=>(mm[n]||"").replace(/ ou /g, " "+D_OR[ix]+" ")); break; }
    }
  }
  if (!out) return null;
  out += suf;
  if (par){
    let p = DPAR[par] ? DPAR[par][ix] : null;
    if (!p){
      let q = /^busque (.+)$/.exec(par);
      if (q) p = D_SEARCH[ix] + " " + q[1];
      else if ((q = /^(.+), por exemplo$/.exec(par))) p = q[1] + (ix===5?" ":", ") + D_EX[ix];
      else p = par.replace(/ ou /g, " " + D_OR[ix] + " ");
    }
    out += " (" + p + ")";
  }
  return out;
}
