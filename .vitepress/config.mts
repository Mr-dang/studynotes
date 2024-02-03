import { defineConfig } from 'vitepress'
import databasesConfig from './sidebars/database.mts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Mr-dang的学习笔记",
  description: "HTML,CSS,JavaScript,JAVA,SQL,Linux",
  base: '/studynotes/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '数据库', link: '/databases/sql-base.md' }
    ],

    sidebar: [
      databasesConfig,
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Mr-dang/studynotes' }
    ]
  }
})
