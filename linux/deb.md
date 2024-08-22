# 在Ubuntu/Debian中安装/卸载deb软件

`apt`和`qpt-get`是基于`dpkg`工作的，GUI 软件中心(例如：Synaptic, Software Center)也是基于`dpkg`, `apt`和`apt-get`能自动帮忙查找并安装依赖。

## 使用 `dpkg` 安装 `.deb` 软件

```shell
sudo dpkg -i some_name.deb
```

## 使用 `dpkg` 卸载 `.deb` 软件

```shell
sudo dpkg -r some_name.deb
```

## 使用 `dpkg` 重新配置一个已安装的 `.deb` 软件

```shell
sudo dpkg-reconfigure some_name.deb
# sudo dpkg-reconfigure tzdata
```

## 参考链接

- [15-dpkg-commands-in-linux-servers](https://www.linuxsysadmins.com/15-dpkg-commands-in-linux-servers/)
