# 内容中心同步说明

内容中心现在只展示真实发布内容，不再维护示例文章或虚构的站内正文。

## 已接入：CSDN RSS

- 账号：`CCAI笔记`（ID：`2402_82548201`）
- 数据源：`https://blog.csdn.net/2402_82548201/rss/list`
- 更新频率：网站最多缓存一小时，之后的首次访问会检查新文章。
- 自动获取：真实标题、摘要、发布日期和原文链接。
- 同步代码：`lib/publications.ts`

如果 RSS 暂时不可访问，网站会使用最近一次确认过的真实文章作为兜底，不会生成假内容。

## 待绑定的平台

- 微信公众号：木成智序
- 小红书：CC AI（小红书号 `6122121179`）
- 知乎：木成智序

这些平台没有从截图中暴露唯一的公开主页或文章 URL。绑定时只需要复制浏览器地址栏中的公开链接，不需要提供正文，更不需要账号密码。

同一篇文章的其他平台链接会合并到 `channels`：

```ts
channels: [
  { platform: "wechat", url: "https://mp.weixin.qq.com/s/..." },
  { platform: "xiaohongshu", url: "https://www.xiaohongshu.com/explore/..." },
  { platform: "csdn", url: "https://blog.csdn.net/..." },
  { platform: "zhihu", url: "https://zhuanlan.zhihu.com/p/..." },
]
```

## 部署流程

代码推送到 GitHub `main` 分支后，Vercel 会自动构建。新 CSDN 文章不需要重新提交代码，会通过 RSS 定时进入内容中心。
