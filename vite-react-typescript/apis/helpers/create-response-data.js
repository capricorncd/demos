/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-30 20:13 (GMT+0900)
 */
const path = require('path')
const fs = require('fs')
const { categories, foods } = require('../constants')

const apiConfigs = []

function readConfigs() {
  const configDir = path.resolve(__dirname, '../configs')

  fs.readdirSync(configDir).forEach(file => {
    console.log(file)
    const input = fs.readFileSync(path.join(configDir, file)).toString()
    const json = JSON.parse(input)
    if (json.apiUrl) apiConfigs.push(json)
  })
}

function createSpecifications() {
  return Array.from({length: Math.round(Math.random() * 10)}).map(() => {
    return 'ddddd'
  })
}

let foodId = 1
const CONTENT_TEMP = '详细说明内容可以为空，详细说明内容可以为空详细说明内容可以为空。详细说明内容可以为空，详细说明内容可以为空详细说明内容可以为空。'
const REMARK_TEMP = '说明备注内容可以为空，说明备注内容可以为空说明备注内容可以为空。'
const SUB_NAME_TEMP = '二级标题名称可以为空二级标题名称可以为空。'
function createFoodItem(categoryId) {
  const cover = `./static/${Math.round(Math.random() * 10) || 1}.jpg`
  return {
    id: foodId++,
    name: foods[Math.min(Math.round(foods.length * Math.random()), foods.length - 1)],
    sub_name: SUB_NAME_TEMP.slice(0, SUB_NAME_TEMP.length * Math.random()),
    category_id: categoryId,
    price: Math.round(Math.random() * 300) * 10 || 880,
    special_price: null,
    remark: REMARK_TEMP.slice(0, REMARK_TEMP.length * Math.random()),
    cover,
    sort: 1,
    // detail
    content: CONTENT_TEMP.slice(0, CONTENT_TEMP.length * Math.random()),
    image_list: [cover],
    specifications: createSpecifications(),
  }
}

function createFoodList() {
  return categories.map(item => {
    return Array.from({length: Math.round(Math.random() * 30) || 10}).map(() => {
      return createFoodItem(item.id)
    })
  })
}

function createHomeResponse({ children }) {
  const res = {}
  const response = children.find(item => item.name.includes('Response'))
  if (response) {
    response.columns.forEach(item => {
      switch (item.key) {
        case 'categories':
          res.categories = categories
          break
        case 'trending_list':
          res.trending_list = []
          break
        case 'food_list':
          res.food_list = Array.prototype.concat.apply([], createFoodList())
          break
      }
    })
  }
  return res
}

function createResponseData(api) {
  const apiFullPath = api.slice(1)
  console.log('apiFullPath', apiFullPath)
  if (!apiConfigs.length) {
    readConfigs()
  }

  const cfg = apiConfigs.find(item => item.apiUrl === apiFullPath)
  console.log(cfg)
  if (!cfg) return {}

  switch (apiFullPath) {
    case 'api/home':
      return createHomeResponse(cfg)
      break
  }
  return {}
}

module.exports = {
  createResponseData,
}
