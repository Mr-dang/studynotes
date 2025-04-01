import { DefaultTheme } from "vitepress/types/default-theme"

const frontEndConfig: DefaultTheme.SidebarItem = {
  text: '前端',
  items: [
    { text: '前端常见问题', link: '/front-end/common-problems' },
    { text: '在线vue示例', link: '/front-end/vue-cdn-example' },
    { text: 'vue技巧', link: '/front-end/vue-tips' },
    { text: 'vue-router技巧', link: '/front-end/vue-router-tips' },
    { text: 'ECMAScript笔记', link: '/front-end/ecmascript' },
    { text: 'TypeScript笔记', link: '/front-end/typescript' },
    { text: '自定义元素', link: '/front-end/custom-elements' },
    { text: '前端开发小技巧', link: '/front-end/js-skills' },
    { text: 'CSS新特性', link: '/front-end/css-new-features' },
    { text: 'HTML不常见的用法', link: '/front-end/html' },
    { text: '工程化之vite', link: '/front-end/vite' },
  ]
};

export default frontEndConfig;
