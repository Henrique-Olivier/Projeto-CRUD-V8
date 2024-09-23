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
        // alert.innerHTML = `Preencha todos os campos antes de prosseguir!`
        alert.innerHTML = `
        <div class="alert alert-danger" role="alert">
            Preencha todos os campos antes de prosseguir!
        </div>
        `
        setTimeout( () => {
            alert.innerHTML = ''
        }, 7000)
        return
    }

    if(!email) {
        // alert.innerHTML = `O campo de email é obrigatório!`
        alert.innerHTML = `
        <div class="alert alert-danger" role="alert">
                O campo de email é obrigatório!
        </div>
        `
        setTimeout( () => {
            alert.innerHTML = ''
        }, 7000)
        return
    }

    if (!password) {
        // alert.innerHTML = `Informe sua senha!` 
        alert.innerHTML = `
        <div class="alert alert-danger" role="alert">
        Informe sua senha!
        </div>
        `
        setTimeout( () => {
            alert.innerHTML = ''
        }, 7000)
        return 
    }

    if (password === user.password && email === user.email) {
        alert.innerHTML = `
        <div class="alert alert-success" role="alert">
            Redirecionando...
        </div>
        `
        setTimeout( () => {
            window.location = 'index.html'
        }, 2000)
        return
    }
    if (password !== user.password || email !== user.email) {
        alert.innerHTML = `
        <div class="alert alert-danger" role="alert">
        Senha ou email inválidos.
        </div>
        `
        setTimeout( () => {
            alert.innerHTML = ''
        }, 7000)
    }
} 