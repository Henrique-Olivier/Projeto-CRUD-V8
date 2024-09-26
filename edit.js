async function editUser (idUser, name, email, client_type, billing) {
    try {
         await fetch(endpointAPI+`?id=eq.${idUser}`,{
            method: 'PATCH',
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
    } catch(error) {
        console.error('erro ao editar usuario:' + error)
    }
} 