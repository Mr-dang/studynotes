import { DefaultTheme } from "vitepress/types/default-theme"

const databasesConfig: DefaultTheme.SidebarItem = {
  text: '数据库',
  items: [
    { text: 'SQL常用语句', link: '/databases/sql-base.md' },
    { text: 'Mysql/MariaDB 用户操作', link: '/databases/mysql-mariadb-users.md' },
    { text: 'Mysql/MariaDB 配置文件', link: '/databases/mysql-mariadb-config.md' },
  ]
};

export default databasesConfig;
