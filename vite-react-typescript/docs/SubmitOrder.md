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
status|number|yes|订单状态
shop_id|number|yes|店铺Id
shop_name|string|yes|店铺名称
table_name|string|yes|桌号
list|FoodDetail[]|yes|订单菜品列表
create_date|string|yes|下单时间
remark|string|no|备注
