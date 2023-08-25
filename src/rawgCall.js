function getGames(params){
    return fetch(`http://localhost:5501/rawg/games/${params}`)
        .then((res)=>res.json())
        .then((data)=> data.rawgData)
}

function getGameDetails(id){
    return fetch(`http://localhost:5501/rawg/single-game/${id}`)
        .then((res)=>res.json())
        .then((data)=> data.rawgData)
}


export {
    getGames,
    getGameDetails
}