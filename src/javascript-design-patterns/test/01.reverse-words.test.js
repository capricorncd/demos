/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-04-10 21:06
 */
import {
  reverseWords,
  reverseWordsWidthFor,
  reverseWordsWidthMatch,
  reverseWordsWidthReplace
} from '../code/01.reverse-words'

const input = 'The HTML document (rich text) editor in Smart phone browser or webview, supporting mixed layout, reference, headline, unordered list, font color, bold and italics.'
const output = 'ehT LMTH tnemucod hcir( )txet rotide ni tramS enohp resworb ro ,weivbew gnitroppus dexim ,tuoyal ,ecnerefer ,enildaeh deredronu ,tsil tnof ,roloc dlob dna .scilati'

test(`reverseWords: ${input}`, () => {
  expect(reverseWords(input)).toBe(output)
})

test(`reverseWordsWidthMatch: ${input}`, () => {
  expect(reverseWordsWidthMatch(input)).toBe(output)
})

test(`reverseWordsWidthReplace: ${input}`, () => {
  expect(reverseWordsWidthReplace(input)).toBe(output)
})

test(`reverseWordsWidthFor: ${input}`, () => {
  expect(reverseWordsWidthFor(input)).toBe(output)
})
