/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/07 12:47:31 (GMT+0900)
 *
 * Check if parentheses are paired
 */
const {Stack} = require('./Stack')

const input = '{[(2+8)]}'

const LEFT = ['{', '[', '(']
const RIGHT = ['}', ']', ')']

function checkPair(input) {
  const stack = new Stack()
  let temp
  for (let i = 0; i < input.length; i++) {
    temp = input[i]
    if (LEFT.includes(temp)) {
      stack.push(input[i])
    } else if (RIGHT.includes(temp)) {
      if (temp !== RIGHT[LEFT.indexOf(stack.pop())]) {
        return false
      }
    }
  }
  return stack.isEmpty()
}

console.log(checkPair(input) ? 'It is paired.' : 'It is not pair');

