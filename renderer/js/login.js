const app = require("../../main")
let win
function btn1click() {
    console.log("hi")
    win = window.open("https://app.schoology.com/login")
    win.addEventListener('load', loadJS, true);
}

function loadJS() {
    win.document.getElementById("branding").style.display = "none"
}