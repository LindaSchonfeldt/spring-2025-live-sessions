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
      feedbackSection.hidden = false
      feedbackSection.scrollIntoView({ behavior: "smooth" }) // Animate the feedback section to slide in
      document.querySelector('#feedback input[type="radio"]').focus()
      announcer.textContent = "Moved to feedback form section." // Set the announcer text to inform the user
    }
  })
  const feedbackSection = document.getElementById("feedback")
  const resultsSection = document.getElementById("results")

  const form = document.getElementById("feedback-form")
  const resultsContent = document.getElementById("results-content")
  const feedbackDetails = document.querySelector(".feedback-details")
  const progressFill = document.querySelector(".progress-fill")
  const progressText = document.querySelector(".progress-text")
  let answeredQuestions = new Set() // A kind of "list" (with unique items) to keep track of answered questions

  const updateProgress = () => {
    const totalQuestions = 2
    const answeredCount = answeredQuestions.size
    const percentage = (answeredCount / totalQuestions) * 100

    progressFill.style.width = `${percentage}%`
    progressText.textContent = `${answeredCount} of ${totalQuestions} questions answered`
    announcer.textContent = `${answeredCount} of ${totalQuestions} questions answered`
  }

  form.querySelectorAll("input[type='radio']").forEach((radio) => {
    radio.addEventListener("change", () => {
      const questionName = radio.name // Get the name of the question (e.g., "question1")
      answeredQuestions.add(questionName) // Add the question name to the set of answered questions
      updateProgress() // Update the progress bar and text
    })
  })

  form.addEventListener("submit", (event) => {
    event.preventDefault()

    const formData = new FormData(form)
    const userAnswers = Object.fromEntries(formData) // Convert the form data to an object

    let feedback = `Thank you for your feedback, ${userName}! `

    const detailedFeedback = []

    if (userAnswers.navigation === "easy") {
      detailedFeedback.push("We are glad you found the navigation easy.")
    } else if (userAnswers.navigation === "difficult") {
      detailedFeedback.push(
        "We are sorry to hear that you found the navigation difficult."
      )
    }

    if (userAnswers.readability === "clear") {
      detailedFeedback.push(
        "We are glad you found the site easy to read and understand."
      )
    } else if (userAnswers.readability === "unclear") {
      detailedFeedback.push(
        "We are sorry you found the site difficult to read and understand."
      )
    }

    const positiveAnswers = ["easy", "clear"]
    const negativeAnswers = ["difficult", "unclear"]

    const userAnswerValues = Object.values(userAnswers)

    let positiveResponses = 0

    for (const answer of userAnswerValues) {
      if (positiveAnswers.includes(answer)) {
        positiveResponses += 1
      }
    }

    const totalResponses = Object.keys(userAnswers).length
    const satisfactionPercentage = Math.round(
      (positiveResponses / totalResponses) * 100
    )

    feedback += `Based on your responses, you seem ${satisfactionPercentage}% satisfied with the website. `
    feedback +=
      positiveResponses >= totalResponses / 2
        ? "Thank you for your positive feedback!"
        : "We appreciate your feedback and will work to improve the website."

    feedbackSection.hidden = true
    resultsSection.hidden = false
    resultsContent.textContent = feedback

    feedbackDetails.innerHTML = detailedFeedback
      .map((text) => `<p>${text}</p>`)
      .join("")

    resultsSection.setAttribute("tabindex", "-1") // Make results section focusable
    resultsSection.focus() // Set focus to the results section
    announcer.textContent =
      "Feedback submitted. Your results are now displayed." // Set the announcer text to inform the user
  })
})
