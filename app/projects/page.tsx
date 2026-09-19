import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/content";

export const metadata: Metadata = { title: "项目", description: "文程的 AI 产品项目案例。" };

export default function ProjectsPage() {
  return <section className="page-section"><header className="page-intro"><p className="eyebrow">PROJECTS</p><h1>AI 产品不是功能集合，<br />而是一组经过验证的判断。</h1><p>这里记录我如何界定问题、权衡方案、组织交付与验证结果。所有公开内容均已脱敏并使用合成数据重建。</p></header><div className="project-list">{projects.map((project) => <ProjectCard project={project} key={project.slug} />)}</div></section>;
}
