/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-07-24 19:12
 */
const { handleCode, handleTable, handleInner } = require('./helper')

/**
 * handle line
 * @param line
 * @param domTree
 * @param tagStack
 */
function handleLine (line, domTree, tagStack) {
  // RegExp result
  let $1, $2
  /**
   * #....# h1...h5,
   * | table,
   * > blockquote,
   * - or * ul,
   * ``` pre
   */
  if (/^([#`\|>\*-]+)(.*)/.test(line.trim())) {
    $1 = RegExp.$1
    $2 = RegExp.$2.trim()

    // pre inner code
    if (tagStack[0] === 'pre' && '```' !== $1) {
      domTree.push(handleCode(line))
      return
    }

    // h1...h5
    if ($1.startsWith('#')) {
      domTree.push(`<h${$1.length} id="${$2}">${$2}</h${$1.length}>`)
    }
    // pre
    else if ('```' === $1) {
      if (tagStack[0] === 'pre') {
        domTree.push('</pre>')
        tagStack.shift()
      } else {
        domTree.push(`<pre class="code-${$2}">`)
        tagStack.unshift('pre')
      }
    }
    // blockquote
    else if ($1.startsWith('>')) {
      if (tagStack[0] !== 'blockquote') {
        tagStack.unshift('blockquote')
        domTree.push('<blockquote>')
      }
      domTree.push(`<p>${$2}</p>`)
    }
    // ul
    else if ('-' === $1 || '*' === $1) {
      if (tagStack[0] !== 'ul') {
        tagStack.unshift('ul')
        domTree.push('<ul>')
      }
      domTree.push(`<li>${$2}</li>`)
    }
    // table
    else if ($1.startsWith('|')) {
      if (tagStack[0] !== 'table') {
        tagStack.unshift('table')
        domTree.push('<table border="0" cellpadding="0" cellspacing="0">')
        domTree.push(handleTable(line, 'th'))
      } else {
        domTree.push(handleTable(line, 'td'))
      }
    } else {
      /**
       * ----
       */
      if (/^-+$/.test(line.trim())) {
        domTree.push(`<hr>`)
      } else {
        domTree.push(`<p>${handleInner(line)}</p>`)
      }
    }
  }
  else {
    /**
     * code line
     */
    if (tagStack[0] === 'pre') {
      domTree.push(handleCode(line))
    } else {
      // tag close
      if (tagStack.length > 0) {
        domTree.push(`</${tagStack.shift()}>`)
      }
      if (line) {
        /**
         * ![]() img
         */
        if (/^\!\[(.+)\]\((.+)\)/.test(line.trim())) {
          $1 = RegExp.$1
          $2 = RegExp.$2
          domTree.push(`<p><img src="${$2}" alt="${$1}" /></p>`)
        }
        /**
         * []() link
         */
        else if (/^\[(.+)\]\((.+)\)/.test(line.trim())) {
          $1 = RegExp.$1
          $2 = RegExp.$2
          domTree.push(`<a title="${$1}" href="${$2}" target="_blank">${$1 || $2}</a>`)
        }
        else {
          domTree.push(`<p>${handleInner(line)}</p>`)
        }
      }
    }
  }
}

/**
 * markdown string to html tag
 * @param fileContentString
 * @returns {{title: string, content: string}}
 */
function converter (fileContentString) {
  // split file content string with line break
  const lineArray = fileContentString.split(/\n/)
  // create dom tree
  const domTree = []
  // tag stack
  const tagStack = []
  // # h1
  // ## h2
  // ```type pre start
  // code
  // ``` pre end
  // |th|th|...|th|
  // |:--|:--|:--|:--|
  // |td|td|...|td|
  // > blockquote
  // - ul
  // * ul
  // **strong**
  // `i`
  // []() link
  // ![]() image
  lineArray.forEach(line => {
    handleLine(line, domTree, tagStack)
  })
  return {
    title: domTree[0] ? domTree[0].replace(/<(\w+).*?>(.+)<\/\1>/, '$2') : '',
    content: domTree.join('\n')
  }
}

module.exports = {
  converter: converter
}
