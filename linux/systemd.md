# Linux的系统启动器 - Systemd

## Systemd 单元

单元(unit): Systemd 的最小功能单位，是单个进程的描述。

一个个小的单元互相调用和依赖，组成一个庞大的任务管理系统，这就是 Systemd 的基本思想。

单元有很多不同的种类，大概一共有12种：

- Service 单元负责后台服务
- Timer 单元负责定时器
- Slice 单元负责资源的分配。
- ...

每个单元都有一个单元描述文件，它们分散在三个目录。

```shell
/lib/systemd/system：系统默认的单元文件
/etc/systemd/system：用户安装的软件的单元文件
/usr/lib/systemd/system：用户自己定义的单元文件
```

查看所有的单元文件:

```shell
# 查看所有单元
$ systemctl list-unit-files

# 查看所有 Service 单元
$ systemctl list-unit-files --type service

# 查看所有 Timer 单元
$ systemctl list-unit-files --type timer
```

## 单元管理命令

```shell
# 启动单元
$ systemctl start [UnitName]

# 关闭单元
$ systemctl stop [UnitName]

# 重启单元
$ systemctl restart [UnitName]

# 杀死单元进程
$ systemctl kill [UnitName]

# 查看单元状态
$ systemctl status [UnitName]

# 开机自动执行该单元
$ systemctl enable [UnitName]

# 关闭开机自动执行
$ systemctl disable [UnitName]
```

eg: `systemctl start shadowsocks`

## Service单元

> Service 单元就是所要执行的任务，比如发送邮件就是一种 Service.

新建 Service 非常简单，就是在`/usr/lib/systemd/system`目录里面新建一个文件，比如mytimer.service文件，你可以写入下面的内容。

```shell
[Unit]
Description=MyTimer

[Service]
ExecStart=/bin/bash /path/to/mail.sh
```

这个 Service 单元文件分成两个部分：

- [Unit] 部分，介绍本单元的基本信息(元数据), Description简单介绍(名字叫MyTimer)
- [Service]部分用来定制行为，Systemd 提供许多字段：

```shell
ExecStart：systemctl start所要执行的命令
ExecStop：systemctl stop所要执行的命令
ExecReload：systemctl reload所要执行的命令
ExecStartPre：ExecStart之前自动执行的命令
ExecStartPost：ExecStart之后自动执行的命令
ExecStopPost：ExecStop之后自动执行的命令
```

Note: 定义的时候，所有路径都要写成绝对路径，比如bash要写成`/bin/bash`，否则 Systemd 会找不到。

启动:

```shell
systemctl start mytimer.service
```

## Timer单元

Service 单元只是定义了如何执行任务，要定时执行这个 Service，还必须定义 Timer 单元。

`/usr/lib/systemd/system`目录里新建一个`mytimer.timer`文件，写入内容:

```shell
[Unit]
Description=Runs mytimer every hour

[Timer]
OnUnitActiveSec=1h
Unit=mytimer.service

[Install]
WantedBy=multi-user.target
```

Timer单元分为三部分:

- [Unit] 部分定义元数据
- [Timer] 部分定制定时器。Systemd 提供以下一些字段。

```shell
OnActiveSec：定时器生效后，多少时间开始执行任务
OnBootSec：系统启动后，多少时间开始执行任务
OnStartupSec：Systemd 进程启动后，多少时间开始执行任务
OnUnitActiveSec：该单元上次执行后，等多少时间再次执行
OnUnitInactiveSec： 定时器上次关闭后多少时间，再次执行
OnCalendar：基于绝对时间，而不是相对时间执行
AccuracySec：如果因为各种原因，任务必须推迟执行，推迟的最大秒数，默认是60秒
Unit：真正要执行的任务，默认是同名的带有.service后缀的单元
Persistent：如果设置了该字段，即使定时器到时没有启动，也会自动执行相应的单元
WakeSystem：如果系统休眠，是否自动唤醒系统
```

备注: `OnUnitActiveSec`

- OnUnitActiveSec=1h 表示一小时执行一次任务。
- OnUnitActiveSec=*-*-* 02:00:00表示每天凌晨两点执行
- OnUnitActiveSec=Mon *-*-* 02:00:00表示每周一凌晨两点执行

具体请参考[官方文档](https://www.freedesktop.org/software/systemd/man/systemd.time.html)。

- [Install] 部分

开机自启动（`systemctl enable`）和关闭开机自启动（`systemctl disable`）这个单元时，所要执行的命令。

`WantedBy=multi-user.target`。它的意思是，如果执行了`systemctl enable mytimer.timer`（只要开机，定时器自动生效），那么该定时器归属于`multi-user.target`。

启动定时器:

```shell
sudo systemctl start mytimer.timer
```

查看定时器状态:

```shell
systemctl status mytimer.timer
```

查看所有正在运行的定时器:

```shell
systemctl list-timers
```

设置开机自动运行定时器:

```shell
systemctl enable mytimer.timer
```

关闭开机自启动：

```shell
systemctl disable mytimer.timer
```

## Systemd日志

`Systemd`日志统一由`journalctl`管理:

```shell
# 查看整个日志
$ sudo journalctl

# 查看 mytimer.timer 的日志
$ sudo journalctl -u mytimer.timer

# 查看 mytimer.timer 和 mytimer.service 的日志
$ sudo journalctl -u mytimer

# 从结尾开始查看最新日志
$ sudo journalctl -f

# 从结尾开始查看 mytimer.timer 的日志
$ journalctl -f -u timer.timer
```

systemctl daemon-reload

## 参考链接

- [Systemd 定时器教程 - 阮一峰](http://www.ruanyifeng.com/blog/2018/03/systemd-timer.html)
