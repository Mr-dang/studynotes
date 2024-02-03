# Mysql/Mariadb 用户操作

使用有权限的用户登录控制台，如 `root`:

```shell
mariadb -u root -p ******
MariaDB [(none)]> use mysql;
MariaDB [mysql]>
```

## 新增用户

赋予一个账号管理员权限，使用 `localhost` 登录:

```shell
MariaDB [mysql]> GRANT ALL ON *.* TO 'admin'@'localhost' IDENTIFIED BY 'password' WITH GRANT OPTION;
```

赋予一个账号管理员权限，使用任意host登录:

```shell
MariaDB [mysql]> GRANT ALL ON *.* TO 'admin'@'%' IDENTIFIED BY 'password' WITH GRANT OPTION;
```

## FLUSH PRIVILEGES

```shell
MariaDB [mysql]> FLUSH PRIVILEGES;
```
