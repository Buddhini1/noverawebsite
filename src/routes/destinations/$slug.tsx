import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, Briefcase, CalendarDays, FileText } from "lucide-react";
import { CtaBand } from "@/components/site/CtaBand";
import { Button } from "@/components/ui/button";
import { getDestination } from "@/lib/site-data";

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params }) => {
    const destination = getDestination(params.slug);
    if (!destination) throw notFound();
    return destination;
  },
  head: ({ loaderData }) => {
    const name = loaderData?.name ?? "Study Destination";
    const desc = loaderData
      ? `${loaderData.tagline}. Key advantages, entry requirements, work rights and intakes for studying in ${loaderData.name}.`
      : "Study destination guide by Novera International.";
    return {
      meta: [
        { title: `Study in ${name} | Novera International` },
        { name: "description", content: desc },
        { property: "og:title", content: `Study in ${name}` },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: DestinationPage,
});

function List({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof BadgeCheck;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-7 shadow-soft">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <Icon className="size-5 text-secondary" />
        {title}
      </h2>
      <ul className="mt-4 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex gap-3 text-sm leading-relaxed text-foreground/80">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DestinationPage() {
  const d = Route.useLoaderData();

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={d.image}
          alt={`Study in ${d.name}`}
          width={1024}
          height={683}
          className="absolute inset-0 size-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-primary/80" />
        <div className="relative mx-auto max-w-5xl px-5 py-24 lg:px-8">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white"
          >
            <ArrowLeft className="size-4" /> All destinations
          </Link>
          <p className="mt-8 text-4xl">{d.flag}</p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Study in {d.name}</h1>
          <p className="mt-3 text-lg text-accent">{d.tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <p className="text-lg leading-relaxed text-foreground/85">{d.intro}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <List icon={BadgeCheck} title="Key advantages" items={d.advantages} />
          <List icon={FileText} title="Requirements" items={d.requirements} />
          <List icon={Briefcase} title="Work rights" items={d.workRights} />
          <div className="rounded-2xl border border-border bg-muted p-7">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <CalendarDays className="size-5 text-secondary" />
              Intakes
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80">{d.intakes}</p>
            {d.extra && (
              <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-foreground/80">
                {d.extra}
              </p>
            )}
          </div>
        </div>

        <div className="mt-12">
          <Button asChild variant="gold" size="lg">
            <Link to="/contact">Get a free consultation for {d.name}</Link>
          </Button>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
