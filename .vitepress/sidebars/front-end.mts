import { DefaultTheme } from "vitepress/types/default-theme"

const frontEndConfig: DefaultTheme.SidebarItem = {
  text: '前端',
  items: [
    { text: '前端常见问题', link: '/front-end/common-problems' },
    { text: '在线vue示例', link: '/front-end/vue-cdn-example' },
  ]
};

export default frontEndConfig;
