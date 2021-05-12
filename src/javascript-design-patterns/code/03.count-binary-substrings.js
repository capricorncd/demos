/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-04-17 18:51
 *
 * string
 *
 * input: '00110011'
 * output: 6
 * 有6个子串具有相同数量的连续1和0：0011, 01, 1100, 10, 0011, 01.
 */
const input = '00110011'
const input2 = '10101'

function findWidthMatch(str) {
  const arr = []
  let subStr, matchStr, contraryStr, target
  for (let i = 0; i < str.length - 1; i++) {
    subStr = str.slice(i)
    matchStr = subStr.match(/0+|1+/)[0]
    contraryStr = String(matchStr[0] ^ 1).repeat(matchStr.length)
    target = matchStr + contraryStr
    if (subStr.startsWith(target)) {
    // if (subStr.match(target)) {
      arr.push(target)
    }
  }
  return arr
}

const result = findWidthMatch(input)
console.log(result.length, result)

const result2 = findWidthMatch(input2)
console.log(result2.length, result2)
