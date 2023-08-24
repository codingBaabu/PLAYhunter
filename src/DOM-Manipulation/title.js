
import { getURLParams } from '../queryParameters.js'

function setTitle(){
    const title = document.querySelector('.current-order-title')
    const filter = getURLParams().get('filter')
    title.textContent=filter?filter:'ALL GAMES'
}

export {
    setTitle
}