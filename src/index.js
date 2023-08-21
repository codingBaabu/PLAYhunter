import getGames from './rawgCall.js'

async function renderGames(params){
    const rawGamesList = await getGames(params)
    const gamesList = rawGamesList.filter(game=>game.background_image!=null)
    const content = document.querySelector('.content')

    gamesList.forEach(game=>{
        let block = document.createElement('article')
        block.appendChild(getGameImageHTML(game))
        block.appendChild(getGameTitleHTML(game))
        content.appendChild(block)
    })
}

function getGameImageHTML(game){
    let gameImage = document.createElement('img')
        gameImage.setAttribute('src', game.background_image)
        gameImage.setAttribute('width', '100px')
        gameImage.setAttribute('height', '100px')
    return gameImage
}

function getGameTitleHTML(game){
    let gameTitle = document.createElement('p')
    gameTitle.textContent = game.name
    return gameTitle
}

renderGames('ordering=released&page=1')