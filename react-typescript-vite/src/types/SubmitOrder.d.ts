/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-27 22:27 (GMT+0900)
 *
 * #提交订单API
 * 客户提交订单API
 * @apiUrl api/order/submit
 * @method post
 * @param foodList SubmitOrderFoodItem[] 所选食品信息列表
 * @param merchantId number 店铺Id
 * @param tableId number 餐桌或座位Id
 * @param remark string 备注信息
 */
// 所选食品信息
export interface SubmitOrderFoodItem {
  id: number; // 食品ID
  count: number; // 所选数量
  specifications: number[]; // 所选规格ID列表
}

// 接口返回数据
export interface SubmitOrderResponse {
  order_id: string; //订单号
}
