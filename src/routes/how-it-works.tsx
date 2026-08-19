import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";
import { approach, processSteps } from "@/lib/site-data";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works | The Novera International Process" },
      {
        name: "description",
        content:
          "Six clear steps from choosing your course to boarding your flight, plus our detailed approach to counselling, applications, lodgment and interview training.",
      },
      { property: "og:title", content: "How It Works — Novera International" },
      {
        property: "og:description",
        content: "From course selection to visa approval and departure, step by step.",
      },
    ],
  }),
  component: HowItWorks,
});

function HowItWorks() {
  return (
    <>
      <PageHero
        eyebrow="Our process"
        title="How we do it"
        description="A clear, six-step pathway — with an expert beside you at every stage."
      />

      <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
        <ol className="relative space-y-8 border-l-2 border-dashed border-secondary/35 pl-8">
          {processSteps.map((step, i) => (
            <li key={step} className="relative">
              <span className="absolute -left-[3.05rem] grid size-9 place-items-center rounded-full bg-secondary font-display text-sm font-bold text-secondary-foreground">
                {i + 1}
              </span>
              <p className="text-lg font-semibold text-primary">{step}</p>
            </li>
          ))}
        </ol>

        <div className="mt-20">
          <p className="eyebrow">Our approach in detail</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {approach.map((a) => (
              <div key={a.title} className="rounded-2xl border border-border bg-card p-7 shadow-soft">
                <h2 className="text-lg font-semibold">{a.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
