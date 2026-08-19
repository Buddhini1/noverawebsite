import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/site-data";

export function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="surface-deep relative overflow-hidden rounded-3xl px-6 py-14 text-center shadow-lift sm:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 bottom--20 size-80 rounded-full bg-accent/20 blur-3xl"
        />
        <div className="relative">
          <h2 className="text-3xl font-bold text-current sm:text-4xl">
            Your global journey begins with a single conversation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-current/80">
            Get in touch for a free study visa consultation — no obligation, no charge. Tell us
            where you'd like to study or visit, and we'll help you find the right pathway.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="gold" size="lg">
              <Link to="/contact">Book a Free Consultation</Link>
            </Button>
            <Button asChild variant="outlineLight" size="lg">
              <a href={contact.whatsappLink} target="_blank" rel="noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
