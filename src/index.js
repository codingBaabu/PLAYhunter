import { getGames, getGameDetails } from './rawgCall.js'
import { initColcade, getSmallestColumn } from './masonry.js'
import { startLoading, stopLoading } from './DOM-Manipulation/loading.js'
import { getParams, setCurrentPage, setCurrentOrder } from './queryParameters.js'
import { getGameImageHTML, getGameTitleHTML, getGameRatingHTML } from './DOM-Manipulation/generateCardContent.js'
import sidebarInit from './DOM-Manipulation/sidebar.js'
import { clearGames, getIsEmptyGames } from './DOM-Manipulation/emptyGames.js'
import { setTitle } from './DOM-Manipulation/title.js'

document.querySelector('.order-dropdown')
    .addEventListener('click', orderSelected)
window.addEventListener('scroll', addMoreGames)
document.addEventListener('DOMContentLoaded', initColcade)
document.querySelector('.games').addEventListener('click', redirect)

async function redirect(e){
    const id = e.target.parentElement.dataset.id
    if(id){
        const details = await getGameDetails(id)
        if(details.website){
            window.open(details.website, '_blank')            
        } else {
            window.open(`https://www.google.com/search?q=${details.name} video game`, '_blank')            
        }
    }
}

function orderSelected(e){
    if(e.target.tagName=='OPTION'){
        setCurrentPage(1)
        setCurrentOrder(e.target.value)
        clearGames()
        addGames()
    }
}

function addMoreGames(){
    if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight && getIsEmptyGames()==false){
        startLoading()    
        renderGames(getParams())
    }
}

function addGames(){
    startLoading()    
    renderGames(getParams())
}

async function renderGames(params){
    const rawGamesList = await getGames(params)
    const gamesList = rawGamesList.filter(game=>game.background_image!=null)
    gamesList.forEach(game=>{
            let block = document.createElement('article')
            block.setAttribute('class', 'card')
            block.setAttribute('data-id', game.id)
            block.appendChild(getGameImageHTML(game))
            block.appendChild(getGameRatingHTML(game)) 
            block.appendChild(getGameTitleHTML(game))

            getSmallestColumn().appendChild(block)
    })
    stopLoading()
}

setTitle()
sidebarInit()
addGames()
