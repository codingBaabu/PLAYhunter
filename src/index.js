import getGames from './rawgCall.js'
import { initColcade, getSmallestColumn } from './masonry.js'
import sidebarInit from './sidebar.js'
import { startLoading, stopLoading } from './loading.js'
import { getParams, getURLParams, setCurrentPage, setCurrentOrder } from './queryParameters.js'

document.querySelector('.order-dropdown')
    .addEventListener('click', orderSelected)
window.addEventListener('scroll', addMoreGames)
document.addEventListener('DOMContentLoaded', initColcade)

function addGames(){
        startLoading()    
        renderGames(getParams())
}

function addMoreGames(){
    if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight && getIsEmptyGames()==false){
        startLoading()    
        renderGames(getParams())
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

function orderSelected(e){
    if(e.target.tagName=='OPTION'){
        setCurrentPage(1)
        setCurrentOrder(e.target.value)
        clearGames()
        addGames()
    }
}

function clearGames(){
    document.querySelectorAll('.grid-col').forEach(col=>col.innerHTML='')
}

function getIsEmptyGames(){
    let empty = true
    document.querySelectorAll('.grid-col').forEach(col=>{
        if(col.innerHTML!=''){
            empty=false
        }
    })

    return empty
}

function setTitle(){
    const title = document.querySelector('.current-order-title')
    const filter = getURLParams().get('filter')
    title.textContent=filter?filter:'ALL GAMES'
}

setTitle()
sidebarInit()
addGames()
