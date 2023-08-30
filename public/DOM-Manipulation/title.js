
import { getURLParams } from '../queryParameters.js'

function setTitle(){
    const currentOrderTitle = document.querySelector('.current-order-title')
    const title = document.getElementsByTagName('title')[0]
    
    const filter = getURLParams().get('filter')
    
    currentOrderTitle.textContent=filter?filter:'ALL GAMES'
    title.textContent=filter?filter+` | PLAYhunter`:'PLAYhunter'
}

export {
    setTitle
}