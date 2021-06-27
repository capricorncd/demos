/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-27 21:36 (GMT+0900)
 *
 * #菜品/食物详情API
 * 获取菜品详情的API
 * @apiUrl api/food/detail
 * @method get
 * @param foodId number 食品ID
 */
// 接口返回数据
export interface FoodDetailResponse {
  id: number; // 商品ID
  name: string; // 商品名称
  sub_name?: string; // 二级名称
  category_id: number; // 所属分类ID
  price: number; // 默认价格
  special_price?: number; // 优惠价格或会员价格
  remark?: string; // 备注说明
  cover: string; // 封面图
  content: string; // 详细说明
  image_list: string[]; // 图片列表
  specifications: FoodSpecification[]; // 食物规格列表
}

// 食物规格分类
export interface FoodSpecification {
  id: number; // 规格分类ID
  name: string; // 规格分类名称
  is_required: boolean; // 是否必选
  is_multiple_choice: boolean; // 是否为多选
  items: FoodSpecificationItem[]; // 规格子选项列表
}

// 规格子选项
export interface FoodSpecificationItem {
  id: number; // 规格ID
  name: string; // 子选项名称
  price_difference: number; // 差价。默认价格的基础上增减，取值`-n ~ +n`
}
