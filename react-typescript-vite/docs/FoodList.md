# 菜品/食物列表API

获取菜品列表的API

api: `api/food/list`

method: `get`

params:

参数名|类型|说明
:--|:--|:--
page|number|页码，默认1
limit|number|每页多少条数据，默认10

## FoodListResponse

字段名|类型|必须|说明
:--|:--|:--|:--
total|number|yes|-
page|number|yes|-
limit|number|yes|-
list|FoodDetail[]|yes|-
