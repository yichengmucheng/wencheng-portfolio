import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="footer-title">一起把 AI 做成真正可用的产品。</p>
        <a href="mailto:www111604@163.com">www111604@163.com <span aria-hidden="true">↗</span></a>
      </div>
      <div className="footer-links">
        <Link href="/projects">项目</Link>
        <Link href="/writing">写作</Link>
        <Link href="/about">关于</Link>
        <a href="/resume-wencheng.pdf" target="_blank" rel="noreferrer">简历</a>
      </div>
      <p className="footer-meta">© 2026 文程 · AI 产品经理作品集</p>
    </footer>
  );
}
