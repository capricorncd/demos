# vite-react(hook)-typescript

这是一个用vite、react(hook)和typescript构建的应用程序。

![demo preview](./qr-code.png)

demo 扫码预览

## 开发

```shell script
# development
npm run dev
# > Local:    http://localhost:3000/
# > Network:  http://*.*.*.*:3000/
```

```shell script
# build
npm run build
```

```shell script
# serve
npm run serve
```

## 文档生成和启动API服务

执行一下命令，将读取`src/types`里的文件生成相应的`Markdown`文档文件。

```shell script
# generation docs
npm run docs
```

启动API服务

```shell script
# run api service
npm run api
```

## nginx配置

```
server {
    location ~ /api {
        proxy_pass http://localhost:8080;
    }
}
```

## 其他

https://vitejs.dev/

https://reactjs.org/docs/hooks-intro.html

https://www.typescriptlang.org/
