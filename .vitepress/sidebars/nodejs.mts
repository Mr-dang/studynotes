import { DefaultTheme } from "vitepress/types/default-theme"

const nodejsConfig: DefaultTheme.SidebarItem = {
  text: 'nodejs',
  items: [
    { text: 'nodejs笔记', link: '/nodejs/nodejs-notes' },
  ]
};

export default nodejsConfig;
