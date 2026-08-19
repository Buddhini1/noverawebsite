import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="surface-deep relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-32 size-96 rounded-full bg-accent/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-5xl px-5 py-20 text-center lg:px-8 lg:py-28">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
        <h1 className="mt-5 text-4xl font-bold text-current sm:text-5xl">{title}</h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-base text-current/80 sm:text-lg">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
