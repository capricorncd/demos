# 首页数据获取API

获取首页推荐数据，分类数据，以及菜品数据的API

api: `api/home`

method: `get`

## HomeResponse

接口返回数据

字段名|类型|必须|说明
:--|:--|:--|:--
trending_list|ShopItem[]|yes|热门或推荐列表
categories|CategoryItem[]|yes|分类列表

## CategoryItem

分类元素结构

字段名|类型|必须|说明
:--|:--|:--|:--
id|number|yes|分类ID
name|string|yes|分类名称
sub_name|string|no|其他（语言）名称
icon|string|no|分类图标

## ShopItem

商品、菜品

字段名|类型|必须|说明
:--|:--|:--|:--
id|number|yes|商品ID
name|string|yes|商品名称
sub_name|string|no|二级名称
category_id|number|yes|所属分类ID
price|number|yes|价格
special_price|number|no|优惠价格或会员价格
remark|string|no|备注说明
cover|string|yes|封面图
