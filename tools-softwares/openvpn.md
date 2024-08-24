# OpenVPN

- OpenVPN社区版官网地址: [https://openvpn.net/community/](https://openvpn.net/community/)
- 社区版Windows OpenVPN客户端、Linux源码下载: [https://openvpn.net/community-downloads/](https://openvpn.net/community-downloads/)
- OpenVPN For Android: [https://github.com/schwabe/ics-openvpn/releases](https://github.com/schwabe/ics-openvpn/releases)、[OpenVPN in Googel Play](https://play.google.com/store/apps/details?id=de.blinkt.openvpn)
- MacOS OpenVPN客户端: [OpenVPN for Mac](https://openvpn.net/client-connect-vpn-for-mac-os/)、 [Tunnelblick](https://tunnelblick.net/)、[Viscosity](https://www.sparklabs.com/viscosity/)
- OpenVPN3: [https://github.com/OpenVPN/openvpn3/](https://github.com/OpenVPN/openvpn3/)
- iOS客户端: [The official OpenVPN Connect client](https://itunes.apple.com/us/app/openvpn-connect/id590379981)

## 在Linux上设置OpenVPN服务

### 方式一：从源码编译

#### Step1: 下载源码

从[社区版下载页面](https://openvpn.net/community-downloads/)下载最新版的源码, 例如 `openvpn-2.6.12.tar.gz`

#### Step2: 从源码安装OpenVPN

```shell
tar -zxf openvpn-2.6.12.tar.gz
cd openvpn-2.6.12
./configure
make
make install
```

#### Step3: 配置OpenVPN服务，并启动OpenVPN服务

参考以下文档配置`openvpn`服务:

- [man openvpn](https://openvpn.net/man.html)
- [how to](https://openvpn.net/howto.html)

### 方式二: 从软件仓库安装

以 `ubuntu/deian` 为例:

```shell
sudo apt install openvpn
```

安装后的配置参考方式一的 Step3

### 方式三：使用github脚本一键安装

github仓库地址: [https://github.com/angristan/openvpn-install](https://github.com/angristan/openvpn-install)

核心内容:

```shell
curl -O https://raw.githubusercontent.com/angristan/openvpn-install/master/openvpn-install.sh
chmod +x openvpn-install.sh
./openvpn-install.sh
```

执行后会得到一个 client.ovpn 文件，使用OpenVPN客户端导入该文件后，启动客户端即可

## 在Linux上启动`openvpn`客户端

首先，确保安装了 `openvpn`

```shell
openvpn --version
```

`openvpn` 安装后，会在`systemd`注册三个服务：
- `openvpn`
- `openvpn@client`
- `openvpn@server`

Linux的 `openvpn` 客户端和服务端都是这个程序。服务器启动 `openvpn` 服务后，会得到至少一个给客户端用的配置文件(如: client.ovpn/client.conf, ca.key等)，将这些文件放在客户端Linux的`/etc/openvpn`文件夹中，注意：名称一定是 `client.conf`。

使用`systemctl`启动`openvpn`服务：

```shell
sudo systemctl start openvpn
```

上述命令执行后，会在 `/etc/openvpn` 文件夹下查找 `client.conf` 和 `server.conf` 文件，各启动一个进程。没找到文件不会启动对应的进程。

如果只想启动客户端进程，可以执行以下命令:

```shell
sudo systemctl start openvpn@client
sudo systemctl enabel openvpn@client # 加入开机启动
```

相关命令参考:

- `systemctl status openvpn` # 查看openvpn进程状态
- `systemctl status openvpn@client` # 查看openvpn@client进程状态
- `systemctl status openvpn@server` # 查看openvpn@server进程状态
- `systemctl list-unit-files --type service | grep openvpn` # 过滤openvpn相关服务
- `openvpn /etc/openvpn/client.conf` # 直接使用`openvpn`启动客户端，测试用,可查看报错信息

## 参考链接

- [openvpn-install by angristan](https://github.com/angristan/openvpn-install)
- [openvpn-install by Nyr](https://github.com/Nyr/openvpn-install)
