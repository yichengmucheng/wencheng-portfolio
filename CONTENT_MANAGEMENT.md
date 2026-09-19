# 内容中心维护说明

网站的文章正文、标签与发布渠道统一维护在 `lib/content.ts`。

## 新增文章

在 `articles` 数组中复制一篇文章对象，并修改：

- `slug`：英文短链接，保持唯一。
- `title`、`excerpt`、`date`、`readingTime`、`tags`。
- `intro` 与 `sections`：官网保存的完整版本。
- `channels`：这篇文章已经发布的平台。

## 添加外部文章链接

渠道未填写 `url` 时，网站只显示“已发布”状态，不会跳转到虚构地址。拿到真实链接后按下面格式补充：

```ts
channels: [
  { platform: "site" },
  { platform: "wechat", url: "https://mp.weixin.qq.com/s/..." },
  { platform: "xiaohongshu", url: "https://www.xiaohongshu.com/explore/..." },
  { platform: "csdn", url: "https://blog.csdn.net/..." },
  { platform: "zhihu", url: "https://zhuanlan.zhihu.com/p/..." },
]
```

支持的平台标识：

- `site`：木成智序官网
- `wechat`：微信公众号
- `xiaohongshu`：小红书
- `csdn`：CSDN
- `zhihu`：知乎

## 发布流程

1. 在 `lib/content.ts` 更新文章与渠道链接。
2. 本地运行 `pnpm run build`。
3. 提交并推送到 GitHub 的 `main` 分支。
4. Vercel 会自动构建并更新线上网站。

