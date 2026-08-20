import { createServerFn } from "@tanstack/react-start";

export type BlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  author_name: string;
  tags: string[];
  published_at: string | null;
};

export type BlogPost = BlogPostSummary & { content: string };

export const listBlogPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { createPublicServerClient } = await import("./supabase-public.server");
  const { data, error } = await createPublicServerClient()
    .from("blog_posts")
    .select("slug, title, excerpt, cover_image, author_name, tags, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) return [] as BlogPostSummary[];
  return (data ?? []) as BlogPostSummary[];
});

export const getBlogPost = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => ({ slug: String(data.slug).slice(0, 200) }))
  .handler(async ({ data }) => {
    const { createPublicServerClient } = await import("./supabase-public.server");
    const { data: post, error } = await createPublicServerClient()
      .from("blog_posts")
      .select("slug, title, excerpt, content, cover_image, author_name, tags, published_at")
      .eq("published", true)
      .eq("slug", data.slug)
      .maybeSingle();
    if (error || !post) return null;
    return post as BlogPost;
  });
