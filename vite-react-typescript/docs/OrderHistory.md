# 历史订单列表API

获取历史订单数据列表API

api: `api/order/history`

params:

参数名|类型|说明
:--|:--|:--
page|number|页码

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
create_data|string|yes|下单时间
count|number|yes|件数
total_price|number|yes|总消费价格
