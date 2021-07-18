/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-27 22:47 (GMT+0900)
 *
 * #订单详情API
 * 获取订单详情
 * @apiUrl api/order/detail
 * @method get
 * @param orderId number 订单ID，为0时返回最新订单数据
 */
import {ShopInfo} from "@/types/Auth";
import {FoodDetail} from "@/types/FoodDetail";

// 接口返回数据
export interface OrderDetailResponse {
  order_id: string; // 订单号
  status: number; // 订单状态
  shop_info: ShopInfo; // 店铺信息
  list: FoodDetail[]; // 订单菜品列表
  total_price: number; // 总价格，根据订单计算出来的价格
  actual_payment: number; // 实际支付价格，可能为客服修改后的优惠总价格
  actual_payment_remark: string; // 实际支付与总价格不同时的备注信息，比如："活动折扣1000元"等
  create_date: string; // 下单时间
  remark?: string; // 备注
}
