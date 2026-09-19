"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  ["/", "首页"],
  ["/projects", "项目"],
  ["/lab", "Lab"],
  ["/writing", "内容"],
  ["/about", "关于"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="文程的个人网站首页">
        <span>WC</span>
        <strong>文程</strong>
      </Link>
      <nav aria-label="主导航">
        {nav.map(([href, label]) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link href={href} key={href} className={active ? "active" : ""}>
              {label}
            </Link>
          );
        })}
      </nav>
      <a className="header-cta" href="/resume-wencheng.pdf" target="_blank" rel="noreferrer">
        查看简历 <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
