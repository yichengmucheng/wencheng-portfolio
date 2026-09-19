import Link from "next/link";
import type { Project } from "@/lib/content";
import { ProjectPreview } from "./project-preview";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-copy">
        <p className="eyebrow"><span>{project.index}</span>{project.eyebrow}</p>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
        <div className="metric-row">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
        <Link className="text-link" href={`/projects/${project.slug}`}>
          查看完整案例 <span aria-hidden="true">→</span>
        </Link>
      </div>
      <ProjectPreview project={project} />
    </article>
  );
}
