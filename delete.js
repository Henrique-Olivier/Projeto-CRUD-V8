async function deleteUser (userId) {
    try {
        await fetch(endpointAPI+`?id=eq.${userId}` ,{
           method: 'DELETE',
            headers: {
                apiKey
            }
        })
   } catch(error) {
       console.error('Erro ao exlcuir usuário' + error)
   }
}