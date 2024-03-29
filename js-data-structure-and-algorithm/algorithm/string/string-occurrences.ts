/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/04 20:49:13 (GMT+0900)
 * 找出abc出现次数，不区分大小写
 * ABCDEFGABCDEFGABCDEFGABCDEFGabcdfegabcdfegabcdfeg
 */
const INPUT = 'ABCDEFGABCDEFGABCDEFGABCDEFGabcdfegabcdfegabcdfeg'

// match
function useMatch() {
  const match = INPUT.match(/abc/ig)
  return match ? match.length : 0
}

console.log('useMatch:', useMatch())

// matchAll
function useMatchAll() {
  return Array.from(INPUT.matchAll(/abc/ig)).length
}

console.log('useMatchAll:', useMatchAll())

// split
function useSplit() {
  return INPUT.split(/abc/i).length - 1
}

console.log('useSplit:', useSplit())

// for
function useForLoop() {
  const str = INPUT.toLowerCase()
  let count = 0
  for (let i = 0; i < str.length - 2; i++) {
    if (`${str[i]}${str[i + 1]}${str[i + 2]}` === 'abc') {
      count++
    }
  }
  return count
}

console.log('useForLoop:', useForLoop())

// substring
function useSubstring() {
  const str = INPUT.toLowerCase()
  let count = 0
  for (let i = 0; i < str.length - 2; i++) {
    if (str.substring(i, i + 3) === 'abc') {
      count++
    }
  }
  return count
}

console.log('useSubstring:', useSubstring())

// startsWith
function useStartsWith() {
  const str = INPUT.toLowerCase()
  let count = 0
  for (let i = 0; i < str.length - 2; i++) {
    if (str.startsWith('abc', i)) {
      count++
    }
  }
  return count
}

console.log('useStartsWith:', useStartsWith())

// indexOf
function useIndexOf() {
  const str = INPUT.toLowerCase()
  let count = 0
  let index = -1
  let next = -1
  while (true) {
    next = str.indexOf('abc', index)
    if (next === -1 || next === index) return count
    index = next + 1
    count++
  }
}

console.log('useIndexOf:', useIndexOf())

// replace
function useReplace() {
  let count = 0
  INPUT.replace(/abc/ig, (match) => {
    count++
    return match
  })
  return count
}

console.log('useReplace:', useReplace())

// replaceAll
function useReplaceAll() {
  let count = 0
  INPUT.replaceAll(/abc/ig, (match: string) => {
    count++
    return match
  })
  return count
}

console.log('useReplaceAll:', useReplaceAll())
