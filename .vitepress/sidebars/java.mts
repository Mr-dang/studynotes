import { DefaultTheme } from "vitepress/types/default-theme"

const javaConfig: DefaultTheme.SidebarItem = {
  text: 'java',
  items: [
    { text: 'Java概念', link: '/java/concept' },
    { text: 'Java语法规则', link: '/java/rules' },
    { text: '使用命令行javac/jar/java编译和运行java程序', link: '/java/javac-jar-java' },
  ]
};

export default javaConfig;
