require("dotenv").config()

const express = require("express")
const fs = require("fs")
const path = require("path")
const session = require("express-session")
const bcrypt = require("bcryptjs")
const multer = require("multer")

const db = require("./lib/db")

const app = express()
const PORT = process.env.PORT || 3000
const SESSION_SECRET = process.env.SESSION_SECRET || "change-me-session-secret"
const ADMIN_EMAIL = "karen12389033@gmail.com"
const STORY_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"]
const AUDIO_UPLOAD_DIR = path.join(__dirname, "public", "uploads", "questions")

fs.mkdirSync(AUDIO_UPLOAD_DIR, { recursive: true })

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, AUDIO_UPLOAD_DIR)
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now()
      const ext = path.extname(file.originalname).toLowerCase()
      cb(null, `${timestamp}-${Math.round(Math.random() * 1e9)}${ext}`)
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    if (ext !== ".mp3") {
      return cb(new Error("Only MP3 audio files are allowed."))
    }
    cb(null, true)
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
})

// Application middleware
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
)

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null
  res.locals.isAdmin = isAdmin(req.session.user)
  next()
})

// Helpers
function asyncHandler(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next)
  }
}

async function findUserByEmail(email) {
  const rows = await db.query(
    "SELECT id, email, password_hash FROM users WHERE email = ? LIMIT 1",
    [email]
  )
  return rows[0] || null
}

function normalizeEmail(email = "") {
  return email.trim().toLowerCase()
}

function setLoggedInUser(req, user) {
  req.session.user = {
    id: user.id,
    email: normalizeEmail(user.email),
  }
}

function isAdmin(user) {
  return Boolean(user && user.email === ADMIN_EMAIL)
}

function requireAuth(req, res, next) {
  if (!req.session.user) {
    req.session.returnTo = req.originalUrl
    return res.redirect("/login")
  }
  next()
}

function requireAdmin(req, res, next) {
  if (!req.session.user) {
    req.session.returnTo = req.originalUrl
    return res.redirect("/login")
  }
  if (!isAdmin(req.session.user)) {
    return res.status(403).render("errors/403")
  }
  next()
}

async function getAllStories() {
  return db.query(
    "SELECT id, title, level, summary, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_at FROM stories ORDER BY created_at DESC, id DESC"
  )
}

async function getStorySummaries() {
  return db.query(
    "SELECT id, title FROM stories ORDER BY created_at DESC, id DESC"
  )
}

async function getStoryById(id) {
  const rows = await db.query(
    "SELECT id, title, level, summary, body, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_at FROM stories WHERE id = ? LIMIT 1",
    [id]
  )
  return rows[0] || null
}

async function getAdjacentStories(id) {
  const prevRows = await db.query(
    "SELECT id, title FROM stories WHERE id < ? ORDER BY id DESC LIMIT 1",
    [id]
  )
  const nextRows = await db.query(
    "SELECT id, title FROM stories WHERE id > ? ORDER BY id ASC LIMIT 1",
    [id]
  )

  return {
    prevStory: prevRows[0] || null,
    nextStory: nextRows[0] || null,
  }
}

async function createStory({ title, level, summary, body, authorId }, connection = db.pool) {
  const executor = connection.execute ? connection : db.pool
  const [result] = await executor.execute(
    "INSERT INTO stories (title, level, summary, body, author_id) VALUES (?, ?, ?, ?, ?)",
    [title, level, summary, body, authorId]
  )
  return result.insertId
}

async function createQuestion(
  { storyId, prompt, answers, correctIndex, audioPath, authorId },
  connection = db.pool
) {
  const executor = connection.execute ? connection : db.pool
  const [result] = await executor.execute(
    "INSERT INTO questions (story_id, prompt, answer_a, answer_b, answer_c, answer_d, correct_index, audio_path, author_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      storyId,
      prompt,
      answers[0],
      answers[1],
      answers[2],
      answers[3],
      correctIndex,
      audioPath,
      authorId,
    ]
  )
  return result.insertId
}

