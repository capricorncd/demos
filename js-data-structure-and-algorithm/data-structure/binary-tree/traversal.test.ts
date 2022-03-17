/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/17 20:42:04 (GMT+0900)
 */
import {BinaryTree} from './traversal'

const bt = new BinaryTree([13, 6, 3, 9, 7, 20, 15, 28, 32])

test('preorderTraversal', () => {
  expect(bt.preorderTraversal().join(', ')).toBe('13, 6, 3, 9, 7, 20, 15, 28, 32')
})

test('inorderTraversal', () => {
  expect(bt.inorderTraversal().join(', ')).toBe('3, 6, 7, 9, 13, 15, 20, 28, 32')
})

test('subsequentTraversal', () => {
  expect(bt.subsequentTraversal().join(', ')).toBe('3, 7, 9, 6, 15, 32, 28, 20, 13')
})
