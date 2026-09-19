import type { Metadata } from "next";
import { PublicationHub } from "@/components/publication-hub";
import { articles, publicationPlatforms } from "@/lib/content";

export const metadata: Metadata = {
  title: "木成智序｜内容中心",
  description: "统一收录木成在官网、微信公众号、小红书、CSDN 与知乎发布的 AI 产品与产业观察。",
};

export default function WritingPage() {
  return (
    <section className="page-section writing-hub-page">
      <header className="page-intro writing-hub-intro">
        <div>
          <p className="eyebrow">MUCHENG INTELLIGENCE REVIEW</p>
          <h1>木成智序<br />内容中心</h1>
        </div>
        <div className="writing-manifesto">
          <strong>看懂智能如何成为新的生产秩序。</strong>
          <p>深入拆解大模型、Agent、AI 产品与产业落地。不只追逐模型更新，更关注能力如何进入真实流程、形成产品并产生可验证的价值。</p>
          <dl>
            <div><dt>{articles.length.toString().padStart(2, "0")}</dt><dd>原创文章</dd></div>
            <div><dt>{publicationPlatforms.length.toString().padStart(2, "0")}</dt><dd>发布阵地</dd></div>
            <div><dt>03</dt><dd>核心议题</dd></div>
          </dl>
        </div>
      </header>
      <PublicationHub articles={articles} platforms={publicationPlatforms} />
    </section>
  );
}