async function getQuestionsForStory(storyId) {
  const rows = await db.query(
    "SELECT id, prompt, answer_a, answer_b, answer_c, answer_d, correct_index, audio_path FROM questions WHERE story_id = ? ORDER BY id ASC",
    [storyId]
  )

  return rows.map((row) => ({
    id: row.id,
    prompt: row.prompt,
    answers: [row.answer_a, row.answer_b, row.answer_c, row.answer_d],
    correctIndex: row.correct_index,
    audioPath: row.audio_path,
  }))
}

async function getVocabularyEntries() {
  return db.query(
    "SELECT id, term, translation, example_sentence, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_at FROM vocabulary_entries ORDER BY created_at DESC, id DESC"
  )
}

async function createVocabularyEntry({ term, translation, exampleSentence, authorId }) {
  const [result] = await db.pool.execute(
    "INSERT INTO vocabulary_entries (term, translation, example_sentence, author_id) VALUES (?, ?, ?, ?)",
    [term, translation, exampleSentence || null, authorId]
  )
  return result.insertId
}

async function getGrammarTopics() {
  return db.query(
    "SELECT id, title, explanation, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_at FROM grammar_topics ORDER BY created_at DESC, id DESC"
  )
}

async function createGrammarTopic({ title, explanation, authorId }) {
  const [result] = await db.pool.execute(
    "INSERT INTO grammar_topics (title, explanation, author_id) VALUES (?, ?, ?)",
    [title, explanation, authorId]
  )
  return result.insertId
}

// Routes
app.get(
  "/",
  asyncHandler(async (req, res) => {
    const stories = await getAllStories()
    res.render("home", { stories })
  })
)

app.get(
  "/story/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const storyId = Number.parseInt(req.params.id, 10)
    if (Number.isNaN(storyId)) {
      return res.status(404).render("errors/404")
    }

    const story = await getStoryById(storyId)
    if (!story) {
      return res.status(404).render("errors/404")
    }

    const { prevStory, nextStory } = await getAdjacentStories(storyId)
    const questions = await getQuestionsForStory(storyId)
    res.render("story", { story, prevStory, nextStory, questions })
  })
)

app.get("/stories/new", requireAdmin, (req, res) => {
  res.render("stories/new", {
    error: null,
    values: {
      title: "",
      level: "A1",
      summary: "",
      body: "",
      questions: [],
    },
  })
})

const storyQuestionsUpload = upload.any()

function parseStoryQuestions(body, files) {
  const questionMap = new Map()

  const ensureQuestion = (index) => {
    if (!questionMap.has(index)) {
      questionMap.set(index, {
        prompt: "",
        answers: ["", "", "", ""],
        correctIndex: 0,
        file: null,
      })
    }
    return questionMap.get(index)
  }

  for (const [field, value] of Object.entries(body)) {
    const promptMatch = field.match(/^questions\[(\d+)\]\[prompt\]$/)
    if (promptMatch) {
      const question = ensureQuestion(Number.parseInt(promptMatch[1], 10))
      question.prompt = (value || "").trim()
      continue
    }

    const correctMatch = field.match(/^questions\[(\d+)\]\[correctIndex\]$/)
    if (correctMatch) {
      const question = ensureQuestion(Number.parseInt(correctMatch[1], 10))
      question.correctIndex = Number.parseInt(value, 10)
      continue
    }

    const answerMatch = field.match(/^questions\[(\d+)\]\[answers\]\[(\d+)\]$/)
    if (answerMatch) {
      const question = ensureQuestion(Number.parseInt(answerMatch[1], 10))
      const answerIndex = Number.parseInt(answerMatch[2], 10)
      if (answerIndex >= 0 && answerIndex < 4) {
        question.answers[answerIndex] = (value || "").trim()
      }
    }
  }

  for (const file of files || []) {
    const audioMatch = file.fieldname.match(/^questions\[(\d+)\]\[audio\]$/)
    if (!audioMatch) {
      continue
    }
    const question = ensureQuestion(Number.parseInt(audioMatch[1], 10))
    question.file = file
  }

  const sorted = Array.from(questionMap.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([, question]) => question)

  return sorted.filter((question) => {
    const hasPrompt = Boolean(question.prompt)
    const hasAnyAnswer = question.answers.some((answer) => Boolean(answer))
    return hasPrompt || hasAnyAnswer
  })
}

