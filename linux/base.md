# Linux常用命令

## 文件列表、目录

查看当前目录下各文件及文件夹占据的磁盘容量:

```shell
du -sh *
```

## 系统信息相关的命令

列出系统信息(系统名称、内核名称、版本、系统版本、系统架构等)

```shell
uname -a
```

列出系统架构信息:

```shell
arch
```

## 端口、进程

查看某个占用某个端口的进程:

```shell
lsof -i:8080
```
