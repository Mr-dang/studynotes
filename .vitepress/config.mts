import { defineConfig } from 'vitepress'
import databasesConfig from './sidebars/database.mts'
import linuxConfig from './sidebars/linux.mts'
import nodejsConfig from './sidebars/nodejs.mts'
import frontEndConfig from './sidebars/front-end.mts'
import javaConfig from './sidebars/java.mts'
import toolsSoftwaresConfig from './sidebars/tools-softwares.mjs'
import devopsConfig from './sidebars/devops.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Mr-dang的学习笔记",
  description: "HTML,CSS,JavaScript,JAVA,SQL,devops",
  base: '/studynotes/',
  head: [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/studynotes/apple-touch-icon.png" }],
    ['link', { rel: "icon", href: "/studynotes/favicon.ico" }],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/studynotes/favicon-32x32.png" }],
    ['link', { rel: "shortcut icon", type: "image/x-icon", sizes: "32x32", href: "/studynotes/favicon-32x32.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/studynotes/favicon-16x16.png" }],
    ['link', { rel: "manifest", href: "/studynotes/site.webmanifest" }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '前端', link: '/front-end/common-problems' },
      { text: 'nodejs', link: '/nodejs/common-problems' },
      { text: 'Linux', link: '/linux/base' },
      { text: 'devops', link: '/devops/docker' },
      { text: '数据库', link: '/databases/sql-base' },
      { text: 'Java', link: '/java/concept' },
      { text: '工具&软件', link: '/tools-softwares/openvpn' },
    ],

    sidebar: [
      frontEndConfig,
      nodejsConfig,
      linuxConfig,
      devopsConfig,
      databasesConfig,
      javaConfig,
      toolsSoftwaresConfig,
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Mr-dang/studynotes' }
    ]
  }
})
