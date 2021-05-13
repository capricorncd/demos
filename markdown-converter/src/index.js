/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-07-24 15:31
 */
const slash = require('slash')
const { converter } = require('./converter/index')
const fileHandler = require('./file-handler/fs')

const DEFAULT_OPTIONS = {
  themeColor: '#333',
  templateFile: './src/packages/html-template/src/index.html'
}

function getTargetFile (file, source, target) {
  return file.replace(new RegExp(source), target)
    .toLowerCase()
    .replace(/\.md$/i, '.html')
    .replace(/readme\.html/, 'index.html')
}

function MarkdownConverter (options) {
  this.options = {
    ...DEFAULT_OPTIONS,
    ...options
  }
}

MarkdownConverter.prototype = {
  constructor: MarkdownConverter,
  converter,
  createHtml: function createHtml (source, target) {
    try {
      let templateFile = fileHandler.read(this.options.templateFile)
      target = slash(target)
      if (fileHandler.isDirectory(source)) {
        // copy static file from temp directory
        fileHandler.copyStaticFile(this.options.templateFile, target)
        // copy static file from source directory
        fileHandler.copyStaticFile(source, target)
        // handle files
        fileHandler.readDir(source).forEach(file => {
          this.handleItem(file, getTargetFile(file, source, target), templateFile)
        })
        // create menu
        fileHandler.write(
          slash(`${target}/js/menu.js`),
          'window.MDC_MENU_ARRAY=' + JSON.stringify(fileHandler.createMenu(source), null, 2)
        )
      } else {
        this.handleItem(source, target, templateFile)
      }
    } catch (e) {
      console.error(e)
    }
  },
  insertToTempHtml: function insertToTempHtml (content, title, temp, staticPrefix) {
    try {
      let arr = temp.split(/\n/)
      return arr.reduce((prev, line) => {
        prev.push(
          line.replace('{{content}}', content)
            .replace('{{title}}', title)
        )
        return prev
      }, []).join('\n')
    } catch (e) {
      console.error(e)
      return content
    }
  },
  handleItem: function handleItem (source, target, templateFile) {
    let data = fileHandler.read(source)
    let { title, content } = converter(data)
    let result = this.insertToTempHtml(content, title, templateFile)
    fileHandler.write(target, result)
  }
}

module.exports = MarkdownConverter
