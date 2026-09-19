import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/content";

export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const article = getArticle((await params).slug); return article ? { title: article.title, description: article.excerpt } : {}; }

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug); if (!article) notFound();
  return <article className="essay"><Link href="/writing" className="back-link">← 返回写作</Link><header><p>{article.date} · {article.readingTime}</p><h1>{article.title}</h1><div>{article.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><strong>{article.intro}</strong></header><div className="essay-body">{article.sections.map((section, index) => <section key={section.heading}><span>0{index + 1}</span><h2>{section.heading}</h2><p>{section.body}</p></section>)}<blockquote>好的 AI 产品不应把模型的不确定性藏起来，而应通过流程、证据和评测，让它成为可以被管理的变量。</blockquote></div><footer><p>如果你也在做相关产品，欢迎交流。</p><a href="mailto:www111604@163.com">www111604@163.com ↗</a></footer></article>;
}
