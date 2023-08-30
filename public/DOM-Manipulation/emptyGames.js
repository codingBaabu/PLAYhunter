
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

export {
    clearGames,
    getIsEmptyGames
}