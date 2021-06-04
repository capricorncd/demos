/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-03 22:17
 */
console.log('window.versions', window.versions)

// Show notifications in the Renderer process
function createNotification() {
  const notification = new Notification('First Notification', {
    body: 'Notification from the Renderer process'
  })

  notification.addEventListener('click', (e) => {
    console.log(e)
    console.log('Notification clicked')
  })

  return notification
}

createNotification()

