"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/lib/content";
import { ProjectVisual } from "./project-visual";

export function ProjectPreview({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <>
      <button className="visual-link preview-trigger" type="button" onClick={() => setOpen(true)} aria-label={`快速预览：${project.title}`}>
        <ProjectVisual type={project.visual} />
        <span className="preview-hint"><i /> 点击沉浸预览</span>
      </button>
      {mounted && open && createPortal(
        <div className={`preview-overlay preview-${project.visual}`} role="dialog" aria-modal="true" aria-labelledby={`preview-${project.slug}`} onMouseDown={(event) => event.currentTarget === event.target && setOpen(false)}>
          <div className="preview-backdrop-art" aria-hidden="true"><ProjectVisual type={project.visual} /></div>
          <div className="preview-panel">
            <button className="preview-close" type="button" onClick={() => setOpen(false)} aria-label="关闭预览">×</button>
            <div className="preview-main">
              <div className="preview-stage"><ProjectVisual type={project.visual} /></div>
              <div className="preview-chips">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
            <aside className="preview-info">
              <p className="eyebrow"><span>{project.index}</span>{project.eyebrow}</p>
              <h2 id={`preview-${project.slug}`}>{project.title}</h2>
              <p>{project.summary}</p>
              <div className="preview-metrics">{project.metrics.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>
              <div className="preview-meta"><span>{project.role}</span><span>{project.period}</span><span>{project.status}</span></div>
              <Link className="button primary" href={`/projects/${project.slug}`}>进入完整案例 <span>↗</span></Link>
            </aside>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
