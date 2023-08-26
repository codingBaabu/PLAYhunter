
const content = [
    {
    title:'New Releases',
    data:[
        { name:'This Week', queries:getDateQuery(7)}, 
        { name:'Last 30 Days', queries:getDateQuery(30)}, 
        { name:'This Year', queries:getDateQuery(365) }
    ]},
    {
    title:'Platforms',
    data:[
        { name:'PC', queries:'platforms=4'},
        { name:'PlayStation 5', queries:'platforms=187'},
        { name:'Xbox Series S/X', queries:'platforms=186'},
        { name:'Nintendo Switch', queries:'platforms=7'},
        { name:'iOS', queries:'platforms=3'},
        { name:'Android', queries:'platforms=21'},
    ]}, 
    {
    title:'Genres',
    data:[
        { name:'Action', queries:'genres=action'},
        { name:'Fighting', queries:'genres=fighting'},
        { name:'Strategy', queries:'genres=strategy'},
        { name:'RPG', queries:'genres=5'},
        { name:'Shooter', queries:'genres=shooter'},
        { name:'Adventure', queries:'genres=adventure'},
        { name:'Puzzle', queries:'genres=puzzle'},
        { name:'Platformer', queries:'genres=platformer'},
        { name:'Racing', queries:'genres=racing'},
        { name:'Sports', queries:'genres=sports'},
    ]}
]

function getDateQuery(days){
    const today = new Date()
    const previousDate = new Date(today)
    previousDate.setDate(today.getDate()-days)
    return `dates=${previousDate.getFullYear()}-${getLeadingZero(previousDate.getMonth())}-${getLeadingZero(previousDate.getDate())},${today.getFullYear()}-${getLeadingZero(today.getMonth())}-${getLeadingZero(today.getDate())}`
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
            anchor = document.createElement('button')
            anchor.setAttribute('class', 'sidebar-option')
            anchor.setAttribute('data-query', `${cell.queries}&filter=${cell.name}`)
            anchor.textContent = cell.name

            section.appendChild(anchor)
        })

        sidebar.appendChild(section)
    })
}

export default sidebarInit