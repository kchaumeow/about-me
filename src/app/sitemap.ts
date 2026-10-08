import type { MetadataRoute } from "next";
import { siteUrl } from "./utils/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    {
      url: `${siteUrl}/projects`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
