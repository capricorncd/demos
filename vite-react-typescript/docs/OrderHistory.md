# 历史订单列表API

获取历史订单数据列表API

api: `api/order/history`

params:

参数名|类型|说明
:--|:--|:--
page|number|页码
limit|number|每页返回数据条数

## OrderHistoryResponse

接口返回数据

字段名|类型|必须|说明
:--|:--|:--|:--
order_list|OrderHistoryListItem[]|yes|-
total|number|yes|总条数
limit|number|yes|每页订单数

## OrderHistoryListItem

字段名|类型|必须|说明
:--|:--|:--|:--
id|string|yes|订单号
create_date|string|yes|下单时间
count|number|yes|件数
actual_payment|number|yes|实际支付价格，可能为客服修改后的优惠总价格
