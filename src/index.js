import getGames from './rawgCall.js'

async function renderGames(params){
    const rawGamesList = await getGames(params)
    const gamesList = rawGamesList.filter(game=>game.background_image!=null)
    const gamesSection = document.querySelector('.games')

    gamesList.forEach(game=>{
        let block = document.createElement('article')
        block.setAttribute('class', 'card')
        block.appendChild(getGameImageHTML(game))
        block.appendChild(getGameTitleHTML(game))
        gamesSection.appendChild(block)
    })
}

function getGameImageHTML(game){
    let gameImage = document.createElement('img')
        gameImage.setAttribute('src', game.background_image)
        gameImage.setAttribute('class', 'game-image')
        gameImage.setAttribute('width', '100px')
        gameImage.setAttribute('height', '100px')
    return gameImage
}

function getGameTitleHTML(game){
    let gameTitle = document.createElement('p')
    gameTitle.setAttribute('class', 'game-title')
    gameTitle.textContent = game.name
    return gameTitle
}

for(let i = 0 ; i < 5 ; i++){
    renderGames(`ordering=released&page=${i}`)
}