import getGames from './rawgCall.js'

async function renderGames(params){
    const gamesList = await getGames(params)
    console.log(gamesList)
}

renderGames('ordering=released&page=1')