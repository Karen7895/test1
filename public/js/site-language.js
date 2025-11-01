(function () {
  const STORAGE_KEY = "dl-site-language"
  const DEFAULT_LANGUAGE = "de"
  const SUPPORTED_LANGUAGES = ["de", "en", "es", "ru", "hy"]

  const translations = {
    en: {
      "brand.title": "German Reading Nook",
      "brand.tagline": "Your library of short stories",
      "nav.library": "Library",
      "nav.learning": "Learning",
      "nav.vocabulary": "Vocabulary",
      "nav.grammar": "Grammar",
      "nav.about": "About",
      "nav.newStory": "New story",
      "nav.newQuestion": "New question",
      "nav.logout": "Logout",
      "nav.login": "Login",
      "nav.signup": "Sign up",
      "nav.languageLabel": "Website language",
      "home.heroEyebrow": "Learn German with joy",
      "home.heroTitle": "Discover handpicked short stories for every level.",
      "home.heroSubtitle":
        "Read authentic scenarios, train your vocabulary, and feel your progress. Fresh content appears regularly &ndash; perfect for your daily study routine.",
      "home.heroPrimary": "Start reading",
      "home.heroSecondary": "About the project",
      "home.heroStatsReaders": "Active readers",
      "home.heroStatsStories": "Stories available",
      "home.heroStatsLevels": "Skill levels",
      "home.heroCardTag": "Featured",
      "home.heroCardTitle": "&ldquo;Morning in Munich&rdquo;",
      "home.heroCardDescription":
        "A commuter navigates the rush of the city. Packed with phrases for everyday conversations &ndash; ideal for shadowing.",
      "home.heroCardBullet1": "&#128257; Includes comprehension questions",
      "home.heroCardBullet2": "&#128483; Pronunciation tips for speaking along",
      "home.heroCardBullet3": "&#128338; Reading time: 6 minutes",
      "home.adminEyebrow": "Editorial",
      "home.adminTitle": "Share your next story",
      "home.adminCopy":
        "As an admin you can publish new stories and comprehension questions instantly &ndash; complete with level, summary, answers, and audio.",
      "home.adminCta": "Create story",
      "home.adminQuestionCta": "Create question",
      "learning.heroEyebrow": "Learning",
      "learning.vocabulary.title": "Vocabulary studio",
      "learning.vocabulary.intro":
        "Discover new words with translations and example sentences so you can reuse them instantly in stories.",
      "learning.vocabulary.addCta": "Add entry",
      "learning.vocabulary.emptyTitle": "No entries yet",
      "learning.vocabulary.emptyCopy":
        "As soon as new vocabulary is published it will appear here with translations and example sentences.",
      "learning.vocabulary.publishedOnLabel": "Published on",
      "learning.vocabulary.exampleLabel": "Example sentence:",
      "learning.vocabulary.formTitle": "Create a vocabulary entry",
      "learning.vocabulary.formIntro":
        "Share essential terms with the community, complete with translations and an optional example sentence.",
      "learning.vocabulary.termLabel": "German",
      "learning.vocabulary.translationLabel": "Translation",
      "learning.vocabulary.exampleLabelFull": "Example sentence",
      "learning.vocabulary.exampleHelp": "Optional: add a sentence that shows the word in context.",
      "learning.vocabulary.cancel": "Cancel",
      "learning.vocabulary.save": "Save",
      "learning.grammar.title": "Grammar studio",
      "learning.grammar.intro":
        "Compact explanations help you avoid repeating mistakes and apply new structures with confidence.",
      "learning.grammar.addCta": "Add topic",
      "learning.grammar.emptyTitle": "No topics yet",
      "learning.grammar.emptyCopy":
        "Once new grammar lessons are published you will find them here with examples and tips.",
      "learning.grammar.publishedOnLabel": "Published on",
      "learning.grammar.formTitle": "Create a grammar topic",
      "learning.grammar.formIntro":
        "Describe a structure, frequent mistakes, and examples so learners can progress faster.",
      "learning.grammar.titleLabel": "Topic",
      "learning.grammar.explanationLabel": "Explanation",
      "learning.grammar.explanationHelp":
        "Tip: You can use HTML formatting such as <strong> and <ul> to highlight examples.",
      "learning.grammar.cancel": "Cancel",
      "learning.grammar.save": "Save",
      "footer.tagline": "Master languages together.",
      "footer.home": "Home",
      "footer.stories": "Stories",
      "footer.grammar": "Grammar",
      "footer.vocabulary": "Vocabulary",
      "footer.faq": "FAQ",
      "footer.contact": "Contact",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms of Service",
      "footer.cookies": "Cookies Policy",
      "footer.support": "Need help? Contact us at support@learndeutsch.com",
      "footer.signature": "Made with ❤️ for everyone learning German.",
      "footer.author": "Author: Karen Bannahyan",
      "home.libraryTitle": "Library",
      "home.librarySubtitle": "Browse our collection by your current proficiency level.",
      "home.filterLabel": "Filter by difficulty level",
      "home.filterAll": "All",
      "home.emptyTitle": "No stories yet",
      "home.emptyCopy": "Once the first story is published, you will see it here.",
      "home.readTime": "Reading time: ~5 min",
      "home.readButton": "Read",
      "home.loginPrompt": "Log in to read stories and track your progress.",
      "home.loginAction": "Go to login",
      "home.loginDismiss": "Maybe later",
      "home.plansEyebrow": "Plans",
      "home.plansTitle": "Choose the plan that matches your goals",
      "home.plansSubtitle":
        "From a free introduction to intensive coaching &ndash; pick the study environment that keeps you moving forward.",
      "home.plan.basicName": "🟢 Basic Plan",
      "home.plan.basicPrice": "$0/month",
      "home.plan.basicAudience": "For beginners who want to explore the basics.",
      "home.plan.basicFeature1": "Access to 5 free stories.",
      "home.plan.basicFeature2": "Instant word translation by clicking.",
      "home.plan.basicFeature3": "1 flashcard set (essential vocabulary).",
      "home.plan.basicFeature4": "Basic grammar lessons (limited topics).",
      "home.plan.basicGoal": "Goal: Let new users experience the core features before subscribing.",
      "home.plan.mediumBadge": "Popular",
      "home.plan.mediumName": "🟠 Medium Plan",
      "home.plan.mediumPrice": "$7.99&ndash;$10/month",
      "home.plan.mediumAudience": "For regular learners who want structured study and progress tracking.",
      "home.plan.mediumFeature1": "Access to all stories, including new weekly additions.",
      "home.plan.mediumFeature2": "Save translations and mark learned words.",
      "home.plan.mediumFeature3": "Access to all flashcard decks (by topic or difficulty).",
      "home.plan.mediumFeature4": "Exercises and quizzes for comprehension.",
      "home.plan.mediumFeature5": "Full grammar section with interactive examples.",
      "home.plan.mediumFeature6": "Native speaker audio (mp3) for each story.",
      "home.plan.mediumGoal": "Goal: Our main plan &ndash; full content and engagement features.",
      "home.plan.advancedName": "🔵 Advanced Plan",
      "home.plan.advancedPrice": "$14.99&ndash;$19.99/month",
      "home.plan.advancedAudience": "For serious learners preparing for advanced levels (B2&ndash;C1) or fluency.",
      "home.plan.advancedFeature1": "Everything in Medium, plus:",
      "home.plan.advancedFeature2": "AI teacher, error analysis, and recommendations (e.g., you mix up der/die/das).",
      "home.plan.advancedFeature3": "Access to advanced-level stories (B2&ndash;C2).",
      "home.plan.advancedFeature4": "More exercises and quizzes for comprehension.",
      "home.plan.advancedFeature5": "Download stories as mp3 or PDF for offline study.",
      "home.plan.advancedFeature6": "Very advanced German resources.",
      "home.plan.advancedFeature7": "Optional monthly live Q&A or 1:1 teacher sessions.",
      "home.plan.advancedGoal": "Goal: Intensive preparation for high proficiency with tailored support.",
      "auth.loginTitle": "Log in",
      "auth.emailLabel": "Email address",
      "auth.passwordLabel": "Password",
      "auth.loginButton": "Log in",
      "auth.loginSwitchPrompt": "Need an account?",
      "auth.loginSwitchAction": "Create one",
      "auth.signupTitle": "Create an account",
      "auth.confirmLabel": "Confirm password",
      "auth.signupButton": "Sign up",
      "auth.signupSwitchPrompt": "Already registered?",
      "auth.signupSwitchAction": "Log in",
      "story.backLink": "Back to the library",
      "story.publishedLabel": "Published on",
      "story.translationHint": "Click a word or select multiple words to translate them into {{LANGUAGE}}.",
      "story.noteTitle": "Reading tip",
      "story.noteBody":
        "Read the text aloud, highlight new vocabulary, and write two of your own sentences with the new words.",
      "story.quizTitle": "Check your understanding",
      "story.quizIntro": "Answer the questions to see how well you understood the story.",
      "story.quizQuestionLabel": "Question",
      "story.quizAudioLabel": "Audio",
      "story.quizCheckButton": "Check answer",
      "story.quizFeedbackMissing": "Please choose an answer before checking.",
      "story.quizFeedbackCorrect": "Correct! Great job.",
      "story.quizFeedbackIncorrect": "That's not correct yet. Try again.",
      "story.prevLabel": "Previous story",
      "story.nextLabel": "Next story",
      "about.heroEyebrow": "German Reading Nook",
      "about.heroTitle": "Reading German better together",
      "about.heroSubtitle":
        "We curate modern short stories tailored to learners. Every story has a clear language level and helps you understand new vocabulary in context.",
      "about.missionTitle": "Our mission",
      "about.missionBody":
        "Reading is one of the most effective ways to internalize a language. With authentic situations, short chapters, and clear explanations you can keep learning consistently without feeling overwhelmed.",
      "about.audienceTitle": "Who we write for",
      "about.audienceItemA1": "<strong>A1:</strong> First steps with approachable vocabulary.",
      "about.audienceItemA2": "<strong>A2:</strong> Handling everyday situations with confidence.",
      "about.audienceItemB1": "<strong>B1:</strong> Strengthening the fundamentals with dialogs and explanations.",
      "about.audienceItemB2": "<strong>B2:</strong> Deeper understanding through more complex texts.",
      "about.howTitle": "How to use the platform",
      "about.howBody":
        "Choose a story that fits your level, read it attentively, and revisit new terms. Our AI assistant helps with questions about grammar or vocabulary.",
      "about.contactTitle": "Contact",
      "about.contactBody":
        "Do you have feedback or your own stories? Send us a note: <a href=\"mailto:info@deutschleseecke.de\">info@deutschleseecke.de</a>"
    },
    es: {
      "brand.title": "Rincón de Lectura Alemán",
      "brand.tagline": "Tu biblioteca de historias cortas",
      "nav.library": "Biblioteca",
      "nav.learning": "Aprendizaje",
      "nav.vocabulary": "Vocabulario",
      "nav.grammar": "Gram&aacute;tica",
      "nav.about": "Acerca de",
      "nav.newStory": "Nueva historia",
      "nav.newQuestion": "Nueva pregunta",
      "nav.logout": "Cerrar sesión",
      "nav.login": "Iniciar sesión",
      "nav.signup": "Crear cuenta",
      "nav.languageLabel": "Idioma del sitio web",
      "home.heroEyebrow": "Aprende alemán con gusto",
      "home.heroTitle": "Descubre cuentos breves seleccionados para cada nivel.",
      "home.heroSubtitle":
        "Lee situaciones auténticas, entrena tu vocabulario y siente tu progreso. Publicamos contenido nuevo con regularidad &ndash; perfecto para tu rutina diaria de estudio.",
      "home.heroPrimary": "Comenzar a leer",
      "home.heroSecondary": "Sobre el proyecto",
      "home.heroStatsReaders": "Lectores activos",
      "home.heroStatsStories": "Historias disponibles",
      "home.heroStatsLevels": "Niveles",
      "home.heroCardTag": "Destacado",
      "home.heroCardTitle": "&ldquo;Mañana en Múnich&rdquo;",
      "home.heroCardDescription":
        "Una persona que viaja al trabajo se abre paso por el bullicio de la ciudad. Repleta de frases para conversaciones cotidianas &ndash; ideal para practicar en voz alta.",
      "home.heroCardBullet1": "&#128257; Incluye preguntas de comprensión",
      "home.heroCardBullet2": "&#128483; Consejos de pronunciación para repetir",
      "home.heroCardBullet3": "&#128338; Tiempo de lectura: 6 minutos",
      "home.adminEyebrow": "Editorial",
      "home.adminTitle": "Comparte tu próxima historia",
      "home.adminCopy":
        "Como administrador puedes publicar al instante nuevas historias y preguntas &ndash; con nivel, resumen, respuestas y audio.",
      "home.adminCta": "Crear historia",
      "home.adminQuestionCta": "Crear pregunta",
      "home.libraryTitle": "Biblioteca",
      "home.librarySubtitle": "Explora nuestra colección según tu nivel actual.",
      "home.filterLabel": "Filtrar por nivel de dificultad",
      "home.filterAll": "Todas",
      "home.emptyTitle": "Aún no hay historias",
      "home.emptyCopy": "Cuando se publique la primera historia, aparecerá aquí.",
      "home.readTime": "Tiempo de lectura: ~5 min",
      "home.readButton": "Leer",
      "home.loginPrompt": "Inicia sesión para leer historias y seguir tu progreso.",
      "home.loginAction": "Ir al inicio de sesión",
      "home.loginDismiss": "Más tarde",
      "home.plansEyebrow": "Planes",
      "home.plansTitle": "Elige el plan que se ajusta a tus objetivos",
      "home.plansSubtitle":
        "Desde una introducción gratuita hasta un acompañamiento intensivo &ndash; escoge el entorno de estudio que te haga avanzar.",
      "home.plan.basicName": "🟢 Plan Basic",
      "home.plan.basicPrice": "$0/mes",
      "home.plan.basicAudience": "Para principiantes que quieren explorar lo esencial.",
      "home.plan.basicFeature1": "Acceso a 5 historias gratuitas.",
      "home.plan.basicFeature2": "Traducción instantánea de palabras con un clic.",
      "home.plan.basicFeature3": "1 set de tarjetas (vocabulario esencial).",
      "home.plan.basicFeature4": "Lecciones básicas de gramática (temas limitados).",
      "home.plan.basicGoal": "Meta: Que los nuevos usuarios prueben las funciones clave antes de suscribirse.",
      "home.plan.mediumBadge": "Más popular",
      "home.plan.mediumName": "🟠 Plan Medium",
      "home.plan.mediumPrice": "$7.99&ndash;$10/mes",
      "home.plan.mediumAudience": "Para estudiantes habituales que desean estructura y seguimiento del progreso.",
      "home.plan.mediumFeature1": "Acceso a todas las historias, incluidas las nuevas cada semana.",
      "home.plan.mediumFeature2": "Guarda traducciones y marca palabras aprendidas.",
      "home.plan.mediumFeature3": "Acceso a todos los mazos de tarjetas (por tema o dificultad).",
      "home.plan.mediumFeature4": "Ejercicios y cuestionarios de comprensión.",
      "home.plan.mediumFeature5": "Sección de gramática completa con ejemplos interactivos.",
      "home.plan.mediumFeature6": "Audio de hablantes nativos (mp3) para cada historia.",
      "home.plan.mediumGoal": "Meta: Nuestro plan principal &ndash; todo el contenido y funciones de participación.",
      "home.plan.advancedName": "🔵 Plan Advanced",
      "home.plan.advancedPrice": "$14.99&ndash;$19.99/mes",
      "home.plan.advancedAudience": "Para estudiantes serios que se preparan para niveles avanzados (B2&ndash;C1) o fluidez.",
      "home.plan.advancedFeature1": "Todo lo del plan Medium, más:",
      "home.plan.advancedFeature2": "Profesor con IA, análisis de errores y recomendaciones (por ejemplo, confundes der/die/das).",
      "home.plan.advancedFeature3": "Acceso a historias de nivel avanzado (B2&ndash;C2).",
      "home.plan.advancedFeature4": "Más ejercicios y cuestionarios de comprensión.",
      "home.plan.advancedFeature5": "Descarga historias en mp3 o PDF para estudiar sin conexión.",
      "home.plan.advancedFeature6": "Recursos de alemán muy avanzados.",
      "home.plan.advancedFeature7": "Sesiones opcionales mensuales de Q&A en vivo o clases 1:1.",
      "home.plan.advancedGoal": "Meta: Preparación intensiva para alta competencia con acompañamiento personalizado.",
      "auth.loginTitle": "Iniciar sesión",
      "auth.emailLabel": "Correo electrónico",
      "auth.passwordLabel": "Contraseña",
      "auth.loginButton": "Entrar",
      "auth.loginSwitchPrompt": "¿Necesitas una cuenta?",
      "auth.loginSwitchAction": "Crea una",
      "auth.signupTitle": "Crear una cuenta",
      "auth.confirmLabel": "Confirmar contraseña",
      "auth.signupButton": "Registrarse",
      "auth.signupSwitchPrompt": "¿Ya tienes cuenta?",
      "auth.signupSwitchAction": "Inicia sesión",
      "story.backLink": "Volver a la biblioteca",
      "story.publishedLabel": "Publicado el",
      "story.translationHint": "Haz clic en una palabra o selecciona varias para traducirlas al {{LANGUAGE}}.",
      "story.noteTitle": "Consejo de lectura",
      "story.noteBody":
        "Lee el texto en voz alta, resalta el vocabulario nuevo y escribe dos oraciones con las palabras nuevas.",
      "story.quizTitle": "Comprueba tu comprensión",
      "story.quizIntro": "Responde las preguntas para ver qué tan bien entendiste la historia.",
      "story.quizQuestionLabel": "Pregunta",
      "story.quizAudioLabel": "Audio",
      "story.quizCheckButton": "Comprobar respuesta",
      "story.quizFeedbackMissing": "Elige una respuesta antes de comprobar.",
      "story.quizFeedbackCorrect": "¡Correcto! Muy bien.",
      "story.quizFeedbackIncorrect": "No es correcto todavía. Inténtalo de nuevo.",
      "story.prevLabel": "Historia anterior",
      "story.nextLabel": "Siguiente historia",
      "about.heroEyebrow": "Rincón de Lectura Alemán",
      "about.heroTitle": "Leer mejor en alemán juntos",
      "about.heroSubtitle":
        "Reunimos cuentos modernos pensados para estudiantes. Cada historia tiene un nivel definido y te ayuda a comprender vocabulario nuevo en contexto.",
      "about.missionTitle": "Nuestra misión",
      "about.missionBody":
        "Leer es una de las formas más eficaces de interiorizar un idioma. Con situaciones auténticas, capítulos breves y explicaciones claras puedes aprender de forma constante sin sentirte abrumado.",
      "about.audienceTitle": "Para quién escribimos",
      "about.audienceItemA1": "<strong>A1:</strong> Primeros pasos con vocabulario accesible.",
      "about.audienceItemA2": "<strong>A2:</strong> Domina con seguridad las situaciones cotidianas.",
      "about.audienceItemB1": "<strong>B1:</strong> Refuerza las bases con diálogos y explicaciones.",
      "about.audienceItemB2": "<strong>B2:</strong> Comprensión más profunda con textos complejos.",
      "about.howTitle": "Cómo usar la plataforma",
      "about.howBody":
        "Elige una historia que se ajuste a tu nivel, léela con atención y repasa los términos nuevos. Nuestro asistente de IA te ayuda con dudas de gramática o vocabulario.",
      "about.contactTitle": "Contacto",
      "about.contactBody":
        "¿Tienes comentarios o historias propias? Escríbenos: <a href=\"mailto:info@deutschleseecke.de\">info@deutschleseecke.de</a>"
      ,
      "learning.heroEyebrow": "Aprendizaje",
      "learning.vocabulary.title": "Taller de vocabulario",
      "learning.vocabulary.intro":
        "Descubre palabras nuevas con traducciones y ejemplos para reutilizarlas enseguida en las historias.",
      "learning.vocabulary.addCta": "Nuevo t&eacute;rmino",
      "learning.vocabulary.emptyTitle": "A&uacute;n sin entradas",
      "learning.vocabulary.emptyCopy":
        "Cuando publiquemos nuevo vocabulario aparecer&aacute; aqu&iacute; con traducciones y oraciones de ejemplo.",
      "learning.vocabulary.publishedOnLabel": "Publicado el",
      "learning.vocabulary.exampleLabel": "Oraci&oacute;n de ejemplo:",
      "learning.vocabulary.formTitle": "Crear entrada de vocabulario",
      "learning.vocabulary.formIntro":
        "Comparte t&eacute;rminos esenciales con la comunidad, con traducci&oacute;n y un ejemplo opcional.",
      "learning.vocabulary.termLabel": "Alem&aacute;n",
      "learning.vocabulary.translationLabel": "Traducci&oacute;n",
      "learning.vocabulary.exampleLabelFull": "Oraci&oacute;n de ejemplo",
      "learning.vocabulary.exampleHelp": "Opcional: una frase que muestre la palabra en contexto.",
      "learning.vocabulary.cancel": "Cancelar",
      "learning.vocabulary.save": "Guardar",
      "learning.grammar.title": "Estudio de gram&aacute;tica",
      "learning.grammar.intro":
        "Explicaciones compactas que te ayudan a evitar errores repetidos y aplicar nuevas estructuras con seguridad.",
      "learning.grammar.addCta": "Nuevo tema",
      "learning.grammar.emptyTitle": "A&uacute;n sin temas",
      "learning.grammar.emptyCopy":
        "Cuando publiquemos nuevas lecciones de gram&aacute;tica las encontrar&aacute;s aqu&iacute; con ejemplos y consejos.",
      "learning.grammar.publishedOnLabel": "Publicado el",
      "learning.grammar.formTitle": "Crear tema de gram&aacute;tica",
      "learning.grammar.formIntro":
        "Describe una estructura, errores frecuentes y ejemplos para que los estudiantes avancen m&aacute;s r&aacute;pido.",
      "learning.grammar.titleLabel": "Tema",
      "learning.grammar.explanationLabel": "Explicaci&oacute;n",
      "learning.grammar.explanationHelp":
        "Consejo: puedes usar formato HTML como <strong> y <ul> para resaltar ejemplos.",
      "learning.grammar.cancel": "Cancelar",
      "learning.grammar.save": "Guardar",
      "footer.tagline": "Domina idiomas juntos.",
      "footer.home": "Inicio",
      "footer.stories": "Historias",
      "footer.grammar": "Gram&aacute;tica",
      "footer.vocabulary": "Vocabulario",
      "footer.faq": "FAQ",
      "footer.contact": "Contacto",
      "footer.privacy": "Pol&iacute;tica de privacidad",
      "footer.terms": "T&eacute;rminos del servicio",
      "footer.cookies": "Pol&iacute;tica de cookies",
      "footer.support": "&iquest;Necesitas ayuda? Escr&iacute;benos a support@learndeutsch.com",
      "footer.signature": "Hecho con ❤️ para quienes aprenden alem&aacute;n.",
      "footer.author": "Autora: Karen Bannahyan"
    },
    ru: {
      "brand.title": "Немецкий уголок",
      "brand.tagline": "Твоя библиотека коротких историй",
      "nav.library": "Библиотека",
      "nav.learning": "Обучение",
      "nav.vocabulary": "Словарь",
      "nav.grammar": "Грамматика",
      "nav.about": "О проекте",
      "nav.newStory": "Новая история",
      "nav.newQuestion": "Новый вопрос",
      "nav.logout": "Выйти",
      "nav.login": "Войти",
      "nav.signup": "Регистрация",
      "nav.languageLabel": "Язык сайта",
      "home.heroEyebrow": "Изучайте немецкий с удовольствием",
      "home.heroTitle": "Откройте подборку коротких историй для любого уровня.",
      "home.heroSubtitle":
        "Читайте реальные ситуации, расширяйте словарный запас и чувствуйте прогресс. Новые материалы появляются регулярно &ndash; идеально для ежедневной практики.",
      "home.heroPrimary": "Начать чтение",
      "home.heroSecondary": "О проекте",
      "home.heroStatsReaders": "Активные читатели",
      "home.heroStatsStories": "Доступные истории",
      "home.heroStatsLevels": "Уровни владения",
      "home.heroCardTag": "Рекомендация",
      "home.heroCardTitle": "«Утро в Мюнхене»",
      "home.heroCardDescription":
        "Пассажирка пробирается через городской поток. Содержит лексику для повседневных диалогов &ndash; идеально для повторения.",
      "home.heroCardBullet1": "&#128257; Включает вопросы на понимание",
      "home.heroCardBullet2": "&#128483; Подсказки по произношению",
      "home.heroCardBullet3": "&#128338; Время чтения: 6 минут",
      "home.adminEyebrow": "Редакция",
      "home.adminTitle": "Поделитесь своей следующей историей",
      "home.adminCopy":
        "Как администратор вы можете мгновенно публиковать новые истории и вопросы &ndash; с уровнем, аннотацией, ответами и аудио.",
      "home.adminCta": "Создать историю",
      "home.adminQuestionCta": "Создать вопрос",
      "home.libraryTitle": "Библиотека",
      "home.librarySubtitle": "Ищите истории по своему текущему уровню владения языком.",
      "home.filterLabel": "Фильтр по уровню сложности",
      "home.filterAll": "Все",
      "home.emptyTitle": "Историй пока нет",
      "home.emptyCopy": "Когда появится первая история, она будет показана здесь.",
      "home.readTime": "Время чтения: ~5 мин",
      "home.readButton": "Читать",
      "home.loginPrompt": "Войдите, чтобы читать истории и следить за прогрессом.",
      "home.loginAction": "Перейти ко входу",
      "home.loginDismiss": "Позже",
      "home.plansEyebrow": "Тарифы",
      "home.plansTitle": "Выберите тариф под ваши цели",
      "home.plansSubtitle":
        "От бесплатного знакомства до интенсивного сопровождения &ndash; найдите формат, который поможет вам двигаться вперёд.",
      "home.plan.basicName": "🟢 Тариф Basic",
      "home.plan.basicPrice": "0 ₽/месяц",
      "home.plan.basicAudience": "Для новичков, которые хотят познакомиться с основами.",
      "home.plan.basicFeature1": "Доступ к 5 бесплатным историям.",
      "home.plan.basicFeature2": "Мгновенный перевод слов по клику.",
      "home.plan.basicFeature3": "1 набор карточек (базовая лексика).",
      "home.plan.basicFeature4": "Базовые уроки грамматики (ограниченные темы).",
      "home.plan.basicGoal": "Цель: дать новым пользователям попробовать ключевые функции перед подпиской.",
      "home.plan.mediumBadge": "Популярный",
      "home.plan.mediumName": "🟠 Тариф Medium",
      "home.plan.mediumPrice": "$7,99&ndash;$10/месяц",
      "home.plan.mediumAudience": "Для регулярных учеников, которым нужна структура и отслеживание прогресса.",
      "home.plan.mediumFeature1": "Доступ ко всем историям, включая еженедельные новинки.",
      "home.plan.mediumFeature2": "Сохраняйте переводы и отмечайте выученные слова.",
      "home.plan.mediumFeature3": "Все наборы карточек (по темам и уровню сложности).",
      "home.plan.mediumFeature4": "Упражнения и викторины на понимание.",
      "home.plan.mediumFeature5": "Полный раздел грамматики с интерактивными примерами.",
      "home.plan.mediumFeature6": "Аудио от носителей (mp3) для каждой истории.",
      "home.plan.mediumGoal": "Цель: наш основной тариф &ndash; весь контент и функции вовлечения.",
      "home.plan.advancedName": "🔵 Тариф Advanced",
      "home.plan.advancedPrice": "$14,99&ndash;$19,99/месяц",
      "home.plan.advancedAudience": "Для серьёзных студентов, готовящихся к уровням B2&ndash;C1 и свободному владению.",
      "home.plan.advancedFeature1": "Всё из Medium, плюс:",
      "home.plan.advancedFeature2": "ИИ-преподаватель, анализ ошибок и рекомендации (например, путаница der/die/das).",
      "home.plan.advancedFeature3": "Доступ к историям уровней B2&ndash;C2.",
      "home.plan.advancedFeature4": "Больше упражнений и викторин на глубокое понимание.",
      "home.plan.advancedFeature5": "Скачивайте истории в mp3 или PDF для офлайн-обучения.",
      "home.plan.advancedFeature6": "Очень продвинутые ресурсы по немецкому.",
      "home.plan.advancedFeature7": "Опциональные ежемесячные живые Q&A или индивидуальные занятия с преподавателем.",
      "home.plan.advancedGoal": "Цель: интенсивная подготовка к высокому уровню с персональной поддержкой.",
      "auth.loginTitle": "Вход",
      "auth.emailLabel": "Адрес электронной почты",
      "auth.passwordLabel": "Пароль",
      "auth.loginButton": "Войти",
      "auth.loginSwitchPrompt": "Нет аккаунта?",
      "auth.loginSwitchAction": "Создать",
      "auth.signupTitle": "Создание аккаунта",
      "auth.confirmLabel": "Подтвердите пароль",
      "auth.signupButton": "Зарегистрироваться",
      "auth.signupSwitchPrompt": "Уже зарегистрированы?",
      "auth.signupSwitchAction": "Войти",
      "story.backLink": "Назад к библиотеке",
      "story.publishedLabel": "Опубликовано",
      "story.translationHint": "Нажмите на слово или выделите несколько слов, чтобы перевести их на {{LANGUAGE}}.",
      "story.noteTitle": "Совет для чтения",
      "story.noteBody":
        "Читайте текст вслух, отмечайте новую лексику и составьте два собственных предложения с новыми словами.",
      "story.quizTitle": "Проверьте понимание",
      "story.quizIntro": "Ответьте на вопросы, чтобы проверить, насколько хорошо вы поняли историю.",
      "story.quizQuestionLabel": "Вопрос",
      "story.quizAudioLabel": "Аудио",
      "story.quizCheckButton": "Проверить ответ",
      "story.quizFeedbackMissing": "Пожалуйста, выберите ответ перед проверкой.",
      "story.quizFeedbackCorrect": "Правильно! Отличная работа.",
      "story.quizFeedbackIncorrect": "Это неверно. Попробуйте ещё раз.",
      "story.prevLabel": "Предыдущая история",
      "story.nextLabel": "Следующая история",
      "about.heroEyebrow": "Немецкий уголок",
      "about.heroTitle": "Учимся читать по-немецки вместе",
      "about.heroSubtitle":
        "Мы собираем современные короткие истории, адаптированные для изучающих язык. У каждой истории есть понятный уровень и цель — помочь понять новые слова в контексте.",
      "about.missionTitle": "Наша миссия",
      "about.missionBody":
        "Чтение — один из самых эффективных способов освоить язык. Подлинные ситуации, короткие главы и ясные объяснения помогают учиться регулярно, не перегружая себя.",
      "about.audienceTitle": "Для кого мы пишем",
      "about.audienceItemA1": "<strong>A1:</strong> Первые шаги с простым словарным запасом.",
      "about.audienceItemA2": "<strong>A2:</strong> Уверенно справляться с повседневными ситуациями.",
      "about.audienceItemB1": "<strong>B1:</strong> Укрепление базы с диалогами и пояснениями.",
      "about.audienceItemB2": "<strong>B2:</strong> Глубокое понимание и более сложные тексты.",
      "about.howTitle": "Как пользоваться платформой",
      "about.howBody":
        "Выбирайте историю под свой уровень, читайте внимательно и повторяйте новые слова. Наш AI-помощник ответит на вопросы по грамматике или лексике.",
      "about.contactTitle": "Контакт",
      "about.contactBody":
        "Есть отзыв или собственные истории? Напишите нам: <a href=\"mailto:info@deutschleseecke.de\">info@deutschleseecke.de</a>"
      ,
      "learning.heroEyebrow": "Обучение",
      "learning.vocabulary.title": "Мастерская словаря",
      "learning.vocabulary.intro":
        "Откройте новые слова с переводами и примерами, чтобы сразу использовать их в историях.",
      "learning.vocabulary.addCta": "Добавить слово",
      "learning.vocabulary.emptyTitle": "Пока нет записей",
      "learning.vocabulary.emptyCopy":
        "Как только появится новый словарь, он сразу покажется здесь вместе с переводами и примерами.",
      "learning.vocabulary.publishedOnLabel": "Опубликовано",
      "learning.vocabulary.exampleLabel": "Пример предложения:",
      "learning.vocabulary.formTitle": "Новая запись словаря",
      "learning.vocabulary.formIntro":
        "Поделитесь важными словами с сообществом &mdash; с переводом и необязательным примером.",
      "learning.vocabulary.termLabel": "Немецкое слово",
      "learning.vocabulary.translationLabel": "Перевод",
      "learning.vocabulary.exampleLabelFull": "Пример предложения",
      "learning.vocabulary.exampleHelp": "Необязательно: фраза, показывающая слово в контексте.",
      "learning.vocabulary.cancel": "Отмена",
      "learning.vocabulary.save": "Сохранить",
      "learning.grammar.title": "Студия грамматики",
      "learning.grammar.intro":
        "Краткие объяснения помогут избежать повторяющихся ошибок и уверенно применять новые конструкции.",
      "learning.grammar.addCta": "Добавить тему",
      "learning.grammar.emptyTitle": "Тем пока нет",
      "learning.grammar.emptyCopy":
        "Как только появятся новые уроки грамматики, они будут доступны здесь с примерами и советами.",
      "learning.grammar.publishedOnLabel": "Опубликовано",
      "learning.grammar.formTitle": "Новая тема по грамматике",
      "learning.grammar.formIntro":
        "Опишите конструкцию, типичные ошибки и примеры, чтобы ученики быстрее прогрессировали.",
      "learning.grammar.titleLabel": "Тема",
      "learning.grammar.explanationLabel": "Объяснение",
      "learning.grammar.explanationHelp":
        "Совет: можно использовать HTML-теги, например <strong> и <ul>, чтобы выделить примеры.",
      "learning.grammar.cancel": "Отмена",
      "learning.grammar.save": "Сохранить",
      "footer.tagline": "Осваиваем языки вместе.",
      "footer.home": "Главная",
      "footer.stories": "Истории",
      "footer.grammar": "Грамматика",
      "footer.vocabulary": "Словарь",
      "footer.faq": "FAQ",
      "footer.contact": "Контакты",
      "footer.privacy": "Политика конфиденциальности",
      "footer.terms": "Условия использования",
      "footer.cookies": "Политика cookie",
      "footer.support": "Нужна помощь? Напишите на support@learndeutsch.com",
      "footer.signature": "Сделано с ❤️ для всех, кто учит немецкий.",
      "footer.author": "Автор: Карен Баннахян"
    },
    hy: {
      "brand.title": "Գերմանական ընթերցարան",
      "brand.tagline": "Քո կարճ պատմությունների գրադարանը",
      "nav.library": "Գրադարան",
      "nav.learning": "Սովորում",
      "nav.vocabulary": "Բառարան",
      "nav.grammar": "Քերականություն",
      "nav.about": "Մեր մասին",
      "nav.newStory": "Նոր պատմություն",
      "nav.newQuestion": "Նոր հարց",
      "nav.logout": "Ելք",
      "nav.login": "Մուտք",
      "nav.signup": "Գրանցվել",
      "nav.languageLabel": "Կայքի լեզուն",
      "home.heroEyebrow": "Սովորիր գերմերենը հաճույքով",
      "home.heroTitle": "Բացահայտիր ընտրած կարճ պատմություններ բոլոր մակարդակների համար։",
      "home.heroSubtitle":
        "Կարդա իրական իրավիճակներ, ընդլայնիր բառապաշարդ և զգա առաջընթացդ։ Նոր նյութերը հրապարակվում են կանոնավոր &ndash; կատարյալ է ամենօրյա սովորելու համար։",
      "home.heroPrimary": "Սկսել կարդալը",
      "home.heroSecondary": "Մեր մասին",
      "home.heroStatsReaders": "Ակտիվ ընթերցողներ",
      "home.heroStatsStories": "Մատչելի պատմություններ",
      "home.heroStatsLevels": "Մակարդակներ",
      "home.heroCardTag": "Առաջարկ",
      "home.heroCardTitle": "«Առավոտը Մյունխենում»",
      "home.heroCardDescription":
        "Ուղևորուհին անցնում է քաղաքի շտապ առավոտը։ Ներառում է բառապաշար ամենօրյա զրույցների համար &ndash; իդեալական է բարձրաձայն ընթերցելու համար։",
      "home.heroCardBullet1": "&#128257; Ներառում է ըմբռնման հարցեր",
      "home.heroCardBullet2": "&#128483; Արտասանության խորհուրդներ համընթաց կարդալու համար",
      "home.heroCardBullet3": "&#128338; Կարդալու ժամանակը՝ 6 րոպե",
      "home.adminEyebrow": "Խմբագրություն",
      "home.adminTitle": "Կիսվիր քո հաջորդ պատմությամբ",
      "home.adminCopy":
        "Որպես ադմին կարող ես անմիջապես հրապարակել նոր պատմություններ և հարցեր &ndash; մակարդակով, ամփոփմամբ, պատասխաններով ու աուդիոյով։",
      "home.adminCta": "Ստեղծել պատմություն",
      "home.adminQuestionCta": "Ստեղծել հարց",
      "home.libraryTitle": "Գրադարան",
      "home.librarySubtitle": "Դիտիր մեր հավաքածուն ըստ քո ներկայիս լեզվական մակարդակի։",
      "home.filterLabel": "Զտել ըստ բարդության",
      "home.filterAll": "Բոլորը",
      "home.emptyTitle": "Դեռ պատմություններ չկան",
      "home.emptyCopy": "Երբ առաջին պատմությունը հրապարակվի, այն կհայտնվի այստեղ։",
      "home.readTime": "Կարդալու ժամանակը՝ ~5 րոպե",
      "home.readButton": "Կարդալ",
      "home.loginPrompt": "Մուտք գործիր՝ պատմությունները կարդալու և առաջընթացդ հետևելու համար։",
      "home.loginAction": "Բացել մուտքի էջը",
      "home.loginDismiss": "Հետագայում",
      "home.plansEyebrow": "Բաժանորդագրություններ",
      "home.plansTitle": "Ընտրիր ծրագիրը, որը համապատասխանում է քո նպատակներին",
      "home.plansSubtitle":
        "Անվճար մեկնարկից մինչև խորացված ուղեկցություն &ndash; ընտրիր այն ուսման միջավայրը, որը քեզ առաջ է մղում։",
      "home.plan.basicName": "🟢 Basic ծրագիր",
      "home.plan.basicPrice": "$0/ամիս",
      "home.plan.basicAudience": "Սկսնակների համար, ովքեր ուզում են ուսումնասիրել հիմունքները։",
      "home.plan.basicFeature1": "Մուտք 5 անվճար պատմությունների։",
      "home.plan.basicFeature2": "Անմիջական բառի թարգմանություն մեկ սեղմումով։",
      "home.plan.basicFeature3": "1 քարտերի հավաքածու (հիմնական բառապաշար)։",
      "home.plan.basicFeature4": "Հիմնական քերականության դասեր (սահմանափակ թեմաներ)։",
      "home.plan.basicGoal": "Նպատակ. Թող նոր օգտատերերը փորձեն հիմնական ֆունկցիաները բաժանորդագրվելուց առաջ։",
      "home.plan.mediumBadge": "Ամենապահանջվածը",
      "home.plan.mediumName": "🟠 Medium ծրագիր",
      "home.plan.mediumPrice": "$7.99&ndash;$10/ամիս",
      "home.plan.mediumAudience": "Պարբերաբար սովորողների համար, ովքեր ուզում են կառուցված ուսում և առաջընթացի վերահսկում։",
      "home.plan.mediumFeature1": "Մուտք բոլոր պատմություններին, ներառյալ շաբաթական նորությունները։",
      "home.plan.mediumFeature2": "Պահպանիր թարգմանությունները և նշիր սովորած բառերը։",
      "home.plan.mediumFeature3": "Բոլոր քարտերի տուփերը (ըստ թեմայի կամ բարդության)։",
      "home.plan.mediumFeature4": "Վարժություններ և թեստեր ըմբռնման համար։",
      "home.plan.mediumFeature5": "Ամբողջական քերականական բաժին ինտերակտիվ օրինակներով։",
      "home.plan.mediumFeature6": "Բնիկ խոսնակի աուդիո (mp3) յուրաքանչյուր պատմության համար։",
      "home.plan.mediumGoal": "Նպատակ. Մեր հիմնական ծրագիրը &ndash; ամբողջ բովանդակությունը և ներգրավվածության գործիքները։",
      "home.plan.advancedName": "🔵 Advanced ծրագիր",
      "home.plan.advancedPrice": "$14.99&ndash;$19.99/ամիս",
      "home.plan.advancedAudience": "Լուրջ սովորողների համար, ովքեր պատրաստվում են B2&ndash;C1 կամ հաղորդակցական fluency-ին։",
      "home.plan.advancedFeature1": "Medium-ի բոլոր հնարավորությունները, ինչպես նաև՝",
      "home.plan.advancedFeature2": "ԱԻ ուսուցիչ, սխալների վերլուծություն և առաջարկներ (օր.՝ խառնվում է der/die/das)։",
      "home.plan.advancedFeature3": "Մուտք B2&ndash;C2 մակարդակի պատմություններին։",
      "home.plan.advancedFeature4": "Ավելի շատ վարժություններ և թեստեր խորացված ըմբռնման համար։",
      "home.plan.advancedFeature5": "Ներբեռնիր պատմությունները mp3 կամ PDF ձևաչափով՝ օֆլայն ուսման համար։",
      "home.plan.advancedFeature6": "Շատ բարձր մակարդակի գերմաներեն նյութեր։",
      "home.plan.advancedFeature7": "Ընտրովի ամսական ուղիղ Q&A կամ անհատական դասեր ուսուցչի հետ։",
      "home.plan.advancedGoal": "Նպատակ. Խորացված պատրաստություն բարձր մակարդակին՝ անհատական աջակցությամբ։",
      "auth.loginTitle": "Մուտք",
      "auth.emailLabel": "Էլ. փոստ",
      "auth.passwordLabel": "Գաղտնաբառ",
      "auth.loginButton": "Մուտք",
      "auth.loginSwitchPrompt": "Չունե՞ս հաշիվ?",
      "auth.loginSwitchAction": "Ստեղծիր",
      "auth.signupTitle": "Ստեղծիր հաշիվ",
      "auth.confirmLabel": "Հաստատիր գաղտնաբառը",
      "auth.signupButton": "Գրանցվել",
      "auth.signupSwitchPrompt": "Արդեն գրանցվա՞ծ ես?",
      "auth.signupSwitchAction": "Մուտք գործել",
      "story.backLink": "Վերադառնալ գրադարան",
      "story.publishedLabel": "Հրապարակված է",
      "story.translationHint": "Սեղմիր բառի վրա կամ ընտրիր մի քանի բառ՝ դրանք թարգմանելու {{LANGUAGE}}.",
      "story.noteTitle": "Կարդալու խորհուրդ",
      "story.noteBody":
        "Կարդա բարձրաձայն, ընդգծիր նոր բառերը և գրիր երկու նախադասություն այդ բառերով։",
      "story.quizTitle": "Ստուգիր հասկացողությունդ",
      "story.quizIntro": "Պատասխանիր հարցերին՝ տեսնելու, թե որքան լավ հասկացար պատմությունը։",
      "story.quizQuestionLabel": "Հարց",
      "story.quizAudioLabel": "Աուդիո",
      "story.quizCheckButton": "Ստուգել պատասխանը",
      "story.quizFeedbackMissing": "Խնդրում ենք ընտրել պատասխան՝ նախքան ստուգելը։",
      "story.quizFeedbackCorrect": "Ճիշտ է։ Շատ լավ է ստացվել։",
      "story.quizFeedbackIncorrect": "Դա ճիշտ չէ։ Փորձիր կրկին։",
      "story.prevLabel": "Նախորդ պատմությունը",
      "story.nextLabel": "Հաջորդ պատմությունը",
      "about.heroEyebrow": "Գերմանական ընթերցարան",
      "about.heroTitle": "Միասին բարելավենք գերմերենի ընթերցումը",
      "about.heroSubtitle":
        "Մենք հավաքում ենք ժամանակակից կարճ պատմություններ, որոնք ստեղծված են ուսանողների համար։ Յուրաքանչյուր պատմությունն ունի հստակ լեզվական մակարդակ և օգնում է հասկանալ նոր բառերը համատեքստում։",
      "about.missionTitle": "Մեր առաքելությունը",
      "about.missionBody":
        "Ընթերցելը լեզուն յուրացնելու ամենաարդյունավետ ձևերից է։ Իրական իրավիճակներով, կարճ գլուխներով և պարզ բացատրություններով կարող ես շարունակական սովորել առանց ծանրաբեռնվելու։",
      "about.audienceTitle": "Ում համար ենք գրում",
      "about.audienceItemA1": "<strong>A1:</strong> Առաջին քայլերը՝ հասանելի բառապաշարով։",
      "about.audienceItemA2": "<strong>A2:</strong> Ամենօրյա իրավիճակներում վստահ հաղորդակցում։",
      "about.audienceItemB1": "<strong>B1:</strong> Հիմքերի ամրապնդում երկխոսություններով և բացատրություններով։",
      "about.audienceItemB2": "<strong>B2:</strong> Ավելի խոր հասկացողություն՝ բարդ գրություններով։",
      "about.howTitle": "Ինչպես օգտվել հարթակից",
      "about.howBody":
        "Ընտրիր քո մակարդակին համապատասխան պատմություն, կարդա ուշադիր և կրկնիր նոր տերմինները։ Մեր AI օգնականը կօգնի քերականության կամ բառապաշարի հարցերում։",
      "about.contactTitle": "Կոնտակտ",
      "about.contactBody":
        "Կարծի՞ք կամ սեփական պատմություններ ունես։ Գրի՛ր մեզ՝ <a href=\"mailto:info@deutschleseecke.de\">info@deutschleseecke.de</a>"
      ,
      "learning.heroEyebrow": "Սովորում",
      "learning.vocabulary.title": "Բառապաշարի աշխատարան",
      "learning.vocabulary.intro":
        "Բացահայտիր նոր բառեր թարգմանություններով և օրինակներով, որպեսզի անմիջապես կիրառես պատմությունների մեջ։",
      "learning.vocabulary.addCta": "Նոր բառ",
      "learning.vocabulary.emptyTitle": "Գրառումներ դեռ չկան",
      "learning.vocabulary.emptyCopy":
        "Երբ նոր բառապաշար հրապարակվի, այն կերևա այստեղ՝ թարգմանությամբ և օրինակով։",
      "learning.vocabulary.publishedOnLabel": "Հրապարակված է",
      "learning.vocabulary.exampleLabel": "Օրինակ նախադասություն՝",
      "learning.vocabulary.formTitle": "Ստեղծել բառապաշարի գրառում",
      "learning.vocabulary.formIntro":
        "Կիսվիր կարևոր բառերով համայնքի հետ՝ թարգմանությամբ և ընտրովի օրինակով։",
      "learning.vocabulary.termLabel": "Գերմաներեն",
      "learning.vocabulary.translationLabel": "Թարգմանություն",
      "learning.vocabulary.exampleLabelFull": "Օրինակ նախադասություն",
      "learning.vocabulary.exampleHelp": "Ընտրովի՝ նախադասություն, որը ցույց է տալիս բառը համատեքստում։",
      "learning.vocabulary.cancel": "Չեղարկել",
      "learning.vocabulary.save": "Պահպանել",
      "learning.grammar.title": "Քերականության ստուդիա",
      "learning.grammar.intro":
        "Կարճ բացատրությունները կօգնեն խուսափել կրկնվող սխալներից և վստահ կիրառել նոր կառուցվածքներ։",
      "learning.grammar.addCta": "Նոր թեմա",
      "learning.grammar.emptyTitle": "Թեմաներ դեռ չկան",
      "learning.grammar.emptyCopy":
        "Երբ նոր քերականական դասեր ավելացնենք, դրանք կտեսնես այստեղ՝ օրինակներով և խորհուրդներով։",
      "learning.grammar.publishedOnLabel": "Հրապարակված է",
      "learning.grammar.formTitle": "Ստեղծել քերականական թեմա",
      "learning.grammar.formIntro":
        "Նկարագրիր կառուցվածքը, բնորոշ սխալները և օրինակները՝ ուսանողներին ավելի արագ առաջ մղելու համար։",
      "learning.grammar.titleLabel": "Թեմա",
      "learning.grammar.explanationLabel": "Բացատրություն",
      "learning.grammar.explanationHelp":
        "Խորհուրդ․ կարող ես օգտագործել HTML ձևաչափ, ինչպես <strong> և <ul>, օրինակները ընդգծելու համար։",
      "learning.grammar.cancel": "Չեղարկել",
      "learning.grammar.save": "Պահպանել",
      "footer.tagline": "Եկեք միասին յուրացնենք լեզուները։",
      "footer.home": "Սկիզբ",
      "footer.stories": "Պատմություններ",
      "footer.grammar": "Քերականություն",
      "footer.vocabulary": "Բառապաշար",
      "footer.faq": "ՀՏՀ",
      "footer.contact": "Կապ",
      "footer.privacy": "Գաղտնիության քաղաքականություն",
      "footer.terms": "Օգտագործման պայմաններ",
      "footer.cookies": "Cookie-ների քաղաքականություն",
      "footer.support": "Օգնություն պետք է՞։ Գրիր support@learndeutsch.com",
      "footer.signature": "Ստեղծված ❤️-ով՝ գերմաներեն սովորողների համար։",
      "footer.author": "Հեղինակ՝ Կարեն Բանահյան"
    }
  }

  const storage = {
    get(key) {
      try {
        return window.localStorage.getItem(key)
      } catch (error) {
        console.warn("Unable to access localStorage get", error)
        return null
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value)
      } catch (error) {
        console.warn("Unable to access localStorage set", error)
      }
    }
  }

  let languageSelect = null
  let currentLanguage = null

  document.addEventListener("DOMContentLoaded", () => {
    languageSelect = document.querySelector("[data-language-select]")
    const initialLanguage = determineInitialLanguage()
    applyLanguage(initialLanguage, { persist: false })

    if (languageSelect) {
      languageSelect.addEventListener("change", (event) => {
        applyLanguage(event.target.value, { persist: true })
      })
    }
  })

  function determineInitialLanguage() {
    const stored = storage.get(STORAGE_KEY)
    if (isSupportedLanguage(stored)) {
      return stored
    }

    const bodyLanguage = document.body?.dataset?.siteLanguage
    if (isSupportedLanguage(bodyLanguage)) {
      return bodyLanguage
    }

    const htmlLanguage = document.documentElement.getAttribute("lang")
    if (isSupportedLanguage(htmlLanguage)) {
      return htmlLanguage
    }

    return DEFAULT_LANGUAGE
  }

  function applyLanguage(language, { persist = false } = {}) {
    const normalized = normalizeLanguage(language)
    if (currentLanguage === normalized) {
      if (persist) {
        storage.set(STORAGE_KEY, normalized)
      }
      return
    }

    if (languageSelect) {
      languageSelect.value = normalized
    }

    if (persist) {
      storage.set(STORAGE_KEY, normalized)
    }

    document.documentElement.setAttribute("lang", normalized)
    if (document.body) {
      document.body.dataset.siteLanguage = normalized
    }

    applyTranslations(normalized)
    currentLanguage = normalized

    window.dispatchEvent(
      new CustomEvent("site-language-change", {
        detail: { language: normalized }
      })
    )
  }

  function applyTranslations(language) {
    document.querySelectorAll("[data-i18n-key]").forEach((element) => {
      const key = element.dataset.i18nKey
      if (!key) {
        return
      }

      if (!Object.prototype.hasOwnProperty.call(element.dataset, "i18nDefault")) {
        element.dataset.i18nDefault = element.innerHTML
      }

      const defaultValue = element.dataset.i18nDefault
      const translation = resolveTranslation(language, key, defaultValue)
      if (translation !== undefined && translation !== null) {
        element.innerHTML = translation
      }

      applyAttributeTranslations(element, language)
    })
  }

  function applyAttributeTranslations(element, language) {
    const map = element.dataset.i18nAttr
    if (!map) {
      return
    }

    if (!element.__i18nAttrDefaults) {
      element.__i18nAttrDefaults = {}
    }

    map.split(",").forEach((entry) => {
      const [rawAttr, rawKey] = entry.split(":")
      const attr = rawAttr?.trim()
      const key = rawKey?.trim()

      if (!attr || !key) {
        return
      }

      if (!Object.prototype.hasOwnProperty.call(element.__i18nAttrDefaults, attr)) {
        element.__i18nAttrDefaults[attr] = element.getAttribute(attr) || ""
      }

      const defaultValue = element.__i18nAttrDefaults[attr]
      const translation = resolveTranslation(language, key, defaultValue)
      if (translation !== undefined && translation !== null) {
        element.setAttribute(attr, translation)
      }
    })
  }

  function resolveTranslation(language, key, fallback) {
    const dictionary = translations[language]
    if (dictionary && Object.prototype.hasOwnProperty.call(dictionary, key)) {
      return dictionary[key]
    }

    if (language !== DEFAULT_LANGUAGE) {
      const defaultDictionary = translations[DEFAULT_LANGUAGE]
      if (defaultDictionary && Object.prototype.hasOwnProperty.call(defaultDictionary, key)) {
        return defaultDictionary[key]
      }
    }

    return fallback
  }

  function normalizeLanguage(language) {
    const value = (language || "").toLowerCase()
    return isSupportedLanguage(value) ? value : DEFAULT_LANGUAGE
  }

  function isSupportedLanguage(language) {
    return typeof language === "string" && SUPPORTED_LANGUAGES.includes(language.toLowerCase())
  }
})()
