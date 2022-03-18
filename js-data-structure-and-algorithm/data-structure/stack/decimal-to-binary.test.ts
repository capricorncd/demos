/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/18 22:00:26 (GMT+0900)
 */
import {decimalToBinary} from './decimal-to-binary'

test('decimalToBinary', () => {
  expect(decimalToBinary(3)).toBe('11')
  expect(decimalToBinary(100)).toBe('1100100')
})
