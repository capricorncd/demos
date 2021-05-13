/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-07-25 18:51
 */
const fs = require('fs-extra')
const slash = require('slash')
const { formatTargetFile, getDirPath, isFileName } = require('./helper')

/**
 * read file
 * @param source
 * @returns {*}
 */
function read (source) {
  return fs.readFileSync(source).toString()
}

/**
 * write file
 * @param target
 * @param data
 */
function write(target, data) {
  let dir = getDirPath(target)
  if (!isExists(dir)) {
    mkdir(dir)
  }
  fs.writeFileSync(target, data)
}

/**
 * mkdir
 * @param dir
 */
function mkdir (dir) {
  fs.mkdirsSync(dir)
}

/**
 * is a file
 * @param source
 * @returns {*}
 */
function isFile(source) {
  return fs.statSync(source).isFile()
}

/**
 * is a directory
 * @param source
 * @returns {*}
 */
function isDirectory(source) {
  return fs.statSync(source).isDirectory()
}

/**
 * is exists
 * @param source
 * @returns {*}
 */
function isExists (source) {
  return fs.existsSync(source)
}

/**
 * read dir
 * @param dir
 * @returns {*}
 */
function readDir(dir) {
  let temp
  return fs.readdirSync(dir).reduce((files, item) => {
    temp = slash(dir + '/' + item)
    if (isDirectory(temp)) {
      files = files.concat(readDir(temp))
    } else {
      files.push(temp)
    }
    return files
  }, [])
}

function createMenu(dir, target = '') {
  let temp, tempTarget, is
  return fs.readdirSync(dir).reduce((prev, name) => {
    temp = slash(dir + '/' + name)
    tempTarget = slash(target + '/' + name)
    if (!isFileName(name) || /\.md/i.test(name)) {
      prev.push({
        text: name,
        original: temp,
        isFile: isFileName(name),
        url: formatTargetFile(tempTarget),
        children: isDirectory(temp) ? createMenu(temp, tempTarget) : []
      })
    }
    return prev
  }, [])
}

function copyFilter (src, dest) {
  console.log(src, dest)
  return !/\.(html|md)$/i.test(src)
}

function copyStaticFile(source, target) {
  let dirs = getDirPath(source)
  fs.copySync(dirs, target, {filter: copyFilter})
}

module.exports = {
  copyStaticFile,
  createMenu,
  getDirPath,
  isDirectory,
  isExists,
  isFile,
  mkdir,
  read,
  readDir,
  write,
}
