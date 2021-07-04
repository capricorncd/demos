/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-29 19:43 (GMT+0900)
 */
const http = require('http')
const {resolve} = require('path')
const fs = require('fs')
const { formatParams, createResponseData } = require('./helpers')

const PORT_HTTP = 8080
// const PORT_HTTPS = 443
const IP = '0.0.0.0'

const server = http.createServer((req, res) => {
  console.log(req.url, req.method)

  const [urlPath, search] = req.url.split('?')

  let reqParams
  req.on('data', chunk => {
    reqParams = chunk.toString()
  })
  req.on('end', () => {
    if (req.method === 'GET') {
      reqParams = search
    }
    console.log(reqParams) // 数据传输完，打印数据的内容
    const responseData = createResponseData(urlPath, formatParams(reqParams))

    res.writeHead(200, {'Content-Type': 'application/json'})
    // const json = fs.readFileSync(resolve(__dirname, `./data/${urlPath.split('/').filter(w => w).join('-')}.json`)).toString()
    res.end(JSON.stringify(responseData))
  })
})

server.listen(PORT_HTTP, IP)
