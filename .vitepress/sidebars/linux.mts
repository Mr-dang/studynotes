import { DefaultTheme } from "vitepress/types/default-theme"

const linuxConfig: DefaultTheme.SidebarItem = {
  text: 'Linux',
  items: [
    { text: 'Linux常用命令', link: '/linux/base' },
    { text: 'Systemd', link: '/linux/systemd' },
    { text: 'ubuntu', link: '/linux/ubuntu' },
    { text: 'Linux用户和权限管理', link: '/linux/user-right' },
  ]
};

export default linuxConfig;
