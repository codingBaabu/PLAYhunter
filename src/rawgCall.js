function getGames(params){
    return fetch(`http://localhost:5501/rawg/games/${params}`)
        .then((res)=>res.json())
        .then((data)=> data.rawgData)
}

export default getGames