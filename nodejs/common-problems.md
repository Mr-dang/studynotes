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
