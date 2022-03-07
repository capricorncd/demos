/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/07 12:34:11 (GMT+0900)
 *
 * Stack
 * LIFO，last-in-first-out
 */
class Stack {
  constructor() {
    this._items = []
  }

  push(item) {
    this._items.push(item)
  }

  pop() {
    return this._items.pop()
  }

  isEmpty() {
    return this.size() === 0
  }

  size() {
    return this._items.length
  }
}

exports.Stack = Stack
