/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-07-25 16:15
 */
/**
 * handle inner string of line
 * @param line
 * @returns {*}
 */
function handleInner (line) {
  return line.replace(/(`|\*\*)(.*)\1/g, (match, $1, $2) => {
    // i `
    if ($1 === '`') {
      return `<i>${$2}</i>`
    }
    // strong **
    else if ($1 === '**') {
      return `<strong>${$2}</strong>`
    }
    return match
  })
}

/**
 * handle table items line
 * @param line
 * @param tag
 * @returns {string}
 */
function handleTable (line, tag) {
  // Ignore alignment line
  if (/^[|:\s-]+$/.test(line)) {
    return ''
  }
  line = line.trim().replace(/^\|(.+)\|$/, '$1')
  let arr = line.split(/\|/).map(item => {
    return `<${tag}>${handleInner(item)}</${tag}>`
  })
  arr.unshift('<tr>')
  arr.push('</tr>')
  return arr.join('\n')
}

/**
 * handle code line
 * @param line
 * @returns {string|*}
 */
function handleCode (line) {
  // annotation
  if (/^[#/]+/.test(line.trim())) {
    return `<span class="annotation">${line}</span>`
  }
  return line
}

module.exports = {
  handleCode,
  handleTable,
  handleInner
}
