'use strict'

const http = require('http')
const express = require('express')
const serveIndex = require('serve-index')
const socketIO = require('socket.io')
const log4js = require('log4js')
const chalk = require('chalk')

// const log4jsConfig = require('./log4js-config')
// log4js.configure(log4jsConfig)
// const logger = log4js.getLogger()

const PUBLIC_DIR = './public'
const HTTP_PORT = 8000
// const HTTPS_PORT = 443
const LOCAL_IP = '0.0.0.0'

const app = express()
app.use(serveIndex(PUBLIC_DIR))
app.use(express.static(PUBLIC_DIR))

// http server
const httpServer = http.createServer(app)
// bind io with httpServer
const io = socketIO(httpServer)
httpServer.listen(HTTP_PORT, LOCAL_IP)

console.log(chalk.green(`launch server, at ${LOCAL_IP}:${HTTP_PORT}`))

io.on('connection', socket => {
  console.log('socket.io is connected')
  socket.on('chat message', data => {
    io.emit('chat message', data)
  })
})
