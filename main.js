let electron = require("electron");

let app = electron.app;

const loadPage = (page) => {
    win.loadFile('renderer/pages/' + page)
}

let win
const load = () => {
     win = new electron.BrowserWindow({
         minWidth: 1920,
         minHeight: 1080,
         width: 1920,
         height: 1080
    })
}

app.whenReady().then(() => {
    load()
    win.loadFile('renderer/main.html')
    win.setMenu(null)
    app.on('activate', () => {
        if (electron.BrowserWindow.getAllWindows().length === 0) load()
    })
})