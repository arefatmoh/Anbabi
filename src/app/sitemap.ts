import type { MetadataRoute } from "next";

import {
  getBookSlugs,
  getCycleSlugs,
  getVoiceSlugs,
} from "@/lib/content/repository";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  "",
  "/current-cycle",
  "/books",
  "/voices",
  "/community",
  "/about",
  "/contact",
  "/privacy",
  "/community-guidelines",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cycleSlugs, voiceSlugs, bookSlugs] = await Promise.all([
    getCycleSlugs(),
    getVoiceSlugs(),
    getBookSlugs(),
  ]);
  const dynamicRoutes = [
    ...cycleSlugs.map((slug) => `/cycles/${slug}`),
    ...voiceSlugs.map((slug) => `/voices/${slug}`),
    ...bookSlugs.map((slug) => `/books/${slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route.includes("current-cycle") || route.includes("/cycles/")
          ? 0.9
          : 0.6,
  }));
}
