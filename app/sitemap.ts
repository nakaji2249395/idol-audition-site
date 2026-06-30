import type { MetadataRoute } from "next";
import { auditions } from "@/lib/auditions";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/idol-audition",
    "/idol-audition/tokyo",
    "/idol-audition/mikeiken",
    "/idol-audition/suspicious",
    "/idol-audition/cost"
  ];

  const auditionRoutes = auditions.map((audition) => `/idol-audition/${audition.slug}`);

  return [...staticRoutes, ...auditionRoutes].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : route === "/idol-audition" ? 0.9 : 0.7
  }));
}
