/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-27 15:16 (GMT+0900)
 */
const path = require('path')
const fs = require('fs')
const os = require('os')

// 类型定义文件目录
const typesDir = path.resolve(__dirname, '../src/types')
const docsDir = path.resolve(__dirname, '../docs')

function clearDocsDir() {
  let filePath
  fs.readdirSync(docsDir).forEach(file => {
    filePath = docsDir + '/' + file
    if (fs.existsSync(filePath)) {
      fs.rmSync(filePath)
    }
  })
}

function readApiTypes() {
  const dirs = fs.readdirSync(typesDir)
  // console.log(dirs)
  return dirs.map(handleFile).filter(item => !!item.title)
}

/**
 * 处理文件
 * @param file
 * @return {{apiUrl: null, method: null, children: [], desc: [], title: null, params: [], children: []}}
 */
function handleFile(file) {
  const res = {
    fileName: file.split('.')[0],
    title: null,
    desc: [],
    apiUrl: null,
    params: [],
    method: null,
    // {name: '', desc: [], columns: [], type: 'interface|type|class'}
    children: [],
  }
  const lines = fs.readFileSync(typesDir + '/' + file).toString()
  let isHeaderComment = true
  let isInterface = false
  let $1, $2, temp, interfaceData
  const tempArr = []
  const columns = []
  lines.split(os.EOL).forEach(line => {
    line = line.trim().replace(/\|/g, '/')

    if (!line) return

    // 注释结束
    if (/^\*\//.test(line)) {
      isHeaderComment = false
      return
    }

    // 头部注释处理
    if (isHeaderComment) {
      // 获取文件标题
      if (/^\*\s?#\s*(.+)/.test(line)) {
        res.title = RegExp.$1
      }
      // res.title === null，则过滤文件生成时的作者信息，不做处理
      // 提取标题以下的其他有用的备注信息
      else if (res.title) {
        // 参数处理
        if (/^\*\s*@(\w+)\s+(.+)/.test(line)) {
          $1 = RegExp.$1
          $2 = RegExp.$2.trim()
          if ($1 === 'param') {
            temp = $2.split(/\s+/)
            res.params.push({
              key: temp[0],
              type: temp[1],
              desc: temp.slice(2).join('<br>')
            })
          } else {
            res[$1] = $2
          }
        }
        // 普通说明内容
        else if (/^\*\s*(.+)/.test(line)) {
          res.desc.push(RegExp.$1)
        }
      }
      return
    }

    // interface结束
    if (line === '}' && isInterface) {
      res.children.push({
        ...interfaceData,
        columns: columns.slice()
      })
      isInterface = false
      // console.log(columns)
      // 清除字段数据
      columns.length = 0
      return
    }

    // 处理其他单行注释
    if (/^\/\/(.+)/.test(line)) {
      tempArr.push(RegExp.$1.trim())
      return
    }
    // 处理其他类型或接口定义数据
    if (/interface\s(\w+)/.test(line)) {
      isInterface = true
      interfaceData = {
        name: RegExp.$1,
        desc: tempArr.slice(),
        type: 'interface',
      }
      // 清除单行注释数据
      tempArr.length = 0
      return
    }
    // interface字段处理
    if (isInterface) {
      temp = line.split(':')
      columns.push({
        key: temp[0].replace(/\?/, ''),
        required: !temp[0].includes('?'),
        type: temp[1].split(';')[0].trim(),
        desc: temp[1].split(';')[1].replace(/^\/\//, '').trim()
      })
      return
    }

    // type定义处理，不考虑换行，如 type xx = a | b | c\n | d | e
    if (/type (\w+)\s*=\s*(.+)/.test(line)) {
      res.children.push({
        type: 'type',
        name: RegExp.$1,
        desc: tempArr.slice(),
        code: RegExp.$2.replace(/;$/, ''),
      })
      // 清除单行注释数据
      tempArr.length = 0
      // return
    }
  })
  // console.log(res.children)
  return res
}

function outputMdFile(data) {
  const lines = []
  lines.push(`# ${data.title}`, '')
  if (data.desc.length) lines.push(data.desc.join(os.EOL), '')
  if (data.apiUrl) {
    lines.push('api: `' + data.apiUrl + '`', '')
    if (data.method) lines.push('method: `' + data.method + '`', '')

    if (data.params.length) {
      lines.push('params:', '')
      lines.push(`参数名|类型|说明`, `:--|:--|:--`)
      data.params.forEach(({ key, type, desc }) => {
        lines.push(`${key}|${type}|${desc}`)
      })
      lines.push('')
    }
  }

  data.children.forEach(item => {
    lines.push(`## ${item.name}`, '', item.desc.join(os.EOL), '')
    if (item.type === 'type') {
      lines.push('```', item.code, '```')
    } else if (item.type === 'interface') {
      lines.push(`字段名|类型|必须|说明`, `:--|:--|:--|:--`)
      item.columns.forEach(({ key, type, desc, required }) => {
        lines.push(`${key}|${type}|${required ? 'yes' : 'no'}|${desc}`)
      })
      lines.push('')
    }
  })

  // output
  fs.writeFileSync(`${docsDir}/${data.fileName}.md`, lines.join(os.EOL))
}

function run() {
  clearDocsDir()
  readApiTypes().forEach(outputMdFile)
}

run()