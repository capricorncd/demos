/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-11 16:27 (GMT+0900)
 */
const express = require("express");
const router = express.Router(); // 配置路由模块
const validateToken = require("./helpers");

// get请求验证tonken有效性
router.get("/wx", (req, res) => {
  validateToken(req).then((t) => {
    res.send(t);
  }).catch(err => {
    res.send(err);
  })
});
// 导出 router
module.exports = router;
