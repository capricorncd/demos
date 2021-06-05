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

vidoe 与 filter 的关联

最终调用浏览器底层图像绘制库：OpenGL/Metal/...

常见特效

特效|说明|特效|说明
:--|:--|:--|:--
grayscale | 灰度 | opacity |透明度
sepia|褐色|brightness|亮度
saturate|饱和度|contrast|对比度
hue-rotate|色相旋转|blur|模糊
invert|反色|drop-shadow|阴影

## Other

https://github.com/webrtcHacks/adapter

