# 授权登录API

用户通过微信/LINE/PayPay扫码授权登录API

api: `api/auth`

method: `post`

params:

参数名|类型|说明
:--|:--|:--
platform|sting|入口平台，微信`weixin`/LINE`line`/PayPay`paypay`/普通浏览器`other`
shopId|string|商铺ID或唯一标识
tableId|number|餐桌编号(下单时再提交？)
redirectUrl|string|授权成功后的跳转地址

## AuthResponse

字段名|类型|必须|说明
:--|:--|:--|:--
user_info|UserInfo|yes|用户信息
entry_cover|string|no|欢迎页封面图。为空则不显示欢迎页面，直接进入菜品主页
basic_data|BasicData|yes|基数数据

## UserInfo

用户信息

字段名|类型|必须|说明
:--|:--|:--|:--
id|number|yes|用户ID
name|string|yes|用户昵称
avatar|string|yes|用户头像

## BasicData

系统/店铺基础数据

字段名|类型|必须|说明
:--|:--|:--|:--
price_symbol|string|yes|价格符号
isTaxIncluded|boolean|yes|是否为含税价格
