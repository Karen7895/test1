(function () {
  const LANGUAGE_LABELS = {
    de: "Deutsch",
    en: "English",
    ru: "Русский",
    hy: "Հայերեն"
  }
  const TRANSLATION_LABELS = {
    de: LANGUAGE_LABELS.de,
    en: LANGUAGE_LABELS.en,
    ru: LANGUAGE_LABELS.ru,
    hy: LANGUAGE_LABELS.hy
  }
  const WORD_PATTERN = /([\p{L}\p{M}]+(?:['’\-][\p{L}\p{M}]+)*)/gu

  const escapeHtml = (value = "") =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")

  const getSiteLanguage = () =>
    (document.body?.dataset?.siteLanguage || document.documentElement.getAttribute("lang") || "de").toLowerCase()

  const getTranslationLanguage = () => {
    const siteLanguage = getSiteLanguage()
    return siteLanguage === "de" ? "en" : siteLanguage
  }

  let storyDetail = null
  let storyBody = null
  let translationHint = null
  let popup = null
  let activeController = null
  let activeAnchor = null
  let lastSelectionText = ""

  document.addEventListener("DOMContentLoaded", () => {
    storyDetail = document.querySelector(".story-detail")
    storyBody = storyDetail?.querySelector(".story-body")
    translationHint = document.getElementById("translation-hint")

    initQuizForms()

    if (!storyDetail || !storyBody) {
      return
    }

    if (translationHint && !translationHint.dataset.template) {
      translationHint.dataset.template = translationHint.innerHTML
    }

    popup = createPopup()

    wrapWords()
    updateHint()

    storyBody.addEventListener("click", handleWordClick)
    storyBody.addEventListener("keydown", handleWordKeydown)

    document.addEventListener("mouseup", handleSelectionMouseUp)
    document.addEventListener("selectionchange", handleSelectionChange)
    document.addEventListener("click", handleDocumentClick)
    window.addEventListener("scroll", handleViewportChange)
    window.addEventListener("resize", handleViewportChange)
    window.addEventListener("site-language-change", updateHint)
  })

  function handleWordClick(event) {
    const trigger = event.target.closest(".story-word")
    if (!trigger) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    requestTranslation({
      text: trigger.dataset.word || trigger.textContent || "",
      anchor: { type: "word", element: trigger }
    })
  }

  function handleWordKeydown(event) {
    if (event.key !== "Enter" && event.key !== " ") {
      return
    }

    const trigger = event.target.closest(".story-word")
    if (!trigger) {
      return
    }

    event.preventDefault()
    requestTranslation({
      text: trigger.dataset.word || trigger.textContent || "",
      anchor: { type: "word", element: trigger }
    })
  }

  function handleSelectionMouseUp() {
    setTimeout(() => {
      const selectionData = getSelectionData()
      if (!selectionData || selectionData.wordCount < 2) {
        return
      }

      if (selectionData.text === lastSelectionText) {
        return
      }

      lastSelectionText = selectionData.text

      requestTranslation({
        text: selectionData.text,
        anchor: { type: "selection" }
      })
    }, 0)
  }

  function handleSelectionChange() {
    const selectionData = getSelectionData()
    if (!selectionData) {
      lastSelectionText = ""
      if (activeAnchor?.type === "selection") {
        hidePopup()
      }
    }
  }

  function handleDocumentClick(event) {
    if (!popup) {
      return
    }

    if (!popup.contains(event.target) && !event.target.closest(".story-word")) {
      hidePopup()
    }
  }

  function handleViewportChange() {
    if (!popup || !popup.classList.contains("is-visible") || !activeAnchor) {
      return
    }

    if (activeAnchor.type === "selection" && !getSelectionRect()) {
      hidePopup()
      return
    }

    positionPopup(activeAnchor)
  }

  function requestTranslation({ text, anchor }) {
    const phrase = (text || "").trim()
    if (!phrase) {
      return
    }

    if (activeController) {
      activeController.abort()
    }

    activeController = new AbortController()
    activeAnchor = anchor

    showPopup({
      original: phrase,
      anchor,
      content: '<div class="translation-popup__loading">Translating\u2026</div>'
    })

    translate(phrase, activeController.signal)
      .then(({ translation, toLanguage }) => {
        if (anchor !== activeAnchor) {
          return
        }

        showPopup({
          original: phrase,
          translation,
          toLanguage,
          anchor
        })
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          return
        }

        console.warn("Translation request failed", error)
        if (anchor === activeAnchor) {
          showPopup({
            original: phrase,
            error: "Translation unavailable. Please try again.",
            anchor
          })
        }
      })
      .finally(() => {
        activeController = null
      })
  }

  function wrapWords() {
    const paragraphs = storyBody.querySelectorAll("p")
    paragraphs.forEach((paragraph) => {
      const text = paragraph.textContent || ""
      const replaced = text.replace(WORD_PATTERN, (match) => {
        const safeWord = escapeHtml(match)
        return `<span class="story-word" role="button" tabindex="0" data-word="${safeWord}">${safeWord}</span>`
      })
      paragraph.innerHTML = replaced
    })
  }

  function updateHint() {
    if (!translationHint) {
      return
    }

    const siteLanguage = getSiteLanguage()

    if (translationHint.dataset.templateLanguage !== siteLanguage || !translationHint.dataset.template) {
      translationHint.dataset.template = translationHint.innerHTML
      translationHint.dataset.templateLanguage = siteLanguage
    }

    const template = translationHint.dataset.template || translationHint.innerHTML
    const targetLanguage = getTranslationLanguage()
    const label = TRANSLATION_LABELS[targetLanguage] || targetLanguage.toUpperCase()
    const languageTag = `<span class="translation-hint-language">${escapeHtml(label)}</span>`

    if (template.includes("{{LANGUAGE}}")) {
      translationHint.innerHTML = template.replace(/{{LANGUAGE}}/g, languageTag)
    } else {
      translationHint.innerHTML = `${template} ${languageTag}`
    }
  }

  function createPopup() {
    const element = document.createElement("div")
    element.id = "translation-popup"
    element.className = "translation-popup"
    element.setAttribute("role", "status")
    element.setAttribute("aria-live", "polite")
    document.body.appendChild(element)
    return element
  }

  function hidePopup() {
    if (popup?.classList.contains("is-visible")) {
      popup.classList.remove("is-visible")
    }

    if (activeController) {
      activeController.abort()
      activeController = null
    }

    activeAnchor = null
  }

  function showPopup({ original, translation, toLanguage, error, content, anchor }) {
    if (!popup) {
      return
    }

    let innerHtml = `<div class="translation-popup__original">${escapeHtml(original)}</div>`

    if (translation && toLanguage) {
      const label = TRANSLATION_LABELS[toLanguage] || toLanguage.toUpperCase()
      innerHtml += `<div class="translation-popup__translated">${escapeHtml(translation)}</div>`
      innerHtml += `<div class="translation-popup__meta">Translated into ${escapeHtml(label)}</div>`
    } else if (error) {
      innerHtml += `<div class="translation-popup__error">${escapeHtml(error)}</div>`
    } else if (content) {
      innerHtml += content
    }

    popup.innerHTML = innerHtml
    popup.classList.add("is-visible")
    positionPopup(anchor)
  }

  function positionPopup(anchor) {
    if (!popup || !anchor) {
      return
    }

    let rect = null
    if (anchor.type === "word" && anchor.element) {
      rect = anchor.element.getBoundingClientRect()
    } else if (anchor.type === "selection") {
      rect = getSelectionRect()
      if (!rect) {
        return
      }
    }

    const scrollY = window.scrollY || window.pageYOffset || 0
    const scrollX = window.scrollX || window.pageXOffset || 0
    const top = scrollY + rect.bottom + 12
    const left = scrollX + rect.left + rect.width / 2

    popup.style.top = `${top}px`
    popup.style.left = `${left}px`

    const popupRect = popup.getBoundingClientRect()
    const viewportWidth = document.documentElement.clientWidth
    const minLeft = 16 + popupRect.width / 2
    const maxLeft = viewportWidth - 16 - popupRect.width / 2
    const clamped = Math.min(Math.max(left - scrollX, minLeft), maxLeft)
    popup.style.left = `${scrollX + clamped}px`
  }

  function getSelectionData() {
    const selection = window.getSelection()
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
      return null
    }

    const range = selection.getRangeAt(0)
    if (!storyBody.contains(range.commonAncestorContainer)) {
      return null
    }

    const text = selection.toString().trim()
    if (!text) {
      return null
    }

    const words = text.split(/\s+/).filter(Boolean)
    return {
      text,
      wordCount: words.length
    }
  }

  function getSelectionRect() {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) {
      return null
    }

    const range = selection.getRangeAt(0)
    if (!storyBody.contains(range.commonAncestorContainer)) {
      return null
    }

    return range.getBoundingClientRect()
  }

  function initQuizForms() {
    const forms = document.querySelectorAll(".story-question-form")
    if (!forms.length) {
      return
    }

    forms.forEach((form) => {
      const statusEl = form.querySelector(".story-question__status")
      const questionContainer = form.closest(".story-question")

      const resetStatus = () => {
        if (statusEl) {
          statusEl.textContent = ""
          statusEl.classList.remove("is-visible", "is-correct", "is-incorrect", "is-missing")
        }
        if (questionContainer) {
          questionContainer.classList.remove("is-correct", "is-incorrect")
        }
      }

      const applyStatusMessage = () => {
        if (!statusEl || !statusEl.classList.contains("is-visible")) {
          return
        }

        let key = "messageMissing"
        if (statusEl.classList.contains("is-correct")) {
          key = "messageCorrect"
        } else if (statusEl.classList.contains("is-incorrect")) {
          key = "messageIncorrect"
        }

        statusEl.textContent = statusEl.dataset[key] || ""
      }

      form.addEventListener("change", (event) => {
        if (event.target && event.target.matches('input[type="radio"]')) {
          resetStatus()
        }
      })

      form.addEventListener("submit", (event) => {
        event.preventDefault()

        if (!statusEl) {
          return
        }

        resetStatus()

        const selected = form.querySelector('input[type="radio"]:checked')
        const correctIndex = Number.parseInt(form.dataset.correctIndex, 10)

        let statusClass = "is-missing"

        if (selected) {
          const chosenIndex = Number.parseInt(selected.value, 10)
          const isCorrect = !Number.isNaN(chosenIndex) && chosenIndex === correctIndex

          statusClass = isCorrect ? "is-correct" : "is-incorrect"

          if (questionContainer) {
            questionContainer.classList.add(isCorrect ? "is-correct" : "is-incorrect")
          }
        }

        statusEl.classList.add(statusClass, "is-visible")
        applyStatusMessage()
      })

      window.addEventListener("site-language-change", applyStatusMessage)
    })
  }

  async function translate(originalText, signal) {
    const fromLanguage = (storyDetail.dataset.storyLanguage || "auto").toLowerCase()
    const toLanguage = getTranslationLanguage()
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLanguage}&tl=${toLanguage}&dt=t&q=${encodeURIComponent(
      originalText
    )}`

    const response = await fetch(url, { signal })
    if (!response.ok) {
      throw new Error(`Translation request failed with status ${response.status}`)
    }

    const data = await response.json()
    const translation = Array.isArray(data) ? data[0]?.[0]?.[0] : null

    if (!translation) {
      throw new Error("Translation not available")
    }

    return { translation, toLanguage }
  }
})()
