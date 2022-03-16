/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-27 11:40 (GMT+0900)
 *
 * #首页数据获取API
 * 获取首页推荐数据，分类数据，以及菜品数据的API
 * @apiUrl api/home
 * @method get
 */
import { FoodDetail, FoodSpecCategoryItem } from './FoodDetail'

// 接口返回数据
export interface HomeResponse {
  trending_list: number[];// 热门或推荐菜品id列表
  categories: CategoryItem[]; // 分类列表
  food_list: FoodDetail[];// 食品/酒水/饮料列表
  specificationCategories: FoodSpecCategoryItem[];// 规格分类列表
}

// 分类元素结构
export interface CategoryItem {
  id: number; // 分类ID
  name: string; // 分类名称
  sub_name?: string; // 其他（语言）名称
  icon?: string; // 分类图标
}
