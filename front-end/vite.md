# vite笔记

## vite-plugin-html

`vite-plugin-html` 是一个用于在 Vite 中处理 HTML 文件的插件。它基于**ejs**语法，允许你在构建过程中动态修改 HTML 文件的内容，例如添加自定义的 `<script>` 标签、`<link>` 标签等。

`vite-plugin-html` 默认会读取 `.env` 文件中的环境变量，并将其注入到 HTML 文件中。你可以通过 `injectOptions` 配置项来修改注入的行为。

在 `vite` 项目中使用 `vite-plugin-html` 可以帮助你在构建过程中动态修改 HTML 文件的内容，从而实现一些定制化的需求。步骤如下：
1. 安装 `vite-plugin-html`：
```bash
npm install vite-plugin-html -D
```
2. 在 `vite.config.js` 中配置 `vite-plugin-html`：
```js
import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      entry: 'src/main.ts',
      // 改变index.html文件的位置
      template: 'public/index.html',
      inject: {
        data: {
          title: 'My Site',
        },
      },
    }),
  ],
})
```

3.在`index.html`中使用`vite-plugin-html`注入的环境变量：

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><%- title %></title>
  <% if (VITE_ENV === 'development') { %>
  <script src='/console.js'></script>
  <% } %>
</head>
```

- [vite-plugin-html](https://github.com/vbenjs/vite-plugin-html)
- [ejs](https://ejs.co)
