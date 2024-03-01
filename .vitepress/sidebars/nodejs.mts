import { DefaultTheme } from "vitepress/types/default-theme"

const nodejsConfig: DefaultTheme.SidebarItem = {
  text: 'nodejs',
  items: [
    { text: 'nodejs常见问题', link: '/nodejs/common-problems' },
  ]
};

export default nodejsConfig;
