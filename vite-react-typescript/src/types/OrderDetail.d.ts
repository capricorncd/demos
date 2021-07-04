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
import { SubmitOrderResponse } from './SubmitOrder'

// 接口返回数据
export interface OrderDetailResponse extends SubmitOrderResponse {
}
