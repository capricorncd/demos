/**
 * 难度打的算法题目如何解：
 * 算法本质是寻找规律并实现
 *
 * 如何找到规律：
 * 发现输入和输出的关系，寻找突破点
 *
 * 复杂的实现怎么办：
 * 实现是程序（if-else）+ 数据结构的结合体
 */

/**
 * count-binary-substrings
 * https://leetcode-cn.com/problems/count-binary-substrings/
 * @param str
 */
function countBinarySubstrings (str) {
  let tmp
  let total = 0
  let arr = str.split('')
  let len = arr.length
  for (let i = 0; i < len; i++) {
    tmp = [arr[i]]
    for (let j = i + 1; j < len; j++) {
      if (tmp.includes(arr[j])) {
        tmp.push(arr[j])
      } else {
        check(tmp.slice(0), arr.slice(j))
        break
      }
    }
  }

  function check (origin, target) {
    // 非必须项，为输出准备
    // let tmp = origin.slice()
    let len = origin.length
    let count = 0
    for (let i = 0; i < target.length; i++) {
      if (!origin.includes(target[i])) {
        count++
        // tmp.push(target[i])
        if (count === len) {
          total++
          break
        }
      } else {
        break
      }
    }
    // console.log(tmp.join(''))
  }
  console.log(total)
}


function countBinarySubstrings2 (str) {
  let result = []
  let tmp
  for (let i = 0; i < str.length - 1; i++) {
    tmp = match(str.slice(i))
    if (tmp) result.push(tmp)
  }
  console.log(result)
  console.log(result.length)
}

function match (str) {
  let start = str.match(/0+|1+/)[0]
  // console.log(start)
  let contrary = (start[0] ^ 1).toString().repeat(start.length)
  let target = start + '' + contrary
  let reg = new RegExp(`^(${target})`)
  return reg.test(str) ? target : null
}

const TEST_BIN = '00110011'
const TEST_BIN2 = '10101'

countBinarySubstrings(TEST_BIN)
countBinarySubstrings(TEST_BIN2)
countBinarySubstrings2(TEST_BIN)
countBinarySubstrings2(TEST_BIN2)
