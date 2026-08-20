import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { LeadForm } from "@/components/site/LeadForm";
import { contact } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Novera International | Free Visa Consultation" },
      {
        name: "description",
        content:
          "Talk to our counsellors in Pannipitiya, Colombo. WhatsApp +94 77 615 7015 or email info.noverainternational@yahoo.com for a free study visa consultation.",
      },
      { property: "og:title", content: "Contact Novera International" },
      {
        property: "og:description",
        content: "Free study visa consultation — no obligation, no charge.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Your global journey begins with a single conversation"
        description="Get in touch with our team for a free study visa consultation — no obligation, no charge. Tell us where you'd like to study or visit, and we'll help you find the right pathway."
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:px-8">
        <LeadForm />

        <aside className="space-y-4">
          <a
            href={contact.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1"
          >
            <MessageCircle className="size-5 shrink-0 text-secondary" />
            <div className="min-w-0">
              <p className="font-semibold">WhatsApp</p>
              <p className="text-sm text-muted-foreground">{contact.whatsapp}</p>
            </div>
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1"
          >
            <Mail className="size-5 shrink-0 text-secondary" />
            <div className="min-w-0">
              <p className="font-semibold">Email</p>
              <p className="break-all text-sm text-muted-foreground">{contact.email}</p>
            </div>
          </a>
          <div className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <MapPin className="size-5 shrink-0 text-secondary" />
            <div className="min-w-0">
              <p className="font-semibold">Our office</p>
              <p className="text-sm text-muted-foreground">{contact.address}</p>
            </div>
          </div>
          <div className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <Clock className="size-5 shrink-0 text-secondary" />
            <div className="min-w-0">
              <p className="font-semibold">Working hours</p>
              {contact.hours.map((h) => (
                <p key={h} className="text-sm text-muted-foreground">
                  {h}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-2xl surface-deep p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Follow us
            </p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-current/80">
              {contact.social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-current">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
