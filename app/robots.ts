import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bella-vita-beta.vercel.app"}/sitemap.xml`,
  };
}

