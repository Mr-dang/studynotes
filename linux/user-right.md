# Linux用户、用户组、权限管理

## 用户

- `adduser` 添加新的用户(也可使用useradd)
- `deluser` 删除用户(也可使用userdel)
- `usermod` 修改账号
- `passwd` 更改用户密码

## 用户组

- `addgroup` 添加用户组(也可使用groupadd)
- `delgroup` 添加用户组(也可使用groupdel)
- `groupmod` 修改用户组
- `newgrp` 切换用户的用户组

## 与用户账号相关的一些文件

```shell
/etc/passwd
    root:x:0:0:root:/root:/bin/bash // 一行记录对应着一个用户，每行记录又被冒号(:)分隔为7个字段
//  用户名:口令:用户标识号:组标识号:注释性描述:主目录:登录Shell

/etc/shadow  // 加密后的口令
    root:!:17630:0:99999:7:::
//  登录名:加密口令:最后一次修改时间:最小时间间隔:最大时间间隔:警告时间:不活动时间:失效时间:标志

/etc/group //
    root:x:0:
//  组名:口令:组标识号:组内用户列表
```

## chown 改变文件所属的用户和用户组(chang owner)

```shell
chown -R gbadmin:ghostblog /var/www/ghost
```

`-R`选项表示递归(recursively)

```shell
chown root /u
```

```shell
chown -hR root /u
```

将/u和子文件以及子文件夹的用户都设置为`root`, `-h`表示只针对连接文件，不改变它指向的文件的用户。

`chgrp` 改变文件所属的用户组(change group)

## chmod 控制文件的读取、写入权限(change mode)

```shell
chmod [-cfvR] [--help] [--version] mode file...
```

其中`mode`是设定权限的字符串:

```shell
[ugoa...][[+-=][rwxX]...][,...]
```

u 表示该文件的拥有者，g 表示与该文件的拥有者属于同一个群体(group)者，o 表示其他以外的人，a 表示这三者皆是。

+ 表示增加权限、- 表示取消权限、= 表示唯一设定权限。

r 表示可读取，w 表示可写入，x 表示可执行，X 表示只有当该文件是个子目录或者该文件已经被设定过为可执行。

-R : 对目前目录下的所有文件与子目录进行相同的权限变更(即以递回的方式逐个变更)

chmod也可以用数字来表示权限如：

```shell
chmod 777 file
```

`chmod xyz file`
其中x,y,z各为一个数字，分别表示User、Group、及Other的权限。

`r=4，w=2，x=1`

- 若要rwx属性则4+2+1=7;
- 若要rw-属性则4+2=6;
- 若要r-x属性则4+1=5;

eg:

```shell
# 下面两条等价
chmod a=rwx file
chmod 777 file

# 下面两条等价
chmod ug=rwx,o=x file
chmod 771 file
```
