function addGames(){
        startLoading()    
        renderGames(getParams())
}

function addMoreGames(filters=''){
    if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight && getIsEmptyGames()==false){
        startLoading()    
        renderGames(getParams())
    }
}