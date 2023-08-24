import getGames from './rawgCall.js'
import { initColcade, getSmallestColumn } from './masonry.js'
import sidebarInit from './sidebar.js'

document.querySelector('.order-dropdown')
    .addEventListener('click', setOrder)
window.addEventListener('scroll', addMoreGames)
document.addEventListener('DOMContentLoaded', initColcade)

let currentPage=0
let currentOrder='released'
let currentFilter=''
const urlParams = new URLSearchParams(window.location.search)

function startLoading(){
    if(!document.querySelector('.grid-col--1').textContent){
        document.getElementById('spinner').style.visibility = 'visible'
        document.querySelector('.loading-initial-content').style.display = 'flex'
    } else {
        document.getElementById('linear').style.visibility = 'visible'
        document.querySelector('.loading-more-content').style.display = 'flex'       
        document.querySelector('.loading-more-content').style.padding = '5rem'       
    }
}

function stopLoading(){
    document.getElementById('linear').style.visibility = 'hidden'
    document.getElementById('spinner').style.visibility = 'hidden'
    document.querySelector('.loading-initial-content').style.display = 'none'
}

function addGames(){
        startLoading()    
        renderGames(getParams())
}

function getParams(){
    const queryParams = {};

    for (const [key, value] of urlParams.entries()) {
        queryParams[key] = value;
    }

    const params = new URLSearchParams(queryParams).toString()

    return `ordering=${currentOrder}&page=${++currentPage}&${currentFilter}&${params}&page_size=100`
}

function addMoreGames(filters=''){
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

function setOrder(e){
    if(e.target.tagName=='OPTION'){
        currentPage=1
        currentOrder=e.target.value
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
    const filter = urlParams.get('filter')
    title.textContent=filter?filter:'ALL GAMES'
}

setTitle()
sidebarInit()
addGames()
