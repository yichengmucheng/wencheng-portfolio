"use client";

import { useMemo, useState } from "react";
import type { ArticleChannel, PublicationPlatform, PublicationPlatformId } from "@/lib/content";

type HubArticle = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  source: string;
  url: string;
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
    () => active === "all" || active === "site" ? articles : articles.filter((article) => article.channels.some((channel) => channel.platform === active)),
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
          <p>官网负责统一索引；标题、摘要、发布日期和跳转地址均来自已验证的公开来源，不再生成示例正文。</p>
        </div>
        <div className="channel-grid">
          {platforms.map((platform, index) => {
            const count = platform.id === "site" ? articles.length : articles.filter((article) => article.channels.some((channel) => channel.platform === platform.id)).length;
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
                <b>{platform.syncStatus} · {count.toString().padStart(2, "0")} 篇</b>
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
            <article className="content-entry" key={article.id}>
              <span className="entry-number">{(index + 1).toString().padStart(2, "0")}</span>
              <div className="entry-main">
                <p>{article.date} · {article.source}</p>
                <a href={article.url} target="_blank" rel="noreferrer">
                  <h3>{article.title}</h3>
                  <span>{article.excerpt}</span>
                </a>
                <ul className="entry-tags">{article.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </div>
              <div className="entry-channels" aria-label="发布渠道">
                {article.channels.map((channel) => {
                  const platform = platformById.get(channel.platform);
                  if (!platform) return null;
                  if (channel.url) return <a key={channel.platform} href={channel.url} target="_blank" rel="noreferrer">{platform.shortName}<i>↗</i></a>;
                  return <span key={channel.platform} title="已发布，公开链接待绑定">{platform.shortName}<i>待绑定</i></span>;
                })}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
