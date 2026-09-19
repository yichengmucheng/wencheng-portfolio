"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ArticleChannel, PublicationPlatform, PublicationPlatformId } from "@/lib/content";

type HubArticle = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: readonly string[];
  channels: readonly ArticleChannel[];
};

type FilterId = "all" | PublicationPlatformId;

export function PublicationHub({
  articles,
  platforms,
}: {
  articles: readonly HubArticle[];
  platforms: readonly PublicationPlatform[];
}) {
  const [active, setActive] = useState<FilterId>("all");

  const visibleArticles = useMemo(
    () => active === "all" ? articles : articles.filter((article) => article.channels.some((channel) => channel.platform === active)),
    [active, articles],
  );

  const platformById = useMemo(
    () => new Map(platforms.map((platform) => [platform.id, platform])),
    [platforms],
  );

  return (
    <div className="publication-hub">
      <section className="channel-network" aria-labelledby="channel-network-title">
        <div className="hub-section-heading">
          <div>
            <p className="eyebrow">CONTENT NETWORK</p>
            <h2 id="channel-network-title">一个内容源，多平台表达</h2>
          </div>
          <p>官网保存完整版本与作品证据；各平台根据阅读场景承载长文、图解、技术复盘和观点讨论。</p>
        </div>
        <div className="channel-grid">
          {platforms.map((platform, index) => {
            const count = articles.filter((article) => article.channels.some((channel) => channel.platform === platform.id)).length;
            const selected = active === platform.id;
            return (
              <button
                type="button"
                className={`channel-card channel-${platform.accent}${selected ? " selected" : ""}`}
                key={platform.id}
                onClick={() => setActive(selected ? "all" : platform.id)}
                aria-pressed={selected}
              >
                <span className="channel-index">0{index + 1}</span>
                <strong>{platform.name}</strong>
                <small>{platform.role}</small>
                <b>{count.toString().padStart(2, "0")} 篇</b>
              </button>
            );
          })}
        </div>
      </section>

      <section className="content-index" aria-labelledby="content-index-title">
        <div className="hub-section-heading index-heading">
          <div>
            <p className="eyebrow">PUBLICATION INDEX</p>
            <h2 id="content-index-title">内容索引</h2>
          </div>
          <div className="index-filter" aria-label="当前内容筛选">
            <button type="button" className={active === "all" ? "active" : ""} onClick={() => setActive("all")}>全部</button>
            {active !== "all" && <span>{platformById.get(active)?.name}</span>}
            <b>{visibleArticles.length.toString().padStart(2, "0")}</b>
          </div>
        </div>

        <div className="content-ledger" aria-live="polite">
          {visibleArticles.map((article, index) => (
            <article className="content-entry" key={article.slug}>
              <span className="entry-number">{(index + 1).toString().padStart(2, "0")}</span>
              <div className="entry-main">
                <p>{article.date} · {article.readingTime}</p>
                <Link href={`/writing/${article.slug}`}>
                  <h3>{article.title}</h3>
                  <span>{article.excerpt}</span>
                </Link>
                <ul className="entry-tags">{article.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </div>
              <div className="entry-channels" aria-label="发布渠道">
                {article.channels.map((channel) => {
                  const platform = platformById.get(channel.platform);
                  if (!platform) return null;
                  if (channel.platform === "site") return <Link key={channel.platform} href={`/writing/${article.slug}`}>{platform.shortName}<i>↗</i></Link>;
                  if (channel.url) return <a key={channel.platform} href={channel.url} target="_blank" rel="noreferrer">{platform.shortName}<i>↗</i></a>;
                  return <span key={channel.platform} title="已发布，外部链接待录入">{platform.shortName}<i>✓</i></span>;
                })}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
