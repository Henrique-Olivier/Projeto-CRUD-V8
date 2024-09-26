//name, email, client_type, billing

const userIsLogged = localStorage.getItem('userIsLogged')
    if (!userIsLogged) {
        window.location = './login.html'
    } 

let users = []
const endpointAPI = 'https://rowqaxeeqevtmaoxkqfv.supabase.co/rest/v1/registers'
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvd3FheGVlcWV2dG1hb3hrcWZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyMjUzOTIsImV4cCI6MjA0MjgwMTM5Mn0.q0GJYr0s8l__lSvaotnoVaHycrKJzKNref7KCxJUaVY'

async function getAllUsersAPI() {
    try {
        const res = await fetch(endpointAPI,{
           method: 'GET',
            headers: {
                apiKey
            },
        })
        users = await res.json()
        showUsers(users)
    } catch (erro) {
        showAlert('failed', 'Falha ao buscar informações', 5000)
        console.error(`Erro ao buscar informações: ${erro}`)
    }
}

getAllUsersAPI()   


const insertUsers = document.getElementById('users');
const btnFilter = document.getElementById('btn-filter');
const btnClearFilter = document.getElementById("btn-clearFilter")


function clearUsers() {
    insertUsers.innerHTML = '';
}

function showUsers(userList) {
    clearUsers();
    userList.forEach((user) => {
        insertUsers.innerHTML += `
        <tr id="${user.id}">
            <td id="user-name">${user.name}</td>
            <td id="user-email">${user.email}</td>
            <td id="user-type">
                ${clientType(user.client_type)}
            </td>
            <td id="user-values">${user.billing.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
            <td>
                <button id='btn-editar' class="btn btn-primary" type-modal="edit" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
                <button id='btn-excluir' class="btn btn-danger">Excluir</button>
            </td>
        </tr>
        `;
    });
    selectModals();
    deleteBtn();
}

// Substituindo o switch case por um lookup na constante
function clientType(type) {
    return clientTypeMapping[type] || '<span class="badge text-bg-secondary">Desconhecido</span>';
}

// Constante de mapeamento de tipos para estilos
const clientTypeMapping = {
    'recorrente': '<span class="badge text-bg-primary">Recorrente</span>',
    'avulso': '<span class="badge text-bg-warning">Avulso</span>',
    'anual': '<span class="badge text-bg-info">Anual</span>'
};

// Constante de mapeamento de valores de faixa
const valueRangeMapping = {
    '2000': user => user.billing <= 2000,
    '3000-5000': user => user.billing >= 3000 && user.billing <= 5000,
    '10000': user => user.billing > 10000
};


btnFilter.addEventListener('click', Filter);
// showUsers(users);

// Ajustando a função Filter para usar mapeamento
function Filter() {
    const inputSearch = document.getElementById('input-search').value;
    const selectCategory = document.getElementById('select-category').value;
    const selectValues = document.getElementById('select-values').value;
    let filteredUsers = users;

    if (inputSearch) {
        filteredUsers = filteredUsers.filter(user => {
            return (
                user.name.toUpperCase().indexOf(inputSearch.toUpperCase()) !== -1 ||
                user.email.toUpperCase().indexOf(inputSearch.toUpperCase()) !== -1
            );
        });
    }

    if (selectCategory != 0) {
        filteredUsers = filteredUsers.filter(user => user.client_type === selectCategory);
    }

    if (selectValues != 0) {
        // Usando o mapeamento de faixa de valores 
        const filterByValueRange = valueRangeMapping[selectValues]; 
        if (filterByValueRange) {
            filteredUsers = filteredUsers.filter(filterByValueRange);
        }
    }

    filteredUsers.length == 0 ? insertUsers.innerHTML = `<div class="alert alert-warning" role="alert">
Não foram enconstrados resultados para o fitro
</div>` : showUsers(filteredUsers);
}


const inputSearch = document.getElementById('input-search')
const selectCategory = document.getElementById('select-category')
const selectValues = document.getElementById('select-values')

inputSearch.addEventListener('keyup', showButtonClear)
selectCategory.addEventListener('change', showButtonClear)
selectValues.addEventListener('change', showButtonClear)

function showButtonClear() {
    const inputSearch = document.getElementById('input-search').value;
    const selectCategory = document.getElementById('select-category').value;
    const selectValues = document.getElementById('select-values').value;

    if (inputSearch != '' || selectCategory != 0 || selectValues != 0) {
        btnClearFilter.style.display = 'block'
    } else {
        btnClearFilter.style.display = 'none'
    }
}

btnClearFilter.addEventListener('click', clearFilter)

function clearFilter() {
    document.getElementById('input-search').value = ''
    document.getElementById('select-category').value = '0'
    document.getElementById('select-values').value = '0'
    showButtonClear()
    showUsers(users)
}

let listBtnModals = [];
let typeModal;
let idUser;
function selectModals(){
    listBtnModals = document.querySelectorAll("[type-modal]");
    listBtnModals.forEach((e) => {
        e.addEventListener("click", (e) => {
            typeModal = e.target.getAttribute("type-modal");
            idUser = e.target.parentElement.parentElement.getAttribute("id")
            editModals(typeModal, idUser)
        })
    })
}

const btnConfirmModal = document.querySelector('#btn-confirm');
const titleModal = document.querySelector('#exampleModalLabel');

function editModals(typeModal, idUser){
    const name = document.querySelector("#input-name");
    const email = document.querySelector("#input-email");
    const client_type = document.querySelector("#modal-select-category");
    const billing = document.querySelector("#input-billing");

    if(typeModal == 'create'){
        titleModal.textContent = 'Adicionar novo cliente';
        btnConfirmModal.textContent = 'Adicionar';
        name.value = ''
        email.value = ''
        client_type.value = ''
        billing.value = ''
    } else {
        titleModal.textContent = 'Editar cliente';
        btnConfirmModal.textContent = 'Editar';
        const selectedUser = findUser(idUser)
        name.value = selectedUser[0].name
        email.value = selectedUser[0].email
        client_type.value = selectedUser[0].client_type
        billing.value = selectedUser[0].billing
    }
}

function findUser (idUser) {
    return users.filter( user => {
        return user.id === idUser
    })
} 

btnConfirmModal.addEventListener("click", save);
function save() {
    const name = document.querySelector("#input-name").value;
    const email = document.querySelector("#input-email").value;
    const client_type = document.querySelector("#modal-select-category").value;
    const billing = document.querySelector("#input-billing").value;

    
    if(typeModal == 'create'){
        createUser(name, email, client_type, billing)
    } else {
        editUser(idUser, name, email, client_type, billing)
    }
}

function deleteBtn () {
    let btnsDelete = document.querySelectorAll("#btn-excluir")
    
    btnsDelete.forEach(btn => {
        btn.addEventListener('click' , (e) => {
            deleteUser(e.target.parentElement.parentElement.id)
        })
    })
} 
