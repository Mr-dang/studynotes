# Mysql/Mariadb 配置文件

操作系统: Ubuntu

MariaDB 版本:

```shell
> mariadb --version
mariadb from 11.1.3-MariaDB, client 15.2 for debian-linux-gnu (x86_64) using readline 5.2
```

## 配置文件所在位置

`/etc/mysql`

```shell
> cat /etc/mysql/my.cnf
# The MariaDB configuration file
#
# The MariaDB/MySQL tools read configuration files in the following order:
# 0. "/etc/mysql/my.cnf" symlinks to this file, reason why all the rest is read.
# 1. "/etc/mysql/mariadb.cnf" (this file) to set global defaults,
# 2. "/etc/mysql/conf.d/*.cnf" to set global options.
# 3. "/etc/mysql/mariadb.conf.d/*.cnf" to set MariaDB-only options.
# 4. "~/.my.cnf" to set user-specific options.
#
# If the same option is defined multiple times, the last one will apply.
#
# One can use all long options that the program supports.
# Run program with --help to get a list of available options and with
# --print-defaults to see which it would actually understand and use.
#
# If you are new to MariaDB, check out https://mariadb.com/kb/en/basic-mariadb-articles/

#
# This group is read both by the client and the server
# use it for options that affect everything
#
[client-server]
# Port or socket location where to connect
# port = 3306
socket = /run/mysqld/mysqld.sock

# Import all .cnf files from configuration directory
!includedir /etc/mysql/conf.d/
!includedir /etc/mysql/mariadb.conf.d/
```

## 开启MySQL的远程服务

根据官方的说法， MariaDB为了提高安全性，默认只监听127.0.0.1中的3306端口并且禁止了远程的TCP链接，我们可以通过下面两步来开启MySQL的远程服务

1. 注释掉skip-networking选项来开启远程访问.
2. 注释bind-address项，该项表示运行哪些IP地址的机器连接，允许所有远程的机器连接

在配置文件中查找 `skip-networking`:

```shell
cd /etc/mysql
grep -rn "skip-networking" *
```

在 `mariadb.conf.d/50-server.cnf` 文件25行，注释该行:

```shell
sudo vim /etc/mysql/mariadb.conf.d/50-server.cnf
#bind-address            = 127.0.0.1
```

重启 `mysql`/`mariadb`:

```shell
sudo systemctl restart mariadb
```

或者

```shell
sudo service mariadb restart
```

## 参考链接

- [Configuring MariaDB for Remote Client Access - 官方文档](https://mariadb.com/kb/en/configuring-mariadb-for-remote-client-access/)
- [MariaDB 数据库配置 Navicat 程序远程访问权限](https://zhuanlan.zhihu.com/p/58572389)
