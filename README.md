# 文程 AI 产品经理作品集

面向 2027 届秋招的个人作品网站。站点展示三个脱敏后的 AI 产品案例，并为后续工具、Skills、MCP 与写作内容保留扩展结构。

## 本地运行

```powershell
pnpm install
pnpm dev
```

打开 `http://localhost:3000`。

## 生产构建

```powershell
pnpm build
pnpm start
```

## 内容安全

- 不复制原项目中的 `.env`、密钥、客户资料、真实样本、内部 URL 或未授权文档。
- 所有公开演示均使用合成数据。
- 发布前再次检查截图、下载文件与 Git 历史。

## 部署

代码可直接部署到 Vercel。部署后在项目环境变量中设置：

```text
NEXT_PUBLIC_SITE_URL=https://你的正式域名
```

正式发布前请先确认域名、公开邮箱、简历版本和最终脱敏内容。项目与文章内容统一维护在 `lib/content.ts`，新增条目后会自动进入列表与站点地图。
