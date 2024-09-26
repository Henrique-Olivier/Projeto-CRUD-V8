async function deleteUser (userId) {
    try {
        await fetch(endpointAPI+`?id=eq.${userId}` ,{
           method: 'DELETE',
            headers: {
                apiKey
            }
        })
        showAlert('success', 'Usuário Excluido com sucesso', 5000)
        getAllUsersAPI()
   } catch(error) {
       console.error('Erro ao exlcuir usuário' + error)
   }
}