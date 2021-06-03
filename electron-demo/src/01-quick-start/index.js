/*
 * @Author: Capricorncd
 * @Date:   2021-06-03 21:31:13
 * @Github: https://github.com/capricorncd
 */
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  win.loadFile(path.join(__dirname, '../../index.html'))

  // Open the DevTools.
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  console.log('ready')
  createWindow()

  // macOS
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    console.log('activate')
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  console.log('window-all-closed')
  if (process.platform !== 'darwin') app.quit()
})
