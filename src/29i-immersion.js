/* ---------- imersão: do B1 em diante a interface fala o idioma estudado (textos longos: do B2) ---------- */
(function(){
const LI = {en:0, es:1, fr:2, ru:3, tr:4, ar:5};
const LVO = ["A1","A2","B1","B2","C1","C2"];
const norm = s => s.replace(/\s+/g, " ").trim();
/* pt | en | es | fr | ru | tr | ar */
const RAW = `
Projeto Hermes|Hermes Project|Proyecto Hermes|Projet Hermès|Проект «Гермес»|Hermes Projesi|مشروع هرمس
Configurações|Settings|Ajustes|Paramètres|Настройки|Ayarlar|الإعدادات
Nível do idioma|Language level|Nivel del idioma|Niveau de langue|Уровень языка|Dil seviyesi|مستوى اللغة
Etapas feitas|Steps done|Etapas hechas|Étapes faites|Пройдено этапов|Tamamlanan adımlar|الخطوات المنجزة
Sequência|Streak|Racha|Série|Серия|Seri|التتابع
Missões hoje|Missions today|Misiones hoy|Missions du jour|Сегодня|Bugünkü görevler|مهام اليوم
Missões na semana|Missions this week|Misiones en la semana|Missions de la semaine|Неделя|Haftalık görevler|مهام الأسبوع
Hoje é dia de descanso|Today is a rest day|Hoy es día de descanso|Aujourd'hui, c'est un jour de repos|Сегодня день отдыха|Bugün dinlenme günü|اليوم يوم راحة
Estudar hoje mesmo assim|Study today anyway|Estudiar hoy de todos modos|Étudier quand même aujourd'hui|Всё равно заниматься сегодня|Yine de bugün çalış|الدراسة اليوم رغم ذلك
Etapa|Step|Etapa|Étape|Этап|Adım|خطوة
Etapa de hoje|Today's step|Etapa de hoy|Étape du jour|Этап на сегодня|Bugünün adımı|خطوة اليوم
Fazer agora|Do it now|Hacer ahora|Faire maintenant|Сделать сейчас|Şimdi yap|افعل الآن
Abrir site|Open website|Abrir sitio|Ouvrir le site|Открыть сайт|Siteyi aç|افتح الموقع
Duolingo do dia|Duolingo of the day|Duolingo del día|Duolingo du jour|Duolingo дня|Günün Duolingo'su|دولينجو اليوم
Escrita do dia|Writing of the day|Escritura del día|Écriture du jour|Письмо дня|Günün yazısı|كتابة اليوم
Escrita|Writing|Escritura|Écriture|Письмо|Yazma|الكتابة
Embaralhar|Shuffle|Barajar|Mélanger|Перемешать|Karıştır|اخلط
Mostrar|Show|Mostrar|Afficher|Показать|Göster|أظهر
Frase do dia|Phrase of the day|Frase del día|Phrase du jour|Фраза дня|Günün cümlesi|عبارة اليوم
Missões fixas · todo dia · 30 min|Fixed missions · every day · 30 min|Misiones fijas · todos los días · 30 min|Missions fixes · chaque jour · 30 min|Постоянные задания · каждый день · 30 мин|Sabit görevler · her gün · 30 dk|مهام ثابتة · كل يوم · 30 د
Missões fixas|Fixed missions|Misiones fijas|Missions fixes|Постоянные задания|Sabit görevler|مهام ثابتة
Treino rápido · você lembra?|Quick practice · do you remember?|Práctica rápida · ¿lo recuerdas?|Entraînement rapide · tu t'en souviens ?|Быстрая тренировка · помнишь?|Hızlı alıştırma · hatırlıyor musun?|تدريب سريع · هل تتذكر؟
Tente lembrar a tradução antes de mostrar.|Try to remember the translation before showing it.|Intenta recordar la traducción antes de mostrarla.|Essaie de te rappeler la traduction avant de l'afficher.|Попробуй вспомнить перевод, прежде чем показать.|Göstermeden önce çeviriyi hatırlamaya çalış.|حاول تذكر الترجمة قبل إظهارها.
Sua semana|Your week|Tu semana|Ta semaine|Твоя неделя|Haftan|أسبوعك
Seg|Mon|Lun|Lun|Пн|Pzt|الاثنين
Ter|Tue|Mar|Mar|Вт|Sal|الثلاثاء
Qua|Wed|Mié|Mer|Ср|Çar|الأربعاء
Qui|Thu|Jue|Jeu|Чт|Per|الخميس
Sex|Fri|Vie|Ven|Пт|Cum|الجمعة
Sáb|Sat|Sáb|Sam|Сб|Cmt|السبت
Dom|Sun|Dom|Dim|Вс|Paz|الأحد
Gramática|Grammar|Gramática|Grammaire|Грамматика|Dilbilgisi|القواعد
Escuta|Listening|Escucha|Écoute|Аудирование|Dinleme|الاستماع
Vocabulário|Vocabulary|Vocabulario|Vocabulaire|Лексика|Kelime|المفردات
Conversa|Conversation|Conversación|Conversation|Разговор|Konuşma|المحادثة
Leitura|Reading|Lectura|Lecture|Чтение|Okuma|القراءة
Pronúncia|Pronunciation|Pronunciación|Prononciation|Произношение|Telaffuz|النطق
Imersão|Immersion|Inmersión|Immersion|Погружение|Daldırma|الانغماس
estudou|studied|estudió|étudié|занимался|çalıştı|درست
faltou|missed|faltó|manqué|пропустил|kaçırdı|فاتك
descanso|rest|descanso|repos|отдых|dinlenme|راحة
Exercícios|Exercises|Ejercicios|Exercices|Упражнения|Alıştırmalar|تمارين
Começar exercícios|Start exercises|Empezar ejercicios|Commencer les exercices|Начать упражнения|Alıştırmalara başla|ابدأ التمارين
Sopa de letrinhas|Word scramble|Sopa de letras|Lettres mélangées|Анаграммы|Harf karışıklığı|ترتيب الحروف
Começar sopa de letrinhas|Start word scramble|Empezar sopa de letras|Commencer les lettres mélangées|Начать анаграммы|Harf karışıklığına başla|ابدأ ترتيب الحروف
Escreva à mão|Handwrite|Escribe a mano|Écris à la main|Пиши от руки|Elle yaz|اكتب بخط اليد
Começar escrita|Start writing|Empezar a escribir|Commencer à écrire|Начать письмо|Yazmaya başla|ابدأ الكتابة
Estude no seu livro|Study from your book|Estudia en tu libro|Étudie dans ton livre|Занимайся по своему учебнику|Kitabından çalış|ادرس من كتابك
Livro didático|Textbook|Libro de texto|Manuel scolaire|Учебник|Ders kitabı|الكتاب المدرسي
Abrir livro didático|Open textbook|Abrir libro de texto|Ouvrir le manuel|Открыть учебник|Ders kitabını aç|افتح الكتاب المدرسي
Memorize|Memorize|Memoriza|Mémorise|Запоминай|Ezberle|احفظ
Baralho de revisão|Review deck|Mazo de repaso|Paquet de révision|Колода для повторения|Tekrar destesi|مجموعة المراجعة
Começar revisão|Start review|Empezar repaso|Commencer la révision|Начать повторение|Tekrara başla|ابدأ المراجعة
Consulte|Look up|Consulta|Consulte|Справочник|Başvur|راجع
Estrutura da linguagem|Language structure|Estructura del idioma|Structure de la langue|Структура языка|Dil yapısı|بنية اللغة
Verbos|Verbs|Verbos|Verbes|Глаголы|Fiiller|الأفعال
Substantivos|Nouns|Sustantivos|Noms|Существительные|İsimler|الأسماء
Pronomes|Pronouns|Pronombres|Pronoms|Местоимения|Zamirler|الضمائر
Adjetivos|Adjectives|Adjetivos|Adjectifs|Прилагательные|Sıfatlar|الصفات
Artigos|Articles|Artículos|Articles|Артикли|Tanımlıklar|أدوات التعريف
Advérbios|Adverbs|Adverbios|Adverbes|Наречия|Zarflar|الظروف
Preposições|Prepositions|Preposiciones|Prépositions|Предлоги|Edatlar|حروف الجر
Conjunções|Conjunctions|Conjunciones|Conjonctions|Союзы|Bağlaçlar|أدوات الربط
Caderno de erros e dúvidas|Notebook of mistakes and doubts|Cuaderno de errores y dudas|Carnet d'erreurs et de doutes|Тетрадь ошибок и вопросов|Hata ve şüphe defteri|دفتر الأخطاء والأسئلة
Como estudar melhor|How to study better|Cómo estudiar mejor|Comment mieux étudier|Как учиться лучше|Nasıl daha iyi çalışılır|كيف تدرس بشكل أفضل
Conquistas|Achievements|Logros|Réussites|Достижения|Başarılar|الإنجازات
Primeira missão|First mission|Primera misión|Première mission|Первое задание|İlk görev|المهمة الأولى
Dia completo|Full day|Día completo|Journée complète|Полный день|Tam gün|يوم كامل
Mapa completo|Complete map|Mapa completo|Carte complète|Карта пройдена|Harita tamam|الخريطة كاملة
Caderno aberto|Open notebook|Cuaderno abierto|Carnet ouvert|Открытая тетрадь|Açık defter|دفتر مفتوح
Meio caminho|Halfway there|A mitad de camino|À mi-chemin|Полпути|Yolun yarısı|منتصف الطريق
Amigo da coruja|Friend of the owl|Amigo del búho|Ami de la chouette|Друг совы|Baykuşun dostu|صديق البومة
Concluiu a primeira missão|Completed the first mission|Completó la primera misión|A terminé la première mission|Выполнено первое задание|İlk görevi tamamladı|أنهى المهمة الأولى
Fechou todas as missões de um dia|Closed all missions of a day|Cerró todas las misiones de un día|A terminé toutes les missions d'un jour|Закрыты все задания за день|Bir günün tüm görevlerini bitirdi|أنهى كل مهام يوم
Uma semana sem falhar|A week without a miss|Una semana sin fallar|Une semaine sans faute|Неделя без пропусков|Bir hafta aksatmadan|أسبوع بلا انقطاع
Um mês de constância|A month of consistency|Un mes de constancia|Un mois de régularité|Месяц постоянства|Bir ay istikrar|شهر من الاستمرارية
Missões criativas concluídas|Creative missions completed|Misiones creativas completadas|Missions créatives terminées|Выполнены творческие задания|Yaratıcı görevler tamamlandı|مهام إبداعية منجزة
Centenário de missões|A hundred missions|Cien misiones|Cent missions|Сто заданий|Yüz görev|مئة مهمة
Terminou todas as etapas de um nível|Finished all steps of a level|Terminó todas las etapas de un nivel|A terminé toutes les étapes d'un niveau|Пройдены все этапы уровня|Bir seviyenin tüm adımlarını bitirdi|أنهى كل خطوات مستوى
Primeira anotação no Caderno|First note in the Notebook|Primera nota en el Cuaderno|Première note dans le Carnet|Первая запись в тетради|Defterde ilk not|أول ملاحظة في الدفتر
concluída|done|completada|terminée|пройден|tamamlandı|منجزة
liberada|unlocked|desbloqueada|débloquée|открыт|açık|مفتوحة
revisar|review|repasar|réviser|повторить|tekrar et|راجع
aguardando 2 dias|waiting 2 days|esperando 2 días|attente de 2 jours|ждёт 2 дня|2 gün bekliyor|بانتظار يومين
bloqueada|locked|bloqueada|verrouillée|закрыт|kilitli|مقفلة
Começar|Start|Empezar|Commencer|Начать|Başla|ابدأ
Bloqueada|Locked|Bloqueada|Verrouillée|Закрыт|Kilitli|مقفلة
Trilhas em paralelo|Parallel tracks|Pistas en paralelo|Parcours en parallèle|Параллельные направления|Paralel patikalar|مسارات متوازية
Prova do nível|Level test|Prueba del nivel|Test du niveau|Экзамен уровня|Seviye sınavı|اختبار المستوى
Prova|Test|Prueba|Test|Экзамен|Sınav|اختبار
Fala|Speaking|Habla|Expression orale|Речь|Konuşma|التحدث
Abre quando as trilhas acabarem|Opens when the tracks are finished|Se abre cuando terminen las pistas|S'ouvre quand les parcours sont terminés|Откроется, когда закончатся направления|Patikalar bitince açılır|يفتح عند انتهاء المسارات
Teste de nível|Level quiz|Test de nivel|Test de niveau|Тест уровня|Seviye testi|اختبار تحديد المستوى
Onde estudar|Where to study|Dónde estudiar|Où étudier|Где учиться|Nerede çalışılır|أين تدرس
Dicionário|Dictionary|Diccionario|Dictionnaire|Словарь|Sözlük|القاموس
Música|Music|Música|Musique|Музыка|Müzik|الموسيقى
Teste|Test|Prueba|Test|Тест|Test|اختبار
← Voltar ao mapa|← Back to the map|← Volver al mapa|← Retour à la carte|← Назад к карте|← Haritaya dön|← العودة إلى الخريطة
← Voltar ao fluxograma|← Back to the flowchart|← Volver al diagrama|← Retour au schéma|← Назад к схеме|← Akış şemasına dön|← العودة إلى المخطط
Você subiu de nível!|You leveled up!|¡Subiste de nivel!|Tu as monté d'un niveau !|Ты поднялся на новый уровень!|Seviye atladın!|لقد ارتقيت بمستواك!
Continuar|Continue|Continuar|Continuer|Продолжить|Devam|متابعة
Estou aprendendo|I am learning|Estoy aprendiendo|J'apprends|Я изучаю|Öğreniyorum|أتعلم
Seu ritmo de estudo|Your study pace|Tu ritmo de estudio|Ton rythme d'étude|Твой темп занятий|Çalışma temposu|وتيرة دراستك
Tempo por dia|Time per day|Tiempo por día|Temps par jour|Время в день|Günlük süre|الوقت يوميا
Dias de estudo|Study days|Días de estudio|Jours d'étude|Дни занятий|Çalışma günleri|أيام الدراسة
Meu nível agora|My level now|Mi nivel ahora|Mon niveau actuel|Мой уровень сейчас|Şimdiki seviyem|مستواي الآن
Backup do progresso|Progress backup|Copia de seguridad del progreso|Sauvegarde de la progression|Резервная копия прогресса|İlerleme yedeği|نسخة احتياطية للتقدم
Copiar código|Copy code|Copiar código|Copier le code|Скопировать код|Kodu kopyala|انسخ الرمز
Restaurar do código colado|Restore from pasted code|Restaurar desde el código pegado|Restaurer depuis le code collé|Восстановить из вставленного кода|Yapıştırılan koddan geri yükle|استعد من الرمز الملصق
Recomeçar este idioma (apagar progresso)|Restart this language (erase progress)|Reiniciar este idioma (borrar progreso)|Recommencer cette langue (effacer la progression)|Начать язык заново (стереть прогресс)|Bu dili yeniden başlat (ilerlemeyi sil)|ابدأ هذه اللغة من جديد (امسح التقدم)
Botão flutuante do baralho de revisão (criar, editar e adicionar cartões)|Floating review-deck button (create, edit and add cards)|Botón flotante del mazo de repaso (crear, editar y añadir tarjetas)|Bouton flottant du paquet de révision (créer, modifier et ajouter des cartes)|Плавающая кнопка колоды (создавать, менять и добавлять карточки)|Tekrar destesi için yüzen düğme (oluştur, düzenle, kart ekle)|زر عائم لمجموعة المراجعة (إنشاء وتعديل وإضافة بطاقات)
Imersão: interface no idioma estudado (a partir do B1)|Immersion: interface in the language you study (from B1)|Inmersión: interfaz en el idioma que estudias (desde B1)|Immersion : interface dans la langue étudiée (dès B1)|Погружение: интерфейс на изучаемом языке (с B1)|Daldırma: arayüz öğrendiğin dilde (B1'den itibaren)|الانغماس: الواجهة بلغة الدراسة (من B1)
O que fazer|What to do|Qué hacer|Quoi faire|Что делать|Ne yapmalı|ماذا تفعل
Exercícios para praticar|Practice exercises|Ejercicios para practicar|Exercices pour pratiquer|Упражнения для практики|Pratik alıştırmaları|تمارين للممارسة
Outros exercícios deste tema|More exercises on this topic|Más ejercicios de este tema|Autres exercices sur ce thème|Ещё упражнения по этой теме|Bu konuda diğer alıştırmalar|تمارين أخرى في هذا الموضوع
Quando terminar as atividades|When you finish the activities|Cuando termines las actividades|Quand tu as fini les activités|Когда закончишь задания|Etkinlikleri bitirince|عند الانتهاء من الأنشطة
Revisar em 1 dia|Review in 1 day|Repasar en 1 día|Réviser dans 1 jour|Повторить через 1 день|1 gün sonra tekrar et|راجع بعد يوم
Revisar em 3 dias|Review in 3 days|Repasar en 3 días|Réviser dans 3 jours|Повторить через 3 дня|3 gün sonra tekrar et|راجع بعد 3 أيام
Revisar em 7 dias|Review in 7 days|Repasar en 7 días|Réviser dans 7 jours|Повторить через 7 дней|7 gün sonra tekrar et|راجع بعد 7 أيام
Revisar em 14 dias|Review in 14 days|Repasar en 14 días|Réviser dans 14 jours|Повторить через 14 дней|14 gün sonra tekrar et|راجع بعد 14 يوما
Ou revisar em|Or review in|O repasar en|Ou réviser dans|Или повторить через|Ya da şu kadar sonra tekrar et|أو راجع بعد
Escolha a matéria para começar.|Choose a subject to start.|Elige la materia para empezar.|Choisis la matière pour commencer.|Выбери тему, чтобы начать.|Başlamak için konuyu seç.|اختر المادة للبدء.
Título do livro|Book title|Título del libro|Titre du livre|Название книги|Kitap başlığı|عنوان الكتاب
Próxima rodada ➜|Next round ➜|Siguiente ronda ➜|Manche suivante ➜|Следующий раунд ➜|Sonraki tur ➜|الجولة التالية ➜
Missões principais, em ordem · 10 min|Main missions, in order · 10 min|Misiones principales, en orden · 10 min|Missions principales, dans l'ordre · 10 min|Основные задания по порядку · 10 мин|Ana görevler, sırayla · 10 dk|المهام الرئيسية بالترتيب · 10 د
Mais missões de hoje|More missions today|Más misiones de hoy|Plus de missions aujourd'hui|Ещё задания на сегодня|Bugünün diğer görevleri|مهام أخرى اليوم
Ver vídeos sobre este tema no YouTube|Watch videos on this topic on YouTube|Ver vídeos sobre este tema en YouTube|Voir des vidéos sur ce thème sur YouTube|Смотреть видео по теме на YouTube|Bu konuda YouTube videolarını izle|شاهد فيديوهات عن هذا الموضوع على يوتيوب
Dica|Tip|Consejo|Astuce|Совет|İpucu|نصيحة
Ouvir|Listen|Escuchar|Écouter|Слушать|Dinle|استمع
Concluir|Finish|Terminar|Terminer|Завершить|Bitir|أنهِ
Verificar|Check|Comprobar|Vérifier|Проверить|Kontrol et|تحقق
Acertei|I got it right|Acerté|J'ai bon|Я угадал|Doğru bildim|أصبت
Errei|I got it wrong|Fallé|J'ai faux|Я ошибся|Yanlış bildim|أخطأت
Voltar|Back|Volver|Retour|Назад|Geri|رجوع
Fechar|Close|Cerrar|Fermer|Закрыть|Kapat|إغلاق
Salvar|Save|Guardar|Enregistrer|Сохранить|Kaydet|احفظ
Cancelar|Cancel|Cancelar|Annuler|Отмена|İptal|إلغاء
você|you|tú|toi|ты|sen|أنت
todo dia|every day|todos los días|chaque jour|каждый день|her gün|كل يوم
Hoje|Today|Hoy|Aujourd'hui|Сегодня|Bugün|اليوم
Rota do nível|Level route|Ruta del nivel|Parcours du niveau|Маршрут уровня|Seviye rotası|مسار المستوى
Recursos|Resources|Recursos|Ressources|Ресурсы|Kaynaklar|مصادر
Português|Portuguese|Portugués|Portugais|Португальский|Portekizce|البرتغالية
Inglês|English|Inglés|Anglais|Английский|İngilizce|الإنجليزية
Espanhol|Spanish|Español|Espagnol|Испанский|İspanyolca|الإسبانية
Francês|French|Francés|Français|Французский|Fransızca|الفرنسية
Russo|Russian|Ruso|Russe|Русский|Rusça|الروسية
Turco|Turkish|Turco|Turc|Турецкий|Türkçe|التركية
Árabe|Arabic|Árabe|Arabe|Арабский|Arapça|العربية
Iniciante|Beginner|Principiante|Débutant|Начинающий|Başlangıç|مبتدئ
Aprendiz|Learner|Aprendiz|Apprenant|Ученик|Öğrenen|متعلم
Praticante|Practitioner|Practicante|Pratiquant|Практик|Uygulayıcı|ممارس
Conversador|Conversationalist|Conversador|Causeur|Собеседник|Konuşkan|محاور
Avançado|Advanced|Avanzado|Avancé|Продвинутый|İleri|متقدم
Fluente|Fluent|Fluido|Courant|Свободно|Akıcı|طليق
Primeiros passos|First steps|Primeros pasos|Premiers pas|Первые шаги|İlk adımlar|الخطوات الأولى
Dia a dia|Everyday life|Día a día|Au quotidien|Повседневность|Gündelik hayat|الحياة اليومية
Trabalho|Work|Trabajo|Travail|Работа|İş|العمل
Fluência|Fluency|Fluidez|Aisance|Беглость|Akıcılık|الطلاقة
Domínio|Mastery|Dominio|Maîtrise|Мастерство|Ustalık|الإتقان
Posts no X|Posts on X|Publicaciones en X|Publications sur X|Посты в X|X'te paylaşımlar|منشورات على X
Duolingo|Duolingo|Duolingo|Duolingo|Duolingo|Duolingo|دولينجو
Missões sorteadas de hoje · 20 min|Today's random missions · 20 min|Misiones sorteadas de hoy · 20 min|Missions tirées au sort · 20 min|Случайные задания дня · 20 мин|Bugünün çekilen görevleri · 20 dk|مهام اليوم المختارة عشوائيا · 20 د
Missões sorteadas de hoje|Today's random missions|Misiones sorteadas de hoy|Missions tirées au sort|Случайные задания дня|Bugünün çekilen görevleri|مهام اليوم المختارة عشوائيا
Ferramentas gratuitas (ou com versão gratuita) usadas nas etapas. Abrem numa nova aba.|Free tools (or with a free version) used in the steps. They open in a new tab.|Herramientas gratuitas (o con versión gratuita) usadas en las etapas. Se abren en una pestaña nueva.|Outils gratuits (ou avec version gratuite) utilisés dans les étapes. Ils s'ouvrent dans un nouvel onglet.|Бесплатные инструменты (или с бесплатной версией) для этапов. Открываются в новой вкладке.|Adımlarda kullanılan ücretsiz (veya ücretsiz sürümlü) araçlar. Yeni sekmede açılır.|أدوات مجانية (أو بنسخة مجانية) تُستخدم في الخطوات. تُفتح في تبويب جديد.
Anote o que não soube dizer, palavras que esqueceu e erros que repetiu. No domingo, revise tudo.|Write down what you could not say, words you forgot and mistakes you repeated. On Sunday, review everything.|Anota lo que no supiste decir, las palabras que olvidaste y los errores que repetiste. El domingo, repásalo todo.|Note ce que tu n'as pas su dire, les mots oubliés et les erreurs répétées. Le dimanche, révise tout.|Записывай, что не смог сказать, забытые слова и повторяющиеся ошибки. В воскресенье повтори всё.|Söyleyemediklerini, unuttuğun kelimeleri ve tekrarladığın hataları yaz. Pazar günü hepsini gözden geçir.|دوّن ما لم تستطع قوله والكلمات التي نسيتها والأخطاء التي كررتها. وراجع كل شيء يوم الأحد.
Fale desde o primeiro dia, mesmo sozinho. Esperar “saber mais” para falar atrasa tudo.|Speak from day one, even alone. Waiting to “know more” before speaking slows everything down.|Habla desde el primer día, aunque estés solo. Esperar a “saber más” para hablar lo retrasa todo.|Parle dès le premier jour, même seul. Attendre de « savoir plus » pour parler retarde tout.|Говори с первого дня, даже один. Ждать, пока «узнаешь больше», только тормозит.|İlk günden itibaren, tek başına bile olsa konuş. “Daha çok bilmeyi” beklemek her şeyi geciktirir.|تحدث منذ اليوم الأول حتى لو كنت وحدك. انتظار "معرفة المزيد" يؤخر كل شيء.
Faça as revisões todo dia, mesmo que só 5 minutos. A repetição espaçada é o que fixa.|Do your reviews every day, even if only for 5 minutes. Spaced repetition is what makes it stick.|Haz los repasos todos los días, aunque sean solo 5 minutos. La repetición espaciada es lo que fija.|Fais tes révisions chaque jour, même 5 minutes. La répétition espacée est ce qui fixe.|Повторяй каждый день, хотя бы 5 минут. Интервальное повторение закрепляет знания.|Tekrarları her gün yap, sadece 5 dakika da olsa. Aralıklı tekrar kalıcı kılar.|راجع كل يوم ولو لخمس دقائق. التكرار المتباعد هو ما يثبّت المعرفة.
Grave sua voz uma vez por semana e compare com um nativo. Você ouve erros que não percebe falando.|Record your voice once a week and compare it with a native speaker. You hear mistakes you do not notice while speaking.|Graba tu voz una vez por semana y compárala con un nativo. Oyes errores que no notas al hablar.|Enregistre ta voix une fois par semaine et compare-la à celle d'un natif. Tu entends des erreurs que tu ne remarques pas en parlant.|Раз в неделю записывай свой голос и сравнивай с носителем. Ты услышишь ошибки, которых не замечаешь при разговоре.|Haftada bir sesini kaydet ve anadili konuşanla karşılaştır. Konuşurken fark etmediğin hataları duyarsın.|سجّل صوتك مرة في الأسبوع وقارنه بمتحدث أصلي. ستسمع أخطاء لا تلاحظها أثناء الكلام.
Não sabe seu nível? Faça um teste gratuito (link nos Recursos) e escolha aqui. Cada idioma guarda o próprio progresso neste navegador.|Not sure of your level? Take a free test (link in Resources) and choose here. Each language keeps its own progress in this browser.|¿No sabes tu nivel? Haz una prueba gratuita (enlace en Recursos) y elígelo aquí. Cada idioma guarda su propio progreso en este navegador.|Tu ne connais pas ton niveau ? Fais un test gratuit (lien dans Ressources) et choisis ici. Chaque langue garde sa propre progression dans ce navigateur.|Не знаешь свой уровень? Пройди бесплатный тест (ссылка в «Ресурсах») и выбери здесь. Каждый язык хранит свой прогресс в этом браузере.|Seviyeni bilmiyor musun? Ücretsiz bir test çöz (Kaynaklar'da bağlantı) ve burada seç. Her dil ilerlemesini bu tarayıcıda ayrı tutar.|لا تعرف مستواك؟ أجرِ اختبارا مجانيا (الرابط في المصادر) واختر هنا. كل لغة تحفظ تقدمها في هذا المتصفح.
Exercícios de gramática e vocabulário baseados nos seus livros, organizados por matéria. Marque a opção certa ou escreva a resposta, clique em Concluir e a gente confere tudo de uma vez.|Grammar and vocabulary exercises based on your books, organized by subject. Pick the right option or write the answer, click Finish and we check everything at once.|Ejercicios de gramática y vocabulario basados en tus libros, organizados por materia. Marca la opción correcta o escribe la respuesta, pulsa Terminar y lo corregimos todo de una vez.|Exercices de grammaire et de vocabulaire basés sur tes livres, organisés par matière. Choisis la bonne option ou écris la réponse, clique sur Terminer et on corrige tout d'un coup.|Упражнения по грамматике и лексике по твоим учебникам, по темам. Выбери верный вариант или напиши ответ, нажми «Завершить», и мы проверим всё сразу.|Kitaplarına dayalı, konuya göre düzenlenmiş dilbilgisi ve kelime alıştırmaları. Doğru seçeneği işaretle veya yanıtı yaz, Bitir'e tıkla; hepsini birlikte kontrol edelim.|تمارين قواعد ومفردات مبنية على كتبك ومرتبة حسب المادة. اختر الإجابة الصحيحة أو اكتبها، ثم اضغط «أنهِ» لنصحح كل شيء معا.
Palavras do idioma que você estuda com as letras fora de ordem. Clique em uma letra, segure e arraste até o lugar certo; solte para encaixar. Cada rodada traz 5 palavras novas, e você pode seguir rodada após rodada, sem fim.|Words from the language you study with the letters out of order. Click a letter, hold and drag it to the right place; release to snap it in. Each round brings 5 new words, and you can keep going round after round, endlessly.|Palabras del idioma que estudias con las letras desordenadas. Haz clic en una letra, mantenla y arrástrala al lugar correcto; suelta para encajarla. Cada ronda trae 5 palabras nuevas y puedes seguir ronda tras ronda, sin fin.|Des mots de la langue que tu étudies, lettres dans le désordre. Clique sur une lettre, maintiens et fais-la glisser au bon endroit ; relâche pour l'insérer. Chaque manche apporte 5 nouveaux mots, et tu peux enchaîner sans fin.|Слова изучаемого языка с перепутанными буквами. Нажми на букву, удерживай и перетащи на нужное место; отпусти, чтобы встала. В каждом раунде 5 новых слов, раундов можно проходить без конца.|Çalıştığın dilin kelimeleri, harfleri karışık. Bir harfe tıkla, basılı tut ve doğru yere sürükle; bırakınca yerine oturur. Her turda 5 yeni kelime gelir ve sonsuza kadar tur tur devam edebilirsin.|كلمات من اللغة التي تدرسها حروفها مبعثرة. اضغط على حرف واسحبه إلى مكانه الصحيح ثم اتركه ليستقر. كل جولة تحمل 5 كلمات جديدة ويمكنك المتابعة جولة بعد جولة بلا نهاية.
`;
const D = new Map();
RAW.trim().split("\n").forEach(r => { const a = r.split("|"); if (a.length === 7) D.set(norm(a[0]), a.slice(1)); });
if (window.IMM_TITLES) IMM_TITLES.trim().split("\n").forEach(r => { const a = r.split("|").map(x => x.trim()); if (a.length !== 7) return; const k = norm(a[0]), cur = D.get(k) || ["","","","","",""]; D.set(k, cur.map((v, j) => v || a[j + 1])); });
const FRAG = new Map();
if (window.IMM_FRAG) IMM_FRAG.trim().split("\n").forEach(r => { const a = r.split("|"); const o = {}; a.slice(1).forEach(f => { const m = f.match(/^(\w\w):(.*)$/); if (m) o[m[1]] = m[2].trim(); }); FRAG.set(a[0].trim(), o); });
const OWNL = ["English","español","français","русский","Türkçe","العربية"], OWNLP = {ru:"русском"};
const MH = [];
if (window.IMM_MH) IMM_MH.trim().split("\n").forEach(r => { const a = r.split("|").map(x => x.trim()); if (a.length !== 7) return; const names = []; const rx = norm(a[0]).replace(/[.*+?^$()|[\]\\]/g, "\\$&").replace(/\{(\w+)\}/g, (_, k) => { names.push(k); return "(.+?)"; }); MH.push({re: new RegExp("^" + rx + "$"), names, t: a.slice(1)}); });
function mh(n, i){
  for (const e of MH) { const m = n.match(e.re); if (!m || !e.t[i]) continue; const cap = {}; e.names.forEach((k, j) => { cap[k] = m[j + 1]; });
    return e.t[i].replace(/\{(\w+)\}/g, (_, k) => k === "L" ? OWNL[i] : k === "Lp" ? (OWNLP[LOC[i]] || OWNL[i]) : (cap[k] != null ? cap[k] : "")).replace(/ب\u0640/g, "ب"); }
  return null;
}
const OWN = ["English","Español","Français","Русский","Türkçe","العربية"];
const LOC = ["en","es","fr","ru","tr","ar"];
const TODAY = ["Today","Hoy","Aujourd'hui","Сегодня","Bugün","اليوم"];
const OF = ["of","de","de","из","/","من"];
function rules(n, i){
  let m;
  if ((m = n.match(/^Hoje · .+$/))) { try { return TODAY[i] + " · " + NOW.toLocaleDateString(LOC[i], {weekday:"long", day:"numeric", month:"long"}); } catch(_) { return null; } }
  if ((m = n.match(/^Seu guia de estudo de .+, do A1 ao C2$/))) return ["Your "+OWN[i]+" study guide, A1 to C2","Tu guía de estudio de "+OWN[i]+", de A1 a C2","Ton guide d'étude : "+OWN[i]+", de A1 à C2","Твой путеводитель по изучению: "+OWN[i]+", от A1 до C2",OWN[i]+" çalışma rehberin, A1'den C2'ye","دليلك لدراسة "+OWN[i]+" من A1 إلى C2"][i];
  if ((m = n.match(/^(\d+) de (\d+) unidades concluídas$/))) return [`${m[1]} of ${m[2]} units finished`,`${m[1]} de ${m[2]} unidades terminadas`,`${m[1]} unités terminées sur ${m[2]}`,`Пройдено ${m[1]} из ${m[2]} уроков`,`${m[2]} üniteden ${m[1]}'i bitti`,`${m[1]} من ${m[2]} وحدة منجزة`][i];
  if ((m = n.match(/^(\d+) de (\d+) etapas$/))) return [`${m[1]} of ${m[2]} steps`,`${m[1]} de ${m[2]} etapas`,`${m[1]} étapes sur ${m[2]}`,`${m[1]} из ${m[2]} этапов`,`${m[2]} adımdan ${m[1]}`,`${m[1]} من ${m[2]} خطوة`][i];
  if ((m = n.match(/^Conquistas · (\d+) de (\d+)$/))) return [`Achievements · ${m[1]} of ${m[2]}`,`Logros · ${m[1]} de ${m[2]}`,`Réussites · ${m[1]} sur ${m[2]}`,`Достижения · ${m[1]} из ${m[2]}`,`Başarılar · ${m[2]} içinden ${m[1]}`,`الإنجازات · ${m[1]} من ${m[2]}`][i];
  if ((m = n.match(/^(\d+)\/(\d+) dias$/))) return [`${m[1]}/${m[2]} days`,`${m[1]}/${m[2]} días`,`${m[1]}/${m[2]} jours`,`${m[1]}/${m[2]} дней`,`${m[1]}/${m[2]} gün`,`${m[1]}/${m[2]} يوما`][i];
  if ((m = n.match(/^Etapa (\d+) de (\d+) · (.+)$/))) return null;
  if ((m = n.match(/^Rota do nível (\w+)$/))) return [`Level route ${m[1]}`,`Ruta del nivel ${m[1]}`,`Parcours du niveau ${m[1]}`,`Маршрут уровня ${m[1]}`,`${m[1]} seviye rotası`,`مسار المستوى ${m[1]}`][i];
  if ((m = n.match(/^Caderno · (.+)$/))) return [`Notebook`,`Cuaderno`,`Carnet`,`Тетрадь`,`Defter`,`الدفتر`][i];
  if ((m = n.match(/^Recursos · (.+)$/))) return [`Resources`,`Recursos`,`Ressources`,`Ресурсы`,`Kaynaklar`,`المصادر`][i];
  if ((m = n.match(/^(\d+) palavras disponíveis neste idioma$/))) return [`${m[1]} words available in this language`,`${m[1]} palabras disponibles en este idioma`,`${m[1]} mots disponibles dans cette langue`,`${m[1]} слов доступно в этом языке`,`Bu dilde ${m[1]} kelime var`,`${m[1]} كلمة متاحة في هذه اللغة`][i];
  if ((m = n.match(/^(Vocabulário|Gramática|Pronúncia): (.+)$/))) {
    const pre = D.get(m[1]), f = FRAG.get(m[2]), code = LOC[i];
    if (pre && pre[i] && f && f[code]) return pre[i] + ": " + f[code];
    if (pre && pre[i] && /[\u0400-\u04FF\u0600-\u06FF]/.test(m[2])) return pre[i] + ": " + m[2];
    return null;
  }
  if ((m = n.match(/^Etapa (\d+) do mapa: (.+?)\. Uma sessão com 4 unidades; as trilhas se alternam e cada passo se conclui após as revisões \(a cada 2 dias\)\.$/))) {
    const tt = tr(m[2], true) || m[2];
    return [`Step ${m[1]} of the map: ${tt}. One session of 4 units; the tracks alternate and each step is finished after the reviews (every 2 days).`,`Etapa ${m[1]} del mapa: ${tt}. Una sesión de 4 unidades; las pistas se alternan y cada paso se completa tras los repasos (cada 2 días).`,`Étape ${m[1]} de la carte : ${tt}. Une séance de 4 unités ; les parcours alternent et chaque étape se termine après les révisions (tous les 2 jours).`,`Этап ${m[1]} карты: ${tt}. Одно занятие из 4 уроков; направления чередуются, а каждый шаг завершается после повторений (каждые 2 дня).`,`Haritanın ${m[1]}. adımı: ${tt}. 4 üniteden oluşan bir oturum; patikalar sırayla ilerler ve her adım tekrarlardan sonra tamamlanır (2 günde bir).`,`خطوة ${m[1]} من الخريطة: ${tt}. جلسة من 4 وحدات؛ تتناوب المسارات وتكتمل كل خطوة بعد المراجعات (كل يومين).`][i];
  }
  if ((m = n.match(/^Exercícios de gramática e vocabulário baseados nos seus livros.*com 45 min, são A1 (\d+), A2 (\d+), B1 (\d+), B2 (\d+), C1 (\d+), C2 (\d+) dias/))) return EXP[i].replace(/\{(\d)\}/g, (_, d) => m[+d + 1]);
  if ((m = n.match(/^(\d+) das (\d+) etapas do idioma$/))) return [`${m[1]} of the language's ${m[2]} steps`,`${m[1]} de las ${m[2]} etapas del idioma`,`${m[1]} des ${m[2]} étapes de la langue`,`${m[1]} из ${m[2]} этапов языка`,`dilin ${m[2]} adımından ${m[1]}`,`${m[1]} من ${m[2]} خطوة في اللغة`][i];
  if ((m = n.match(/^Faça pelo menos 1 lição hoje\. Para variar: (.+)\.$/))) {
    const t0 = m[1].charAt(0).toUpperCase() + m[1].slice(1), tt = (() => { try { const mm = MALL.find(x => x.t === t0); const a = mm && MT[mm.id]; return a ? a[i] : null; } catch (_) { return null; } })() || tr(t0, true) || t0;
    return [`Do at least 1 lesson today. For variety: ${tt}.`,`Haz al menos 1 lección hoy. Para variar: ${tt}.`,`Fais au moins 1 leçon aujourd'hui. Pour varier : ${tt}.`,`Пройди сегодня хотя бы 1 урок. Для разнообразия: ${tt}.`,`Bugün en az 1 ders yap. Değişiklik için: ${tt}.`,`أنجز درسا واحدا على الأقل اليوم. للتنويع: ${tt}.`][i];
  }
  if ((m = n.match(/^(\d+) min$/))) return `${m[1]} ${["min","min","min","мин","dk","د"][i]}`;
  if ((m = n.match(/^(⚑ )?Início do nível (\w+)$/))) return ["⚑ Start of level ","⚑ Inicio del nivel ","⚑ Début du niveau ","⚑ Начало уровня ","⚑ Seviye başlangıcı ","⚑ بداية المستوى "][i] + m[2];
  if ((m = n.match(/^de (\d+)$/))) return [`of ${m[1]}`,`de ${m[1]}`,`sur ${m[1]}`,`из ${m[1]}`,`/ ${m[1]}`,`من ${m[1]}`][i];
  if ((m = n.match(/^dias · recorde (\d+)$/))) return [`days · best ${m[1]}`,`días · récord ${m[1]}`,`jours · record ${m[1]}`,`дней · рекорд ${m[1]}`,`gün · rekor ${m[1]}`,`أيام · الرقم القياسي ${m[1]}`][i];
  if (n.indexOf(" · ") > 0) {
    const UN = {min:["min","min","min","мин","dk","د"], dias:["days","días","jours","дней","gün","يوما"]};
    const parts = n.split(" · "), out = [];
    for (const pt of parts) {
      const d = D.get(pt), u = pt.match(/^(\d+) (min|dias)$/), lv = /^(A1|A2|B1|B2|C1|C2)$/.test(pt) || /^\d+$/.test(pt);
      if (d) out.push(d[i]); else if (u) out.push(u[1] + " " + UN[u[2]][i]); else if (lv) out.push(pt); else return null;
    }
    return out.join(" · ");
  }
  return null;
}
function tr(text, tier2){
  const i = LI[state().lang]; if (i == null) return null;
  const n = norm(text); if (!n || /^[\d\s\W]+$/.test(n)) return null;
  let r = D.get(n); r = r ? (r[i] || null) : (mh(n, i) || rules(n, i));
  if (!r) return null;
  if (!tier2 && n.length > 90) return null;
  const lead = text.match(/^\s*/)[0], trail = text.match(/\s*$/)[0];
  return lead + r + trail;
}
const curLv = () => (typeof view !== "undefined" && view) ? view : P().cfg.level;
function state(){ const k = LVO.indexOf(curLv()); return {on: S.imm !== false && k >= 2, t2: true, lang: S.lang}; }
const active = () => state().on;
const long2 = () => true;
const SKIP = "SCRIPT,STYLE,TEXTAREA,INPUT,.ptsub,h2.cardt,[data-bi],[lang]";
const touched = new Map(), tattr = new Map();
let busy = false, key = "";
function pass(){
  if (busy) return; busy = true;
  try {
    const on = active(), t2 = long2();
    document.body.classList.toggle("imm", on);
    { const T0 = D.get("Projeto Hermes"), li = LI[state().lang], dt = document.title;
      if (T0 && li != null) { if (on && /^Projeto Hermes/.test(dt)) { const nm = D.get(dt.replace(/^Projeto Hermes \/ /, "")); document.title = T0[li] + (dt.indexOf(" / ") > 0 ? " / " + (nm ? nm[li] : dt.split(" / ")[1]) : ""); } else if (!on && T0.indexOf(dt.split(" / ")[0]) >= 0) { document.title = "Projeto Hermes" + (dt.indexOf(" / ") > 0 ? " / " + dt.split(" / ")[1] : ""); } } }
    for (const [n, v] of [...touched]) { if (!n.isConnected) { touched.delete(n); continue; } if (n.data === v.t) { const r = on ? tr(v.o, t2) : null; const nt = r == null ? v.o : r; if (nt !== n.data) n.data = nt; v.t = nt; if (r == null) touched.delete(n); } else touched.delete(n); }
    if (!on) { for (const [el, o] of [...tattr]) { if (el.isConnected) for (const a in o) if (el.getAttribute(a) === o[a].t) el.setAttribute(a, o[a].o); tattr.delete(el); } return; }
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: n => (n.data.trim().length > 1 && !(n.parentElement && n.parentElement.closest(SKIP))) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT });
    let n; const list = []; while ((n = w.nextNode())) list.push(n);
    for (const nd of list) { if (touched.has(nd)) continue; const r = tr(nd.data, t2); if (r != null && r !== nd.data) { touched.set(nd, {o: nd.data, t: r}); nd.data = r; } }
    document.querySelectorAll("[placeholder],[aria-label],[title]").forEach(el => {
      if (el.closest(SKIP)) return;
      const o = tattr.get(el) || {};
      ["placeholder","aria-label","title"].forEach(a => {
        const v = el.getAttribute(a); if (!v) return;
        if (o[a] && v === o[a].t) { const r = tr(o[a].o, t2); if (r != null && r !== v) { el.setAttribute(a, r); o[a].t = r; } return; }
        const r = tr(v, t2); if (r != null && r !== v) { o[a] = {o: v, t: r}; el.setAttribute(a, r); }
      });
      if (Object.keys(o).length) tattr.set(el, o);
    });
  } finally { busy = false; }
}
let raf = 0;
new MutationObserver(() => { if (busy || raf) return; raf = requestAnimationFrame(() => { raf = 0; pass(); }); }).observe(document.body, {childList:true, subtree:true, characterData:true});
setInterval(() => { const st = state(), k = st.lang + "|" + (st.on ? 1 : 0); if (k !== key) { key = k; pass(); } }, 400);
const EXP = ["Exercises of grammar and vocabulary based on your books, organized by subject. Pick the right option or write the answer, click Finish and we check everything at once. The little bar under each level fills with the days on which you finish at least one full session (each level's target depends on the minutes per day you set: with 45 min, it is A1 {0}, A2 {1}, B1 {2}, B2 {3}, C1 {4}, C2 {5} days — they do not need to be consecutive).", "Ejercicios de gramática y vocabulario basados en tus libros, organizados por materia. Marca la opción correcta o escribe la respuesta, pulsa Terminar y lo corregimos todo de una vez. La barrita bajo cada nivel se llena con los días en que terminas al menos una sesión completa (la meta de cada nivel depende de los minutos por día que definiste: con 45 min, son A1 {0}, A2 {1}, B1 {2}, B2 {3}, C1 {4}, C2 {5} días — no tienen que ser seguidos).", "Exercices de grammaire et de vocabulaire basés sur tes livres, organisés par matière. Choisis la bonne option ou écris la réponse, clique sur Terminer et on corrige tout d'un coup. La petite barre sous chaque niveau se remplit avec les jours où tu termines au moins une séance complète (l'objectif de chaque niveau dépend des minutes par jour que tu as définies : avec 45 min, c'est A1 {0}, A2 {1}, B1 {2}, B2 {3}, C1 {4}, C2 {5} jours — pas forcément consécutifs).", "Упражнения по грамматике и лексике по твоим учебникам, по темам. Выбери верный вариант или напиши ответ, нажми «Завершить», и мы проверим всё сразу. Полоска под каждым уровнем заполняется днями, когда ты завершаешь хотя бы одно полное занятие (цель уровня зависит от минут в день, которые ты задал: при 45 мин это A1 {0}, A2 {1}, B1 {2}, B2 {3}, C1 {4}, C2 {5} дней — подряд не обязательно).", "Kitaplarına dayalı, konuya göre düzenlenmiş dilbilgisi ve kelime alıştırmaları. Doğru seçeneği işaretle veya yanıtı yaz, Bitir'e tıkla; hepsini birlikte kontrol edelim. Her seviyenin altındaki çubuk, en az bir tam oturumu bitirdiğin günlerle dolar (her seviyenin hedefi belirlediğin günlük dakikaya bağlıdır: 45 dk ile A1 {0}, A2 {1}, B1 {2}, B2 {3}, C1 {4}, C2 {5} gün — ardışık olmaları gerekmez).", "تمارين قواعد ومفردات مبنية على كتبك ومرتبة حسب المادة. اختر الإجابة الصحيحة أو اكتبها، ثم اضغط «أنهِ» لنصحح كل شيء معا. يمتلئ الشريط الصغير تحت كل مستوى بالأيام التي تنهي فيها جلسة كاملة واحدة على الأقل (هدف كل مستوى يعتمد على الدقائق اليومية التي حددتها: مع 45 دقيقة يكون A1 {0} وA2 {1} وB1 {2} وB2 {3} وC1 {4} وC2 {5} يوما — ولا يلزم أن تكون متتالية)."];
const TXT = {
 rota: [
  "The tracks run <b>in parallel</b>: the 1st step of each one is already open. The next step of a track only opens when the previous one is done, and each step is finished after <b>{n} reviews</b>, one every <b>{g} days</b>. The level test opens when all tracks are finished.",
  "Las pistas avanzan <b>en paralelo</b>: el 1.er paso de cada una ya está abierto. El siguiente paso de una pista solo se abre cuando se completa el anterior, y cada paso se termina tras <b>{n} repasos</b>, uno cada <b>{g} días</b>. La prueba del nivel se abre cuando terminen todas las pistas.",
  "Les parcours avancent <b>en parallèle</b> : la 1re étape de chacun est déjà ouverte. L'étape suivante ne s'ouvre que lorsque la précédente est terminée, et chaque étape se termine après <b>{n} révisions</b>, une tous les <b>{g} jours</b>. Le test du niveau s'ouvre quand tous les parcours sont finis.",
  "Направления идут <b>параллельно</b>: первый шаг каждого уже открыт. Следующий шаг открывается, только когда завершён предыдущий, а каждый шаг считается пройденным после <b>{n} повторений</b>, по одному каждые <b>{g} дня</b>. Экзамен уровня откроется, когда закончатся все направления.",
  "Patikalar <b>paralel</b> ilerler: her birinin 1. adımı zaten açık. Bir patikanın sonraki adımı ancak öncekini bitirince açılır ve her adım <b>{n} tekrardan</b> sonra tamamlanır; her <b>{g} günde</b> bir tekrar. Tüm patikalar bitince seviye sınavı açılır.",
  "المسارات تسير <b>بالتوازي</b>: الخطوة الأولى من كل مسار مفتوحة بالفعل. الخطوة التالية لا تُفتح إلا بعد إنهاء السابقة، وتكتمل كل خطوة بعد <b>{n} مراجعات</b>، واحدة كل <b>{g} أيام</b>. يُفتح اختبار المستوى عند انتهاء كل المسارات."],
 flow: [
  "Follow the flow from top to bottom: each step only unlocks after you finish the previous one. Click a step, do the activities and confirm. You choose whether to finish for good or review after as many days as you like.",
  "Sigue el flujo de arriba abajo: cada etapa solo se desbloquea al terminar la anterior. Haz clic en una etapa, haz las actividades y confirma. Tú eliges si la terminas de una vez o la repasas después de los días que quieras.",
  "Suis le parcours de haut en bas : chaque étape ne se débloque qu'après la précédente. Clique sur une étape, fais les activités et confirme. Tu choisis de terminer d'un coup ou de réviser après le nombre de jours que tu veux.",
  "Иди по схеме сверху вниз: каждый этап открывается только после предыдущего. Нажми на этап, выполни задания и подтверди. Ты сам решаешь: завершить сразу или повторить через любое число дней.",
  "Akışı yukarıdan aşağıya izle: her adım ancak öncekini bitirince açılır. Bir adıma tıkla, etkinlikleri yap ve onayla. Hemen bitirmek mi yoksa istediğin kadar gün sonra tekrar etmek mi, sen seçersin.",
  "اتبع المخطط من الأعلى إلى الأسفل: كل خطوة لا تُفتح إلا بعد إنهاء السابقة. اضغط على خطوة ونفّذ الأنشطة وأكّد. أنت تختار أن تنهيها نهائيا أو تراجعها بعد عدد الأيام الذي تريده."],
 rest: [
  "<b>Today is a rest day</b> among your study days. If you want something light, do a mission below or watch a series episode with subtitles in the language.",
  "<b>Hoy es día de descanso</b> entre tus días de estudio. Si quieres algo ligero, haz una misión abajo o mira un episodio de una serie con subtítulos en el idioma.",
  "<b>Aujourd'hui, c'est un jour de repos</b> parmi tes jours d'étude. Si tu veux quelque chose de léger, fais une mission ci-dessous ou regarde un épisode de série sous-titré dans la langue.",
  "<b>Сегодня день отдыха</b> среди твоих учебных дней. Хочешь чего-нибудь лёгкого — выполни задание ниже или посмотри серию сериала с субтитрами на изучаемом языке.",
  "<b>Bugün dinlenme günü</b> çalışma günlerin arasında. Hafif bir şey istersen aşağıdan bir görev yap veya dilde altyazılı bir dizi bölümü izle.",
  "<b>اليوم يوم راحة</b> من أيام دراستك. إن أردت شيئا خفيفا فنفّذ مهمة بالأسفل أو شاهد حلقة من مسلسل بترجمة باللغة نفسها."]
};
window.immI = (key, v, pt) => { try { if (!active()) return pt; const i = LI[state().lang]; if (i == null || !TXT[key]) return pt; let t = TXT[key][i]; for (const k in (v || {})) t = t.split("{" + k + "}").join(v[k]); return t; } catch (_) { return pt; } };
window.immT = pt => { try { if (!active()) return pt; const r = tr(pt, true); return r == null ? pt : r; } catch (_) { return pt; } };
window.immPass = pass;
pass();
})();
