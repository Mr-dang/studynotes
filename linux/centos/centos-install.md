# RHEL/CentOS 安装软件

RHEL/CentOS 使用`yum`作为全局软件管理。

`yum`的仓库配置文件位于: `/etc/yum.repos.d`.

```shell
ll /etc/yum.repos.d
-rw-r--r-- 1 root root 1664 May 17 21:53 CentOS-Base.repo
-rw-r--r-- 1 root root 1309 May 17 21:53 CentOS-CR.repo
-rw-r--r-- 1 root root  649 May 17 21:53 CentOS-Debuginfo.repo
-rw-r--r-- 1 root root  630 May 17 21:53 CentOS-Media.repo
-rw-r--r-- 1 root root 1331 May 17 21:53 CentOS-Sources.repo
-rw-r--r-- 1 root root 4768 May 17 21:53 CentOS-Vault.repo
-rw-r--r-- 1 root root  314 May 17 21:53 CentOS-fasttrack.repo
-rw-r--r-- 1 root root   99 Jun 22 08:58 nginx.repo
-rw-r--r-- 1 root root  474 Apr 25 03:44 nodesource-el7.repo
```

每个文件中都包含了一个软件仓库的地址，`yum`安装/查找软件的时候，会依次读取这些文件，并访问其中的地址，搜索出需要的软件。

若需要手动添加一个仓库，则需要在该文件夹下新建一个`.repo`结尾的文件，按以下格式输入内容:

```shell
[softwarename]
name=softwarename repo
baseurl=url/$basearch/
gpgcheck=0
enabled=1
```

## 软件官网实例安装

### 1. 安装`nginx`：

  为`yum`添加`nginx`稳定版仓库：
    1. 创建`/etc/yum.repos.d/nginx.repo`文件
    2. 在文件中写入以下内容:

 ```shell
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/OS/OSRELEASE/$basearch/
gpgcheck=0
enabled=1
```

将`OS`替换为`rhel`或者`centos`，将`OSRELEASE`替换为`6`或者`7`(取决于系统版本)。

然后安装: `yum install -y nginx`

安装之后，`nginx`配置文件位于`/etc/nginx`

参考链接: [http://nginx.org/en/linux_packages.html#stable](http://nginx.org/en/linux_packages.html#stable)
