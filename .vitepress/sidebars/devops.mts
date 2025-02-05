import { DefaultTheme } from "vitepress/types/default-theme"

const devopsConfig: DefaultTheme.SidebarItem = {
  text: 'devops',
  items: [
    { text: 'Docker', link: '/devops/docker' },
    { text: 'Alpine Linux', link: '/devops/alpine' },
  ]
};

export default devopsConfig;
