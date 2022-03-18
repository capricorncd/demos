/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/18 21:36:39 (GMT+0900)
 */
import {currying, sum, sort, add} from './parameters-sum'

test('sum', () => {
  expect(currying(sum)(1, 3)()).toBe(4)
  expect(currying(sum)(1, 3)(9, 3)()).toBe(16)
  expect(currying(sum)(1)(2)(3)(4, 10)(5)()).toBe(25)
})

test('sort', () => {
  expect(currying(sort)(1, 3)(2)(6)(4)(5)().join('')).toBe('123456')
})

test('add', () => {
  expect(add(1)(3)).toBe(4)
})
