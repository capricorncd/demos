/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/23 18:17:04 (GMT+0900)
 */
import {LinkedList} from './LinkedList'

test('LinkedList', () => {
  const list = new LinkedList([3,5,2,1,6,8,4])
  expect(list.toArray()).toEqual([3,5,2,1,6,8,4])
})
