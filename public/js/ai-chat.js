document.addEventListener("DOMContentLoaded", () => {
  const chatButton = document.getElementById("ai-chat-button")
  const chatDrawer = document.getElementById("ai-chat-drawer")
  const chatInput = document.getElementById("chat-input")
  const sendButton = document.getElementById("send-button")
  const chatMessages = document.getElementById("chat-messages")
  const settingsButton = document.getElementById("settings-button")
  const settingsModal = document.getElementById("settings-modal")
  const closeSettings = document.getElementById("close-settings")
  const saveSettings = document.getElementById("save-settings")
  const apiKeyInput = document.getElementById("api-key-input")
  const aiHelpFooter = document.getElementById("ai-help-footer")

  if (!chatButton || !chatDrawer) {
    return
  }

  function openDrawer() {
    chatDrawer.classList.add("is-open")
    chatButton.style.display = "none"
    chatInput?.focus()
  }

  function closeDrawer() {
    chatDrawer.classList.remove("is-open")
    chatButton.style.display = "flex"
  }

  chatButton.addEventListener("click", () => {
    if (chatDrawer.classList.contains("is-open")) {
      closeDrawer()
    } else {
      openDrawer()
    }
  })

  aiHelpFooter?.addEventListener("click", (event) => {
    event.preventDefault()
    openDrawer()
  })

  document.addEventListener("click", (event) => {
    if (!chatDrawer.contains(event.target) && !chatButton.contains(event.target) && event.target !== aiHelpFooter) {
      if (chatDrawer.classList.contains("is-open")) {
        closeDrawer()
      }
    }
  })

  function addMessage(text, type) {
    if (!chatMessages) return

    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${type}-message`

    const contentDiv = document.createElement("div")
    contentDiv.className = "message-content"
    contentDiv.textContent = text

    messageDiv.appendChild(contentDiv)
    chatMessages.appendChild(messageDiv)
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  function generateMockResponse() {
    const responses = [
      "Das ist eine interessante Frage! In einer echten Integration wuerde ich dir hier eine vollstaendige Antwort geben.",
      "Wenn der API-Schluessel konfiguriert ist, kann ich dich bei Vokabeln und Grammatik unterstuetzen.",
      "Das ist ein gutes Beispiel fuer deutsches Vokabular. Moechtest du mehr darueber wissen?",
      "In der finalen Version werde ich Echtzeit-Antworten liefern koennen.",
      "Das ist eine Beispielantwort. Bitte hinterlege deinen API-Schluessel in den Einstellungen.",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  function sendMessage() {
    const message = chatInput?.value.trim()
    if (!message) return

    addMessage(message, "user")
    if (chatInput) chatInput.value = ""

    setTimeout(() => {
      addMessage(generateMockResponse(), "bot")
    }, 500)
  }

  sendButton?.addEventListener("click", sendMessage)

  chatInput?.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      sendMessage()
    }
  })

  function openSettings() {
    settingsModal?.classList.add("is-open")
    const storedKey = localStorage.getItem("openai_api_key")
    if (storedKey && apiKeyInput) {
      apiKeyInput.value = storedKey
    }
  }

  settingsButton?.addEventListener("click", openSettings)

  closeSettings?.addEventListener("click", () => {
    settingsModal?.classList.remove("is-open")
  })

  settingsModal?.addEventListener("click", (event) => {
    if (event.target === settingsModal) {
      settingsModal.classList.remove("is-open")
    }
  })

  saveSettings?.addEventListener("click", () => {
    const apiKey = apiKeyInput?.value.trim()
    if (apiKey) {
      localStorage.setItem("openai_api_key", apiKey)
      alert("API-Schluessel gespeichert (lokal im Browser).")
      settingsModal?.classList.remove("is-open")
    } else {
      alert("Bitte gib einen gueltigen API-Schluessel ein.")
    }
  })
})
