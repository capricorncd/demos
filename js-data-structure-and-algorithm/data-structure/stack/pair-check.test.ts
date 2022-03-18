/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/18 22:03:41 (GMT+0900)
 */
import {checkPair} from './pair-check'

test('checkPair', () => {
  expect(checkPair('{[(2+8)]}')).toBe(true)
  expect(checkPair('{[(2+8)]})')).toBe(false)
  expect(checkPair('{[((2+8)]}')).toBe(false)
})
