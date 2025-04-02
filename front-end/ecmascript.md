# ECMAScript笔记

## 妙用随机数

关键词：随机颜色, Math.random, 随机数, 随机字符串

```javascript
// 随机颜色
function getRandomColor() {
  return Math.random().toString().slice(2, 8).padEnd(6, '0').toString(16);
};

// 随机字符串
function getRandomString(length = 10) {
  return length <= 11 ? Math.random().toString(36).slice(2, 2 + length).padEnd(length, '0') : getRandomString(length - 11) + getRandomString(11);
}
```

## 数学运算

### 乘方运算

```javascript
Math.pow(2, 3); // 8
2 ** 3; // 8
```
### 取整
```javascript
Math.floor(1.9); // 向下取整 1
Math.ceil(1.1); // 进一法，向上取整 2
Math.round(1.5); // 四舍五入取整 2
Math.trunc(1.5); // 1; 返回一个数字的整数部分，去掉小数部分。这个函数不会进行四舍五入，而是直接截断小数部分
~~1.5; // 1; 这个操作符也可以用来进行取整，但是它的行为可能会受到浏览器的实现不同而有所差异，因此不建议使用
```

### 取余
```javascript
Math.floor(1.9); // 1

## 使用label退出两层for循环里的外层循环

```javascript
outer: for (let i = 0; i < 10; i++) {
  console.log('顶层循环');
  for (let j = 0; j < 10; j++) {
    console.log('内层循环', i, j);
    if (i * j > 30) {
      console.log('退出顶层循环');
      break outer; // 退出外层循环端调试控制台评论问题
    }
  }
}
```
