import { MetadataRoute } from "next";

import { gamesRegistry } from "@/data/games";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://memorizle.com";

  // Get all game routes
  const gameRoutes = Object.keys(gamesRegistry).map((name) => ({
    url: `${baseUrl}/${name}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/games`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/stats`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    ...gameRoutes,
  ];
}
