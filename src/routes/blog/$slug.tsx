import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { CtaBand } from "@/components/site/CtaBand";
import { getBlogPost } from "@/lib/blog.functions";

const postQuery = (slug: string) =>
  queryOptions({
    queryKey: ["blog-post", slug],
    queryFn: () => getBlogPost({ data: { slug } }),
  });

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ context, params }) => {
    const post = await context.queryClient.ensureQueryData(postQuery(params.slug));
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Article"} | Novera International` },
      { name: "description", content: loaderData?.excerpt ?? "Study abroad insights from Novera International." },
      { property: "og:title", content: loaderData?.title ?? "Novera International" },
      { property: "og:description", content: loaderData?.excerpt ?? "" },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPostPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="text-2xl font-bold">Article not found</h1>
      <Link to="/blog" className="mt-4 inline-block font-semibold text-primary">
        Back to the blog
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-muted-foreground">We couldn't load this article right now.</p>
    </div>
  ),
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const { data: post } = useSuspenseQuery(postQuery(slug));
  if (!post) return null;

  const blocks = post.content.split("\n").filter((line) => line.trim().length > 0);

  return (
    <>
      <article className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
        <Link to="/blog" className="text-sm font-semibold text-secondary">
          ← All articles
        </Link>
        <h1 className="mt-5 text-4xl font-bold leading-tight">{post.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {post.author_name}
          {post.published_at
            ? ` · ${new Date(post.published_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}`
            : ""}
        </p>
        {post.excerpt && <p className="mt-6 text-lg text-muted-foreground">{post.excerpt}</p>}

        <div className="mt-10 space-y-5">
          {blocks.map((line, i) =>
            line.startsWith("## ") ? (
              <h2 key={i} className="pt-4 text-2xl font-bold">
                {line.replace("## ", "")}
              </h2>
            ) : (
              <p key={i} className="leading-relaxed text-foreground/85">
                {line}
              </p>
            ),
          )}
        </div>
      </article>

      <div className="pb-24">
        <CtaBand />
      </div>
    </>
  );
}
