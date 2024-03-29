/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/13 10:34:56 (GMT+0900)
 *
 * 参数复用
 * parameter reuse
 */
// normal
function check(reg: RegExp, input: string): boolean {
  return reg.test(input)
}

console.log(check(/^\d+$/, "11111d1"));
console.log(check(/^\w+$/, "11111d1"));

// currying
// @ts-ignore TS2393: Duplicate function implementation.
function currying(reg: RegExp): (input: string) => boolean {
  return (input) => {
    return reg.test(input)
  }
}

const isNumberLike = currying(/^\d+$/)
console.log('isNumberLike', isNumberLike('11111'));
console.log('isNumberLike', isNumberLike('1111x1'));

const isWords = currying(/^\w+$/)
console.log('isWords', isWords('ddw32'));