function cleanupFiles(files = []) {
  for (const file of files) {
    fs.unlink(file.path, () => {})
  }
}

app.post(
  "/stories",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const values = {
      title: "",
      level: "A1",
      summary: "",
      body: "",
      questions: [],
    }

    const renderForm = ({ status, errorMessage }) => {
      return res.status(status).render("stories/new", {
        error: errorMessage,
        values,
      })
    }

    const runUpload = () =>
      new Promise((resolve, reject) => {
        storyQuestionsUpload(req, res, (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })

    try {
      await runUpload()
    } catch (uploadError) {
      cleanupFiles(req.files)
      return renderForm({ status: 400, errorMessage: uploadError.message })
    }

    values.title = (req.body.title || "").trim()
    values.level = (req.body.level || "").trim().toUpperCase()
    values.summary = (req.body.summary || "").trim()
    values.body = (req.body.body || "").trim()
    values.questions = parseStoryQuestions(req.body, req.files)

    if (!values.title || !values.summary || !values.body) {
      cleanupFiles(req.files)
      return renderForm({ status: 400, errorMessage: "Please fill in all required fields." })
    }

    if (!STORY_LEVELS.includes(values.level)) {
      cleanupFiles(req.files)
      return renderForm({ status: 400, errorMessage: "Please choose a valid level (A1–C2)." })
    }

    for (const question of values.questions) {
      if (!question.prompt || question.answers.some((answer) => !answer)) {
        cleanupFiles(req.files)
        return renderForm({
          status: 400,
          errorMessage: "Each question must include a prompt and four answers.",
        })
      }

      if (
        Number.isNaN(question.correctIndex) ||
        question.correctIndex < 0 ||
        question.correctIndex > 3
      ) {
        cleanupFiles(req.files)
        return renderForm({
          status: 400,
          errorMessage: "Select which answer is correct for each question.",
        })
      }
    }

    const connection = await db.pool.getConnection()

    try {
      await connection.beginTransaction()

      const storyId = await createStory(
        {
          title: values.title,
          level: values.level,
          summary: values.summary,
          body: values.body,
          authorId: req.session.user.id,
        },
        connection
      )

      for (const question of values.questions) {
        const audioPath = question.file
          ? path.posix.join("uploads/questions", question.file.filename)
          : null

        await createQuestion(
          {
            storyId,
            prompt: question.prompt,
            answers: question.answers,
            correctIndex: question.correctIndex,
            audioPath,
            authorId: req.session.user.id,
          },
          connection
        )
      }

      await connection.commit()

      res.redirect(`/story/${storyId}`)
    } catch (error) {
      await connection.rollback()
      cleanupFiles(req.files)
      console.error(error)
      return renderForm({
        status: 500,
        errorMessage: "An unexpected error occurred while saving the story.",
      })
    } finally {
      connection.release()
    }
  })
)

const singleAudioUpload = upload.single("audio")

app.get(
  "/questions/new",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const stories = await getStorySummaries()
    const createdId = Number.parseInt(req.query.created, 10)
    res.render("questions/new", {
      error: null,
      success: Number.isNaN(createdId)
        ? null
        : `Question #${createdId} saved successfully.`,
      stories,
      values: {
        storyId: stories[0]?.id || "",
        prompt: "",
        answers: ["", "", "", ""],
        correctIndex: 0,
      },
    })
  })
)

