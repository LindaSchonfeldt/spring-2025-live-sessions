document.addEventListener("DOMContentLoaded", () => {
  const introSection = document.getElementById("introduction")
  const userInfoSection = document.getElementById("user-info")
  const announcer = document.getElementById("announcer")

  const introContinueButton = document.getElementById("intro-continue")

  introContinueButton.addEventListener("click", () => {
    // Hide the introduction section and show the user info section
    introSection.hidden = true
    userInfoSection.hidden = false
    // Set focus to the user info section
    window.location.hash = "#user-info"
    document.getElementById("name").focus()
    announcer.textContent = "Moved to user information section."
  })

  const userInfoForm = document.getElementById("user-info-form")
  const nameInput = document.getElementById("name")
  const emailInput = document.getElementById("email")
  const nameError = document.getElementById("name-error")
  const emailError = document.getElementById("email-error")

  // Remove old errors
  const clearError = (input, errorElement) => {
    input.removeAttribute("aria-invalid")
    errorElement.textContent = ""
    errorElement.hidden = true
  }

  const showError = (input, errorElement, message) => {
    input.setAttribute("aria-invalid", "true")
    errorElement.textContent = message
    errorElement.hidden = false
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  //Get the name and email inputs and the error messages
  nameInput.addEventListener("input", () => {
    if (nameInput.value.trim()) {
      clearError(nameInput, nameError)
    }
  })

  emailInput.addEventListener("input", () => {
    if (emailInput.value.trim()) {
      if (isValidEmail(emailInput.value)) {
        clearError(emailInput, emailError)
      }
    }
  })

  userInfoForm.addEventListener("submit", (event) => {
    // Prevent the form from reloading when submitting the form
    event.preventDefault()
    // Check if the name input is empty
    let isValid = true

    if (!nameInput.value.trim()) {
      showError(nameInput, nameError, "Please enter your name.")
      isValid = false
      // Move focus to the name input where the error is
      nameInput.focus()
    } else {
      clearError(nameInput, nameError)
    }

    // Check if the email input is empty or invalid
    if (!emailInput.value.trim()) {
      showError(emailInput, emailError, "Please enter your email.")
      isValid = false
      if (!nameError.textContent) {
        // Move focus to the email input where the error is (if name error is not present)
        emailInput.focus()
      }
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, emailError, "Please enter a valid email address.")
      isValid = false
    } else {
      clearError(emailInput, emailError)
    }

    if (isValid) {
      // Continue here if the form is valid
      userName = nameInput.value.trim()
      userInfoSection.hidden = true

      announcer.textContent = "Moved to feedback section."
      // Show the feedback section
    }
  })
})
