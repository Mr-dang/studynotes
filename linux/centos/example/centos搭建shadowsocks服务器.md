# Centos搭建shadowsocks服务器

## 第一步 安装pip

pip是 python 的包管理工具。在本文中将使用 python 版本的 shadowsocks，此版本的 shadowsocks 已发布到 pip 上，因此我们需要通过 pip 命令来安装。

```shell
curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py"
python get-pip.py
```

## 第二步 安装配置 shadowsocks

```shell
pip install --upgrade pip # 升级pip
pip install shadowsocks
```

安装完成后，需要创建shadowsocks的配置文件/etc/shadowsocks.json，编辑内容如下：

```shell
vim /etc/shadowsocks.json
 
```json
{
  "server": "0.0.0.0",
  "local_address": "127.0.0.1",
  "local_port": 1080,
  "port_password": {
    "8080": "填写密码",
    "8081": "填写密码"
  },
  "timeout": 600,
  "method": "aes-256-cfb"
}
```

说明：

method为加密方法，可选aes-128-cfb, aes-192-cfb, aes-256-cfb, bf-cfb, cast5-cfb, des-cfb, rc4-md5, chacha20, salsa20, rc4, table
port_password为端口对应的密码，可使用密码生成工具生成一个随机密码.

如果你不需要配置多个端口的话，仅配置单个端口，则可以使用以下配置:

```json
{
  "server": "0.0.0.0",
  "server_port": 8080,
  "password": "填写密码",
  "method": "aes-256-cfb"
}
```

说明：

server_port为服务监听端口
password为密码
同样的以上两项信息在配置 shadowsocks 客户端时需要配置一致。

## 第三步 配置自启动

编辑shadowsocks 服务的启动脚本文件，内容如下：

```shell
vim /etc/systemd/system/shadowsocks.service
[Unit]
Description=Shadowsocks

[Service]
TimeoutStartSec=0
ExecStart=/usr/bin/ssserver -c /etc/shadowsocks.json

[Install]
WantedBy=multi-user.target
```

执行以下命令启动 shadowsocks 服务：

```shell
systemctl enable shadowsocks # 开机启动shadowsocks
systemctl start shadowsocks # 启动shadowsocks
```

检查 shadowsocks 服务是否已成功启动，可以执行以下命令查看服务的状态：

```shell
systemctl status shadowsocks -l
```

若是启动失败，有可能是配置文件`/etc/shadowsocks.json`写的有问题。

## 第四步 配置防火墙规则

centos7使用`firewalld`管理防火墙，开放你配置的端口，不然客户端是无法连接的：

```shell
firewall-cmd --zone=public --add-port=8080/tcp --permanent
firewall-cmd --zone=public --add-port=8081/tcp --permanent
firewall-cmd --reload
```

查看是否生效:

```shell
firewall-cmd --zone=public --query-port=8080/tcp
```

删除一条规则:

```shell
firewall-cmd --zone=public --remove-port=8080/tcp --permanent
```

说明:

`firewall-cmd`是软件`firewalld`的命令行，在centos中安装`firewalld`：`yum -y install firewalld`

安装了`firewalld`之后，启动时遇到了报错:

```shell
systemctl start firewalld
```

```shell
ERROR: Exception DBusException: org.freedesktop.DBus.Error.AccessDenied: Connection ":1.11" is not allowed to own the service "org.fedoraproject.FirewallD1" due to
security policies in the configuration file
```

解决办法是：

在`/etc/dbus-1/system.d/`目录下创建`com.foxbryant.demo.conf` (名称随意,以.conf结尾即可) 内容如下:

```shell
<!DOCTYPE busconfig PUBLIC "-//freedesktop//DTD D-BUS Bus Configuration 1.0//EN" "http://www.freedesktop.org/standards/dbus/1.0/busconfig.dtd">
<busconfig>
  <!-- Only root and devel can own the service -->
  <policy user="root">
    <allow own="com.foxbryant.demo"/>
    <allow send_destination="com.foxbryant.demo"/>
    <allow send_interface="com.foxbryant.demo"/>
  </policy>
  <policy user="foxbryant">
    <allow own="com.foxbryant.demo"/>
    <allow send_destination="com.foxbryant.demo"/>
    <allow send_interface="com.foxbryant.demo"/>
  </policy>
</busconfig>
```

然后启动并设置为开机启动:

```shell
systemctl start firewalld
systemctl enable firewalld
systemctl status firewalld -l
```

至此，shadowsocks便配置完成了。

## 以上四步可以用脚本执行

一键安装脚本:

```shell
#!/bin/bash
# Install Shadowsocks on CentOS 7

echo "Installing Shadowsocks..."

random-string()
{
    cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w ${1:-32} | head -n 1
}

CONFIG_FILE=/etc/shadowsocks.json
SERVICE_FILE=/etc/systemd/system/shadowsocks.service
SS_PASSWORD=$(random-string 32)
SS_PORT=8388
SS_METHOD=aes-256-cfb
SS_IP=`ip route get 1 | awk '{print $NF;exit}'`
GET_PIP_FILE=/tmp/get-pip.py

# install pip
curl "https://bootstrap.pypa.io/get-pip.py" -o "${GET_PIP_FILE}"
python ${GET_PIP_FILE}

# install shadowsocks
pip install --upgrade pip
pip install shadowsocks

# create shadowsocls config
cat <<EOF | sudo tee ${CONFIG_FILE}
{
  "server": "0.0.0.0",
  "server_port": ${SS_PORT},
  "password": "${SS_PASSWORD}",
  "method": "${SS_METHOD}"
}
EOF

# create service
cat <<EOF | sudo tee ${SERVICE_FILE}
[Unit]
Description=Shadowsocks

[Service]
TimeoutStartSec=0
ExecStart=/usr/bin/ssserver -c ${CONFIG_FILE}

[Install]
WantedBy=multi-user.target
EOF

# start service
systemctl enable shadowsocks
systemctl start shadowsocks

# view service status
sleep 5
systemctl status shadowsocks -l

echo "================================"
echo ""
echo "Congratulations! Shadowsocks has been installed on your system."
echo "You shadowsocks connection info:"
echo "--------------------------------"
echo "server:      ${SS_IP}"
echo "server_port: ${SS_PORT}"
echo "password:    ${SS_PASSWORD}"
echo "method:      ${SS_METHOD}"
echo "--------------------------------"
```

## 遇到的问题

1. 新建用户root权限问题

想给新建的用户授予使用sudo命令的权限，但是`/etc/sudoers`文件不存在，网上搜索了才知道，最小化安装的centos下，没有安装`sudo`命令，于是在`root`用户下安装了`sudo`：`yum install -y sudo`，然后在`/etc/sudoers`文件中增加一行:

```shell
user001 ALL=(ALL)  ALL
```

为用户`user001`授予了使用`sudo`命令的权限。

## 参考链接

- http://blog.51cto.com/zero01/2064660
- http://blog.51cto.com/zero01/2064660
- https://www.cnblogs.com/kevingrace/p/8495424.html
