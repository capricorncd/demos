/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/15 20:20:48 (GMT+0900)
 */
import {ListNode, LinkedList} from './LinkedList'

/**
 * Swap the order of two nodes
 * @param a ListNode
 * @param b ListNode
 */
function swap<T>(a: ListNode<T>, b: ListNode<T>) {
  const temp = a.value
  a.value = b.value
  b.value = temp
}

function partition<T>(start: ListNode<T>, end: ListNode<T>): ListNode<T> {
  let value = start.value
  let s = start
  let next = start.next
  while (next && next !== end) {
    if (next.value < value) {
      s = s.next as ListNode<T>
      swap(s, next)
    }
    next = next.next
  }
  // 让基准元素调换至中间位置
  swap(s, start)
  // 返回新指针
  return s
}

function sort<T>(start: ListNode<T>, end: ListNode<T>) {
  if (start !== end) {
    let part = partition(start, end)
    sort(start, part)
    sort(part.next as ListNode<T>, end)
  }
}

export {
  sort,
  ListNode,
  LinkedList
}
