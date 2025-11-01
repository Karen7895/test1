;(function () {
  const form = document.querySelector('[data-question-builder]')
  if (!form) {
    return
  }

  const questionList = form.querySelector('[data-question-list]')
  const addButton = form.querySelector('[data-add-question]')
  const template = form.querySelector('#question-template')

  const updateAttributes = (element, index) => {
    if (element.name) {
      element.name = element.name.replace(/questions\[\d+\]/g, `questions[${index}]`)
    }
    if (element.id) {
      element.id = element.id.replace(/question-\d+/g, `question-${index}`)
    }
    const htmlFor = element.getAttribute && element.getAttribute('for')
    if (htmlFor) {
      element.setAttribute('for', htmlFor.replace(/question-\d+/g, `question-${index}`))
    }
  }

  const attachCardListeners = (card) => {
    const removeButton = card.querySelector('[data-remove-question]')
    if (removeButton) {
      removeButton.addEventListener('click', () => {
        card.remove()
        renumberQuestions()
      })
    }
  }

  const createCardFromTemplate = (index) => {
    if (!template) {
      return null
    }
    const html = template.innerHTML
      .replace(/__INDEX__/g, index)
      .replace(/__NUMBER__/g, index + 1)
    const wrapper = document.createElement('div')
    wrapper.innerHTML = html.trim()
    const card = wrapper.firstElementChild
    if (!card) {
      return null
    }
    attachCardListeners(card)
    return card
  }

  const renumberQuestions = () => {
    const cards = questionList.querySelectorAll('.question-card')
    cards.forEach((card, index) => {
      card.dataset.questionIndex = String(index)
      const numberBadge = card.querySelector('[data-question-number]')
      if (numberBadge) {
        numberBadge.textContent = index + 1
      }
      card.querySelectorAll('textarea, input, label').forEach((element) => {
        updateAttributes(element, index)
      })
    })
  }

  questionList.querySelectorAll('.question-card').forEach((card) => {
    attachCardListeners(card)
  })
  renumberQuestions()

  if (addButton) {
    addButton.addEventListener('click', () => {
      const currentCount = questionList.querySelectorAll('.question-card').length
      const newIndex = currentCount
      const card = createCardFromTemplate(newIndex)
      if (card) {
        questionList.appendChild(card)
        renumberQuestions()
      }
    })
  }
})()
