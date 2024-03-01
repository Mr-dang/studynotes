# Debian/Ubuntu

## 基础知识

### sudo

`sudo`是以`root`身份执行命令

### root账户密码

在虚拟机中成功安装`ubuntu`之后，使用命令`su root`，然后输入刚才设置的密码，发现密码错误.
在ubuntu系统下，为了安全起见，在安装过程中，系统屏蔽了用户设置root用户。导致很多用户在使用过程中不知道root密码到底是什么。

```shell
sudo passwd
```

参考链接:

- [虚拟机下安装ubuntu后root密码设置](https://blog.csdn.net/z471365897/article/details/51458055)

## 安装软件

Debian/Ubuntu安装软件 使用 `apt-get` 或者 `apt`， 仓库列表配置文件位于: `/etc/apt/sources.list`.

每次执行`apt-get update`时，都会从该配置文件的每个仓库去检测本地已安装的软件是否有可更新的。

一个仓库地址的格式如下:

```shell
deb $SRC $CODENAME $REPONAME
deb-src $SRC $CODENAME $REPONAME
```

其中，`$SRC` 是软件仓库地址，`$CODENAME` 是系统代号，列举如下：

| Version | Codename  |
| ------- | --------- |
| Debian 8.x | jessie |
| Debian 9.x | stretch |
| Ubuntu 14.04 | trusty |
| Ubuntu 16.04 | xenial |
| Ubuntu 17.10 | artful |
| Ubuntu 18.04 | bionic |

`$REPONAME` 是软件仓库的名字，可以自定义。例如，为 `Ubuntu 18.04` 增加一个 `nginx` 的仓库:

```shell
deb http://nginx.org/packages/ubuntu/ bionic nginx
deb-src http://nginx.org/packages/ubuntu/ bionic nginx
```

为 `Debian 9.x`增加一个 `nginx` 仓库：

```shell
deb http://nginx.org/packages/debian/ stretch nginx
deb-src http://nginx.org/packages/debian/ stretch nginx
```

### ppa安装源

> PPA 全称为 Personal Package Archives（个人软件包档案），是 Ubuntu Launchpad 网站提供的一项服务。它允许个人用户上传软件源代码，通过 Launchpad 进行编译并发布为二进制软件包，作为 apt/新立得 源供其他用户下载和更新。在 Launchpad 网站上的每一个用户和团队都可以拥有一个或多个 PPA。 通常 PPA 源里的软件是官方源里没有的，或者是最新版本的软件。相对于通过 Deb 包安装来说，使用 PPA 的好处是，一旦软件有更新，通过 sudo apt-get upgrade 这样命令就可以直接升级到新版本。

 如何通过 PPA 源来安装软件： 通常我们可以通过 Google 来搜索一些常用软件的 PPA 源，通常的搜索方法是软件名称关键字 + PPA ，或者也可直接到 launchpad.net 上去搜索，搜索到后我们就可以直接用 sudo apt-add-repository 命令把 PPA 源添加到 Source list 中了

要使用 `apt-add-repository`，需要先安装 `python-software-properties`、`software-properties-common` 这两个package.

**添加一个ppa**:

```shell
sudo add-apt-repository ppa:webupd8team/java
```

要点:

- `add-apt-repository`
- `python-software-properties`
- `software-properties-common`

```shell
sudo apt-get install python-software-properties software-properties-common
sudo add-apt-repository ppa:webupd8team/java # 添加jdk的ppa
```

参考链接:

- Launchpad官网: `https://launchpad.net/`
- Launchpad官网-ubuntu: `https://launchpad.net/ubuntu`

## 安装curl

```shell
sudo apt-get install curl
```

## 安装nodejs

在 `nodejs` 官网上查看 `Linux` 系统下的安装包, 只有`node-v8.11.1-linux-x64.tar.xz`文件，网上搜索在 `ubuntu` 下安装 `nodejs 的方法，发现有三种：

### 一、nodejs官方推荐的方式

nodejs下载地址: https://nodejs.org/en/download/package-manager/

```shell
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 二、下载官网的安装包

```shell
wget https://nodejs.org/dist/v8.11.1/node-v8.11.1-linux-x64.tar.xz
```

后缀为 `.xz`，要使用 `xz` 解压，先安装 `xz`:

```shell
sudo apt-get install xz-utils
```

然后使用`unxz`解压:

```shell
unxz node-v8.11.1-linux-x64.tar.xz
```

得到 `node-v8.11.1-linux-x64.tar` 文件，再使用 `tar` 解压得到文件夹:

```shell
tar -xvf node-v8.11.1-linux-x64.tar
```

在解压后的文件夹的 `bin` 目录下可以通过`./bin/node -v`使用`node`，若要在全局使用`node`，则需要如下:

```shell
sudo ln /home/ubuntu/node-v8.11.1-linux-x64/bin/node /usr/local/bin/node
sudo ln /home/ubuntu/node-v8.11.1-linux-x64/bin/npm /usr/local/bin/npm
```

将nodejs路径链接到`/usr/local/bin`目录下，则每次`npm -g`安装插件都会安装在nodejs原路径下的node_modules(比如/home/ubuntu/node-v8.11.1-linux-x64/lib/node_modules)，每次代码中引用插件也需要到此目录下去找, 感觉不方便

### 三、使用nodejs版本管理器n

`sudo apt-get install nodejs-legacy`

安装的版本是`4.2.6`，然后安装`npm`：`sudo apt-get install npm`

设置`npm`的源: `npm config set registry=https://registry.npm.taobao.org`

通过`npm`安装`nodejs`版本管理器`n`，`sudo npm i n -g --save`

然后通过`n`安装`nodejs`的最新`LTS`版本`8.11.1`: `sudo n lts`

结着切换全局`nodejs`版本`sudo n 8.11.1`，重启生效。

## 安装git

在`git`官网找到`ubuntu`的安装方式:

步骤一，添加`ppa`:

```shell
sudo add-apt-respository ppa:git-core/ppa
```

但是执行的时候提示: `sudo: add-apt-repository: command not found`.

没有提示可以通过`apt-get install add-apt-repository`这类文字，说明不是安装`add-apt-repository`这个包.

百度一下发现，`add-apt-repository`是由`python-software-properties`提供的，于是先下载安装`python-software-properties`:
`sudo apt-get install python-software-properties`。

安装完成后执行`sudo add-apt-respository ppa:git-core/ppa`, 但是仍然提示`sudo: add-apt-repository: command not found`.

继续百度发现还要安装一个东西`software-properties-common`：`sudo apt-get install software-properties-common`.

安装完成后, 使用`man add-apt-repository`命令，输出了内容，可以使用了。

步骤二，更新`apt`内容: `sudo apt update`

步骤三，安装最新稳定版`git`: `sudo apt-get install git`

至此，安装了`git`，版本为`2.17.0`.

## 安装apache2

在 Fedora/CentOS/Red Hat Enterprise Linux上安装`apache`，这些系统上，`apache`包名叫`httpd`， 启动的`service`叫`httpd`

```shell
sudo yum install httpd
sudo systemctl enable httpd
sudo systemctl start httpd
```

[参考文档](https://docs.fedoraproject.org/quick-docs/en-US/getting-started-with-apache-http-server.html)

在Ubuntu/Debian上安装`apache`，这些系统上，`apache`包名叫`apache2`， 启动的`service`叫`apache2`(安装之前最好`sudo apt update`一下。)

```shell
sudo apt install apache2
sudo service apache2 start
```

[ubuntu-Apache2 Web 服务器](https://help.ubuntu.com/lts/serverguide/httpd.html)

总结:

- 启动`apache2`： `sudo service apache2 start`
- 停止`apache2`:  `sudo service apache2 stop`
- 重启`apache2`:  `sudo service apache2 restart`
- 设置`apache2`开机启动: 在`/etc/rc.local`文件的`exit 0`前面加上 `/etc/init.d/apache2 start`

## 安装ghost

教程: `https://docs.ghost.org/v1.0.0/docs/install`

首先添加一个用户

```shell
sudo groupadd ghostblog
sudo adduser gblogadmin --ingroup ghostblog
sudo usermod -aG sudo gbadmin
# passwd: GBAdmin001
su - gbadmin
```

以上，添加了新的用户组`ghostblog`和新的用户`gbadmin`

接下来安装所需要的软件:

```shell
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install nginx # 需要关掉占用80端口的apache2服务 sudo service apache2 stop
sudo ufw allow 'Nginx Full'
sudo apt-get install mysql-server
# password for mysql-server root: mysqlRoot
sudo npm i -g ghost-cli --save
sudo mkdir -p /var/www/ghost
sudo chown gbadmin:ghostblog /var/www/ghost
sudo chown gbadmin:gbadmin /var/www/ghost
cd /var/www/ghost
ghost install # 在此过程遇到了/home/gbadmin/.config权限不足的问题，将其用户:用户组改为gbadmin:ghostblog和权限改为775即可
```

## 安装JDK

1. 首先添加jdk的ppa：

```shell
add-apt-repository ppa:webupd8team/java
apt-get update
```

2. 接着安装`jdk`9

```shell
apt-get install oracle-java9-installer
```

3. 然后安装`oracle-java9-set-default`

```shell
apt-get install oracle-java9-set-default
```

用来将`jdk9`设置为默认jdk
安装完按成后可以查看`java`版本

```shell
$ java -version
java version "9.0.4"
Java(TM) SE Runtime Environment (build 9.0.4+11)
Java HotSpot(TM) 64-Bit Server VM (build 9.0.4+11, mixed mode)
$ javac -version
javac 9.0.4
```

## 安装JenKins

前面已经安装好了`jdk9`，还需要下载`Jenkins.war`和`Docker`

```shell
$ cd /home/danglm/software
$ wget http://mirrors.jenkins.io/war-stable/latest/jenkins.war
```

参考以下文档安装了`Docker`：`https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1`

参考文档:
- [JenKins Getting Started](https://jenkins.io/doc/pipeline/tour/getting-started/)

## 设置系统时区
`tzselect`命令只能更改当前用户此次登录的时区，要设置全局的时区，要用到`dpkg-reconfig tzdata`命令。

## 开机启动

ubuntu开机的时候，会执行`/etc/rc.local`文件里的内容，可以将要开机启动的服务脚本加入这个文件

```shell
/etc/init.d/ssh start

# start apache2
# /etc/init.d/apache2 start

# start nginx
service nginx start

# start ghost
cd /var/www/ghost
ghost start
cd /

exit 0
```
