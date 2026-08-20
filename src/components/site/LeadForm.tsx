import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitLead } from "@/lib/leads.functions";
import { leadSchema, type LeadInput } from "@/lib/lead-schema";
import { destinations, services } from "@/lib/site-data";

const empty: LeadInput = {
  fullName: "",
  email: "",
  phone: "",
  destination: "",
  service: "",
  message: "",
};

export function LeadForm() {
  const send = useServerFn(submitLead);
  const [form, setForm] = useState<LeadInput>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const set = (key: keyof LeadInput, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = leadSchema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Please check the highlighted fields");
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      const result = await send({ data: parsed.data });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      setDone(true);
      setForm(empty);
      toast.success("Thank you — we've received your enquiry.");
    } catch {
      toast.error("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
        <h2 className="text-2xl font-bold">Enquiry received</h2>
        <p className="mt-3 text-muted-foreground">
          One of our counsellors will contact you within one working day. If it's urgent, message
          us on WhatsApp.
        </p>
        <Button variant="gold" className="mt-6" onClick={() => setDone(false)}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form className="rounded-2xl border border-border bg-card p-8 shadow-soft" onSubmit={onSubmit} noValidate>
      <h2 className="text-2xl font-bold">Request your free consultation</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Share a few details and our team will follow up personally.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field id="fullName" label="Full name" error={errors["fullName"]}>
          <Input
            id="fullName"
            value={form.fullName}
            maxLength={100}
            onChange={(e) => set("fullName", e.target.value)}
          />
        </Field>
        <Field id="phone" label="Phone" error={errors["phone"]}>
          <Input
            id="phone"
            value={form.phone}
            maxLength={30}
            placeholder="+94 77 000 0000"
            onChange={(e) => set("phone", e.target.value)}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field id="email" label="Email (optional)" error={errors["email"]}>
            <Input
              id="email"
              type="email"
              value={form.email}
              maxLength={255}
              onChange={(e) => set("email", e.target.value)}
            />
          </Field>
        </div>
        <Field id="destination" label="Preferred destination" error={errors["destination"]}>
          <select
            id="destination"
            value={form.destination}
            onChange={(e) => set("destination", e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Not sure yet</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </Field>
        <Field id="service" label="Service needed" error={errors["service"]}>
          <select
            id="service"
            value={form.service}
            onChange={(e) => set("service", e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">General enquiry</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field id="message" label="How can we help?" error={errors["message"]}>
            <Textarea
              id="message"
              rows={5}
              maxLength={2000}
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
            />
          </Field>
        </div>
      </div>

      <Button type="submit" variant="gold" size="lg" className="mt-6 w-full sm:w-auto" disabled={busy}>
        {busy ? "Sending…" : "Send my enquiry"}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}
