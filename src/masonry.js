let colcade

function initColcade(){
    var grid = document.querySelector('.games'); 
    colcade = new Colcade(grid, {
        columns: '.grid-col',
        items: '.card'
  });
}

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