# 在Linux上使用smba

## 安装依赖

```shell
sudo apt update
sudo apt install samba samba-common-bin smbclient cifs-utils
```

## 挂载smba文件夹

#### 本次系统运行期间有效

```shell
# sudo mount.cifs //<hostname or IP address>/<shared smba folder> /home/<username>/shared_folder -o user=<name>
sudo mount.cifs //192.168.1.121/share_folder /path/to/nas-share-folder -o user=<smba-user>

# or
sudo mount.cifs //server.hostname/share_folder /path/to/nas-share-folder -o user=<smba-user>
```

### 开机自动挂载

在 `/etc/fstab` 文件中增加一行:

```shell
//192.168.1.121/share_folder /path/to/nas-share-folder cifs username=<smba-user>,password=<smba-password> 0 0
```

## 修改`/etc/fstab`立刻生效

```shell
# 使用systemctl
sudo systemctl daemon-reload

# 或者使用 mount -a
sudo mount -a
```
