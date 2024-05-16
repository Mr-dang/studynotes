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

## 前端工程项目配置文件别名跳转

`webpack`/`vite`项目中使用文件路径别名，例如 `@` 代指 `src` 目录：
```javascript
resolve: {
  alias: {
    "@": path.resolve(__dirname, "src"),
  },
},
```
想在 `vscode` 中对函数名、组件名等实现 `Ctrl` + `Click` 跳转，需要在 `jsconfig.json`/`tsconfig.json` 中做如下配置：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

参考文档:

- [Using webpack aliases-vscode](https://code.visualstudio.com/docs/languages/jsconfig#_using-webpack-aliases)
