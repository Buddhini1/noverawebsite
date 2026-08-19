import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contact, destinations } from "@/lib/site-data";

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
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    message: "",
  });

  const waHref = `https://wa.me/94776157015?text=${encodeURIComponent(
    `Hello Novera International,\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nDestination: ${form.destination}\n\n${form.message}`,
  )}`;

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Your global journey begins with a single conversation"
        description="Get in touch with our team for a free study visa consultation — no obligation, no charge. Tell us where you'd like to study or visit, and we'll help you find the right pathway."
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:px-8">
        <form
          className="rounded-2xl border border-border bg-card p-8 shadow-soft"
          onSubmit={(e) => {
            e.preventDefault();
            window.open(waHref, "_blank", "noopener");
          }}
        >
          <h2 className="text-2xl font-bold">Request your free consultation</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Fill this in and we'll continue the conversation on WhatsApp.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="destination">Preferred destination</Label>
              <select
                id="destination"
                value={form.destination}
                onChange={(e) => setForm({ ...form, destination: e.target.value })}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Not sure yet</option>
                {destinations.map((d) => (
                  <option key={d.slug} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="message">How can we help?</Label>
              <Textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
          </div>

          <Button type="submit" variant="gold" size="lg" className="mt-6 w-full sm:w-auto">
            Send via WhatsApp
          </Button>
        </form>

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
