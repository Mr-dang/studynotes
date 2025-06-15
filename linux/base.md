# Linux常用命令

## 磁盘、文件列表、目录


### 查看系统磁盘信息

```shell
df -h
```


### 查看当前目录下各文件及文件夹占据的磁盘容量:

```shell
du -sh *
```

## 系统信息相关的命令

### 列出系统信息(系统名称、内核名称、版本、系统版本、系统架构等)

```shell
uname -a
```

### 查看Linux系统内核版本

```shell
uname -a
uname -r
cat /proc/version
```

### 查看Linux系统版本

```shell
cat /etc/issue # 查看发行版名称 例如: Debian GNU/Linux 12 \n \l
lsb_release -a # 查看发行版名称 例如:
# Distributor ID: Debian
# Description:    Debian GNU/Linux 12 (bookworm)
# Release:        12
# Codename:       bookworm
```

### 查看系统架构

```shell
arch
```

返回`x86_64`就是`AMD64`架构，返回`aarch64`就是`ARM64`架构。

![x86-aarch64](https://mr-dang.github.io/studynotes/images/x86-aarch64.png)

### 查看系统CPU信息

```shell
lscpu
cat /proc/cpuinfo
```

### 查看系统是32位还是64位

```shell
getconf LONG_BIT
```

### 查看系统是实体机还是虚拟机

```shell
dmidecode -t system | grep "Virtual"
```

实体机无返回值。

### 查看系统内存信息

```shell
free -m
cat /proc/meminfo # 详细情况
cat /proc/meminfo | grep Mem # 单位为KB
```

## 端口、进程

### 查看某个占用某个端口的进程:

```shell
lsof -i:8080
```

### 查看当前系统所有端口的使用情况:

```shell
netstat -tuln
```
### 查看当前系统所有进程

```shell
ps -aux
```
### 查看当前系统所有进程占用的内存

```shell
ps -aux --sort=-%mem | head
```
### 查看当前系统所有进程占用的CPU

```shell
ps -aux --sort=-%cpu | head
```
### 查看当前系统所有进程占用的磁盘空间

```shell
ps -aux --sort=-%cpu | head
```
### 查看当前系统所有进程占用的虚拟内存

```shell
ps -aux --sort=-vsz | head
```
### 查看当前系统所有进程占用的物理内存

```shell
ps -aux --sort=-rss | head
```
