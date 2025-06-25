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

## 操作技巧

### 在系统登录时输出系统信息

把脚本文件放在 `/etc/prodile.d` 目录下:

```shell
#!/bin/bash
export TZ="Asia/Shanghai"

# 获取当前时间
current_time=$(date +"%Y-%m-%d,%H:%M:%S")

# 获取系统版本
version=$(cat /etc/os-release | grep PRETTY_NAME | cut -d= -f2 | tr -d '"')

# 获取内核版本
kernel=$(uname -srmo)

# 获取运行时长
uptime_str=$(uptime -p | sed 's/up //')

# 获取IP地址
ipaddr=$(hostname -I | awk '{print $1}')

# 获取主机名
hostname=$(hostname)

# 获取CPU信息
cpu=$(lscpu | grep "Model name" | awk -F: '{print $2}' | xargs)

# 获取内存信息
mem_total=$(free -m | awk '/^Mem:/ {print $2}')
mem_used=$(free -m | awk '/^Mem:/ {print $3}')
mem_percent=$(free | awk '/^Mem:/ {printf "%.2f", $3/$2*100}')
swap_total=$(free -m | awk '/^Swap:/ {print $2}')
swap_used=$(free -m | awk '/^Swap:/ {print $3}')
swap_percent=$(free | awk '/^Swap:/ {if ($2>0) printf "%.2f", $3/$2*100; else print "0.00"}')

# 获取负载
loadavg=$(cat /proc/loadavg | awk '{print $1"("$1"m)"$2"("$2"m)"$3"("$3"m)"}')

# 获取进程数
proc_total=$(ps -e --no-headers | wc -l)
proc_root=$(ps -U root --no-headers | wc -l)
proc_user=$(ps -U $(whoami) --no-headers | wc -l)

# 获取登录用户数
users_logged_on=$(who | wc -l)

# 获取最后启动和登录信息
last_boot=$(who -b | awk '{print $3" "$4}')
last_login=$(last -n 1 -w | head -1 | awk '{print $4" "$5" "$6" "$7}')

# 输出系统信息
echo "[System Info]"
echo "Current Time         : $current_time"
echo "Version              : $version"
echo "Kernel               : $kernel"
echo "Uptime               : $uptime_str"
echo "Ipaddr               : $ipaddr"
echo "Hostname             : $hostname"
echo
echo "Cpu                  : $cpu"
echo "Memory               : ${mem_used}MB / ${mem_total}MB(${mem_percent}% Used)"
echo "SWAP                 : ${swap_used}MB / ${swap_total}MB(${swap_percent}% Used)"
echo "Load avg             : $loadavg"
echo "Processes            : ${proc_root}(root)${proc_user}(user)${proc_total}(total)"
echo "Users Logged on      : $users_logged_on users"
echo "Last Boot            : $last_boot"
echo "Last Login           : $last_login"
echo

# 输出文件系统信息
echo "[Filesystem Info]"
df -h --output=target,used,size,pcent | grep -v "Mounted" | while read line; do
    mount=$(echo $line | awk '{print $1}')
    used=$(echo $line | awk '{print $2}')
    size=$(echo $line | awk '{print $3}')
    percent=$(echo $line | awk '{print $4}')
    echo "Mounted: $mount $used / $size($percent Used)"
done
```

例如，取名为 `sysinfo.sh`，`chmod +x sysinfo.sh`，然后`./sysinfo.sh`即可。
