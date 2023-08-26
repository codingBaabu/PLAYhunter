
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
    gameRating.textContent = game.metacritic==null?'-':game.metacritic
    return gameRating
}

function getGameGenresHTML(game){
    let gameGenres = document.createElement('p')
    gameGenres.setAttribute('class', 'game-genres')
    gameGenres.textContent = game.genres.map(genre=>genre.name).join(', ')
    return gameGenres
}


function getGamePlatformsHTML(game){
    let gamePlatforms = document.createElement('p')
    gamePlatforms.setAttribute('class', 'game-platforms')
    gamePlatforms.textContent = game.platforms.map(platform=>platform.platform.name).join(', ')
    return gamePlatforms
}

export {
    getGameImageHTML,
    getGameTitleHTML,
    getGameRatingHTML,
    getGameGenresHTML,
    getGamePlatformsHTML
}