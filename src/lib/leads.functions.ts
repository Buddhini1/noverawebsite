import { createServerFn } from "@tanstack/react-start";
import { leadSchema, type LeadInput } from "./lead-schema";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: LeadInput) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("leads").insert({
      full_name: data.fullName,
      email: data.email || null,
      phone: data.phone,
      destination: data.destination || null,
      service: data.service || null,
      message: data.message || null,
      source: "website",
    });
    if (error) {
      console.error("[leads] insert failed", error.message);
      return { ok: false as const, error: "We couldn't save your enquiry. Please try again." };
    }
    return { ok: true as const };
  });
