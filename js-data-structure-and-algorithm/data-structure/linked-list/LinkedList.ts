/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/14 20:02:12 (GMT+0900)
 */

/**
 * Node
 */
class ListNode<T> {
  public next: null | ListNode<T>;
  public value: T;

  constructor(value: T) {
    this.next = null
    this.value = value
  }
}

/**
 * LInked list
 */
class LinkedList<T> {
  // head Node
  public head: null | ListNode<T> = null;

  constructor(arr: T[]) {
    let next: ListNode<T>
    arr.forEach(item => {
      if (this.head === null) {
      // if (index === 0) {
        this.head = new ListNode<T>(item)
        next = this.head
        return
      }
      next.next = new ListNode<T>(item)
      next = next.next
    })
  }

  public toArray(): T[] {
    const arr: T[] = []
    let node = this.head
    while (node) {
      arr.push(node.value)
      node = node.next
    }
    return arr
  }
}

export {
  LinkedList,
  ListNode
}
