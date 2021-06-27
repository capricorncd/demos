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
export interface HomeResponse {
  trending_list: ShopItem[];
  categories: CategoryItem[];
}

export interface CategoryItem {
  id: number;
  name: string;
  sub_name?: string;
  icon?: string;
}

export interface ShopItem {
  id: number;
  name: string;
  sub_name?: string;
  category_id: number;
  price: number;
  special_price?: number;
  remark?: string;
  cover: string;
}
