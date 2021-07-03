# 菜品/食物详情API

获取菜品详情的API

api: `api/food/detail`

method: `get`

params:

参数名|类型|说明
:--|:--|:--
foodId|number|食品ID

## FoodDetail

接口返回数据

字段名|类型|必须|说明
:--|:--|:--|:--
id|number|yes|商品ID
name|string|yes|商品名称
sub_name|string|no|二级名称
category_id|number|yes|所属分类ID
price|number|yes|默认价格
special_price|number|no|优惠价格或会员价格
remark|string|no|备注说明
cover|string|yes|封面图
content|string|no|详细说明
image_list|string[]|yes|图片列表
specifications|FoodSpecificationItem[]|yes|食物规格列表

## FoodSpecCategoryItem

食物规格分类

字段名|类型|必须|说明
:--|:--|:--|:--
id|number|yes|规格分类ID
name|string|yes|规格分类名称
is_required|boolean|yes|是否必选
is_multiple_choice|boolean|yes|是否为多选

## FoodSpecificationItem

规格子选项

字段名|类型|必须|说明
:--|:--|:--|:--
id|number|yes|规格ID
c_id|number|yes|规格分类ID
name|string|yes|子选项名称
price|number|yes|差价。默认价格的基础上增减，取值`-n ~ +n`
