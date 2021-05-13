export default {
  /**
   * 转换为整数
   * @param n
   * @returns {*}
   */
  int (n) {
    let num = parseInt(n)
    return isNaN(num) ? 0 : num
  },
  /**
   * 将伪数组，转换为数组
   * @param pseudoArray 伪数组
   * @returns {*}
   */
  slice (pseudoArray, index = 0) {
    if (pseudoArray.length && pseudoArray[0]) {
      return Array.prototype.slice.call(pseudoArray, index)
    }
    return []
  },
  /**
   * 带时间戳的随机字符串
   * @param prefix 前缀
   * @returns {string}
   * @private
   */
  randStr (prefix = 'zxEditor_') {
    return prefix + (+new Date)
  }
}
