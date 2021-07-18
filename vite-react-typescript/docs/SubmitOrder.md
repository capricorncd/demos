# 提交订单API

客户提交订单API

api: `api/order/submit`

method: `post`

params:

参数名|类型|说明
:--|:--|:--
foodList|SubmitOrderFoodItem[]|所选食品信息列表
shopId|number|店铺Id
tableId|number|餐桌或座位Id
remark|string|备注信息

## SubmitOrderFoodItem

所选食品信息

字段名|类型|必须|说明
:--|:--|:--|:--
id|number|yes|食品ID
count|number|yes|所选数量
specifications|number[]|yes|所选规格ID列表

## SubmitOrderResponse

接口返回数据

字段名|类型|必须|说明
:--|:--|:--|:--
order_id|string|yes|订单号
