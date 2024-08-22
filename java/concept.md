# Java概念

## JVM(Java Virtual Machine)

java虚拟机, JVM是一种用于计算设备的规范，它是一个虚构出来的计算机，是通过在实际的计算机上仿真模拟各种计算机功能来实现的。
Java虚拟机在执行字节码时，把字节码解释成具体平台上的机器指令执行。这就是Java的能够“一次编译，到处运行”的原因

## JRE(Java Runtime Environment)

Java运行时环境，JVM标准实现及Java核心类库。JRE是Java运行环境，并不是一个开发环境，所以没有包含任何开发工具（如编译器和调试器）。
java文件编译后成为class文件，运行时就在 JRE 中运行。安装后，可使用 `java` 命令程序

下载地址:

- https://www.java.com/zh-CN/download/help/index_installing.html
- 或者: https://www.oracle.com/java/technologies/downloads/

## JDK(Java Development Kit)

Java开发套件，包括了Java运行环境(JRE)，一堆Java工具（javac等）和Java基础的类库（即Java API 包括rt.jar）。
安装后可以使用 Java的基本类库，和 `javac` 命令程序。

下载地址: https://www.oracle.com/java/technologies/downloads/

下载的软件安装程序，一般包括了JRE，会一起安装，如果已经单独安装过 JRE, 则不会再安装

JDK包含JRE，而JRE包 含JVM。

- [Java概念介绍](https://docs.oracle.com/javase/8/docs/)
- [学习Java - 菜鸟教程](https://www.runoob.com/java/java-tutorial.html)
- [廖雪峰Java教程](https://www.liaoxuefeng.com/wiki/1252599548343744)
