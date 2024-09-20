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
    
];

const insertUsers = document.getElementById('users');
const btnFilter = document.getElementById('btn-filter');

// Função para editar o usuário
function editUser(userElement) {
    let index = userElement.getAttribute('index');
    let userName = userElement.querySelector("#user-name");
    let userEmail = userElement.querySelector("#user-email");
    let userType = userElement.querySelector("#user-type");
    let userValue = userElement.querySelector("#user-values");
    let button = userElement.querySelector(".btn-primary");

    // Transformar os campos em inputs preenchidos com os valores atuais
    userName.innerHTML = `<input id='user${index}-name-input' value='${users[index].name}'>`;
    userEmail.innerHTML = `<input id='user${index}-email-input' value='${users[index].email}'>`;
    userType.innerHTML = `
    <select class="form-control" id='user${index}-type-select'>
        <option value="recurrent" ${users[index].type === 'recurrent' ? 'selected' : ''}>Recorrente</option>
        <option value="annually" ${users[index].type === 'annually' ? 'selected' : ''}>Anual</option>
        <option value="single" ${users[index].type === 'single' ? 'selected' : ''}>Avulso</option>
    </select>`;
    userValue.innerHTML = `<input id='user${index}-value-input' value='${users[index].values}'>`;

    // Alterar o botão para "Confirmar" e associar a função de confirmação
    button.innerHTML = 'Confirmar';
    button.onclick = () => confirmEdit(userElement);
}

// Função para confirmar a edição
function confirmEdit(userElement) {
    let index = userElement.getAttribute('index');

    // Coletar os novos valores dos inputs
    let newName = document.querySelector(`#user${index}-name-input`).value;
    let newEmail = document.querySelector(`#user${index}-email-input`).value;
    let newType = document.querySelector(`#user${index}-type-select`).value;
    let newValue = document.querySelector(`#user${index}-value-input`).value;

    // Atualizar o array com os novos valores
    users[index].name = newName;
    users[index].email = newEmail;
    users[index].type = newType;
    users[index].values = parseFloat(newValue);

    // Re-renderizar a lista de usuários
    showUsers(users);
}

// Constante de mapeamento de tipos para estilos
const clientTypeMapping = {
    'recurrent': '<span class="badge text-bg-primary">Recorrente</span>',
    'single': '<span class="badge text-bg-warning">Avulso</span>',
    'annually': '<span class="badge text-bg-info">Anual</span>'
};

// Constante de mapeamento de valores de faixa
const valueRangeMapping = {
    '2000': user => user.values <= 2000,
    '3000-5000': user => user.values >= 3000 && user.values <= 5000,
    '10000': user => user.values > 10000
};

btnFilter.addEventListener('click', Filter);
showUsers(users);

function showUsers(userList) {
    clearUsers();
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
        `;
    });
    
    btnDelete();
    btnEdit();
}

function clearUsers() {
    insertUsers.innerHTML = '';
} 

function btnDelete() {
    const btnDelete = document.querySelectorAll('.btn-danger');
    
    btnDelete.forEach(button => {
        button.addEventListener('click', (evento) => {
            deleteUser(evento.target.parentElement.parentElement);   
        });
    });
}

function btnEdit() {
    const btnEdit = document.querySelectorAll('.btn-primary');
    btnEdit.forEach(button => {
        button.addEventListener('click', (event) => {
            editUser(event.target.parentElement.parentElement);   
        });
    });
}

function deleteUser(indexOfUser) {
    users.splice(indexOfUser.getAttribute('index'), 1);
    showUsers(users);
}

// Substituindo o switch case por um lookup na constante
function clientType(type) {
    return clientTypeMapping[type] || '<span class="badge text-bg-secondary">Desconhecido</span>';
}

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
        filteredUsers = filteredUsers.filter(user => user.type === selectCategory);
    }

    if (selectValues != 0) {
        // Usando o mapeamento de faixa de valores 
        const filterByValueRange = valueRangeMapping[selectValues];
        if (filterByValueRange) {
            filteredUsers = filteredUsers.filter(filterByValueRange);
        }
    }

    showUsers(filteredUsers);
}

