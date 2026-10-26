import type { MetadataRoute } from "next";
import { journalArticleIndex } from "@/lib/organizerArticles";
import { auditions } from "@/lib/auditions";
import { siteConfig } from "@/lib/site";
import { fetchApprovedSitemapEntries } from "@/lib/submissions";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const approvedAuditions = await fetchApprovedSitemapEntries();
  const approvedSlugs = new Set(approvedAuditions.map((audition) => audition.slug));
  const latestListingUpdate = approvedAuditions[0]?.updated_at ?? "2026-09-13T00:00:00+09:00";

  const staticRoutes = [
    "",
    "/idol-audition",
    "/idol-audition/new",
    "/idol-audition/deadline-this-month",
    "/idol-audition/deadline-soon",
    "/idol-audition/tokyo",
    "/idol-audition/kanagawa",
    "/idol-audition/osaka",
    "/idol-audition/nagoya",
    "/idol-audition/fukuoka",
    "/idol-audition/nationwide",
    "/idol-audition/mikeiken",
    "/idol-audition/free",
    "/idol-audition/high-school",
    "/idol-audition/teens",
    "/idol-audition/university-student",
    "/idol-audition/age",
    "/idol-audition/20s",
    "/idol-audition/30s",
    "/idol-audition/25-plus",
    "/idol-audition/age-limit-none",
    "/idol-audition/working-adult",
    "/idol-audition/suspicious",
    "/idol-audition/cost",
    "/idol-audition/parents",
    "/idol-audition/how-to-apply",
    "/idol-audition/agency-guide",
    "/idol-audition/vocal-training",
    "/idol-audition/training-school",
    "/idol-audition/tokyo-vocal-training",
    "/post",
    "/about"
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: latestListingUpdate,
    changeFrequency: route === "" || route.startsWith("/idol-audition") ? "daily" : "weekly",
    priority: route === "" ? 1 : route === "/idol-audition" ? 0.9 : 0.7
  }));

  const staticAuditionEntries: MetadataRoute.Sitemap = auditions
    .filter((audition) => !approvedSlugs.has(audition.slug))
    .map((audition) => ({
      url: `${siteConfig.url}/idol-audition/${audition.slug}`,
      changeFrequency: "daily",
      priority: 0.8,
      images: audition.imageUrl ? [audition.imageUrl] : undefined
    }));

  const approvedEntries: MetadataRoute.Sitemap = approvedAuditions.map((audition) => ({
    url: `${siteConfig.url}/idol-audition/${audition.slug}`,
    lastModified: audition.updated_at,
    changeFrequency: "daily",
    priority: 0.8,
    images: audition.image_url ? [audition.image_url] : undefined
  }));

  const journalEntries: MetadataRoute.Sitemap = ["/for-organizers", ...journalArticleIndex.map(article => `/for-organizers/${article.slug}`)].map(route => ({
    url: `${siteConfig.url}${route}`,
    lastModified: ["/for-organizers", "/for-organizers/start-idol-group", "/for-organizers/idol-management-beginner", "/for-organizers/recruit-idol-members"].includes(route)
      ? "2026-10-27T00:00:00+09:00"
      : route === "/for-organizers/no-connections" ? "2026-10-24T00:00:00+09:00" : "2026-10-21T00:00:00+09:00",
    changeFrequency: "monthly", priority: 0.7,
  }));
  return [...staticEntries, ...approvedEntries, ...staticAuditionEntries, ...journalEntries];
}
