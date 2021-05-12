/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-04-12 21:28
 */
const NUMBERS = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]
const UNITS = ["", "十", "百", "千", "万", "十万", "百万", "千万", "億"]
const SP_TEXTS = ["一十", "一百"]
const ZERO = "0"

function toChineseNumeral(num) {
  return String(num)
    .split("")
    .reverse()
    .map((s, i) => {
      return NUMBERS[s] + (s === ZERO ? "" : UNITS[i])
    })
    .reverse()
    .join("")
    .replace(/零+$/, "")
    .replace(/零+/, "零")
}

/**
 * to JP
 * https://www.sljfaq.org/cgi/numbers_ja.cgi?number=11010
 * @param num
 * @return {string}
 */
function toJPChineseNumeral(num) {
  let temp
  return String(num)
    .split("")
    .reverse()
    .map((s, i) => {
      temp =  s === ZERO ? "" : (NUMBERS[s] + UNITS[i])
      return SP_TEXTS.includes(temp) ? temp.substring(1) : temp
    })
    .reverse()
    .join("")
}

console.log(toChineseNumeral(5078)) // 五千零七十八
console.log(toChineseNumeral(50)) // 五十
console.log(toChineseNumeral(220)) // 二百二十
console.log(toChineseNumeral(119)) // 一百一十九
console.log(toChineseNumeral(200)) // 二百
console.log(toChineseNumeral(4000)) // 四千
console.log(toChineseNumeral(50010)) // 五万零一十
console.log(toChineseNumeral(11010)) // 一万一千零一十
console.log(toChineseNumeral(520)) // 五百二十
console.log('')
console.log('JP========')
console.log(toJPChineseNumeral(5078)) // 五千七十八
console.log(toJPChineseNumeral(50)) // 五十
console.log(toJPChineseNumeral(220)) // 二百二十
console.log(toJPChineseNumeral(119)) // 百十九
console.log(toJPChineseNumeral(200)) // 二百
console.log(toJPChineseNumeral(4000)) // 四千
console.log(toJPChineseNumeral(50010)) // 五万十
console.log(toJPChineseNumeral(11010)) // 一万一千十
console.log(toJPChineseNumeral(520)) // 五百二十
