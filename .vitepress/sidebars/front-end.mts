import { DefaultTheme } from "vitepress/types/default-theme"

const frontEndConfig: DefaultTheme.SidebarItem = {
  text: '前端',
  items: [
    { text: 'ECMAScript笔记', link: '/front-end/ecmascript' },
    { text: 'JavaScript笔记', link: '/front-end/javascript' },
    { text: 'CSS笔记', link: '/front-end/css' },
    { text: 'HTML笔记', link: '/front-end/html' },
    { text: 'TypeScript笔记', link: '/front-end/typescript' },
    { text: '前端常见问题', link: '/front-end/common-problems' },
    { text: 'vue技巧', link: '/front-end/vue-tips' },
    { text: '在线vue示例', link: '/front-end/vue-cdn-example' },
    { text: 'vue-router技巧', link: '/front-end/vue-router-tips' },
    { text: '工程化之vite', link: '/front-end/vite' },
    { text: '自定义元素', link: '/front-end/custom-elements' },
  ]
};

export default frontEndConfig;
