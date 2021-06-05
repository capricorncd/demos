/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-05 16:02:23
 */
const https = require('https')
const fs = require('fs')

const PORT = 443
const IP = '0.0.0.0'

const options = {
  key: fs.readFileSync('./cert/100000_www.it-factory.cn.key'),
  cert: fs.readFileSync('./cert/100000_www.it-factory.cn.pem')
}

const app = https.createServer(options, (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  })
  res.end('Hello world')
})

app.listen(PORT, IP)
