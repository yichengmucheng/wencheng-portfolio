import type { ArticleChannel } from "@/lib/content";

export type PublishedArticle = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  source: string;
  url: string;
  tags: string[];
  channels: ArticleChannel[];
  relatedProject?: { href: string; label: string };
};

const CSDN_RSS_URL = "https://blog.csdn.net/2402_82548201/rss/list";
const CROSS_POSTED_ARTICLE_ID = "166013332";

const verifiedFallback: PublishedArticle[] = [
  {
    id: "csdn-166013332",
    title: "企业任务型 Agent 的上下文组装与长期记忆架构设计",
    excerpt: "本文从 Session、Task、Evidence、Approval、Delivery、Preference Memory 和 Knowledge Base 七个层级出发，给出企业任务型 Agent 的上下文组装、指代消解、长期记忆、Checkpoint 压缩与安全执行方案。",
    date: "2026.09.19",
    source: "CSDN 自动同步",
    url: "https://blog.csdn.net/2402_82548201/article/details/166013332",
    tags: ["Agent", "上下文", "长期记忆"],
    channels: [
      { platform: "wechat" },
      { platform: "xiaohongshu" },
      { platform: "csdn", url: "https://blog.csdn.net/2402_82548201/article/details/166013332" },
      { platform: "zhihu" },
    ],
    relatedProject: { href: "/projects/enterprise-agent-hub", label: "查看 MaaS 百事通完整项目案例" },
  },
  {
    id: "csdn-151661938",
    title: "LLM基础题（面试版）",
    excerpt: "围绕大语言模型的参数规模、多任务处理能力等基础概念进行梳理。",
    date: "2025.09.14",
    source: "CSDN 自动同步",
    url: "https://blog.csdn.net/2402_82548201/article/details/151661938",
    tags: ["LLM", "面试", "基础知识"],
    channels: [
      { platform: "csdn", url: "https://blog.csdn.net/2402_82548201/article/details/151661938" },
    ],
  },
];

function decodeXml(value: string) {
  return value
    .replace(/^<!\[CDATA\[|\]\]>$/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function readTag(item: string, tag: string) {
  const match = item.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeXml(match[1]) : "";
}

function inferTags(title: string, excerpt: string) {
  const text = `${title} ${excerpt}`.toLowerCase();
  const candidates: Array<[string, string[]]> = [
    ["Agent", ["agent", "智能体"]],
    ["长期记忆", ["长期记忆", "memory"]],
    ["上下文", ["上下文", "context"]],
    ["RAG", ["rag", "检索增强"]],
    ["LLM", ["llm", "大语言模型", "大模型"]],
    ["MCP", ["mcp"]],
    ["AI 产品", ["产品设计", "ai 产品"]],
  ];
  const tags = candidates.filter(([, keywords]) => keywords.some((keyword) => text.includes(keyword))).map(([tag]) => tag);
  return tags.length ? tags.slice(0, 3) : ["AI 笔记"];
}

function channelsFor(articleId: string, url: string): ArticleChannel[] {
  if (articleId !== CROSS_POSTED_ARTICLE_ID) return [{ platform: "csdn", url }];
  return [
    { platform: "wechat" },
    { platform: "xiaohongshu" },
    { platform: "csdn", url },
    { platform: "zhihu" },
  ];
}

function parseCsdnRss(xml: string): PublishedArticle[] {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map((match) => {
    const item = match[1];
    const title = readTag(item, "title");
    const excerpt = readTag(item, "description");
    const url = readTag(item, "link");
    const articleId = url.match(/\/article\/details\/(\d+)/)?.[1] ?? encodeURIComponent(title);
    const publishedAt = new Date(readTag(item, "pubDate"));
    const date = Number.isNaN(publishedAt.getTime())
      ? "日期待确认"
      : new Intl.DateTimeFormat("zh-CN", {
          timeZone: "Asia/Shanghai",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(publishedAt).replaceAll("/", ".");

    return {
      id: `csdn-${articleId}`,
      title,
      excerpt,
      date,
      source: "CSDN 自动同步",
      url,
      tags: inferTags(title, excerpt),
      channels: channelsFor(articleId, url),
      relatedProject: articleId === CROSS_POSTED_ARTICLE_ID
        ? { href: "/projects/enterprise-agent-hub", label: "查看 MaaS 百事通完整项目案例" }
        : undefined,
    };
  }).filter((article) => article.title && article.url);
}

export async function getPublishedArticles(): Promise<PublishedArticle[]> {
  try {
    const response = await fetch(CSDN_RSS_URL, {
      headers: { "User-Agent": "Mucheng-Portfolio/1.0" },
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`CSDN RSS returned ${response.status}`);
    const articles = parseCsdnRss(await response.text());
    return articles.length ? articles : verifiedFallback;
  } catch {
    return verifiedFallback;
  }
}
