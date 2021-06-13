/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-09 21:04
 */
const { Server } = require('socket.io')

let count = 0
let maxCount = 0

function initSocketIO(server) {
  const io = new Server(server)

  io.on('connection', socket => {
    // connection
    console.log('a user connected', socket.id)
    count++
    maxCount++
    io.emit('request', { type: 'count', count: [count, maxCount] })

    // disconnect
    socket.on('disconnect', () => {
      console.log(socket.id, ' disconnected')
      count--
      io.emit('request', { type: 'count', count: [count, maxCount] })
    })

    // emit an event to the socket
    // socket.emit('request' /* … */)

    // listen to the event
    socket.on('reply', (data) => {
      // console.log('from client:', data)
      // data.date = new Date().toLocaleString()
      io.emit('request', data)
      // socket.emit('request', data)
      // socket.broadcast.emit('request', data)
    })
  })
}

module.exports = {
  initSocketIO
}
