const electron = require("electron");
const store = require('electron-store');
const Store = new store()
let app = electron.app;
let width, height

// CONFIG
const defaultconfig = {
    "schoology-private-key": "",
    "schoology-public-key": "",
    "custom-domain": "default"
}

// COLORS

const colors  = {
    "primary": "#00B4D8",
    "secondary": "#40434E",
}

// Pre Load
const preload = () => {
    if (Store.get("config") == undefined) {
        Store.set("config", defaultconfig)
    }
    height = electron.screen.getPrimaryDisplay().workAreaSize.height;
    width = electron.screen.getPrimaryDisplay().workAreaSize.width;
}


// Helper functions
const loadPage = (page) => {
    win.loadFile('renderer/pages/' + page + '.html')
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
         webPreferences: {
             nodeIntegration: true,
             contextIsolation: false
         },
         minWidth: Math.round(width * 0.9),
         minHeight: Math.round(height * 0.9),
         width: width,
         height: height,
    })
    win.setBackgroundColor('#333')
}

// Runs When Ready
app.whenReady().then(() => {
    preload()
    console.log(width)
    console.log(height)
    openwindow()
    if (getConfig("schoology-private-key") == "" || getConfig("schoology-public-key") == "") {
        loadPage("login")
    }
    win.setMenu(null)
    app.on('activate', () => {
        if (electron.BrowserWindow.getAllWindows().length === 0) load()
    })
})

module.exports = {}