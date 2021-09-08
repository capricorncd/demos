# 用户语言设置API

通过该接口设置系统显示语言

api: `api/user/setLanguage`

method: `post`

params:

参数名|类型|说明
:--|:--|:--
type|sting|目前可选项`zh/jp/en`

## LanguageSetResponse

字段名|类型|必须|说明
:--|:--|:--|:--
status|number|yes|1成功 2失败
message|string|no|提示消息
