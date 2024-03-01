# 疑难杂症

## URL对空格的转义

url query 中有个空格，通过URL创建实例后，打印href属性，空格转成了20%。

但是操作了 `searchParams` 后，再打印href属性，空格就变成了 `+`:

```javascript
var url = new URL('https://www.google.com/?name=Elon Musk&sex=male');
console.log(url.href);
// "https://www.google.com/?name=Elon%20Musk&sex=male"
url.searchParams.toString();
// "name=Elon+Musk&sex=male"
url.searchParams.set('age', 50);
console.log(url.href);
// "https://www.google.com/?name=Elon+Musk&sex=male&age=50"
```
