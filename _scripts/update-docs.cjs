/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/08/12 14:42:02 (GMT+0900)
 */
const path = require("path");
const fs = require("fs");
const { EOL } = require("os")

const LINKS_TABLE_LINE = '<!--LINKS_TABLE-->'
const BLANK_LINE = ''

function isObject(obj) {
  return obj && typeof obj === "object"
}

function isValidArray(arr) {
  return Array.isArray(arr) && arr.length > 0;
}

function getDocInfo(dir) {
  const pkgFile = path.join(dir, "package.json")
  if (!fs.existsSync(pkgFile)) return null
  const pkg = JSON.parse(fs.readFileSync(pkgFile).toString());
  if (isObject(pkg.docInfo)) {
    if (!pkg.docInfo.name) pkg.docInfo.name = pkg.name
    if (!pkg.docInfo.desc) pkg.docInfo.desc = pkg.description || ''
    return pkg.docInfo
  }

  return null
}

function createDocInfoLines(arr) {
  if (!isValidArray(arr)) return []

  const lines = [
    // '## Links',
    // BLANK_LINE,
    `Demo|Link|Description`,
    ':--|:--|:--',
  ]
  arr.forEach(item => {
    lines.push(`${item.name}|<a href="${item.url}" target="_blank">${item.url}</a>|${item.desc}`)
  })
  return lines
}

function main() {
  const rootDir = path.resolve(__dirname, "../")

  // read docInfo from package.json
  const docInfoArr = []
  let stat, tempDir, docInfo
  fs.readdirSync(rootDir).forEach(dir => {
    tempDir = path.join(rootDir, dir)
    stat = fs.statSync(tempDir)
    if (stat.isDirectory() && /^\w+/.test(dir)) {
      docInfo = getDocInfo(tempDir)
      if (docInfo) docInfoArr.push(docInfo)
    }
  })

  const readmeFile = path.join(rootDir, 'README.md')
  // update lines
  const lines = []
  let isLinksTableStart = false
  let isLinksTableEnded = false
  fs.readFileSync(readmeFile).toString().split(EOL).forEach(line => {
    if (line.includes(LINKS_TABLE_LINE)) {
      if (isLinksTableStart) {
        isLinksTableEnded = true
        // push into new info
        lines.push(...createDocInfoLines(docInfoArr))
      } else {
        isLinksTableStart = true
      }
      lines.push(LINKS_TABLE_LINE)
    }
    if (!isLinksTableStart && !isLinksTableStart) {
      lines.push(line)
    }
  })
  
  lines.push(BLANK_LINE)

  // write into README.md
  fs.writeFileSync(readmeFile, lines.join(EOL), 'utf-8')
}

main();