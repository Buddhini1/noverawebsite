import { createFileRoute, Link } from "@tanstack/react-router";
import {
  GraduationCap,
  Plane,
  Ticket,
  Home as HomeIcon,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import heroImg from "@/assets/hero-abroad.jpg";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";
import { destinations, stats, whyChooseUs } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Novera International | Study Abroad & Visa Consultancy" },
      {
        name: "description",
        content:
          "Study and visit visa consultancy in Sri Lanka for the UK, Australia, New Zealand, Dubai, Europe, Singapore and Malaysia. Free study visa consultation.",
      },
      { property: "og:title", content: "Novera International | Study Abroad & Visa Consultancy" },
      {
        property: "og:description",
        content:
          "Transforming Lives. Creating New Eras. Free consultation, visa lodgment, air tickets and accommodation support.",
      },
    ],
  }),
  component: Home,
});

const offerings = [
  { icon: GraduationCap, title: "Study Visas", note: "Free consultation" },
  { icon: Plane, title: "Visit Visas", note: "Tourism, family & business" },
  { icon: Ticket, title: "Air Tickets", note: "Booked around your intake" },
  { icon: HomeIcon, title: "Accommodation", note: "Settled before you fly" },
];

function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Student watching an aircraft at the airport before departing to study abroad"
          width={1600}
          height={1008}
          className="absolute inset-0 size-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-primary/78" />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent"
        />
        <div className="relative mx-auto max-w-7xl px-5 py-28 lg:px-8 lg:py-40">
          <div className="max-w-2xl rise-in">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              <Sparkles className="size-3.5" /> Study abroad & visa consultancy
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] text-white sm:text-6xl">
              Transforming Lives.
              <span className="block text-gradient-sky">Creating New Eras.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/85 sm:text-lg">
              Your trusted partner for study and visit visas to the UK, Australia, New Zealand,
              Dubai, Europe, Singapore, and Malaysia. From your first free consultation to landing
              in your dream country, we guide you every step of the way.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <Link to="/contact">Book a Free Consultation</Link>
              </Button>
              <Button asChild variant="outlineLight" size="lg">
                <Link to="/destinations">Explore Destinations</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border px-5 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-8 text-center">
              <p className="font-display text-3xl font-bold text-secondary sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 text-center lg:px-8">
        <p className="eyebrow">Who we are</p>
        <p className="mt-5 text-lg leading-relaxed text-foreground/85 sm:text-xl">
          Novera International is a professional study abroad and visa consultancy helping Sri
          Lankans access global education opportunities. With years of hands-on experience in
          international education, we've helped thousands of students achieve their international
          ambitions — from course selection all the way to arrival.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {offerings.map((o) => (
            <div
              key={o.title}
              className="rounded-2xl border border-border bg-card p-7 shadow-soft transition-transform hover:-translate-y-1"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-secondary/10 text-secondary">
                <o.icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{o.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{o.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Study destinations</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Seven doors to the world</h2>
          </div>
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline"
          >
            View all destinations <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.slice(0, 6).map((d) => (
            <Link
              key={d.slug}
              to="/destinations/$slug"
              params={{ slug: d.slug }}
              className="group relative overflow-hidden rounded-2xl shadow-soft"
            >
              <img
                src={d.image}
                alt={`Studying in ${d.name}`}
                loading="lazy"
                width={1024}
                height={683}
                className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-2xl">{d.flag}</p>
                <h3 className="mt-1 text-xl font-semibold text-white">{d.name}</h3>
                <p className="text-sm text-white/80">{d.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="surface-deep py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Why students choose us
            </p>
            <h2 className="mt-4 text-3xl font-bold text-current sm:text-4xl">
              More than visa consultants — trusted global mobility advisors
            </h2>
            <p className="mt-4 text-current/80">
              Our team guides you through every stage of your journey, from selecting the right
              course and country to securing your visa and preparing for departure, with complete
              transparency and personalized support.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((w) => (
              <div
                key={w.title}
                className="rounded-2xl border border-white/12 bg-white/5 p-6 backdrop-blur-sm"
              >
                <ShieldCheck className="size-5 text-accent" />
                <h3 className="mt-4 text-base font-semibold text-current">{w.title}</h3>
                <p className="mt-2 text-sm text-current/75">{w.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="lg">
              <Link to="/destinations">Explore Study Destinations</Link>
            </Button>
            <Button asChild variant="outlineLight" size="lg">
              <Link to="/contact">Talk to a Counsellor</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="pt-24">
        <CtaBand />
      </div>
    </>
  );
}
