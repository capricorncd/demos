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
// 接口返回数据
export interface HomeResponse {
  trending_list: ShopItem[];// 热门或推荐列表
  categories: CategoryItem[]; // 分类列表
}

// 分类元素结构
export interface CategoryItem {
  id: number; // 分类ID
  name: string; // 分类名称
  sub_name?: string; // 其他（语言）名称
  icon?: string; // 分类图标
}

// 商品、菜品
export interface ShopItem {
  id: number; // 商品ID
  name: string; // 商品名称
  sub_name?: string; // 二级名称
  category_id: number; // 所属分类ID
  price: number; // 价格
  special_price?: number; // 优惠价格或会员价格
  remark?: string; // 备注说明
  cover: string; // 封面图
}
