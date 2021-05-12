/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-07-24 21:02
 */
const rawArgs = process.argv.slice(2)
const MarkdownConverter = require('./index')

const [sourceFile, targetFile] = rawArgs

const mdc = new MarkdownConverter({
  templateFile: './src/packages/html-template/src/index.html'
})

console.log(mdc)

mdc.createHtml(sourceFile, targetFile)
