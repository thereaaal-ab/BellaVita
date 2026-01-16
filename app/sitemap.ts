import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bella-vita-beta.vercel.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/menu",
    "/about",
    "/gallery",
    "/blog",
    "/reviews",
    "/contact",
    "/reservations",
    "/order",
    "/privacy",
    "/terms",
  ].map((route) => {
    const changeFrequency: "daily" | "weekly" = route === "" ? "daily" : "weekly";
    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency,
      priority: route === "" ? 1 : 0.8,
    };
  });

  if (!process.env.DATABASE_URL) {
    return staticRoutes;
  }

  // Get dynamic routes
  let blogPosts: { slug: string; updatedAt: Date }[] = [];
  try {
    blogPosts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
  }

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map(
    (post: { slug: string; updatedAt: Date }) => {
      const changeFrequency = "monthly" as const;
      return {
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency,
        priority: 0.6,
      };
    }
  );

  return [...staticRoutes, ...blogRoutes];
}

