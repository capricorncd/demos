# webRTC Server

```shell
# /home/servers/webrtc-server
forever start main.js
```

```shell
forever stop main.js
```

show process and prot informations

```shell
netstat -ntpl
# port
netstat -ntpl | grep 443
```

kill process

```shell
kill -9 {PROCESS_ID}
```

```shell
# copy dir
cp -r ../resourcetDir .
```

```shell
# copy dir to server
scp -r  ./test  root@192.168.11.128:/home/cwj
# file
scp  ./test.txt  root@192.168.11.128:/home/cwj
```

## WebRTC API

### mediaDevices

```typescript
// 获取音视频设备信息
async function getDeviceInfo(el: HTMLElement) {
  const res: MediaDeviceInfo[] = await navigator.mediaDevices?.enumerateDevices()
  if (res) {
    let str: string
    res.forEach(item => {
      console.log(item);
      str = Object.keys(item.toJSON()).map(key => {
        return `${key} = ${item[key as keyof typeof item]}`
      }).join(', ')
      // deviceId = , kind = audioinput, label = , groupId = afbd...
      // deviceId = , kind = videoinput, label = , groupId = bde1...
      // deviceId = , kind = audiooutput, label = , groupId = afbd...
    })
  }
}

getDeviceInfo()
```

### MediaStreamConstraints.video

属性|类型|说明
:-- | :-- | :--
width | number / ConstrainULongRange | 采集视频宽度 
height | ConstrainULongRange | 采集视频高度
aspectRatio | ConstrainULongRange | 宽高比
frameRate | ConstrainULongRange | 帧率
facingMode | string | user前置摄像头，environment后置摄像头，left前置左摄像头，right前置右摄像头
resizeMode | boolean | 是否裁剪采集尺寸

```typescript
  const constraints: MediaStreamConstraints = {
    video: {
        width: 1080,
        height: 1920,
    },
    // audio: true,
  }
```

### gerUserMedia

```typescript
navigator.mediaDevices.getUserMedia(constraints)
```

### MediaStreamConstraints.audio

属性|类型|说明
:-- | :-- | :--
volume | ConstrainULong | 音量 [0, 1.0]
sampleRate | ConstrainULong | 采样率 48000, 32000 ...
sampleSize | ConstrainULong | 每个采用用多少位表示。一般用16位，2个字节
echoCancellation | boolean | 是否开启回音消除 boolean
autoGainControl | boolean | 自动增益 boolean
noiseSuppression | boolean | 降噪 boolean
latency | ConstrainULong | 延迟 一般200以内，或500毫秒
channelCount | - | -
deviceID | string | 设置设备ID，如前置摄像头切换只后置摄像头
groupID | string | 同一个物理设备的groupID相同


```typescript
  const constraints: MediaStreamConstraints = {
    video: true,
    audio: {
        echoCancellation: true,
    },
  }
```

## filter

CSS filter, -webkit-filter/filter

video 与 filter 的关联

最终调用浏览器底层图像绘制库：OpenGL/Metal/...

常见特效

特效|说明|特效|说明
:--|:--|:--|:--
grayscale | 灰度 | opacity |透明度
sepia|褐色|brightness|亮度
saturate|饱和度|contrast|对比度
hue-rotate|色相旋转|blur|模糊
invert|反色|drop-shadow|阴影

## MediaStream

```
MediaStream {
  active: true
  id: "GNe2EwwZu3fcjmwgbpswuQLOrdUp2ARXNLcy"
  onactive: null
  onaddtrack: null
  oninactive: null
  onremovetrack: null
}
```

__proto__

```
MediaStream {
  active: true
  addTrack: ƒ addTrack()
  clone: ƒ clone()
  getAudioTracks: ƒ getAudioTracks()
  getTrackById: ƒ getTrackById()
  getTracks: ƒ getTracks()
  getVideoTracks: ƒ getVideoTracks()
  id: (...)
  onactive: (...)
  onaddtrack: (...)
  oninactive: (...)
  onremovetrack: (...)
  removeTrack: ƒ removeTrack()
}
```

### methods

MediaStream.addTrack()

MediaStream.removeTrack()

MediaStream.getVideoTracks()

MediaStream.getAudioTracks()

MedaiStream.stop()

### events

onaddtrack

onremovetrack

onended

## MediaRecorder

```javascript
const mr = new MediaRecorder(stream[, options])
```

参数 | 说明 
:-- | :--
stream | 媒体流，可从getUserMedia/<vidoe>/<audio>/<canvas>获取
options | 限制选项

选项 | 说明 
:-- | :--
｜ mimeType|video/webm
｜ - | audio/webm
｜ - | video/webm;codecs=vp8
｜ - | video/webm;codecs=h264
｜ - | audio/webm;codecs=opus
｜ - | 其他mimeType，如video/mp4, audio/mp3等
|audioBitsPerSecond|音频码率，如64K，128K等
|videoBitsPerSecond|视频码率
|bitsPerSecond|整体码率

### API

#### methods

```
MediaRecorder.start(timeslice)
```

开始录制媒体。timeslice可选，未设置视频流全部放入一个buffer；反之按timeslice时间切片分段存储数据

```
MediaRecorder.stop()
```

停止录制。此时会触发包括最终Blob数据的dataavailable事件

```
MediaRecorder.pause()
MediaRecorder.resume()
MediaRecorder.isTypeSupported()
```

#### events

ondataavailable 每次记录一定时间的数据时（如果未设置时间片，则记录整个数据时）会定期触发。

onerror 发生错误时，录制会被终止

### js数据存储方式

string

Blob

ArrayBuffer

ArrayBufferView

## getDisplayMedia 捕获桌面

```typescript

```

## coturn

https://github.com/coturn/coturn

```shell script
$ #https://github.com/coturn/coturn/wiki/Downloads
$ tar xvfz turnserver-<...>.tar.gz
$ ./configure --prefix=/usr/local/coturn
$ make
$ sudo make install
$ cd /usr/local/coturn/etc
$ cp turnserver.conf.default turnserver.conf
```

```shell script
vi turnserver.conf
```

```
Listening-port=3478
External-ip=150.***.***.***
user=userName:pw # 访问stun/turn服务的用户名和密码
realm=stun.xxx.com
```

```shell script
$ #start service
$ turnserver -c turnserver.conf
$ # ./bin/turnserver -c etc/turnserver.conf
```


## Other

https://github.com/webrtcHacks/adapter

https://socket.io/

