/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-01 20:24 (GMT+0900)
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {CategoryItem, FoodDetail, StoreDataState, FoodSpecCategoryItem, HomeResponse, UserInfo, ShopInfo} from '@/types'

const defaultBaseData = {
  user_info: {
    id: 0,
    name: '',
    avatar: '',
  },
  entry_cover: '',
  shop_info: {
    shop_id: 0,
    shop_name: '',
    shop_sub_name: '',
    table_id: 0,
    table_name: '',
    price_symbol: '¥',
    is_tax_included: false,
    address: '',
  },
  primary_color: '',
}

// Define the initial state using that type
const initialState: StoreDataState = {
  foods: {},
  categories: {},
  specificationCategories: {},
  specifications: {},
  trendingList: [],
  baseData: {
    ...defaultBaseData,
  },
}


export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    update(state: StoreDataState, {payload}: PayloadAction<HomeResponse>): void {
      const { food_list: foodList, categories, specificationCategories, trending_list: trendingList } = payload
      if (foodList) {
        foodList.forEach(item => {
          state.foods[item.id] = item
        })
      }
      if (categories) {
        categories.forEach(item => {
          state.categories[item.id] = item
        })
      }
      if (specificationCategories) {
        specificationCategories.forEach(item => {
          state.specificationCategories[item.id] = item
        })
      }
      state.trendingList = trendingList
    },
    updateFoods(state: StoreDataState, {payload}: PayloadAction<FoodDetail[]>): void {
      payload.forEach(item => {
        state.foods[item.id] = item
      })
    },
    updateCategories(state: StoreDataState, {payload}: PayloadAction<CategoryItem[]>): void {
      payload.forEach(item => {
        state.categories[item.id] = item
      })
    },
    updateSpecCategories(state: StoreDataState, {payload}: PayloadAction<FoodSpecCategoryItem[]>) {
      payload.forEach(item => {
        state.specificationCategories[item.id] = item
      })
    }
  },
})

