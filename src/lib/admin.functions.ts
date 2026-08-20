import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { leadStatuses } from "./lead-schema";

export type AdminLead = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string;
  destination: string | null;
  service: string | null;
  message: string | null;
  status: (typeof leadStatuses)[number];
  internal_notes: string | null;
  created_at: string;
};

export type AdminPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  tags: string[];
  published: boolean;
  published_at: string | null;
};

export const isAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { isAdmin: data === true, userId: context.userId };
  });

export const listLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("leads")
      .select(
        "id, full_name, email, phone, destination, service, message, status, internal_notes, created_at",
      )
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as AdminLead[];
  });

export const updateLead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; status?: string; internal_notes?: string }) => {
    if (data.status && !leadStatuses.includes(data.status as never)) {
      throw new Error("Invalid status");
    }
    return {
      id: String(data.id),
      status: data.status as (typeof leadStatuses)[number] | undefined,
      internal_notes:
        data.internal_notes === undefined ? undefined : String(data.internal_notes).slice(0, 4000),
    };
  })
  .handler(async ({ data, context }) => {
    const patch: Record<string, unknown> = {};
    if (data.status) patch["status"] = data.status;
    if (data.internal_notes !== undefined) patch["internal_notes"] = data.internal_notes;
    const { error } = await context.supabase.from("leads").update(patch).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listAllPosts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("blog_posts")
      .select("id, slug, title, excerpt, content, cover_image, tags, published, published_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as AdminPost[];
  });

export const savePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: {
      id?: string;
      slug: string;
      title: string;
      excerpt?: string;
      content: string;
      cover_image?: string;
      published: boolean;
    }) => {
      const slug = String(data.slug)
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      if (!slug) throw new Error("Slug is required");
      if (!String(data.title).trim()) throw new Error("Title is required");
      if (!String(data.content).trim()) throw new Error("Content is required");
      return {
        id: data.id,
        slug,
        title: String(data.title).trim().slice(0, 200),
        excerpt: String(data.excerpt ?? "").trim().slice(0, 500),
        content: String(data.content).slice(0, 50000),
        cover_image: String(data.cover_image ?? "").trim().slice(0, 500),
        published: Boolean(data.published),
      };
    },
  )
  .handler(async ({ data, context }) => {
    const row = {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt || null,
      content: data.content,
      cover_image: data.cover_image || null,
      published: data.published,
      published_at: data.published ? new Date().toISOString() : null,
    };
    const query = data.id
      ? context.supabase.from("blog_posts").update(row).eq("id", data.id)
      : context.supabase.from("blog_posts").insert(row);
    const { error } = await query;
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deletePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => ({ id: String(data.id) }))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("blog_posts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
