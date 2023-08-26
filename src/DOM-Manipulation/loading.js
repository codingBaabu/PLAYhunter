
//Appropriate loading animation is started and stopped depending on content that is loading
//Both the svg and it's container are altered for a given loading state

function startLoading(){
    disable()
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
    enable()
    document.getElementById('linear').style.visibility = 'hidden'
    document.getElementById('spinner').style.visibility = 'hidden'
    document.querySelector('.loading-initial-content').style.display = 'none'
}

//Don't want user to click on sidebar/dropdown option if response is pending
function disable(){
    document.querySelectorAll('.dd-option').forEach(option=>{
        option.disabled = true;
    })

    document.querySelectorAll('.sidebar-option').forEach(button=>{
        button.disabled = true;
    })
}

//Response received. User can click on sidebar/dropdown
function enable(){
    document.querySelectorAll('.sidebar-option').forEach(option=>{
        option.disabled = false;
    })

    document.querySelectorAll('.dd-option').forEach(button=>{
        button.disabled = false;
    })
}

export {
    startLoading,
    stopLoading
}