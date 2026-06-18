
import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const mainRoutes = siteConfig.mainNav.map((route) => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL}${route.href}`,
    lastModified: new Date().toISOString(),
  }));

  const authRoutes = [
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/register`,
      lastModified: new Date().toISOString(),
    },
  ];

  return [...mainRoutes, ...authRoutes];
}
