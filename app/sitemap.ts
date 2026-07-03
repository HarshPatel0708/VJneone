import { MetadataRoute } from "next";
import products from "@/data/products.json";
import blogs from "@/data/blogs.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vjneon.com";

  // Static routes
  const staticRoutes = [
    "",
    "/custom-builder",
    "/upload-design",
    "/shop",
    "/blog",
    "/faq",
    "/contact",
    "/about",
    "/auth",
    "/account",
    "/cart",
    "/checkout",
    "/track-order",
    "/policy/warranty",
    "/policy/shipping",
    "/policy/refund",
    "/policy/terms",
    "/policy/privacy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route === "/custom-builder" ? 0.9 : 0.7,
  }));

  // Dynamic products
  const productRoutes = products.map((prod) => ({
    url: `${baseUrl}/shop/${prod.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic blogs
  const blogRoutes = blogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
