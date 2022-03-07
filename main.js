const electron = require("electron");
const store = require('electron-store');
const Store = new store()
let app = electron.app;

// CONFIG
const defaultconfig = {
    "schoology-private-key": "",
    "schoology-public-key": ""
}

// Pre Load
const preload = () => {
    if (Store.get("config") == undefined) {
        Store.set("config", defaultconfig)
    }
}


// Helper functions
const loadPage = (page) => {
    win.loadFile('renderer/pages/' + page)
}
const getConfig = (value) => {
    let current = Store.get("config")
    if (current[value] == undefined) {
        current[value] = defaultconfig[value]
        Store.set("config", current)
    }
    return current[value]
}

// Load Window
let win
const openwindow = () => {
     win = new electron.BrowserWindow({
         minWidth: 1920,
         minHeight: 1080,
         width: 1920,
         height: 1080,
    })
    win.setBackgroundColor('#333')
    win.blur()
    win.focus()
}

// Runs When Ready
app.whenReady().then(() => {
    preload()
    openwindow()
    if (getConfig("schoology-private-key") == "" || getConfig("schoology-public-key") == "") {
        win.loadFile('renderer/main.html')
    }
    win.setMenu(null)
    app.on('activate', () => {
        if (electron.BrowserWindow.getAllWindows().length === 0) load()
    })
})