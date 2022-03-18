/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/07 12:24:01 (GMT+0900)
 */
import {Stack} from './Stack'

const stack = new Stack<number>()
const arr = [1,2,3,4,5,6]

for (let i = 0; i < arr.length; i++) {
  stack.push(arr[i])
}

while (!stack.isEmpty()) {
  console.log(stack.pop());
}
