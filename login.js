(function () {

    const userIsLogged = localStorage.getItem('userIsLogged')
    if (userIsLogged) {
        window.location = './index.html'
    } 

    const user = {
        email: "Mark@email.com",
        password: "1234"
      };
      
      const alert = document.getElementById("login-alert");
      const btnLogin = document.getElementById("btn-login");
      const email = document.getElementById("input-email");
      const password = document.getElementById("input-password");
      
      btnLogin.addEventListener("click", verifyLogin);
      
      function validarEmail(email) {
        // Expressão regular para validar o e-mail
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
        // Testa o e-mail com a regex
        return regex.test(email);
      }
      
      function verifyLogin() {
      
        const emailValido = validarEmail(email.value);
        if (!emailValido) {
            showAlert("failed", "Preencha um email válido!");
            return;
        }
      
        if (!password) {
          showAlert("failed", "Preencha todos os campos antes de prosseguir");
          return;
        } 
      
        if (email.value === user.email && password.value === user.password) {
            showAlert("success", "Autênticado com sucesso!");
            localStorage.setItem('userIsLogged', 'true')
            setTimeout(() => {
                window.location = './index.html'
            }, 1500)
        } else {
            showAlert("failed", "Email ou senha inválidos!");
        }
      }
})()



