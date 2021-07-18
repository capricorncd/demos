/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-27 22:58 (GMT+0900)
 *
 * #历史订单列表API
 * 获取历史订单数据列表API
 * @apiUrl api/order/history
 * @param page number 页码
 * @param limit number 每页返回数据条数
 */
// 接口返回数据
export interface OrderHistoryResponse {
  order_list: OrderHistoryListItem[];
  total: number; // 总条数
  limit: number; // 每页订单数
}

export interface OrderHistoryListItem {
  id: string; // 订单号
  create_date: string; // 下单时间
  count: number; // 件数
  actual_payment: number; // 实际支付价格，可能为客服修改后的优惠总价格
}
