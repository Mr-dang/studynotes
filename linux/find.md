# find命令

## 查找大于10M的文件

```shell
find / -xdev -size +10M -type f
```

输出如下:

```shell
/usr/bin/parl
/usr/bin/parl5.30
/usr/standalone/firmware/iBridge1_1Customer.bundle/Contents/Resources/018-50236-010.dmg
/usr/standalone/firmware/iBridge1_1Customer.bundle/Contents/Resources/018-50238-010.dmg
/usr/standalone/i386/Firmware.scap
/usr/libexec/locationd
/usr/libexec/searchpartyuseragent
/usr/libexec/searchpartyd
/usr/libexec/remindd
/usr/libexec/nearbyd
...
```

查找大于10M小于20M的文件:

```shell
find / -xdev -size +10M -size -20M -type f
```

显示大小并进行合适的着色:

```shell
find / -xdev -size +10M -type f -print0 | xargs -0 ls -Ssh1 --color
find / -xdev -size +10M -size -20M -type f -print0 | xargs -0 ls -Ssh1 --color
```
