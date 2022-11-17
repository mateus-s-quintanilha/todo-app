var input = document.getElementById('task')
var ulList = document.querySelector('.list > ul')
var filterLi = document.getElementById('filter')
var doneTasks = document.querySelectorAll('#check-icon-active')
var counter = document.getElementById('counter-score')
var actions = document.querySelectorAll('#actions > span')

counter.innerHTML = doneTasks.length

input.addEventListener("keypress", (e) => {
    if(e.key === 'Enter') {
        let task = input.value

        if(task.slice('').length > 40) {
            alert('Your task can have a maximum of 40 letters')
        } else {
            var defaultMsg = document.getElementById('dft-li')
            defaultMsg.style.display = "none"

            var liItem = createEl('li')
            var divItem = createEl('div')
            var checkIcon = createEl('img')
            var spanTask = createEl('span')

            liItem.draggable = "true"
            divItem.draggable = "true"
            spanTask.draggable = "true"
            checkIcon.draggable = "true"

            var removeIconDiv = createEl('div')
            var removeIcon = createEl('img')
            removeIcon.src = "./images/icon-cross.svg"
            appendEl(removeIcon, removeIconDiv)
            removeIconDiv.setAttribute('class', 'cross-icon')
            

            spanTask.innerHTML = task

            checkIcon.id = "check-icon"
            checkIcon.src = "./images/icon-check.svg"

            divItem.setAttribute('class', 'todo-circle')

            appendEl(checkIcon, divItem)
            appendEl(divItem, liItem)
            appendEl(spanTask, liItem)
            appendEl(removeIconDiv, liItem)

            ulList.insertBefore(liItem, filterLi)
            input.value = ''

            updateCounter()

            let check = liItem.querySelector('.todo-circle')
            check.addEventListener("click", () => {
                if(check.children[0].id == 'check-icon') {
                    check.children[0].id = 'check-icon-active'
                    check.id = 'checked'
                    check.parentNode.id = 'li-checked'
                } else if(check.children[0].id == 'check-icon-active') {
                    check.children[0].id = 'check-icon'
                    check.removeAttribute("id")
                    check.parentNode.removeAttribute("id")
                }
            })

            let remove = liItem.querySelector('.cross-icon')
            remove.addEventListener("click", () => {    
                liItem.remove()
                decreaseCounter()
                if(document.querySelectorAll('li').length < 3) {
                    defaultMsg.style.display = "flex"
                }
            })
        }
    }
})


function createEl(element) {
    return document.createElement(element)
}
function appendEl(sonEl, parentEl) {
    return parentEl.appendChild(sonEl)
}
function updateCounter() {
    counter.innerHTML = parseInt(counter.innerHTML) + 1
}
function decreaseCounter() {
    counter.innerHTML = parseInt(counter.innerHTML) - 1
}


actions.forEach((action) => {
    action.addEventListener("click", (e) => {
        var currentSelected = document.getElementById('action-selected')
        currentSelected.removeAttribute("id")
        var newSelected = e.target
        newSelected.id = "action-selected"

        if(document.getElementById('action-selected').innerHTML == 'All') {
            displayAll()
        } else if (document.getElementById('action-selected').innerHTML == 'Active') {
            displayActive()
        } else if(document.getElementById('action-selected').innerHTML == 'Completed') {
            displayCompleted()
        }
    })
})


function displayAll() {
    var items = document.querySelectorAll('.list ul > li')
    items.forEach((item) => item.style.display = "flex")
}

function displayCompleted() {
    var items = document.querySelectorAll('.list ul > li')
    items.forEach((item) => item.style.display = "flex")
    var itemsArr = Array.from(items)

    var itemsToOcult = itemsArr.filter((item) => item.hasAttribute('id') == false)

    itemsToOcult.map((item) => {
        item.style.display = "none"
    })
}

function displayActive() {
    var items = document.querySelectorAll('.list ul > li')
    items.forEach((item) => item.style.display = "flex")
    console.log(items);
    var itemsArr = Array.from(items)
    var itemsToOcult = itemsArr.filter((item) => item.hasAttribute('id'))
    
    itemsToOcult.map((item) => {
        if(item.id == "li-checked") {
            item.style.display = "none"
        }
    })
}


var clearAllCompleted = document.getElementById('clear-all')
clearAllCompleted.addEventListener("click", () => {
    var items = document.querySelectorAll('.list ul > li')
    items.forEach((item) => item.style.display = "flex")
    var itemsArr = Array.from(items)

    var itemsToDelete = itemsArr.filter((item) => item.id == "li-checked")
    if(itemsToDelete.length >= 1) {
        var answer = confirm("Are you sure that you want to delete all your completed tasks? You'll lose them forever")
        if(answer) {
            itemsToDelete.map((item) => item.remove())
            counter.innerHTML = parseInt(counter.innerHTML) - parseInt(itemsToDelete.length)
        } else {
            return
        }
    }
})


var changeThemeBtn = document.getElementById('change-theme')
let lightTheme = false
changeThemeBtn.addEventListener("click", () => {
    lightTheme = !lightTheme
    if(lightTheme == true) {
        var image = document.getElementById('image')
        image.src = "./images/bg-desktop-light.jpg"
        changeThemeBtn.src="./images/icon-moon.svg"

        var cssLink = document.getElementById('css-link')
        cssLink.href = "./css/style-light-theme.css"


    } else if(lightTheme == false) {
        var image = document.getElementById('image')
        image.src = "./images/bg-desktop-dark.jpg"
        changeThemeBtn.src="./images/icon-sun.svg"
        var cssLink =document.getElementById('css-link')
        cssLink.href="./css/style.css"
    }
})


const ulCol = document.querySelector('ul')

document.addEventListener("dragstart", (e) => {
    e.target.classList.add("dragging")
})

document.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging")
})

ulCol.addEventListener("dragover", (e) => {
    const dragging = document.querySelector(".dragging")
    const applyAfter = getNewPosition(ulCol, e.clientY)

    if(applyAfter) {
        applyAfter.insertAdjacentElement("afterend", dragging)
    } else {
        ulCol.prepend(dragging)
    }
})

function getNewPosition(column, posY) { 
    const cards = column.querySelectorAll('li:not(#filter)')
    let result;

    for(let refer_card of cards) {
        const box = refer_card.getBoundingClientRect()
        const boxCenterY = box.y + box.height / 2

        if(posY >= boxCenterY) {
            result = refer_card
        }
    }

    return result

}