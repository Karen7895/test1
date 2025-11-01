;(function () {
  function updateExpanded(dropdown, expanded) {
    const trigger = dropdown.querySelector('.nav-link--dropdown')
    if (trigger) {
      trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false')
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.nav-dropdown')
    if (!dropdown) {
      return
    }

    updateExpanded(dropdown, false)

    dropdown.addEventListener('mouseenter', () => updateExpanded(dropdown, true))
    dropdown.addEventListener('mouseleave', () => updateExpanded(dropdown, false))

    dropdown.addEventListener('focusin', () => updateExpanded(dropdown, true))
    dropdown.addEventListener('focusout', (event) => {
      const nextTarget = event.relatedTarget
      if (!nextTarget || !dropdown.contains(nextTarget)) {
        updateExpanded(dropdown, false)
      }
    })
  })
})()
