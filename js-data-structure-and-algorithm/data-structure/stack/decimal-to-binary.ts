/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/08 12:11:01 (GMT+0900)
 *
 * Decimal to Binary
 * 十进制转二进制
 * 10進数から2進数
 */
import {Stack} from './Stack'

/**
 * Decimal to Binary
 * @param input number
 * @returns {string} binary string
 */
function decimalToBinary(input: number): string {
  const stack = new Stack<number>()

  // push
  while (input > 0) {
    stack.push(input % 2)
    input = Math.floor(input / 2)
  }

  // pop
  const binaries = []
  while (!stack.isEmpty()) {
    binaries.push(stack.pop())
  }

  return binaries.join('')
}

export {
  decimalToBinary
}
