# Docker 使用笔记

## 1. 使用 Docker Pull

`docker pull` 命令用于从 Docker 仓库中拉取镜像。基本语法如下：

```bash
docker pull <image_name>:<tag>
```

例如，拉取最新版本的 Ubuntu 镜像：

```bash
docker pull ubuntu:latest
```

## 2. 使用 Docker Run

`docker run` 命令用于运行一个新的容器。基本语法如下：

```bash
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

例如，运行一个交互式的 Ubuntu 容器：

```bash
docker run -it ubuntu:latest /bin/bash
docker run -it alpine:edge /bin/ash
```

## 3. 使用 Docker Build

`docker build` 命令用于从 Dockerfile 构建镜像。基本语法如下：

```bash
docker build -t <image_name>:<tag> <path_to_dockerfile>
```

例如，从当前目录的 Dockerfile 构建一个名为 `myapp` 的镜像：

```bash
docker build -t myapp:latest .
```

## 4. 使用清华镜像源替换默认仓库

为了加速 Docker 镜像的下载速度，可以使用清华大学的镜像源。步骤如下：

1. 创建或编辑 `/etc/docker/daemon.json` 文件：

```bash
sudo nano /etc/docker/daemon.json
```

2. 添加以下内容：

```json
{
  "registry-mirrors": ["https://docker.mirrors.ustc.edu.cn"]
}
```

3. 重启 Docker 服务：

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

这样就可以使用清华大学的镜像源来加速 Docker 镜像的下载了。
