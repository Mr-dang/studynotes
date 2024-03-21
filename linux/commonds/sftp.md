sftp user@host

`sftp> put localfile remotefile`

## 示例

- 上传 `dist` 文件夹到远程 `dist` 目录

```shell
put -r dist
```

- 上传 `dist` 文件夹内的内容到远程 `test` 目录

```shell
put -r dist/* test
```