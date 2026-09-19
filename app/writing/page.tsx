import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/content";

export const metadata: Metadata = { title: "写作", description: "关于 Agent、RAG、模型平台与 AI 产品的思考。" };

export default function WritingPage() {
  return <section className="page-section"><header className="page-intro"><p className="eyebrow">WRITING</p><h1>记录方法，也记录<br />判断发生变化的时刻。</h1><p>围绕 Agent、RAG、模型平台与 AI 产品化的实践笔记。后续将同步整理小红书、CSDN、微信公众号和知乎的内容。</p></header><div className="writing-list">{articles.map((article, index) => <Link href={`/writing/${article.slug}`} key={article.slug}><span>0{index + 1}</span><div><p>{article.date} · {article.readingTime}</p><h2>{article.title}</h2><small>{article.excerpt}</small><ul>{article.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div><b>→</b></Link>)}</div></section>;
}
