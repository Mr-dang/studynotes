# JavaScript小技巧

## 一、JavaScript发送的请求体类型

- `application/x-www-form-urlencoded`
- `multipart/form-data`
- `application/json`

## 二、`fetch`发送`application/x-www-form-urlencoded`格式的请求

### 2.1 new URLSearchParams(object)

```javascript
const params = {
  name: 'Alice',
  sex: 'female',
};
fetch('/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams(params).toString(),
});
```

### 2.2 URLSearchParams.append(key, value)

```javascript
const params = new URLSearchParams();
params.append('name', 'Alice');
params.append('sex', 'female');
fetch('/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: params.toString(),
});
```

## 三、推荐的chrome插件

- Console Importer: `$i('jquery')`、`$i('lodash')`、`$i('moment')` 等
- JSON Viewer: 查看json数据

## 四、不常见的Web API

### 4.1 `URL.createObjectURL()`

```javascript
const url = URL.createObjectURL(new Blob(['hello world'], { type: 'text/plain' }));
```
### 4.2 `URL.revokeObjectURL()`

```javascript
URL.revokeObjectURL(url);
```

### 4.3 `URLSearchParams`

```javascript
const params = new URLSearchParams('name=Alice&sex=female');
params.toString(); // 'name=Alice&sex=female'
params.append('age', 18); // 'name=Alice&sex=female&age=18'
params.set('age', 20); // 'name=Alice&sex=female&age=20'
params.get('name'); // 'Alice'
params.getAll('name'); // ['Alice']
params.delete('age'); // 'name=Alice&sex=female'
params.has('name'); // true
params.keys(); // ['name', 'sex']
params.values(); // ['Alice', 'female']
params.entries(); // [['name', 'Alice'], ['sex', 'female']]
params.forEach((value, key) => {
  console.log(key, value);
});
```

### 4.4 防止录屏的API `Encrypted Media Extensions`

```javascript
const video = document.querySelector('video');
const stream = video.captureStream(); // 获取视频流
const recorder = new MediaRecorder(stream); // 创建媒体录制器
recorder.start(); // 开始录制
recorder.stop(); // 停止录制
```
