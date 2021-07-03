/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-03 10:12 (GMT+0900)
 *
 * #菜品/食物列表API
 * 获取菜品列表的API
 * @apiUrl api/food/list
 * @method get
 * @param page number 页码，默认1
 * @param limit number 每页多少条数据，默认10
 */
import {FoodDetail} from '@/types/FoodDetail'

export interface FoodListResponse {
  total: number;
  page: number;
  limit: number;
  list: FoodDetail[];
}