app.post(
  "/questions",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const runUpload = () =>
      new Promise((resolve, reject) => {
        singleAudioUpload(req, res, (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })

    const cleanupUploadedFile = () => {
      if (req.file) {
        fs.unlink(req.file.path, () => {})
      }
    }

    const renderForm = async ({ status = 200, error = null, success = null, values }) => {
      const stories = await getStorySummaries()
      const answers = Array.isArray(values.answers) ? values.answers.slice(0, 4) : []
      while (answers.length < 4) {
        answers.push("")
      }
      const normalizedValues = {
        storyId: values.storyId || "",
        prompt: values.prompt,
        answers,
        correctIndex: values.correctIndex,
      }

      return res.status(status).render("questions/new", {
        error,
        success,
        stories,
        values: normalizedValues,
      })
    }

    const values = {
      storyId: Number.parseInt(req.body.storyId, 10),
      prompt: (req.body.prompt || "").trim(),
      answers: Array.isArray(req.body.answers)
        ? req.body.answers.map((answer) => (answer || "").trim())
        : [req.body.answers || ""],
      correctIndex: Number.parseInt(req.body.correctIndex, 10),
    }

    if (values.answers.length < 4) {
      values.answers = [...values.answers, "", "", "", ""].slice(0, 4)
    }

    try {
      await runUpload()
    } catch (uploadError) {
      cleanupUploadedFile()
      await renderForm({
        status: 400,
        error: uploadError.message,
        success: null,
        values,
      })
      return
    }

    if (!Number.isInteger(values.storyId) || values.storyId <= 0) {
      cleanupUploadedFile()
      await renderForm({
        status: 400,
        error: "Please choose which story this question belongs to.",
        success: null,
        values,
      })
      return
    }

    if (!values.prompt) {
      cleanupUploadedFile()
      await renderForm({
        status: 400,
        error: "Please provide the question prompt.",
        success: null,
        values,
      })
      return
    }

    if (values.answers.some((answer) => !answer)) {
      cleanupUploadedFile()
      await renderForm({
        status: 400,
        error: "All four answer options are required.",
        success: null,
        values,
      })
      return
    }

    if (Number.isNaN(values.correctIndex) || values.correctIndex < 0 || values.correctIndex > 3) {
      cleanupUploadedFile()
      await renderForm({
        status: 400,
        error: "Select which answer is correct.",
        success: null,
        values,
      })
      return
    }

    const story = await getStoryById(values.storyId)
    if (!story) {
      cleanupUploadedFile()
      await renderForm({
        status: 400,
        error: "The selected story could not be found.",
        success: null,
        values,
      })
      return
    }

    const audioPath = req.file ? path.posix.join("uploads/questions", req.file.filename) : null

    const questionId = await createQuestion({
      storyId: values.storyId,
      prompt: values.prompt,
      answers: values.answers,
      correctIndex: values.correctIndex,
      audioPath,
      authorId: req.session.user.id,
    })

    res.redirect(`/questions/new?created=${questionId}`)
  })
)

app.get(
  "/learning/vocabulary",
  asyncHandler(async (req, res) => {
    const entries = await getVocabularyEntries()
    res.render("learning/vocabulary", { entries })
  })
)

app.get(
  "/learning/grammar",
  asyncHandler(async (req, res) => {
    const topics = await getGrammarTopics()
    res.render("learning/grammar", { topics })
  })
)

app.get("/learning/vocabulary/new", requireAdmin, (req, res) => {
  res.render("learning/vocabulary-new", {
    error: null,
    success: null,
    values: {
      term: "",
      translation: "",
      exampleSentence: "",
    },
  })
})

