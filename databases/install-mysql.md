# 安装Mysql

## 在 Windows 上安装 mysql 8.x

mysql 8.x 安装在 windows 里后使用的命令是 `mysqlsh`。

安装好了后，在 `powershell` 中执行命令:

```shell
mysql root@localhost:3310
```

mysql8.x 在 windows 里注册的服务是 `mysql8`:

- `net start mysql8`
- `net stop mysql8`

The InnoDB cluster 'sandboxCluster' is available on the following ports:

```shell
localhost:3310 through localhost:3330
```

To connect with MySQL Shell execute the following command:

```shell
mysqlsh root@localhost:3310
```

To bootstrap MySQL Router execute the following command:

```shell
mysqlrouter --bootstrap root@localhost:3310 --directory router-sandbox
```
