
const content = [
    {
    title:'New Releases',
    data:[
        { name:'This Week', href:getDateQuery(7)}, 
        { name:'Last 30 Days', href:getDateQuery(30)}, 
        { name:'This Year', href:getDateQuery(365) }
    ]},
    {
    title:'Platforms',
    data:[
        { name:'PC', href:'?platforms=4'},
        { name:'PlayStation 5', href:'?platforms=187'},
        { name:'Xbox Series S/X', href:'?platforms=186'},
        { name:'Nintendo Switch', href:'?platforms=7'},
        { name:'iOS', href:'?platforms=3'},
        { name:'Android', href:'?platforms=21'},
    ]}, 
    {
    title:'Genres',
    data:[
        { name:'Action', href:'?genres=action'},
        { name:'Strategy', href:'?genres=strategy'},
        { name:'RPG', href:'?genres=rpg'},
        { name:'Shooter', href:'?genres=shooter'},
        { name:'Adventure', href:'?genres=adventure'},
        { name:'Puzzle', href:'?genres=puzzle'},
        { name:'Racing', href:'?genres=racing'},
        { name:'Sports', href:'?genres=sports'},
    ]}
]

function getDateQuery(days){
    const today = new Date()
    const previousDate = new Date(today)
    previousDate.setDate(today.getDate()-days)
    return `?dates=${previousDate.getFullYear()}-${getLeadingZero(previousDate.getMonth())}-${getLeadingZero(previousDate.getDate())},${today.getFullYear()}-${getLeadingZero(today.getMonth())}-${getLeadingZero(today.getDate())}`
}

function getLeadingZero(date){
    return date<10?`0${date}`:date
}

function sidebarInit(){
    const sidebar = document.querySelector('.sidebar')

    content.forEach(block=>{
        let anchor
        const section = document.createElement('section')
        section.setAttribute('class', 'sidebar-content')

        const heading = document.createElement('h2')
        heading.setAttribute('class', 'sidebar-option-header')
        heading.textContent=block.title

        section.appendChild(heading)

        block.data.forEach(cell=>{
            anchor = document.createElement('a')
            anchor.setAttribute('class', 'sidebar-option')
            anchor.setAttribute('href', `${cell.href}&filter=${cell.name}`)
            anchor.textContent = cell.name

            section.appendChild(anchor)
        })

        sidebar.appendChild(section)
    })
}

export default sidebarInit