const emailInput = document.querySelector('#iemail')
const errorSign = document.querySelector('.error-sign')
const errorMessage = document.querySelector('.error-message')
const button = document.querySelector('.btn-submit')
const emailRegex = /\S+@\S+\.\S+/

button.addEventListener('click', () => {
    const email = emailInput.value
    if (!emailRegex.test(email)) {
        errorSign.style.display = 'block'
        errorMessage.style.display = 'block'
        emailInput.style.borderColor = 'var(--Soft-Red)'
        emailInput.value = ''
        return
    }
    errorSign.style.display = 'none'
    errorMessage.style.display = 'none'
    emailInput.style.borderColor = 'green'
    emailInput.value = ''
})

emailInput.addEventListener('blur', () => {
    errorSign.style.display = 'none'
    errorMessage.style.display = 'none'
    emailInput.style.borderColor = 'var(--Desaturated-Red)'
})