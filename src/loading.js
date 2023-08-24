
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

export {
    startLoading,
    stopLoading
}