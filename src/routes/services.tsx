import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";
import { services } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Study Visa, Visit Visa, Tickets & Accommodation" },
      {
        name: "description",
        content:
          "Novera International offers free study visa consultation, visit visa support, air ticket booking and accommodation assistance for Sri Lankan students and travellers.",
      },
      { property: "og:title", content: "Novera International Services" },
      {
        property: "og:description",
        content:
          "Study visas, visit visas, air ticket assistance and accommodation support — end to end.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything from first question to first night abroad"
        description="Comprehensive support for study and visit visas — and the practical details that come after approval."
      />

      <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
        <div className="space-y-6">
          {services.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              className="rounded-2xl border border-border bg-card p-8 shadow-soft sm:p-10"
            >
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-5">
                <span className="font-display text-3xl font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h2 className="text-2xl font-bold">{s.title}</h2>
                  <p className="mt-3 text-foreground/85">{s.summary}</p>
                  <p className="mt-3 text-muted-foreground">{s.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
