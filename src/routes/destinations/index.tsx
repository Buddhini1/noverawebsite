import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";
import { destinations } from "@/lib/site-data";

export const Route = createFileRoute("/destinations/")({
  head: () => ({
    meta: [
      { title: "Study Destinations | UK, Australia, NZ, Dubai, Europe, Asia" },
      {
        name: "description",
        content:
          "Compare seven study destinations — the UK, Australia, New Zealand, Dubai/UAE, Europe, Singapore and Malaysia — with requirements, work rights and intakes.",
      },
      { property: "og:title", content: "Study Destinations — Novera International" },
      {
        property: "og:description",
        content: "Seven world-class study destinations, explained clearly for Sri Lankan students.",
      },
    ],
  }),
  component: Destinations,
});

function Destinations() {
  return (
    <>
      <PageHero
        eyebrow="Study destinations"
        title="Choose where your new era begins"
        description="Seven destinations, each with its own advantages, requirements, work rights and intake calendar."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {destinations.map((d) => (
            <article
              key={d.slug}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              <div className="relative overflow-hidden">
                <img
                  src={d.image}
                  alt={`Study in ${d.name}`}
                  loading="lazy"
                  width={1024}
                  height={683}
                  className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-sm font-semibold">
                  {d.flag} {d.name}
                </span>
              </div>
              <div className="p-7">
                <p className="text-sm font-semibold text-secondary">{d.tagline}</p>
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                  {d.intro}
                </p>
                <Link
                  to="/destinations/$slug"
                  params={{ slug: d.slug }}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary"
                >
                  Full destination guide <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
