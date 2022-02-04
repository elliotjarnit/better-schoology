let electron = require("electron");

let app = electron.app;

const loadPage = (page) => {
    win.loadFile('renderer/pages/' + page)
}

let win
const load = () => {
     win = new electron.BrowserWindow({
        width: 800,
        height: 600
    })
}

app.whenReady().then(() => {
    load()
    win.loadFile('renderer/main.html')
})