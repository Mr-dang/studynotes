# nodejs常见问题

## 依赖安装失败

`nodejs` 在 17及以上版本安装依赖失败，可尝试加上如下配置:

```javascript
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
```

在 `.npmrc` 文件中加上如下配置:

```shell
node-options=--openssl-legacy-provider
```

## 设置项目根目录

## ESM项目

在 `ESM` 项目中，可在根目录所在的 `index.mjs` 中使用如下代码设置项目根目录:

```javascript
process.env.ROOT_DIR = path.dirname(fileURLToPath(import.meta.url));
```

`import.meta.url` 使用如下:

```javascript
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const IMAGE_FOLDER_PATH = './images';

console.log(import.meta.url);
// file:///Users/alice/test.mjs
console.log(fileURLToPath(import.meta.url));
// /Users/alice/test.mjs
console.log(path.dirname(fileURLToPath(import.meta.url)));
// /Users/alice
console.log(path.resolve(process.env.ROOT_DIR, IMAGE_FOLDER_PATH, 'abbc.jpg'));
// /Users/alice/images/abbc.jpg
```

## commonjs项目

```javascript
process.env.ROOT_DIR = __dirname;
```
