# Common.d.ts

公用类型定义文件

## AnyObject

任意对象

```
Record<string, any>
```
## ClickFunction

点击事件回调函数

```
(e: React.MouseEvent) => void
```
## DefaultProps

组件默认属性

字段名|类型|必须|说明
:--|:--|:--|:--
className|string|no|
onClick|ClickFunction|no|
children|JSX.Element / React.ReactNode|no|
styles|AnyObject|no|
