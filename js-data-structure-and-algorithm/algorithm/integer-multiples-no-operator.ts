/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/05 22:16:43 (GMT+0900)
 *
 * 不使用加减乘除运算符，求整数的7倍
 * Do not use the addition, subtraction, multiplication
 * and division operators to find 7 times the integer
 * input 5 => 35
 * input 9 => 63
 */
const TIMES = 7

function useBitOperation(input: number): number {
  let sum = 0
  const add = (m: number, n: number) => {
    while (m) {
      [m, n] = [(m & n) << 1, m ^ n]
    }
    return n
  }

  new Array(TIMES).fill(null).forEach(() => {
    sum = add(sum, input)
  })

  return sum
}

console.log('useBitOperation:', useBitOperation(5));
console.log('useBitOperation:', useBitOperation(9));

function usePad(input: number): number {
  return ''.padStart(TIMES).repeat(input).length
  // return ''.padEnd(TIMES).repeat(input).length
}

console.log('usePad:', usePad(5));
console.log('usePad:', usePad(9));

function usePadReplace(input: number): number {
  return ''.padEnd(input, '0').replace(/0/g, ''.padEnd(TIMES)).length
}

console.log('usePadReplace:', usePadReplace(5));
console.log('usePadReplace:', usePadReplace(9));

function useArray(input: number): number {
  return new Array(input).fill(new Array(TIMES).fill(null)).flat().length
  // return new Array(TIMES).fill(new Array(input).fill(null)).flat().length
}

console.log('useArray:', useArray(5));
console.log('useArray:', useArray(9));

function useArrayMap(input: number): number {
  return new Array(input).fill(null).map(() => new Array(TIMES).fill(null)).flat().length
}

console.log('useArrayMap:', useArrayMap(5));
console.log('useArrayMap:', useArrayMap(9));

// Base Conversion and Bit Operations
function useParseInt(input: number): number {
  return parseInt(input.toString(TIMES).concat('0'), TIMES)
}

console.log('useParseInt:', useParseInt(5));
console.log('useParseInt:', useParseInt(9));

// hack
function multiply(input: number): number {
  // String.fromCharCode(42) => *
  return new Function(['return', input, String.fromCharCode(42), TIMES].join(' '))()
}

console.log('multiply:', multiply(5));
