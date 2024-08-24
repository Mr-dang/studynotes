import { DefaultTheme } from "vitepress/types/default-theme"

const linuxConfig: DefaultTheme.SidebarItem = {
  text: 'Linux',
  items: [
    { text: '常用命令', link: '/linux/base' },
    { text: 'Systemd', link: '/linux/systemd' },
    { text: '用户和权限管理', link: '/linux/user-right' },
    { text: 'find', link: '/linux/find' },
    { text: 'apt/apt-get', link: '/linux/apt-apt-get' },
    { text: 'deb', link: '/linux/deb' },
    { text: 'tar', link: '/linux/tar' },
    { text: 'smba', link: '/linux/smba' },
    { text: 'ubuntu', link: '/linux/ubuntu' },
  ]
};

export default linuxConfig;
