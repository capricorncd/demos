/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-30 20:13 (GMT+0900)
 */
const path = require('path')
const fs = require('fs')
const { categories, foods, specificationCategories } = require('../constants')

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

let specId = 1

function createSpecifications() {
  return Array.from({length: Math.round(Math.random() * 10)}).map(() => {
    return {
      id: specId, // 规格ID
      c_id: Math.max(1, Math.round(Math.random() * specificationCategories.length)), // 规格分类ID
      name: "子选项名称" + specId++, // 子选项名称
      price: Math.round(Math.random() * 100) * 10,
    }
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

let _foodList = null

function createHomeResponse({ children }) {
  foodId = 1
  const res = {}
  const response = children.find(item => item.name.includes('Response'))
  if (response) {
    response.columns.forEach(item => {
      switch (item.key) {
        case 'categories':
          res.categories = categories
          break
        case 'specificationCategories':
          res.specificationCategories = specificationCategories
          break
        case 'trending_list':
          res.trending_list = _foodList.slice(0, 20).filter(item => item.id % 4 === 0).map(item => item.id)
          break
        case 'food_list':
          res.food_list = _foodList
          break
      }
    })
  }
  return res
}

function createSubmitResponse(cfg, reqParams) {
  let temp
  const list = reqParams.foodList
    ? reqParams.foodList.map(item => {
      temp = _foodList.find(f => f.id === item.id) || {}
      return {
        ...temp,
        count: item.count,
        specifications: item.specifications
          ? item.specifications.map(cid => {
            return {
              ...temp.specifications.find(s => s.id === cid)
            }
          })
          : []
      }
    })
    : []
  return {
    order_id: `ORDER${Math.random().toString().slice(2)}`,
    status: 1,
    shop_id: 1,
    shop_name: 'Shop name',
    table_name: 'Table Name',
    list,
    create_date: +new Date(),
    remark: reqParams.remark,
  }
}

function createResponseData(api, reqParams) {
  const apiFullPath = api.slice(1)
  console.log('apiFullPath', apiFullPath)
  if (!apiConfigs.length) {
    readConfigs()
  }

  const cfg = apiConfigs.find(item => item.apiUrl === apiFullPath)
  console.log(cfg)
  if (!cfg) return {}

  if (!_foodList) _foodList = Array.prototype.concat.apply([], createFoodList())

  switch (apiFullPath) {
    case 'api/home':
      return createHomeResponse(cfg)
    case 'api/order/submit':
      return createSubmitResponse(cfg, reqParams)
  }
  return {}
}

module.exports = {
  createResponseData,
}
