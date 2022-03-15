/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/14 20:02:12 (GMT+0900)
 */
class ListNode<T> {
  public next: null | ListNode<T>;
  public value: T;

  constructor(value: T) {
    this.next = null
    this.value = value
  }
}

class LinkedList<T> {
  public head: null | ListNode<T>;

  constructor(arr: T[]) {
    this.head = null

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
}

export {
  LinkedList,
  ListNode
}
