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
