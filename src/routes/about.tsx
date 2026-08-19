import { createFileRoute } from "@tanstack/react-router";
import { Compass, Target } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";
import { stats } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Novera International | Global Mobility Advisors" },
      {
        name: "description",
        content:
          "Novera International is a Sri Lankan study abroad and visa consultancy built on immigration expertise, transparency and personalized service.",
      },
      { property: "og:title", content: "About Novera International" },
      {
        property: "og:description",
        content:
          "Immigration professionals, not conventional agents — guiding Sri Lankans to global education opportunities.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Connecting Sri Lankans with global opportunities"
        description="For years, Novera International has been helping individuals and families take confident steps toward education, career growth, and international mobility."
      />

      <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
        <div className="space-y-12">
          <div>
            <p className="eyebrow">Our identity</p>
            <p className="mt-4 text-lg leading-relaxed text-foreground/85">
              We are more than consultants — we are trusted global mobility advisors. We guide our
              clients through every stage of the process, from planning their international journey
              to successfully securing the right visa pathway. Our focus is on professional
              guidance, transparency, and delivering successful outcomes for every client.
            </p>
          </div>

          <div>
            <p className="eyebrow">About the company</p>
            <p className="mt-4 leading-relaxed text-foreground/80">
              Novera International is a professional study abroad and visa consultancy offering
              comprehensive support for study and visit visas to leading destinations, including
              the United Kingdom, Australia, New Zealand, the United Arab Emirates, Europe,
              Singapore, and Malaysia.
            </p>
            <p className="mt-4 leading-relaxed text-foreground/80">
              Our services are built on a strong foundation of immigration expertise, ensuring that
              every application is managed with accuracy, compliance, and strategic attention to
              detail. What distinguishes us is our identity as immigration professionals rather
              than conventional agents — we possess an in-depth understanding of visa laws,
              policies, and procedural requirements, enabling us to achieve higher success rates
              while protecting our clients' interests.
            </p>
            <p className="mt-4 leading-relaxed text-foreground/80">
              We are committed to professionalism, transparency, and personalized service — a
              trusted partner for individuals seeking international opportunities, from initial
              consultation to outcome.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
            <Compass className="size-6 text-secondary" />
            <h2 className="mt-4 text-2xl font-bold">Vision</h2>
            <p className="mt-3 text-foreground/80">
              To be a globally recognized and trusted immigration service provider, empowering
              individuals and students to access international opportunities through ethical,
              transparent, and expert guidance.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
            <Target className="size-6 text-secondary" />
            <h2 className="mt-4 text-2xl font-bold">Mission</h2>
            <p className="mt-3 text-foreground/80">
              To deliver reliable and personalized visa solutions for study and travel by providing
              clear guidance, free consultation, and end-to-end support — from course selection to
              air tickets and accommodation — while upholding the highest standards of integrity,
              transparency, and client care.
            </p>
            <p className="mt-4 font-display text-lg font-semibold italic text-secondary">
              Transforming Lives. Creating New Eras.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 rounded-2xl bg-muted p-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
