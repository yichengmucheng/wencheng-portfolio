import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectVisual } from "@/components/project-visual";
import { AgentHubCase } from "@/components/agent-hub-case";
import { getProject, projects } from "@/lib/content";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const current = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(current + 1) % projects.length];

  return <article className={`case-study case-${project.visual}`}>
    <header className="case-hero">
      <Link href="/projects" className="back-link">← 返回项目</Link>
      <p className="eyebrow"><span>{project.index}</span>{project.eyebrow}</p>
      <h1>{project.title}</h1><p className="case-summary">{project.summary}</p>
      <div className="case-meta"><div><span>角色</span><b>{project.role}</b></div><div><span>周期</span><b>{project.period}</b></div><div><span>状态</span><b>{project.status}</b></div></div>
      <ProjectVisual type={project.visual} />
    </header>
    {project.slug === "enterprise-agent-hub" ? <AgentHubCase project={project} next={next} /> : <>
    <section className="case-section split"><h2>01<br />问题与角色</h2><div><h3>要解决的问题</h3><p>{project.challenge}</p><h3>我的职责</h3><p>{project.roleDetail}</p></div></section>
    <section className="case-section"><div className="case-section-head"><h2>02<br />关键决策</h2><p>比产出清单更重要的，是这些选择为何成立。</p></div><div className="decision-list">{project.decisions.map((decision, index) => <article key={decision.title}><span>0{index + 1}</span><div><h3>{decision.title}</h3><dl><dt>问题</dt><dd>{decision.problem}</dd><dt>选择</dt><dd>{decision.choice}</dd><dt>结果</dt><dd>{decision.result}</dd></dl></div></article>)}</div></section>
    <section className="case-section split"><h2>03<br />产品链路</h2><div className="flow"><div>{project.flow.map((step, index) => <div key={step}><span>{String(index + 1).padStart(2, "0")}</span><b>{step}</b></div>)}</div><p>链路中的每一步都有输入、产物和验收标准，使团队能定位问题并独立复现结果。</p></div></section>
    <section className="case-section split"><h2>04<br />验证证据</h2><div>
      {project.slug === "structured-model-platform" && <div className="case-demo">
        <div className="case-demo-head">
          <div><span>PRODUCT DEMO · 09:00</span><h3>结构化模型平台完整演示</h3></div>
          <p>真实产品录屏，展示模型配置、样本选择、应用推理、效果评估与发布链路。建议全屏观看。</p>
        </div>
        <video controls preload="metadata" playsInline poster="/media/structured-model-demo-poster.jpg" aria-label="结构化模型生产与交付平台演示视频">
          <source src="/media/structured-model-demo.mp4" type="video/mp4" />
          当前浏览器不支持在线播放，请使用下方链接打开视频。
        </video>
        <a href="/media/structured-model-demo.mp4" target="_blank" rel="noreferrer">在新窗口打开视频 ↗</a>
      </div>}
      <ul className="evidence-list">{project.evidence.map((item) => <li key={item}>{item}</li>)}</ul><div className="metrics-large">{project.metrics.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span>{metric.note && <small>{metric.note}</small>}</div>)}</div>
    </div></section>
    <section className="case-section split"><h2>05<br />结果与复盘</h2><div><h3>结果</h3><p>{project.outcome}</p><blockquote>{project.reflection}</blockquote><div className="confidentiality"><b>公开说明</b><p>{project.confidentiality}</p></div></div></section>
    <Link className="next-case" href={`/projects/${next.slug}`}><span>下一个案例</span><strong>{next.title} →</strong></Link>
    </>}
  </article>;
}
