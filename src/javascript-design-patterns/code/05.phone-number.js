/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-04-28 21:36
 *
 * array
 *
 * 电话号码的组合：公式运算
 * input: 23
 * output: ad ae af bd be bf cd ce cf
 */
// tel keyboard
const telKeyBoard = {
  1: '',
  2: 'abc',
  3: 'def',
  4: 'ghi',
  5: 'jkl',
  6: 'mno',
  7: 'pqrs',
  8: 'tuv',
  9: 'wxyz',
  0: '',
}

function calcOutput(input) {
  let arr = []

  function createSutStr(arr1, arr2) {
    const result = []
    arr1.forEach(s => {
      arr2.forEach(_s => {
        result.push(s + _s)
      })
    })
    return result
  }

  input.split('').map(s => telKeyBoard[s]).forEach(str => {
    if (arr.length === 0) {
      arr.push(...str.split(''))
    } else {
      arr = createSutStr(arr, str.split(''))
    }
  })
  return arr
}

function compose(arr) {
  const temp = []
  if (arr.length > 1) {
    arr[0].forEach(str => {
      arr[1].forEach(s => {
        temp.push(str.concat(s))
      })
    })
    arr.splice(0, 2, temp)
    compose(arr)
  }
  return arr
}

function calcWithSplice(input) {
  const arr = []
  input.split('').forEach(s => {
    // 获取字母 2=>abc
    const temp = telKeyBoard[s]
    // 将字母字符串转为数组abc=>[a, b, c]
    if (temp) arr.push(temp.split(''))
  })
  return compose(arr)[0]
}

console.log(calcOutput('239'))
console.log(calcWithSplice('239'))
console.log(calcOutput('239').join('') === calcWithSplice('239').join(''))
