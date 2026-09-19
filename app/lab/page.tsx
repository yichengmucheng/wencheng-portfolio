import type { Metadata } from "next";
import Link from "next/link";
import { labItems } from "@/lib/content";

export const metadata: Metadata = { title: "Lab", description: "文程的 AI 产品工具、Skills 与 MCP 实验。" };

export default function LabPage() {
  return <section className="page-section lab-page"><header className="page-intro"><p className="eyebrow">LAB</p><h1>把重复判断，<br />做成可复用的工具。</h1><p>这里会持续收录提效小工具、Agent Skills、检索实验和 MCP 能力目录。当前内容均可从对应案例继续查看。</p></header><div className="lab-grid">{labItems.map((item, index) => <Link href={item.href} className="lab-card" key={item.title}><div><span>{item.type}</span><em>{item.status}</em></div><p>0{index + 1}</p><h2>{item.title}</h2><small>{item.summary}</small><b>查看详情 →</b></Link>)}</div><aside className="lab-callout"><span>持续更新</span><p>下一步将上线可直接体验的风险门配置器、RAG 策略对比工具与公开 MCP 目录。</p><a href="mailto:www111604@163.com?subject=作品集 Lab 交流">交流想法 ↗</a></aside></section>;
}
