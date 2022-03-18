/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/13 11:32:12 (GMT+0900)
 *
 * 延迟运行
 * Delayed operation
 */
// /**
//  * bind
//  * @param context
//  * @param args
//  * @returns {function(): *}
//  */
Function.prototype.bind = function (context, ...args) {
  return () => {
    return this.apply(context, args)
  }
}

// Function.prototype.bind = function (context) {
//   const self = this
//   const args = Array.prototype.slice.call(arguments, 1)
//   return function () {
//     return self.apply(context, args)
//   }
// }
