# vue-router 技巧

## 创建新路由后的完整地址

```javascript
this.$router.resolve({
  name: 'abc',
  query: {
    para1: 'bcd',
  },
}).href;
```
