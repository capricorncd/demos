# 授权登录API

用户通过微信/LINE/PayPay扫码授权登录API

api: `api/auth`

method: `post`

params:

参数名|类型|说明
:--|:--|:--
platform|sting|入口平台，微信`weixin`/LINE`line`/PayPay`paypay`/普通浏览器`other`
shopId|string|商铺ID或唯一标识
tableId|number|餐桌Id(下单时再提交？)
redirectUrl|string|授权成功后的跳转地址

## AuthResponse

字段名|类型|必须|说明
:--|:--|:--|:--
user_info|UserInfo|yes|用户信息
entry_cover|string|no|欢迎页封面图。为空则不显示欢迎页面，直接进入菜品主页
shop_info|ShopInfo|yes|店铺信息
primary_color|string|yes|主题色

## UserInfo

用户信息

字段名|类型|必须|说明
:--|:--|:--|:--
id|number|yes|用户ID
name|string|yes|用户昵称
avatar|string|yes|用户头像

## ShopInfo

系统/店铺基础数据

字段名|类型|必须|说明
:--|:--|:--|:--
shop_id|number|yes|店铺Id
shop_name|string|yes|店铺名称
shop_sub_name|string|yes|店铺别名或其他语言名称
table_id|number|yes|扫码对应的餐桌id
table_name|string|yes|餐桌名称或编号，如8号（桌），xx包间等
price_symbol|string|yes|价格符号，如$/¥
is_tax_included|boolean|yes|是否为含税价格
address|string|yes|店铺地址
