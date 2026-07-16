import type { MetadataRoute } from "next";
import { auditions } from "@/lib/auditions";
import { siteConfig } from "@/lib/site";
import { fetchApprovedSitemapEntries } from "@/lib/submissions";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const approvedAuditions = await fetchApprovedSitemapEntries();
  const approvedSlugs = new Set(approvedAuditions.map((audition) => audition.slug));

  const staticRoutes = [
    "",
    "/idol-audition",
    "/idol-audition/tokyo",
    "/idol-audition/osaka",
    "/idol-audition/nagoya",
    "/idol-audition/mikeiken",
    "/idol-audition/free",
    "/idol-audition/high-school",
    "/idol-audition/suspicious",
    "/idol-audition/cost",
    "/idol-audition/parents",
    "/idol-audition/how-to-apply",
    "/post",
    "/about"
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : route === "/idol-audition" ? 0.9 : 0.7
  }));

  const staticAuditionEntries: MetadataRoute.Sitemap = auditions
    .filter((audition) => !approvedSlugs.has(audition.slug))
    .map((audition) => ({
      url: `${siteConfig.url}/idol-audition/${audition.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
      images: audition.imageUrl ? [audition.imageUrl] : undefined
    }));

  const approvedEntries: MetadataRoute.Sitemap = approvedAuditions.map((audition) => ({
    url: `${siteConfig.url}/idol-audition/${audition.slug}`,
    lastModified: audition.updated_at,
    changeFrequency: "weekly",
    priority: 0.8,
    images: audition.image_url ? [audition.image_url] : undefined
  }));

  return [...staticEntries, ...approvedEntries, ...staticAuditionEntries];
}
