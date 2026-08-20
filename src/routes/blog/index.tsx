import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";
import { listBlogPosts } from "@/lib/blog.functions";

const postsQuery = queryOptions({
  queryKey: ["blog-posts"],
  queryFn: () => listBlogPosts(),
});

export const Route = createFileRoute("/blog/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(postsQuery),
  head: () => ({
    meta: [
      { title: "Study Abroad Blog | Novera International" },
      {
        name: "description",
        content:
          "Visa guides, destination comparisons and application tips from Novera International's counsellors in Colombo, Sri Lanka.",
      },
      { property: "og:title", content: "Study Abroad Blog | Novera International" },
      {
        property: "og:description",
        content: "Practical visa and study abroad advice from our counselling team.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndex,
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-muted-foreground">We couldn't load the blog right now.</p>
    </div>
  ),
});

function formatDate(value: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BlogIndex() {
  const { data: posts } = useSuspenseQuery(postsQuery);

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Guides for your journey abroad"
        description="Straight-talking advice on visas, destinations and applications — written by the counsellors who handle them every day."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">No articles published yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
                  {formatDate(post.published_at)}
                </p>
                <h2 className="mt-3 text-xl font-bold leading-snug">{post.title}</h2>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                <span className="mt-5 text-sm font-semibold text-primary">Read article →</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <div className="pb-24">
        <CtaBand />
      </div>
    </>
  );
}
