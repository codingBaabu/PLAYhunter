
let colcade

function initColcade(){
    var grid = document.querySelector('.games'); 
    colcade = new Colcade(grid, {
        columns: '.grid-col',
        items: '.card'
  });
}

//Masonry layout means uneven ends of columns. Can get ugly
//This function Looks at height of each of four column elements
//Lowest height? Smallest column. Best pick for a card that needs to be added
function getSmallestColumn(){
    let columns = document.querySelectorAll('.grid-col')
    let smallestColumn = columns[0]

    columns.forEach(column=>{
        if(column.offsetHeight < smallestColumn.offsetHeight){
            smallestColumn = column           
        }
    })

    return smallestColumn
}

export {
    initColcade,
    getSmallestColumn
}