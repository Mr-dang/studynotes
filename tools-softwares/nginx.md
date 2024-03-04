# nginx使用笔记

## 基础nginx配置

```shell
server {
    listen       8090;
    server_name  _;

    access_log  /var/log/nginx/bing-images.access.log  main;

    location / {
        root   /home/alice/bing-wallpaper/images;
        index  index.html index.htm;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
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

`nginx`参考文档:

- `http://nginx.org/en/docs/beginners_guide.html`
- `http://www.nginx.cn/doc/`
