/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/26 08:28:38 (GMT+0900)
 */
const express = require('express')
// https://github.com/auth0/node-jsonwebtoken
const jwt = require('jsonwebtoken')

// 私钥，注意隐藏密钥。可使用环境变量来隐藏私钥
// 可用crypto之类的模块来生成随机字符串
const JWT_PRIVATE_KEY = 'AB4CD128EF7GHI233JK3LM5N2123143242KD3JF4LSD2JL'
const PORT = 9528

const app = express()
// 解析JSON
app.use(express.json())

// Database user info
const db = {
  username: 'Stallone',
  password: 'testMD5String'
}

// login and create jwt
app.post('/login', (req, res) => {
  const {username, password} = req.body
  // 实际开发，可用express-validator,joi等依赖来验证用户名和密码
  if (username === db.username && password === db.password) {
    // sign
    jwt.sign(
      {username},
      JWT_PRIVATE_KEY,
      {expiresIn: 3600},
      (err, token) => {
        if (err) {
          res.json({code: 1, message: 'Login failed. ' + err.message})
          return
        }
        // response
        res.json({code: 0, message: 'Login successful', username, token})
      }
    )

    // // response
    // res.json({code: 0, message: 'login successful！', username})
  } else {
    res.json({code: 1, message: 'Login failed'})
  }
})

// logged
app.get('/logged', (req, res) => {
  const headers = req.headers
  const token = headers['authorization'].split(' ')[1]
  jwt.verify(token, JWT_PRIVATE_KEY, {}, (err, payload) => {
    if (err) {
      res.sendStatus(403)
      return
    }
    res.json({code: 0, message: 'Authentication succeeded', payload})
  })
  // console.log(headers)
})

// bind port and listen
app.listen(PORT, () => {
  console.log(`Hi everyone, please note that the ${PORT} port has been requisitioned`)
})
