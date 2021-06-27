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
// 接口返回数据
export interface OrderDetailResponse {
  order_id: string; // 订单号
  status: number; // 1已下单，2制作中，3已完成
  food_list: OrderDetailFoodItem[]; // 食品列表
  remark: string; // 下单时的备注信息
  create_date: string; // 下单时间，时间戳还是yyyy-MM-dd hh:mm:ss？
}

// 订单详情食品数据
export interface OrderDetailFoodItem {
  cover: string; // 封面图
  name: string; // 名称
  sub_name: string; // 二级名称
  price: number; // 价格
  count: number; // 数量
  specifications: OrderDetailSpecification[]; // 规格列表
}

// 订单详情食品规格列表元素数据
export interface OrderDetailSpecification {
  name: string; // 规格名称
  price_difference: number; // 差价
}
