import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";
import { siteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/projects", "/lab", "/writing", "/about", ...projects.map((x) => `/projects/${x.slug}`)].map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date(), changeFrequency: path === "" || path === "/writing" ? "daily" : "yearly" })); }
