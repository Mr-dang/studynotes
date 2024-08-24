# nginx使用笔记

## 基础nginx配置

```shell
user  root;
worker_processes  auto;

pid        /var/run/nginx.pid;

events {
  worker_connections  1024;
}

http {
  include       /etc/nginx/mime.types;
  default_type  application/octet-stream;

  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

  # access_log  /var/log/nginx/access.log  main;

  sendfile        on;
  #tcp_nopush     on;

  keepalive_timeout  65;

  gzip  on;

  server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /usr/share/nginx/html;

    index index.html;

    location ~ ^/(css|js)/ {
      # css和js文件夹下的内容
      expires max;
    }

    location ~* ^.+\.(css|js)$ {
      # 以.css和.js结尾的文件
      expires max;
    }

    location ~* ^.+\.(html|htm)$ {
      # index.html过期时间设置为5分钟
      expires 5m;
    }

    location / {
      # 强制https
      if ($http_x_forwarded_proto = 'http') {
        rewrite ^ https://$host$request_uri? permanent;
      }
      try_files $uri $uri/ /index.html; # 其他访问不到的页面都定位至index.html 适用于单页应用
    }

    location /other-pages/ {
      alias /usr/share/nginx/html/other-pages/;
    }

    location ~* ^/api/ {
      proxy_pass http://your-service;
      proxy_set_header   Connection "";
      proxy_http_version 1.1;
      proxy_set_header        Host            $host;
      proxy_set_header        X-Real-IP       $remote_addr;
      proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
      add_header X-TOTAL-Time $request_time;
      access_log off;
    }
  }
  include /etc/nginx/conf.d/*.conf;
}
```

## 命令行选项

使用 `nginx -h` 可以查看 `nginx` 的命令使用的接口参数和配置文件在哪里

```shell
nginx -h
nginx version: nginx/1.10.3 (Ubuntu)
Usage: nginx [-?hvVtTq] [-s signal] [-c filename] [-p prefix] [-g directives]

Options:
  -?,-h         : this help
  -v            : show version and exit
  -V            : show version and configure options then exit
  -t            : test configuration and exit
  -T            : test configuration, dump it and exit
  -q            : suppress non-error messages during configuration testing
  -s signal     : send signal to a master process: stop, quit, reopen, reload
  -p prefix     : set prefix path (default: /usr/share/nginx/)
  -c filename   : set configuration file (default: /etc/nginx/nginx.conf)
  -g directives : set global directives out of configuration file
```

在ubuntu上使用`sudo apt-get install nginx`后，`nginx`主目录位于`/etc/nginx`, `nginx`的配置文件位于`/etc/nginx/nginx.conf`.

在配置文件中`http`中有两行:

```shell
include /etc/nginx/conf.d/*.conf;
include /etc/nginx/sites-enabled/*;
```

可以在`/etc/nginx/sites-enabled/`中看到链接文件，指向`/etc/nginx/sites-available`, 在该目录下的`default`文件中看到`nginx`配置的默认端口号和目录，在此我将其改为了

```shell
listen 90 default_server;
listen [::]:90 default_server;
root /var/www/nginx/nginxstart;
```

nginx的默认端口改为了`90`, 目录为`/var/www/nginx/nginxstart`。

## Dockfile使用

```shell
FROM nginx:1.21.6-alpine
ENV NGINX_LOG_DIR=/home/nginx-logs

RUN mkdir ${NGINX_LOG_DIR}
RUN touch ${NGINX_LOG_DIR}/access.log
RUN touch ${NGINX_LOG_DIR}/error.log

# 把dist目录拷贝至nginx目录
COPY nginx.conf /etc/nginx/nginx.conf
COPY templates/default.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 80
```

## 参考文档:

- `http://nginx.org/en/docs/beginners_guide.html`
- `http://www.nginx.cn/doc/`
