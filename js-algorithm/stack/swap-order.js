/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/07 12:24:01 (GMT+0900)
 */
const {Stack} = require('./Stack')

const stack = new Stack()
const arr = [1,2,3,4,5,6]

for (let i = 0; i < arr.length; i++) {
  stack.push(arr[i])
}

while (!stack.isEmpty()) {
  console.log(stack.pop());
}
