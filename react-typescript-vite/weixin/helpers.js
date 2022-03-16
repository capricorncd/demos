/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-11 16:17 (GMT+0900)
 */
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const os = require("os");

const devFile = fs.readFileSync(path.resolve(__dirname, "./dev.local"))
const devCfg = {}
if (devFile) {
  devFile.toString().split(os.EOL).forEach(line => {
    if (/(\w+)\s*=(.+)/.test(line)) {
      devCfg[RegExp.$1] = RegExp.$2.trim()
    }
  })
}
console.log(devCfg)

// 加密方法
function sha1(str) {
  var md5sum = crypto.createHash("sha1");
  md5sum.update(str);
  str = md5sum.digest("hex");
  return str;
}

// 验证tonken
function validateToken(req) {
  return new Promise((resolve, reject) => {
    let query = req.query;
    let signature = query.signature;
    let echoStr = query.echostr;
    let timestamp = query.timestamp;
    let nonce = query.nonce;
    let oriArray = new Array(3);
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    // 微信公众号基本配置=>令牌(Token)
    oriArray[2] = devCfg.WX_TOKEN;
    oriArray.sort();
    let original = oriArray.join("");
    let scyptoString = sha1(original);
    if (signature === scyptoString) {
      // 验证通过，返回 echostr
      resolve(echoStr);
    } else {
      reject(false);
    }
  });
}
// 导出验证 Tonken 的发放
module.exports = validateToken;
