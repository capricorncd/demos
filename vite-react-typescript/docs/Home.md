# 首页数据获取API

获取首页推荐数据，分类数据，以及菜品数据的API

api: `api/home`

method: `get`

## HomeResponse



字段名|类型|必须|说明
:--|:--|:--|:--
trending_list|ShopItem[]|yes|
categories|CategoryItem[]|yes|

## CategoryItem



字段名|类型|必须|说明
:--|:--|:--|:--
id|number|yes|
name|string|yes|
sub_name|string|no|
icon|string|no|

## ShopItem



字段名|类型|必须|说明
:--|:--|:--|:--
id|number|yes|
name|string|yes|
sub_name|string|no|
category_id|number|yes|
price|number|yes|
special_price|number|no|
remark|string|no|
cover|string|yes|
