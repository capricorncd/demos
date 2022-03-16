/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-01 20:24 (GMT+0900)
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  CategoryItem,
  FoodDetail,
  StoreDataState,
  FoodSpecCategoryItem,
  HomeResponse,
  AuthResponse,
  LanguageTypes,
} from '@/types'
import { AppConstants, CacheKeys, getLanguages } from '@/assets/constants'
import { getCache, setCache } from '@/helpers'

/* eslint-disable camelcase */
const defaultBaseData = {
  status: AppConstants.authStatusUnauthorized,
  user_info: {
    user_id: 0,
    user_name: '',
    avatar: '',
    language: AppConstants.languageTypeJA,
  },
  entry_cover: '',
  merchant_info: {
    merchant_id: 0,
    merchant_name: '',
    merchant_sub_name: '',
    table_id: 0,
    table_name: '',
    price_symbol: '¥',
    is_tax_included: false,
    address: '',
    business_open_time: '',
    business_close_time: '',
    system_time: '',
  },
  primary_color: '',
  token: '',
  redirect_url: '',
  platform_info: {
    token: '',
  },
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
  languages: getLanguages(getCache(CacheKeys.language) || AppConstants.languageTypeJA),
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setBaseData(state: StoreDataState, { payload }: PayloadAction<AuthResponse>): void {
      const { status, user_info } = payload
      let languageType: LanguageTypes | null = null
      if (status === AppConstants.authStatusSuccess) {
        languageType = user_info.language
        state.baseData = payload
      }
      languageType = languageType || getCache(CacheKeys.language) || AppConstants.languageTypeJA
      state.languages = getLanguages(languageType)
      setCache(CacheKeys.language, languageType)
    },
    setLanguages(state: StoreDataState, { payload }: PayloadAction<LanguageTypes>): void {
      state.languages = getLanguages(payload)
      setCache(CacheKeys.language, payload)
    },
    update(state: StoreDataState, { payload }: PayloadAction<HomeResponse>): void {
      const { food_list: foodList, categories, specificationCategories, trending_list: trendingList } = payload
      if (foodList) {
        foodList.forEach((item) => {
          state.foods[item.id] = item
        })
      }
      if (categories) {
        categories.forEach((item) => {
          state.categories[item.id] = item
        })
      }
      if (specificationCategories) {
        specificationCategories.forEach((item) => {
          state.specificationCategories[item.id] = item
        })
      }
      state.trendingList = trendingList
    },
    updateFoods(state: StoreDataState, { payload }: PayloadAction<FoodDetail[]>): void {
      payload.forEach((item) => {
        state.foods[item.id] = item
      })
    },
    updateCategories(state: StoreDataState, { payload }: PayloadAction<CategoryItem[]>): void {
      payload.forEach((item) => {
        state.categories[item.id] = item
      })
    },
    updateSpecCategories(state: StoreDataState, { payload }: PayloadAction<FoodSpecCategoryItem[]>) {
      payload.forEach((item) => {
        state.specificationCategories[item.id] = item
      })
    },
  },
})
