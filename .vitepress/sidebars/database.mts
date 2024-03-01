import { DefaultTheme } from "vitepress/types/default-theme"

const databasesConfig: DefaultTheme.SidebarItem = {
  text: '数据库',
  items: [
    { text: 'SQL常用语句', link: '/databases/sql-base' },
    { text: 'Mysql/MariaDB 用户操作', link: '/databases/mysql-mariadb-users' },
    { text: 'Mysql/MariaDB 配置文件', link: '/databases/mysql-mariadb-config' },
    { text: '安装mysql', link: '/databases/install-mysql' },
    { text: 'mysql vs bbigquery', link: '/databases/mysql-vs-bigquery' },
  ]
};

export default databasesConfig;
