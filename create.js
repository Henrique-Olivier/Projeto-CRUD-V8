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
    } catch(error) {
        console.error('erro ao crirar novo usuario:' + error)
    }
} 

