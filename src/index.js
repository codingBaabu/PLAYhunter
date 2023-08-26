
//Imports
import { getGames, getGameDetails } from './rawgCall.js'
import { initColcade, getSmallestColumn } from './masonry.js'
import { startLoading, stopLoading } from './DOM-Manipulation/loading.js'
import { getParams, setCurrentPage, setCurrentOrder } from './queryParameters.js'
import { getGameImageHTML, getGameTitleHTML, getGameRatingHTML, getGameGenresHTML } from './DOM-Manipulation/generateCardContent.js'
import sidebarInit from './DOM-Manipulation/sidebar.js'
import { clearGames, getIsEmptyGames } from './DOM-Manipulation/emptyGames.js'
import { setTitle } from './DOM-Manipulation/title.js'

//EventListeners
window.addEventListener('scroll', addMoreGames)
document.querySelector('.order-dropdown').addEventListener('change', orderSelected)
document.addEventListener('DOMContentLoaded', initColcade)
document.querySelector('.games').addEventListener('click', redirect)
document.querySelector('.sidebar').addEventListener('click', filterSelected)
document.querySelector('.current-order-title').addEventListener('click', toggleSidebar)

//EventListener functions
function addMoreGames(){
    if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight && getIsEmptyGames()==false){
        startLoading()    
        renderGames(getParams())
    }
}

function orderSelected(e){
        setCurrentPage(1)
        setCurrentOrder(e.target.value)
        clearGames()
        addGames()
}

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
    const query = e.target.dataset.query    //returns a query stored in a created object in sidebar.js e.g. genres=action&filter=Action
    if(query){
        let baseURL = window.location.origin + window.location.pathname
        let filter = query.split('&')
        let queries = { //breaks down aforementioned query into a format usable to add query to URL as multiple parameters
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

function toggleSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.toggle('hidden')
}

//Functions to add games on page load and render game content as user interacts with app
function addGames(){
    startLoading()    
    renderGames(getParams())
}

async function renderGames(params){
    const rawGamesList = await getGames(params)
    if(rawGamesList){
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
    
        document.querySelectorAll('.card').forEach(card=>{
            card.classList.add('card-transition')
        })    
    } else {
        stopLoading()
    }
}

setTitle()
sidebarInit()
addGames()