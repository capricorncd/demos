# 用户语言设置API

通过该接口设置系统显示语言

api: `api/login`

method: `post`

params:

参数名|类型|说明
:--|:--|:--
regionCode|sting|区号
phone|sting|手机号
code|sting|验证码

## LoginResponse

extends: `AuthSuccessResponse`

字段名|类型|必须|说明
:--|:--|:--|:--
status|number|yes|1成功 2失败
