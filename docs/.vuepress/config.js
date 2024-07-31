import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme({
    logo: '/img/59c5c97049f90.gif',
    colorModeSwitch:true,
    sidebar:false,
    lastUpdated:true,
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: 'Gitee',
        link: 'https://gitee.com/jx-xh/learning-notes',
      },
      {
        text: 'JavaSrcipt',
        link: '/js/',
      },
    ],
    // navbar: [
    //   {
    //     text: 'Gitee',
    //     link: 'https://gitee.com/jx-xh/learning-notes',
    //   },
    //   {
    //     text: 'JavaSrcipt',
    //     link: '/js/',
    //   },
    //    // 嵌套 Group - 最大深度为 2
    //   {
    //     text: 'Vue全家桶',
    //     prefix: '/group/',
    //     children: [
    //       {
    //         text: 'Vue笔记',
    //         prefix: '/vue/',
    //         children: [
    //           'Vue.md',
    //           'Vuex.md',
    //           // 'vue Router.md',
    //           // 'vite.md', 
    //           // 'Pinia.md', // 解析为 `web\docs\vue\Pinia.md`
    //         ],
    //       },
    //     ],
    //   },
    //   // 控制元素何时被激活
    //   {
    //     text: 'Group 2',
    //     children: [
    //       {
    //         text: 'Always active',
    //         link: '/',
    //         // 该元素将一直处于激活状态
    //         activeMatch: '/',
    //       },
    //       {
    //         text: 'Active on /foo/',
    //         link: '/not-foo/',
    //         // 该元素在当前路由路径是 /foo/ 开头时激活
    //         // 支持正则表达式
    //         activeMatch: '^/foo/',
    //       },
    //     ],
    //   },
    // ],
  }),
})

