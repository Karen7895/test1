document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = Array.from(document.querySelectorAll("[data-level-filter]"))
  const storyCards = Array.from(document.querySelectorAll("[data-level]"))
  const loginTip = document.getElementById("login-tip")
  const loginTipClose = document.getElementById("login-tip-close")
  const authRequiredLinks = Array.from(document.querySelectorAll("[data-auth-required]"))
  const isAuthenticated = document.body?.dataset?.authenticated === "true"

  if (filterButtons.length && storyCards.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetLevel = button.dataset.levelFilter

        filterButtons.forEach((btn) => btn.classList.toggle("is-active", btn === button))

        storyCards.forEach((card) => {
          const cardLevel = card.dataset.level
          const shouldShow = targetLevel === "all" || cardLevel === targetLevel
          card.style.display = shouldShow ? "" : "none"
          card.classList.toggle("is-hidden", !shouldShow)
        })
      })
    })
  }

  if (!isAuthenticated && authRequiredLinks.length) {
    authRequiredLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault()
        event.stopPropagation()
        showLoginTip()
      })
    })
  }

  if (loginTipClose) {
    loginTipClose.addEventListener("click", () => {
      hideLoginTip()
    })
  }

  function showLoginTip() {
    if (!loginTip) {
      window.location.href = "/login"
      return
    }

    loginTip.hidden = false
    loginTip.classList.add("is-visible")
    loginTip.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  function hideLoginTip() {
    if (!loginTip) {
      return
    }

    loginTip.classList.remove("is-visible")
    loginTip.hidden = true
  }
})
