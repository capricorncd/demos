# 授权登录API

用户通过微信/LINE/PayPay扫码授权登录API
扫码->URL(https://onescan.co.jp/client/entry?qrId=XXX100000002)->加载页面->验证token

api: `api/auth`

method: `post`

params:

参数名|类型|说明
:--|:--|:--
platform|sting/null|入口平台，微信`weixin`/LINE`line`/PayPay`paypay`/其他浏览器`null`
qrCodeId|string|二维码Id。生成二维码时，为每个二维码生成的不重复编号，后台手动将该ID与店铺餐桌信息（如商家及餐桌Id）绑定。
token|string/null|Token，验证用户是否已登录。为空或验证未登录则重新授权生成新的Token。

## AuthResponse

extends: `AuthSuccessResponse`

字段名|类型|必须|说明
:--|:--|:--|:--
status|number|yes|1已授权成功 2未授权，且非微信等平台，无法重定向至授权页面时则需跳转至登录页面

## AuthSuccessResponse

字段名|类型|必须|说明
:--|:--|:--|:--
user_info|UserInfo|yes|用户信息
entry_cover|string|no|欢迎页封面图。为空则不显示欢迎页面，直接进入菜品主页
merchant_info|MerchantInfo|yes|店铺信息
primary_color|string|yes|主题色
token|string|yes|用户授权凭证
redirect_url|string|yes|授权成功后的跳转地址。https
platform_info|PlatformInfo|yes|平台相关信息。后期调用平台（微信等）相关接口时使用的相关数据

## UserInfo

用户信息

字段名|类型|必须|说明
:--|:--|:--|:--
user_id|number|yes|用户ID
user_name|string|yes|用户昵称
avatar|string|yes|用户头像
language|LanguageTypes|yes|设定语言，未设置时为空

## MerchantInfo

系统/店铺基础数据

字段名|类型|必须|说明
:--|:--|:--|:--
merchant_id|number|yes|店铺Id
merchant_name|string|yes|店铺名称
merchant_sub_name|string|yes|店铺别名或其他语言名称
qr_cord_id|number|no|扫码对应的二维码（餐桌）id
table_name|string|yes|餐桌名称或编号，如8号（桌），xx包间等
price_symbol|string|yes|价格符号，如$/¥
is_tax_included|boolean|yes|是否为含税价格
address|string|yes|店铺地址
business_open_time|string|yes|营业开始时间（时间统一用时间戳，还是yyyy-MM-dd hh
business_close_time|string|yes|营业结束时间
system_time|string|yes|服务器系统时间，用于本地时间校对
latitude|string|no|商家店铺所在纬度，用于地图显示
longitude|string|no|商家店铺所在经度

## PlatformInfo

字段名|类型|必须|说明
:--|:--|:--|:--
token|string|no|待定
