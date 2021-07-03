/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-01 20:24 (GMT+0900)
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {CategoryItem, FoodDetail, StoreDataState, FoodSpecCategoryItem} from '@/types'

// Define the initial state using that type
const initialState: StoreDataState = {
  foods: {},
  categories: {},
  specificationCategories: {},
  specifications: {},
}


export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateFoods: (state: StoreDataState, {payload}: PayloadAction<FoodDetail[]>) => {
      payload.forEach(item => {
        state.foods[item.id] = item
      })
    },
    updateCategories: (state: StoreDataState, {payload}: PayloadAction<CategoryItem[]>) => {
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

