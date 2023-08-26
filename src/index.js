import { getGames, getGameDetails } from './rawgCall.js'
import { initColcade, getSmallestColumn } from './masonry.js'
import { startLoading, stopLoading } from './DOM-Manipulation/loading.js'
import { getParams, setCurrentPage, setCurrentOrder } from './queryParameters.js'
import { getGameImageHTML, getGameTitleHTML, getGameRatingHTML, getGameGenresHTML } from './DOM-Manipulation/generateCardContent.js'
import sidebarInit from './DOM-Manipulation/sidebar.js'
import { clearGames, getIsEmptyGames } from './DOM-Manipulation/emptyGames.js'
import { setTitle } from './DOM-Manipulation/title.js'

document.querySelector('.order-dropdown')
    .addEventListener('click', orderSelected)
window.addEventListener('scroll', addMoreGames)
document.addEventListener('DOMContentLoaded', initColcade)
document.querySelector('.games').addEventListener('click', redirect)
document.querySelector('.sidebar').addEventListener('click', filterSelected)

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

function filterSelected(e){
    const query = e.target.dataset.query
    if(query){
        let baseURL = window.location.origin + window.location.pathname
        let filter = query.split('&')
        let queries = {
            [filter[0].split('=')[0]]:filter[0].split('=')[1],
            [filter[1].split('=')[0]]:filter[1].split('=')[1]
        }

        let queryString = Object.keys(queries).map((key)=>{
            return encodeURIComponent(key) + '=' + encodeURIComponent(queries[key])
        }).join('&')

        let newURL = baseURL + '?' + queryString

        window.history.pushState({path:newURL}, '', newURL)
        setTitle()

        clearGames()
        addGames()
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
            block.appendChild(getGameGenresHTML(game))
        
            getSmallestColumn().appendChild(block)
    })
    stopLoading()
}

setTitle()
sidebarInit()
addGames()
