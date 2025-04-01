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

  // Remove errors
  const clearErrors = (input, errorElement) => {
    input.removeAttribute("aria-invalid", "true")
    errorElement.textContent = ""
    errorElement.hidden = true
  }

  //Get the name and email inputs and the error messages
  nameInput.addEventListener("input", () => {
    if (nameInput.value.trim()) clearErrors(nameInput, nameError)
  })
})
