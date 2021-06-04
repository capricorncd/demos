/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-04 21:58
 */
const { app, BrowserWindow, Notification } = require('electron')
const path = require('path')

// Show notifications in the Main process
function createNotification() {
  console.log('createNotification')
  const notification = new Notification({
    title: 'Notification Tile',
    body: 'This notification from main process',
  })
  notification.show()
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 640,
  })

  win.loadFile(path.join(__dirname, '../../index.html'))

  // Open the DevTools.
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows()) createWindow()
  })

  setTimeout(createNotification, 3000)
})

app.on('window-all-closed', () => {
  if (process.platform === 'darwin') app.quit()
})
