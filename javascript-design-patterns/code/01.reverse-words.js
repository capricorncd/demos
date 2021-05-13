/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-04-10 21:06
 *
 * string
 *
 * input: hello word
 * output: olleh drow
 */
export function reverseWords(str) {
  return str.split(/\s+/).map(word => {
    return word.split('').reverse().join('')
  }).join(' ')
}

export function reverseWordsWidthMatch(str) {
  return str.match(/\S+/g).map(word => {
    return word.split('').reverse().join('')
  }).join(' ')
}

// replace
export function reverseWordsWidthReplace (str) {
  return str.replace(/(\S+)/g, word => {
    return word.split('').reverse().join('')
  })
}

// for loop
export function reverseWordsWidthFor(str) {
  let result = ''
  let temp = ''
  for (let s of str) {
    if (/\S/.test(s)) {
      temp = s + temp;
    } else {
      result += temp + ' '
      temp = ''
    }
  }
  return result + temp
}
