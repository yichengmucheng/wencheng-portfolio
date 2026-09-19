import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { articles, getPublicationPlatform, projects } from "@/lib/content";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="hero-kicker"><span className="status-dot" /> 2027 届 · 寻找 AI 产品经理机会</p>
          <h1>把 AI 能力<br />做成<span>真正可用</span>的产品。</h1>
          <p className="hero-intro">你好，我是文程。我关注复杂 AI 能力如何穿过数据、工程与业务约束，最终成为用户愿意使用、团队能够迭代的产品。</p>
          <div className="hero-actions">
            <Link className="button primary" href="/projects">探索项目 <span>↗</span></Link>
            <a className="button secondary" href="mailto:www111604@163.com">联系我</a>
          </div>
          <div className="hero-note"><span>近期关注</span><p>Agent 可控执行 · RAG 评测 · 模型交付契约</p></div>
        </div>
        <div className="hero-scene" aria-label="AI 产品能力图景">
          <div className="scene-noise" />
          <div className="scene-orbit orbit-one" /><div className="scene-orbit orbit-two" />
          <div className="scene-core"><span>AI</span><small>PRODUCT<br />SYSTEM</small></div>
          <div className="scene-card card-agent"><span>01</span><b>Agent</b><small>可控执行</small></div>
          <div className="scene-card card-rag"><span>02</span><b>RAG</b><small>知识与评测</small></div>
          <div className="scene-card card-model"><span>03</span><b>Model</b><small>生产与交付</small></div>
          <div className="scene-signal"><i /><span>System online</span></div>
        </div>
      </section>

      <section className="section projects-home">
        <div className="section-heading"><div><p className="eyebrow">SELECTED WORK</p><h2>项目画廊</h2></div><p>三个项目分别覆盖 Agent、模型平台与 RAG。点击进入，查看问题、关键决策、验证证据与复盘。</p></div>
        <div className="gallery-filter" aria-label="项目分类"><span>精选项目</span><span>Agent</span><span>模型平台</span><span>RAG</span><b>03 CASES</b></div>
        <div className="project-list">{projects.map((project) => <ProjectCard project={project} key={project.slug} />)}</div>
      </section>

      <section className="section method-section">
        <p className="eyebrow">HOW I WORK</p>
        <h2>从业务问题到可验证的产品闭环</h2>
        <div className="method-grid">
          <article><span>01</span><h3>定义问题</h3><p>先确认用户、场景和失败代价，不从功能清单或模型能力出发。</p></article>
          <article><span>02</span><h3>拆解机制</h3><p>将抽象能力转化为流程、状态、权限、数据与产品边界。</p></article>
          <article><span>03</span><h3>建立证据</h3><p>用原型、测试集和业务指标证明方案有效，而非只讲愿景。</p></article>
          <article><span>04</span><h3>持续迭代</h3><p>把失败样本沉淀为可复现资产，让每轮优化都有依据。</p></article>
        </div>
      </section>

      <section className="section writing-preview">
        <div className="section-title-row"><div><p className="eyebrow">MUCHENG INTELLIGENCE REVIEW</p><h2>木成智序</h2></div><Link className="text-link" href="/writing">进入内容中心 →</Link></div>
        <div className="article-grid">{articles.map((article) => <Link href={`/writing/${article.slug}`} key={article.slug} className="article-card"><p>{article.date} · {article.readingTime}</p><h3>{article.title}</h3><span>{article.excerpt}</span><small className="article-channel-mini">{article.channels.map((channel) => getPublicationPlatform(channel.platform)?.shortName).filter(Boolean).join(" · ")}</small><b>阅读文章 →</b></Link>)}</div>
      </section>
    </>
  );
}
