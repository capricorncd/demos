/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/07 12:47:31 (GMT+0900)
 *
 * Check if parentheses are paired
 */
import {Stack} from  './Stack'

// const input = '{[(2+8)]}'

const LEFT = ['{', '[', '(']
const RIGHT = ['}', ']', ')']

function checkPair(input: string): boolean {
  const stack = new Stack<string>()
  let temp
  for (let i = 0; i < input.length; i++) {
    temp = input[i]
    if (LEFT.includes(temp)) {
      stack.push(input[i])
    } else if (RIGHT.includes(temp)) {
      const cur = stack.pop()
      if (!cur || temp !== RIGHT[LEFT.indexOf(cur)]) {
        return false
      }
    }
  }
  return stack.isEmpty()
}

// console.log(checkPair(input) ? 'It is paired.' : 'It is not pair');

export {
  checkPair
}
