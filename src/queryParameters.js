
let currentPage=3
let currentOrder='released'
let currentFilter=''

function getParams(){
    const queryParams = {};
    for (const [key, value] of getURLParams().entries()) {
        queryParams[key] = value;
    }
    const params = new URLSearchParams(queryParams).toString()
    return `ordering=${currentOrder}&page=${++currentPage}&${currentFilter}&${params}&page_size=100`
}

function getURLParams(){
    return new URLSearchParams(window.location.search)
}

function getCurrentPage(){
    return currentPage
}

function getCurrentOrder(){
    return currentOrder
}

function getCurrentFilter(){
    return currentFilter
}

function setCurrentPage(pageNum){
    currentPage = pageNum
}

function setCurrentOrder(order){
    currentOrder = order
}

export {
    getParams,
    getURLParams,
    getCurrentPage,
    getCurrentOrder,
    getCurrentFilter,
    setCurrentPage,
    setCurrentOrder
}