/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-11 15:58 (GMT+0900)
 */
const express = require("express");
const app = express();
const path = require("path");
const weChat = require(path.resolve(__dirname, "./weChat"));

app.use(weChat);

app.listen(8088, () => {
  console.log("running 127.0.0.1:8088");
});
