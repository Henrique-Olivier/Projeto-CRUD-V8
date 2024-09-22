const user = {
    name: 'Mark',
    email: 'Mark@email.com',
    password: '1234',
    type: 'recurrent',
    values: 2000
};

const alert = document.getElementById("login-alert")
const btnLogin = document.getElementById("btn-login")

btnLogin.addEventListener('click', verifyLogin)

function verifyLogin () {
    const email = document.getElementById("input-email").value
    const password = document.getElementById("input-password").value

    if(!email && !password ) {
        alert.innerHTML = `Preencha todos os campos antes de prosseguir!`
        return
    }

    if(!email) {
        alert.innerHTML = `O campo de email é obrigatório!`
        return
    }

    if (!password) {
        alert.innerHTML = `Informe sua senha!` 
        return 
    }

    if (password === user.password && email === user.email) {
        alert.style.color = 'green'
        alert.innerHTML = `Redirecionando...`
        setTimeout( () => {
            window.location = 'index.html'
        }, 2000)
        return
    }
    if (password !== user.password || email !== user.email) {
        alert.innerHTML = `Usuário ou senha incorretos.`
    }
} 