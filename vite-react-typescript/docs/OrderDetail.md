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
status|number|yes|1已下单，2制作中，3已完成
food_list|OrderDetailFoodItem[]|yes|食品列表
remark|string|yes|下单时的备注信息
create_date|string|yes|下单时间，时间戳还是yyyy-MM-dd hh

## OrderDetailFoodItem

订单详情食品数据

字段名|类型|必须|说明
:--|:--|:--|:--
cover|string|yes|封面图
name|string|yes|名称
sub_name|string|yes|二级名称
price|number|yes|价格
count|number|yes|数量
specifications|OrderDetailSpecification[]|yes|规格列表

## OrderDetailSpecification

订单详情食品规格列表元素数据

字段名|类型|必须|说明
:--|:--|:--|:--
name|string|yes|规格名称
price_difference|number|yes|差价
