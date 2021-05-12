/**
 * https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/
 */

const PHONE_KEYS = [null, null, 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']

/**
 * letter combinations
 * @param digits
 */
function letterCombinations (digits) {
  let inputArr = digits.toString().split('').map(d => PHONE_KEYS[d])
  let arr = []
  inputArr.forEach(str => {
    arr = merge(str, arr)
  })
  console.log(arr)
  // console.log(arr.length)
}

/**
 * 合并str与arr元素
 * @param str
 * @param arr
 * @returns {*}
 */
function merge (str, arr) {
  // 初始数组为空时，直接返回str拆分的数组
  if (arr.length === 0) return str.split('')
  // 拆分新的str，与arr中元素合并
  // return Array.prototype.concat.apply([], str.split('').map(s => {
  //   return arr.map(w => w + s)
  // }))
  return [].concat.apply([], arr.map(item => {
    return str.split('').map(s => item + s)
  }))
}

/**
 * **************************************************
 * @param digits
 * **************************************************
 */
function letterCombinations2 (digits) {
  let code = digits.toString().split('').map(d => PHONE_KEYS[d])
  console.log(comb(code))
}

function comb (arr) {
  let tmp = []
  for (let i = 0; i < arr[0].length; i++) {
    for (let j = 0; j < arr[1].length; j++) {
      tmp.push(`${arr[0][i]}${arr[1][j]}`)
    }
  }
  arr.splice(0, 2, tmp)
  if (arr.length > 1) {
    comb(arr)
  } else {
    return tmp
  }
  return arr[0]
}

const TEST_DIGITS = 23

letterCombinations(TEST_DIGITS) // [ 'ad', 'bd', 'cd', 'ae', 'be', 'ce', 'af', 'bf', 'cf' ]
letterCombinations2(TEST_DIGITS)
