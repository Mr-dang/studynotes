# 自定义别名

## 语法: `alias <newcommond>="<common> [args]"`
eg: `alias ll="ls -al"`   
- 一次性   
  直接在终端中使用该语法，则重启后失效
- 为当前用户指定该命令   
  1. 在`~/.bashrc`文件中 写入`alias ll="ls -al"`
  2. 在`~/.bash_profile`中加上 `source ~/.bashrc`
  3. 执行`source ~/.bashrc`
    (.bash_profile文件是用户登陆终端的时候会自动执行的文件，一般此文件中会调用.bashrc)
- 为所有用户指定该命令   
  在`/etc/profile`中加上`alias ll="ls -al"`
  