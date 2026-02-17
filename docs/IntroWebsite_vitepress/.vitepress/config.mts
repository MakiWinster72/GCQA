import { defineConfig } from "vitepress";

export default defineConfig({
  title: "广财问答平台文档",
  description: "GCQA 使用与部署文档",
  base: "/projects/gcqa",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "项目介绍", link: "/项目介绍" },
      { text: "安装手册", link: "/安装手册/" },
      { text: "使用手册", link: "/使用手册/" },
      { text: "常见问题", link: "/常见问题" },
    ],

    sidebar: {
      "/安装手册/": [
        {
          text: "安装手册",
          items: [
            { text: "首页", link: "/安装手册/" },
            { text: "自编译部署", link: "/安装手册/自编译部署" },
            { text: "Docker 部署", link: "/安装手册/Docker" },
            { text: "初始化", link: "/安装手册/初始化" },
            { text: "升级", link: "/安装手册/升级" },
          ],
        },
      ],
      "/使用手册/": [
        {
          text: "使用手册",
          items: [
            { text: "首页", link: "/使用手册/" },
            { text: "基本配置", link: "/使用手册/基本配置" },
            { text: "SMTP", link: "/使用手册/SMTP" },
            { text: "配置域名", link: "/使用手册/配置域名" },
            { text: "企业微信登录", link: "/使用手册/配置企业微信登录" },
            { text: "备份", link: "/使用手册/备份" },
          ],
        },
      ],
      "/": [
        {
          text: "文档导航",
          items: [
            { text: "项目介绍", link: "/项目介绍" },
            { text: "安装手册", link: "/安装手册/" },
            { text: "使用手册", link: "/使用手册/" },
            { text: "常见问题", link: "/常见问题" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/MakiWinster72/GCQA" },
    ],
  },
});
