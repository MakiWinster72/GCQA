<a href="https://answer.apache.org">
    <img alt="logo" src="docs/img/gcqa_regular_whiteBg.png" height="auto" width="100%" >
</a>

# GCQA - 为广财打造的 Q&A 平台

基于 Apache Answer, 为广财打造的 Q&A 平台。解决当前需要众多咨询群、通知群等方式来获取信息的痛点，提供一个统一的 Q&A 平台，让同学、老师可以方便地获取和分享信息。

有关 Apache Answer, 请查阅 [answer.apache.org](https://answer.apache.org).

[![LICENSE](https://img.shields.io/github/license/apache/answer)](https://github.com/apache/answer/blob/main/LICENSE)
[![Language](https://img.shields.io/badge/language-go-blue.svg)](https://golang.org/)
[![Language](https://img.shields.io/badge/language-react-blue.svg)](https://reactjs.org/)

## 主要改进
以下说明基于 Answer 主要改进的功能

### 企业微信插件

默认集成了企业微信插件，可以直接在微信中扫码注册登录。
需要用户属于管理员所配置的企业微信员工。

<a href="https://answer.apache.org">
    <img alt="logo" src="docs/img/loginInWechat.gif" height="700vp" width="auto" >
</a>

### 预设问题

管理员可以在`后台管理`>`内容管理`>`预设问题`中添加预设问题。例如可以要求用户确认已经尝试搜索类似问题或询问相关人员。

**设置页面**
![](docs/img/presetQuestion.png)

**用户提问界面**
![](docs/img/presetQuestionInAsk.png)

**展示效果**
![](docs/img/presetQuestionDetailed.png)

### 改进分享

删除了 Facebook和X选项，新增`分享到微信`以及`二维码`

![](docs/img/share.png)

### 优化最佳答案外观

添加了最佳答案的突出显示，让最佳答案更易于识别。

![](docs/img/bestAnswer.png)

### 优化高宽比图片展示

![](docs/img/optiPic.png)

## 截图

![screenshot](docs/img/screenshotNew.png)

## 快速开始


### 环境要求

- Golang >= 1.23
- Node.js >= 20
- pnpm >= 9
- [mockgen](https://github.com/uber-go/mock?tab=readme-ov-file#installation) >= 0.6.0
- [wire](https://github.com/google/wire/) >= 0.5.0

### 构建

```bash
# 安装 wire 和 mockgen 用于构建。你可以运行 `make check` 检查是否已安装。
$ make generate
# 安装前端依赖并构建
$ make ui
# 安装后端依赖并构建
$ make build
```

## 开源协议

[Apache License 2.0](https://github.com/apache/answer/blob/main/LICENSE)
