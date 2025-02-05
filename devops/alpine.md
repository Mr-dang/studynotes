# Alpine Linux 学习笔记

## 1. APK 包管理工具

### 1.1 安装软件包
使用 `apk add` 命令来安装软件包。例如，安装 `curl`：
```sh
apk add curl
```

### 1.2 删除软件包
使用 `apk del` 命令来删除软件包。例如，删除 `curl`：
```sh
apk del curl
```

### 1.3 更新软件包列表
使用 `apk update` 命令来更新软件包列表：
```sh
apk update
```

### 1.4 升级已安装的软件包
使用 `apk upgrade` 命令来升级所有已安装的软件包：
```sh
apk upgrade
```

## 2. 使用清华镜像源

### 2.1 配置清华镜像源
编辑 `/etc/apk/repositories` 文件，将默认的镜像源替换为清华镜像源：
```sh
sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories
```

### 2.2 更新软件包列表
配置完成后，更新软件包列表以使用新的镜像源：
```sh
apk update
```

## 3. 常用命令总结

- 安装软件包：`apk add <package_name>`
- 删除软件包：`apk del <package_name>`
- 更新软件包列表：`apk update`
- 升级已安装的软件包：`apk upgrade`
- 搜索软件包：`apk search <keyword>`
- 查看软件包信息：`apk info <package_name>`

以上就是关于 Alpine Linux 中 APK 包管理工具和清华镜像源的基本使用方法。

## 参考链接

- [Alpine Linux handbook](https://docs.alpinelinux.org/user-handbook/0.1a/index.html)
- [Alpine Linux packages](https://pkgs.alpinelinux.org/packages)
- [清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn)
- [清华大学开源软件镜像站-使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/AOSP/)
