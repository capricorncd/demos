# 订单详情API

获取订单详情

api: `api/order/detail`

method: `get`

params:

参数名|类型|说明
:--|:--|:--
orderId|number|订单ID，为0时返回最新订单数据

## OrderDetailResponse

接口返回数据

字段名|类型|必须|说明
:--|:--|:--|:--
order_id|string|yes|订单号
status|number|yes|订单状态
merchant_info|MerchantInfo|yes|店铺信息
list|FoodDetail[]|yes|订单菜品列表
total_price|number|yes|总价格，根据订单计算出来的价格
actual_payment|number|yes|实际支付价格，可能为客服修改后的优惠总价格
actual_payment_remark|string|yes|实际支付与总价格不同时的备注信息，比如："活动折扣1000元"等
create_date|string|yes|下单时间
remark|string|no|备注
