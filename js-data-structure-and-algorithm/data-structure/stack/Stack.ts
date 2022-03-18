/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/07 12:34:11 (GMT+0900)
 *
 * Stack
 * LIFO，last-in-first-out
 */
export class Stack<T> {
  private _items: T[];

  constructor() {
    this._items = []
  }

  push(item: T): void {
    this._items.push(item)
  }

  pop(): T | null {
    return this._items.pop() ?? null
  }

  isEmpty(): boolean {
    return this.size() === 0
  }

  size(): number {
    return this._items.length
  }
}
