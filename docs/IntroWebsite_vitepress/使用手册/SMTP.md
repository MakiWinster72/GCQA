# SMTP

> 这里给出企业微信的方案，参考<https://open.work.weixin.qq.com/help2/pc/19886>

## 调整腾讯企业邮箱 SMTP 的服务范围

扫码选择管理员**账号** <https://work.weixin.qq.com/>

![](https://img.makis-life.cn/imagesNew/16f2dae4e6c605baf79591b71a630322_MD5.png?x-oss-process=style/yasuo)

在里面打开指定成员邮箱的 SMTP 服务范围

## 如何开启 POP/IMAP/SMTP 服务

扫码选择管理员**邮箱** <https://work.weixin.qq.com/>

![](https://img.makis-life.cn/imagesNew/9d1652a09280a95486d6dbf8e2189ed6_MD5.png?x-oss-process=style/yasuo)

## 生成 SMTP 密码

![](https://img.makis-life.cn/imagesNew/633c0ceb195a93c6ed0b65a824eca213_MD5.png?x-oss-process=style/yasuo)

记录该密码

## 为问答平台配置 SMTP

进入 后台管理>高级选项>SMTP，可参考如下配置

```Bash
# 发件人邮箱
填获取密码的邮箱，比如support@gdufe.edu.cn
# 发件人
如“广财问答平台”
# SMTP
smtp.exmail.qq.com
# 加密
SSL
# SMTP 端口
465
# SMTP 身份验证
启用身份验证
# SMTP 用户名
同发件人邮箱
# SMTP 密码
前面获取的密码
```

填写测试邮箱保存后，等待约半分钟，测试邮箱会收到如下效果的测试邮件：

![](https://img.makis-life.cn/imagesNew/084a5f032bef71e74c47a5c0f92f4d2c_MD5.png?x-oss-process=style/yasuo)

## 效果

![](https://img.makis-life.cn/imagesNew/IMG_6690.PNG?x-oss-process=style/yasuo)

![](https://img.makis-life.cn/imagesNew/IMG_6694.PNG?x-oss-process=style/yasuo)
