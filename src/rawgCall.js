
function getGames(params){
    return fetch(`https://us-central1-rawg-proxy.cloudfunctions.net/api/rawg/games/${params}`)
        .then((res)=>res.json())
        .then((data)=> data.rawgData)
        .catch(err=>console.log(err))
}

function getGameDetails(id){
    return fetch(`https://us-central1-rawg-proxy.cloudfunctions.net/api/rawg/single-game/${id}`)
        .then((res)=>res.json())
        .then((data)=> data.rawgData)
        .catch(err=>console.log(err))
}

export {
    getGames,
    getGameDetails
}