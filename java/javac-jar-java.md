# 使用命令行javac/jar/java编译和运行java程序

## MacOS/Linux下编译和运行

**编译**

```shell
# -d ./target/class 指定输出的class文件存放target/class目录
# ./src/**/*.java 表示src目录下的所有.java文件，包括任意深度的子目录, 目前测试的linux下有问题，不支持**/*.java
javac -d ./target/class ./src/**/*.java
```

**运行**

```shell
# -cp 指定 classpath 为当前target/class目录，也可写作: -classpath ./target/class
java -cp target/class com.danglm.practice.PracticeMain
```

**用jar打包成jar包**

```shell
# -c, --create 创建jar文件,名称里有不存在的父文件夹时也一并创建
# -f, --file: -f xxx.jar; --file xxx.jar
# --main-class com.danglm.practice.PracticeMain
# -C target/class指定.class文件所在的目录为target/class
# . 表示 target/class 下所有文件
jar -c -f practice.jar --main-class com.danglm.practice.PracticeMain -C target/class .

# 查看xxx.jar里面的内容
# -t, --list                 List the table of contents for the archive
# -v, --verbose              Generate verbose output on standard output
# -f, --file: -f xxx.jar; --file xxx.jar
jar -t -v -f practice.jar  # 简写为 jar tvf practice.jar

# 解压jar文件
# -x, --extract              Extract named (or all) files from the archive
jar -x -f practice.jar # 简写为 jar xf practice.jar
```

缺少`jar`程序的情况下也可使用`zip`程序打包`jar`包

**用zip打包成jar包**

```shell
# -q 不显示指令执行过程。
# -r 递归处理，将指定目录下的所有文件和子目录一并处理
cd target/class && zip -q -r ../practice.jar * && cd ..
# 测试生成的jar包是否包含target/class目录
unzip -d test practice.jar
```

**执行jar包里面的主类**

```shell
java -cp ./practice.jar com.danglm.practice.PracticeMain
```

## 待解决的问题

- 将target/class目录下的文件打包成jar包时，如何不包含target/class自身这个文件夹
- MacOS中使用 `sh ./run.sh` 会出现 `javac: 错误: 找不到文件: src/**/*.java`

## 参考文档

- [java教程-包(廖雪峰)](https://liaoxuefeng.com/books/java/oop/basic/package/index.html)
- [zip](https://linux.die.net/man/1/zip)
