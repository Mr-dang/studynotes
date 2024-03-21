# Centos7 防火墙部分

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

添加协议：

```shell
firewall-cmd --permanent --zone=public --add-service=http
firewall-cmd --permanent --zone=public --add-service=https
```
