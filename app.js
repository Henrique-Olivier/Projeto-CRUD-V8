const users = [
    {
        name: 'Mark',
        email: 'Mark@email.com',
        type: 'recurrent',
        values: 2000
    },
    {
        name: 'Henrique',
        email: 'Henrique@email.com',
        type: 'single',
        values: 2000
    },
    {
        name: 'Lilo',
        email: 'Lilo@email.com',
        type: 'annually',
        values: 122000
    },
    {
        name: 'Marta',
        email: 'Marta@email.com',
        type: 'recurrent',
        values: 5000
    },
    {
        name: 'Henrique Olivier',
        email: 'Olivier@email.com',
        type: 'annually',
        values: 15000
    },
    
]

const insertUsers = document.getElementById('users')
const btnFilter = document.getElementById('btn-filter')

btnFilter.addEventListener('click', Filter)
showUsers(users)


function showUsers(userList) {
    clearUsers()
    userList.forEach((user, index) => {

        insertUsers.innerHTML += `
    <tr id="user${index}" index=${index}>
        <td id="user-name">${user.name}</td>
        <td id="user-email">${user.email}</td>
        <td id="user-type">
            ${clientType(user.type)}
        </td>
        <td id="user-values">${user.values.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
        <td>
            <button class="btn btn-primary">Editar</button>
            <button class="btn btn-danger">Excluir</button>
        </td>
    </tr>
                          `
    })
    
    btnDelete()
    btnEdit()
}

function clearUsers() {
    insertUsers.innerHTML= ''
} 

function btnDelete () {
    const btnDelete = document.querySelectorAll('.btn-danger')
    
    btnDelete.forEach(button => {
        button.addEventListener('click', (evento) => {
            deleteUser(evento.target.parentElement.parentElement)   
        })
    })
}

function btnEdit () {
    const btnEdit = document.querySelectorAll('.btn-primary')
    
    btnEdit.forEach(button => {
        button.addEventListener('click', (evento) => {
            editUser(evento.target.parentElement.parentElement)   
        })
    })
}

function deleteUser (indexOfUser) {
    console.log(indexOfUser) 
    users.splice(indexOfUser.getAttribute('index'), 1)
    showUsers(users)
}


// Edicao do usuario em progresso 
function editUser(userElement) {
    let index = userElement.getAttribute('index')
    let userName = userElement.querySelector("#user-name")
    let userType = userElement.querySelector("#user-email")
    let userEmail = userElement.querySelector("#user-type")
    let userValue = userElement.querySelector("#user-values")
    let button = userElement.querySelector(".btn-primary")

    userName.innerHTML = `<input id='user${index}-name-input'>` 
    userType.innerHTML = `<input id='user${index}-email-input'>`
    userEmail.innerHTML = `
    <select class="form-control" id='user${index}-type-select'>
    <option value="0">Selecione</option>
    <option value="recurrent">Recorrente</option>
    <option value="annually">Anual</option>
    <option value="single">Avulso</option>
    </select>`
    userValue.innerHTML = `<input id='user${index}-value-input'>`
    button.innerHTML = 'confirmar'; button.setAttribute('onclick', 'confirmEdit(event.target.parentElement.parentElement)')
}

function confirmEdit (userElement) {
    let index = userElement.getAttribute('index')
    let newName = document.querySelector(`#user${index}-name-input`)
    let newType = document.querySelector(`#user${index}-email-input`)
    let newEmail = document.querySelector(`#user${index}-type-select`)
    let newValue = document.querySelector(`#user${index}-value-input`)
    let button = document.querySelector(".btn-primary")

    console.log (newName)
}

// Edicao do usuario em progresso 



function clientType (type) {
    switch (type) {
        case 'recurrent' : return '<span class="badge text-bg-primary">Recorrente</span>'; break;
        case 'single' : return '<span class="badge text-bg-warning">Avulso</span>'; break;
        case 'annually' : return '<span class="badge text-bg-info">Anual</span>'; break;
    } 
}

function Filter () {
    const inputSearch = document.getElementById('input-search').value
    const selectCategory = document.getElementById('select-category').value
    const selectValues = document.getElementById('select-values').value
    let filteredUsers = users

    if(!inputSearch, selectCategory == 0, selectValues == 0 ) {
        showUsers(filteredUsers)
    } 

    if(inputSearch) {
     filteredUsers =  filteredUsers.filter(user => { return (user.name.toUpperCase().indexOf(inputSearch.toUpperCase()) != -1 || user.email.toUpperCase().indexOf(inputSearch.toUpperCase()) != -1   )})
    }

    if (selectCategory != 0 ) {
    filteredUsers =  filteredUsers.filter(user => { return user.type === selectCategory })
    } 

    if (selectValues != 0 ) {  
        switch (selectValues) {
            case '2000': filteredUsers =  filteredUsers.filter(user => { return user.values <= 2000 }); break;
            case '3000-5000': filteredUsers =  filteredUsers.filter(user => {return(user.values >= 3000 && user.values <= 5000)}); break;
            case '10000': filteredUsers =  filteredUsers.filter(user => { return user.values > 10000 }); break;
        }
    } 

    showUsers(filteredUsers)
} 