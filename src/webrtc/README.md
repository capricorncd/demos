# webrtc

live

## Build Setup

```bash
# install dependencies
$ npm install
# or
$ npm i
```

### development

```bash
# serve with hot reload at localhost:3000
npm run dev
```

### launch server

```bash
# launch server, at localhost:8000
npm run start
```

## install coturn

https://github.com/coturn/coturn

```bash
# install git
yum install git
# clone coturn
git clone https://github.com/coturn/coturn.git
# install openssl-devel
sudo yum install openssl-devel
# install libevent-devel
sudo yum install libevent-devel
# install conturn
cd coturn
# 指定目录
./configure --prefix=/var/server/coturn
# 编译
make -j 4
# 安装
sudo make install
```

successed

```bash
[root@VM-0-12-centos server]# cd coturn
[root@VM-0-12-centos coturn]# ls
bin  etc  include  lib  man  share  var
[root@VM-0-12-centos coturn]# cd bin
[root@VM-0-12-centos bin]# ls
turnadmin  turnserver  turnutils_natdiscovery  turnutils_oauth  turnutils_peer  turnutils_stunclient  turnutils_uclient
```

## coTurn服务器配置

```bash
# 指定监听端口
listeing-prot=3478
# 指定云主机的公网IP地址
external-ip=100.10.10.100
# 访问stun/turn服务的用户名和密码
user=username:password
# 域名设置(必须)
realm=stun.domain.com
```

start server

```bash
./bin/turnserver -c ./etc/turnserver.conf
```