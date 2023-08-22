import getGames from './rawgCall.js'
import { initColcade, getSmallestColumn } from './masonry.js'

window.addEventListener('scroll', addGames)
document.addEventListener('DOMContentLoaded', initColcade)

let currentPage=1
let colcade

function addGames(){
    if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight){
        const svg = document.getElementById('linear')
        svg.style.visibility = 'visible'
        
        document.querySelector('.loading-more-content').style.display = 'flex'
        
        for(let i = currentPage ; i < currentPage + 3; i++){
            renderGames(`ordering=released&page=${i}`, i-currentPage+1)
        }
        currentPage+=3
    }
}

async function renderGames(params, cPage){
    const rawGamesList = await getGames(params)
    const gamesList = rawGamesList.filter(game=>game.background_image!=null)

    gamesList.forEach(game=>{
            let block = document.createElement('article')
            block.setAttribute('class', 'card')
            block.appendChild(getGameImageHTML(game))
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

addGames()