
function getGames(params){
    return fetch(`http://localhost:5501/rawg/games/${params}`)
        .then((res)=>res.json())
        .then((data)=> data.rawgData)
        .catch(err=>console.log(err))
}

function getGameDetails(id){
    return fetch(`http://localhost:5501/rawg/single-game/${id}`)
        .then((res)=>res.json())
        .then((data)=> data.rawgData)
        .catch(err=>console.log(err))
}

export {
    getGames,
    getGameDetails
}