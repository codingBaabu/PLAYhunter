import getGames from './rawgCall.js'
import { initColcade, getSmallestColumn } from './masonry.js'

document.querySelector('.order-dropdown')
    .addEventListener('click', setOrder)
window.addEventListener('scroll', addGames)
document.addEventListener('DOMContentLoaded', initColcade)

let currentPage=0
let currentOrder='released'

function startLoading(){
    if(!document.querySelector('.grid-col--1').textContent){
        document.getElementById('spinner').style.visibility = 'visible'
        document.querySelector('.loading-initial-content').style.display = 'flex'
    } else {
        document.getElementById('linear').style.visibility = 'visible'
        document.querySelector('.loading-more-content').style.display = 'flex'       
    }
}

function stopLoading(){
    document.getElementById('linear').style.visibility = 'hidden'
    document.getElementById('spinner').style.visibility = 'hidden'
    document.querySelector('.loading-initial-content').style.display = 'none'
}

function addGames(pass=false){
    if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight){
        startLoading()    
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
    stopLoading()
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

addGames(true)