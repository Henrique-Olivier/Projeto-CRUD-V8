async function createUser (name, email, client_type, billing) {
    try {
         await fetch(endpointAPI,{
            method: 'POST',
             headers: {
                'Content-Type': 'application/json',
                 apiKey
             },
             body: JSON.stringify({
                name,
                email,
                client_type,
                billing
             })
         })
         document.querySelector(".btn-close").click();
         getAllUsersAPI()
         showAlert('success', 'Usário adicionado com sucesso', 3000)
    } catch(error) {
        console.error('erro ao crirar novo usuario:' + error)
    }
} 

