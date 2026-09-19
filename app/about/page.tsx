import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "关于", description: "关于 AI 产品经理文程。" };

export default function AboutPage() {
  return <section className="page-section about-page"><header className="about-hero"><p className="eyebrow">ABOUT</p><h1>你好，我是文程。<br />我在寻找 AI 从“能做”<br />到“可用”的那段路。</h1><div className="portrait-mark"><span>WC</span><small>AI PRODUCT<br />MANAGER</small></div></header><div className="about-content"><aside><p>2027 届</p><p>AI 产品经理</p><p>中国 · 可实习</p><a href="/resume-wencheng.pdf" target="_blank" rel="noreferrer">下载完整简历 ↗</a></aside><div><h2>我做什么</h2><p>我关注 Agent、RAG 和模型平台的产品化：不只定义页面与功能，也参与能力边界、数据链路、风险机制和验收标准的设计。</p><p>过去的项目让我反复处理三类问题：如何让模型理解复杂任务，如何让系统在真实业务约束下安全执行，以及如何用证据判断一次迭代是否真的变好。</p><h2>我相信</h2><ul><li><b>先理解失败代价。</b> AI 产品的边界来自真实业务风险，而不是 Demo 能力。</li><li><b>设计可验证的链路。</b> 每个关键判断都应有指标、样本或可复现结果支撑。</li><li><b>让复杂性留在系统里。</b> 用户应该获得清楚的进度、选择和结果，而不是学习底层技术名词。</li></ul><h2>正在寻找</h2><p>希望加入重视产品判断与长期价值的团队，参与 Agent、企业 AI、知识产品或模型应用方向。也欢迎围绕相关实践交流。</p><div className="about-actions"><a className="button primary" href="mailto:www111604@163.com">发送邮件</a><Link className="button secondary" href="/projects">查看项目</Link></div></div></div></section>;
}
