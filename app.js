

// <============ DOM elements ============>


const jeu = document.getElementById("jeu")
const settingsBut = document.getElementById("settingsBut")
//const actionBut = document.getElementById("actionBut")
const clearBut = document.getElementById("clearBut")
const backBut = document.getElementById("backBut")
const screenBut = document.getElementById("screenBut")
const resetSettingsBut = document.getElementById("resetSettingsBut")
const color0 = document.getElementById("color0")
const color1 = document.getElementById("color1")
const color2 = document.getElementById("color2")
const borderSize = document.getElementById("borderSize")


// <============ eventListener ============>


jeu.addEventListener("click", eventBox)
settingsBut.addEventListener("click", eventSettings)
//actionBut.addEventListener("click", eventAction)
clearBut.addEventListener("click", eventClear)
backBut.addEventListener("click", eventBack)
screenBut.addEventListener("click", eventScreen)
resetSettingsBut.addEventListener("click", eventResetSettings)
color0.addEventListener("change", changeColor0)
color1.addEventListener("change", changeColor1)
color2.addEventListener("change", changeColor2)
borderSize.addEventListener("change", changeBorderSize)
borderColor.addEventListener("change", changeBorderColor)
document.addEventListener("keydown", eventPress);


// <============ global variables ============>


let edit = true
let z = 3;
let first = true
let wW = window.innerWidth
let wH = window.innerHeight
let boxStack = [jeu]

changeColor0()
changeColor1()
changeColor2()
changeBorderSize()
changeBorderColor()


document.onkeydown = eventPress;

// <============ auto edit ============>


/* init(1000)

function init(n){
    
    for(let i = 0 ; i < n ; i++){
        document.elementFromPoint(getRndInteger(0,wW), getRndInteger(0,wH)).click();
    }
} */

/* setInterval(()=>{
    let els = document.querySelectorAll(".box")
    let el  = els[Math.floor(Math.random()*els.length)]
    wW = window.innerWidth
    wH = window.innerHeight
    el.click();
},50) */


// <============ event functions ============>


function eventBox() {
    editBox(first ? jeu : this)

}


function eventSettings() {
    let settings = document.getElementById("settings")
    settings.classList.toggle("invisible")
    settings.classList.toggle("disable")
}

function eventAction() {
    edit = !edit
    this.firstElementChild.setAttribute("src", "imgs/" + (edit ? "edit" : "erase") + ".svg")
}

function eventBack() {
    if (boxStack.length > 2) {
        let box = boxStack.pop()
        box.innerText = ''
        box.classList.remove('disable')
        box.addEventListener("click", eventBox);
    } else {
        eventClear()
    }
}

function eventClear() {
    jeu.innerText = ''
    jeu.addEventListener("click", eventBox)
    z = 3;
    document.documentElement.style.setProperty('--z-index-div', z + 2);
    if (typeof variable !== 'undefined') {
        this.classList.toggle("rotate")
    }
}

function eventScreen() {

    html2canvas(jeu).then(canvas => {
        var dataURL = canvas.toDataURL("image/png");
        var newTab = window.open('about:blank','image from canvas');
        //localStorage.setItem("imgData", dataURL);
        newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");

    });

}

function eventResetSettings() {
    color0.value = "#ECE5F0"
    color1.value = "#EEC643"
    color2.value = "#7FD1B9"
    borderSize.value = 5
    borderColor.value = "#000000"
    changeColor0()
    changeColor1()
    changeColor2()
    changeBorderSize()
    changeBorderColor()
}

let pressAllow = true
function eventPress(event) {
    if (event.ctrlKey && event.key === "z") {
        if (pressAllow) {
            eventBack()
            pressAllow = false
            setTimeout(() => {
                pressAllow = true
            }, 200)
        }
    }
}

// <============ other ============>


function editBox(e) {

    if (first) {
        first = false
        e.innerText = ''
        e.classList.remove("first")
    }
    let type = getRndBool(0.4)
    if (e.offsetWidth > e.offsetHeight * 3) {
        type = 0
    } else if (e.offsetWidth * 3 < e.offsetHeight) {
        type = 1
    }
    e.style.flexDirection = type ? "column" : "row"
    let boxs = createBoxs(type)
    z++
    document.documentElement.style.setProperty('--z-index-div', z + 2);
    e.removeEventListener("click", eventBox, false);
    e.appendChild(boxs[0])
    e.appendChild(boxs[1])
    boxStack.push(e)
}

function createBoxs(type) {
    let b1 = document.createElement('div')
    let b2 = document.createElement('div')
    b1.classList.add('box')
    b2.classList.add('box')
    b1.classList.add(type ? "haut" : "gauche")
    b2.classList.add(type ? "bas" : "droite")
    b1.addEventListener("click", eventBox)
    b2.addEventListener("click", eventBox)
    b1.style.flexGrow = getRndInteger(1, 10)
    b2.style.flexGrow = getRndInteger(1, 10)
    b1.style.zIndex = z;
    b2.style.zIndex = z;
    let colors = getColors()
    b1.classList.add(colors[0])
    b2.classList.add(colors[1])
    return [b1, b2]
}

function getColor() {
    let r = getRndInteger(0, 9)
    if (r < 5) {
        return "color1"
    } else if (r < 7) {
        return "color2"
    } else {
        return "color3"
    }
}

function getColors() {
    let ret = [getColor(), getColor()]
    ret[getRndBool(0.5) ? 1 : 0] = "color1";
    return ret

}

function changeColor0() {
    document.documentElement.style.setProperty('--color0', color0.value);
}

function changeColor1() {
    document.documentElement.style.setProperty('--color1', color1.value);
}

function changeColor2() {
    document.documentElement.style.setProperty('--color2', color2.value);
}

function changeBorderSize() {
    document.documentElement.style.setProperty('--borderSize', borderSize.value + "px");
}

function changeBorderColor() {
    document.documentElement.style.setProperty('--borderColor', borderColor.value);
}

function getRndBool(s) {
    return Math.random() < s
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

