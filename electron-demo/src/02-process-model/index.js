/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-03 22:33
 */
const { app, BrowserWindow } = require('electron')
const path = require('path')

function init() {
  const win = new BrowserWindow({
    width: 1200,
    height: 640,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadURL('https://github.com/capricorncd')
  const webContents = win.webContents
  console.log(webContents)

  // Open the DevTools.
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  init()
  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows()) init()
  })
})

app.on('window-all-closed', () => {
  if (process.platform === 'darwin') app.quit()
})
