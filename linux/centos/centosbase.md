# 基于Centos7的一些操作命令

## 时间、时区

1. 查看时间 时区

```shell
$>date
2018年 06月 03日 星期日 06:29:30 UTC
```

Centos7的时区文件位于`/etc/localtime`文件，所有时区文件位于`/usr/share/zoneinfo/`目录，只需要找到需要的时区，将其链接或者复制到`/etc/localtime`文件:

```shell
$>ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
$>date
$>2018年 06月 03日 星期日 14:32:30 CST
```

## 系统监控部分

1. 邮件处理软件mail

若未安装，则使用`yum`安装: `yum -y install mail`

配置文件位于: `/etc/mail.rc`

发送邮件： `mail -s 'mail subject' receiver@example.com 'test content'

参考链接: `https://blog.csdn.net/zyb378747350/article/details/74738881`
