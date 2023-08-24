
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

function getGameRatingHTML(game){
    let gameRating = document.createElement('p')
    gameRating.setAttribute('class', 'game-rating')
    gameRating.textContent = game.metacritic
    return gameRating
}

export {
    getGameImageHTML,
    getGameTitleHTML,
    getGameRatingHTML
}