app.post(
  "/learning/vocabulary",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const values = {
      term: (req.body.term || "").trim(),
      translation: (req.body.translation || "").trim(),
      exampleSentence: (req.body.exampleSentence || "").trim(),
    }

    if (!values.term || !values.translation) {
      return res.status(400).render("learning/vocabulary-new", {
        error: "Please provide both the German term and its translation.",
        success: null,
        values,
      })
    }

    await createVocabularyEntry({
      term: values.term,
      translation: values.translation,
      exampleSentence: values.exampleSentence,
      authorId: req.session.user.id,
    })

    res.render("learning/vocabulary-new", {
      error: null,
      success: "Vocabulary entry saved successfully.",
      values: {
        term: "",
        translation: "",
        exampleSentence: "",
      },
    })
  })
)

app.get("/learning/grammar/new", requireAdmin, (req, res) => {
  res.render("learning/grammar-new", {
    error: null,
    success: null,
    values: {
      title: "",
      explanation: "",
    },
  })
})

app.post(
  "/learning/grammar",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const values = {
      title: (req.body.title || "").trim(),
      explanation: (req.body.explanation || "").trim(),
    }

    if (!values.title || !values.explanation) {
      return res.status(400).render("learning/grammar-new", {
        error: "Please provide a title and explanation for the grammar topic.",
        success: null,
        values,
      })
    }

    await createGrammarTopic({
      title: values.title,
      explanation: values.explanation,
      authorId: req.session.user.id,
    })

    res.render("learning/grammar-new", {
      error: null,
      success: "Grammar topic saved successfully.",
      values: {
        title: "",
        explanation: "",
      },
    })
  })
)

app.get("/about", (req, res) => {
  res.render("about")
})

app.get("/signup", (req, res) => {
  if (req.session.user) {
    return res.redirect("/")
  }
  res.render("signup", { error: null, values: { email: "" } })
})

app.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const { email = "", password = "", confirmPassword = "" } = req.body
    const normalizedEmail = normalizeEmail(email)
    const values = { email }

    if (!normalizedEmail || !password || !confirmPassword) {
      return res.status(400).render("signup", {
        error: "Please fill in all fields.",
        values,
      })
    }

    if (password !== confirmPassword) {
      return res.status(400).render("signup", {
        error: "Passwords do not match.",
        values,
      })
    }

    if (password.length < 8) {
      return res.status(400).render("signup", {
        error: "Password must be at least 8 characters.",
        values,
      })
    }

    const existingUser = await findUserByEmail(normalizedEmail)
    if (existingUser) {
      return res.status(400).render("signup", {
        error: "An account already exists for that email.",
        values,
      })
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const [result] = await db.pool.execute(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [normalizedEmail, passwordHash]
    )

    setLoggedInUser(req, { id: result.insertId, email: normalizedEmail })
    const redirectTo = req.session.returnTo || "/"
    delete req.session.returnTo
    res.redirect(redirectTo)
  })
)

app.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect("/")
  }
  res.render("login", { error: null, values: { email: "" } })
})

app.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email = "", password = "" } = req.body
    const normalizedEmail = normalizeEmail(email)
    const values = { email }

    if (!normalizedEmail || !password) {
      return res.status(400).render("login", {
        error: "Please enter your email and password.",
        values,
      })
    }

    const user = await findUserByEmail(normalizedEmail)
    if (!user) {
      return res.status(400).render("login", {
        error: "Email or password is incorrect.",
        values,
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash)

    if (!passwordMatch) {
      return res.status(400).render("login", {
        error: "Email or password is incorrect.",
        values,
      })
    }

    setLoggedInUser(req, user)
    const redirectTo = req.session.returnTo || "/"
    delete req.session.returnTo
    res.redirect(redirectTo)
  })
)

app.post("/logout", (req, res) => {
  if (!req.session) {
    return res.redirect("/")
  }

  req.session.destroy(() => {
    res.redirect("/")
  })
})

app.use((err, req, res, next) => {
  console.error(err)
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).render("errors/500")
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
