import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";
import { whyChooseUs } from "@/lib/site-data";

export const Route = createFileRoute("/why-choose-us")({
  head: () => ({
    meta: [
      { title: "Why Choose Novera International | High Success Rate Visa Support" },
      {
        name: "description",
        content:
          "Free consultation, eligibility assessment, documentation, lodgment, interview coaching, air tickets and accommodation — complete transparency at every step.",
      },
      { property: "og:title", content: "Why Choose Novera International" },
      {
        property: "og:description",
        content:
          "Experience, trusted global partnerships and personalized guidance for study and visit visas.",
      },
    ],
  }),
  component: WhyChooseUs,
});

function WhyChooseUs() {
  return (
    <>
      <PageHero
        eyebrow="Why choose us"
        title="Experience you can lean on, guidance you can trust"
        description="With years of experience, trusted global partnerships, and personalized guidance, we deliver reliable study and visit visa solutions with a high success rate and complete transparency."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((w, i) => (
            <div
              key={w.title}
              className="rounded-2xl border border-border bg-card p-7 shadow-soft transition-transform hover:-translate-y-1"
            >
              <span className="font-display text-sm font-bold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 flex items-start gap-2 text-lg font-semibold">
                <Check className="mt-1 size-4 shrink-0 text-secondary" />
                {w.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
            </div>
          ))}
        </div>

        <blockquote className="mx-auto mt-16 max-w-3xl rounded-2xl bg-muted p-10 text-center font-display text-xl italic text-primary">
          “Our team is friendly, reliable, and committed to offering personalized advice to every
          client.”
        </blockquote>
      </section>

      <CtaBand />
    </>
  );
}
