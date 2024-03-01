import { DefaultTheme } from "vitepress/types/default-theme"

const frontEndConfig: DefaultTheme.SidebarItem = {
  text: '前端',
  items: [
    { text: '前端常见问题', link: '/front-end/common-problems' },
  ]
};

export default frontEndConfig;
