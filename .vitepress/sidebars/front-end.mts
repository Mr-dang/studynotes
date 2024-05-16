import { DefaultTheme } from "vitepress/types/default-theme"

const frontEndConfig: DefaultTheme.SidebarItem = {
  text: '前端',
  items: [
    { text: '前端常见问题', link: '/front-end/common-problems' },
    { text: '在线vue示例', link: '/front-end/vue-cdn-example' },
    { text: 'vue组件封装', link: '/front-end/vue-component-encapsulates' },
    { text: 'TypeScript笔记', link: '/front-end/typescript' },
  ]
};

export default frontEndConfig;
