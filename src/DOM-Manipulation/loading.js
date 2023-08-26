
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

function disable(){
    document.querySelectorAll('.dd-option').forEach(option=>{
        option.disabled = true;
    })

    document.querySelectorAll('.sidebar-option').forEach(button=>{
        button.disabled = true;
    })
}

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