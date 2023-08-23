import getGames from './rawgCall.js'
import { initColcade, getSmallestColumn } from './masonry.js'

document.querySelector('.order-dropdown')
    .addEventListener('click', setOrder)
window.addEventListener('scroll', addGames)
document.addEventListener('DOMContentLoaded', initColcade)

let currentPage=0
let currentOrder='released'

function addGames(){
    if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight){
        document.getElementById('linear').svg.style.visibility = 'visible'
        document.querySelector('.loading-more-content').style.display = 'flex'        
        renderGames(`ordering=${currentOrder}&page=${++currentPage}&page_size=100`)
    }
}

async function renderGames(params){
    const rawGamesList = await getGames(params)
    const gamesList = rawGamesList.filter(game=>game.background_image!=null)

    gamesList.forEach(game=>{
            let block = document.createElement('article')
            block.setAttribute('class', 'card')
            block.appendChild(getGameImageHTML(game))
            block.appendChild(getGameRatingHTML(game)) 
            block.appendChild(getGameTitleHTML(game))

            getSmallestColumn().appendChild(block)
    })

    document.getElementById('linear').style.visibility = 'hidden'
    document.getElementById('spinner').style.visibility = 'hidden'
    document.querySelector('.loading-initial-content').style.display = 'none'
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

function getGameRatingHTML(game){
    let gameRating = document.createElement('p')
    gameRating.setAttribute('class', 'game-rating')
    gameRating.textContent = game.metacritic
    return gameRating
}

function setOrder(e){
    if(e.target.tagName=='OPTION'){
        document.querySelectorAll('.grid-col').forEach(col=>col.innerHTML='')
        currentPage=1
        currentOrder=e.target.value
        addGames()
    }
}

addGames()