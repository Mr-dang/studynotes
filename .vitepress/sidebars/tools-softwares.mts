import { DefaultTheme } from "vitepress/types/default-theme"

const toolsSoftwaresConfig: DefaultTheme.SidebarItem = {
  text: '工具&软件',
  items: [
    { text: 'openvpn', link: '/tools-softwares/openvpn' },
    { text: 'ipsec', link: '/tools-softwares/ipsec' },
    { text: 'nginx', link: '/tools-softwares/nginx' },
  ]
};

export default toolsSoftwaresConfig;
