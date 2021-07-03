# Common.d.ts

公用类型定义文件

## AnyObject

任意对象类型

```typescript
Record<string, any>
```
## ClickFunction

点击事件回调函数

```typescript
(e?: React.MouseEvent) => void
```
## DefaultProps

组件默认属性

字段名|类型|必须|说明
:--|:--|:--|:--
className|string|no|css class名
onClick|ClickFunction|no|点击事件回调函数
children|JSX.Element / React.ReactNode|no|children
styles|AnyObject|no|自定义样式
data|AnyObject / AnyObject[]|no|数据

## RequestOptions

request HTTP请求参数

字段名|类型|必须|说明
:--|:--|:--|:--
url|string|yes|-
method|string|no|-
data|AnyObject|no|-
headers|AnyObject|no|-
