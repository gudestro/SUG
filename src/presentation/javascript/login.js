document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm')
  const errorMessage = document.getElementById('errorMessage')

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if (!email || !password) {
      errorMessage.textContent = 'Por favor, preencha todos os campos.'
      errorMessage.style.display = 'block'
    }

    // eslint-disable-next-line no-undef
    axios.post('/login', { email, password })
      .then(function (response) {
        console.log(response.data)
        window.location.href = '/'
      })
      .catch(function (error) {
        console.error(error)
        errorMessage.textContent = 'Login falhou. Por favor, verifique suas credenciais.'
        errorMessage.style.display = 'block'
      })
  })
})
