# 授权登录API

用户通过微信/LINE/PayPay扫码授权登录API

api: `api/auth`

method: `post`

params:

参数名|类型|说明
:--|:--|:--
platform|sting|入口平台，微信`weixin`/LINE`line`/PayPay`paypay`/普通浏览器`other`
shop_id|string|商铺ID或唯一标识
table_id|number|餐桌编号(下单时再提交？)
redirect_url|string|授权成功后的跳转地址

## AuthResponse



字段名|类型|必须|说明
:--|:--|:--|:--
user|UserInfo|yes|用户信息
entry_cover|string|no|欢迎页封面图。为空则不显示欢迎页面，直接进入菜品主页

## UserInfo

用户信息

字段名|类型|必须|说明
:--|:--|:--|:--
id|number|yes|用户ID
name|string|yes|用户昵称
avatar|string|yes|用户头像
