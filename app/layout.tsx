import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteUrl } from "@/lib/site";
import { AmbientInteractions } from "@/components/ambient-interactions";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "文程｜AI 产品经理", template: "%s｜文程" },
  description: "文程的 AI 产品作品集：Agent、模型平台、RAG 与企业 AI 产品实践。",
  keywords: ["AI 产品经理", "Agent", "RAG", "模型平台", "作品集", "文程"],
  icons: { icon: "/favicon.svg" },
  openGraph: { title: "文程｜AI 产品经理", description: "把模型、Agent 与知识系统做成可用、可评测、可交付的产品。", type: "website", locale: "zh_CN" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <AmbientInteractions />
        <div className="ambient-shell" aria-hidden="true">
          <i /><i /><i />
        </div>
        <div className="page-shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
