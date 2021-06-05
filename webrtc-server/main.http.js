/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-05 15:01:55
 */
const http = require('http')

const PORT = 8080
const IP = '0.0.0.0'

const app = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  })
  res.end('Hello world')
})

app.listen(PORT, IP)
