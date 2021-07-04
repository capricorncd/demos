/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-03 10:45 (GMT+0900)
 */
import {FoodDetail, FoodSpecCategoryItem} from '@/types/FoodDetail'
import {CategoryItem} from '@/types/Home'
import {AuthResponse} from '@/types/Auth'

export interface StoreDataState {
  foods: StoreDataFoods;
  categories: StoreDataCategories;
  specificationCategories: StoreDataSpecCategories;
  specifications: {};
  baseData: AuthResponse;
}

export type StoreDataFoods = Record<string, FoodDetail>;
export type StoreDataCategories = Record<string, CategoryItem>;
export type StoreDataSpecCategories = Record<string, FoodSpecCategoryItem>;
