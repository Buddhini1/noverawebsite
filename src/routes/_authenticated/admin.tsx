import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  deletePost,
  isAdmin,
  listAllPosts,
  listLeads,
  savePost,
  updateLead,
  type AdminPost,
} from "@/lib/admin.functions";
import { leadStatusLabels, leadStatuses } from "@/lib/lead-schema";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Enquiries & Blog Dashboard | Novera International" },
      { name: "description", content: "Internal dashboard for tracking enquiries and publishing blog articles." },
      { property: "og:title", content: "Novera Dashboard" },
      { property: "og:description", content: "Internal enquiry and blog management." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const checkAdmin = useServerFn(isAdmin);
  const [tab, setTab] = useState<"leads" | "blog">("leads");

  const adminQuery = useQuery({ queryKey: ["is-admin"], queryFn: () => checkAdmin() });

  if (adminQuery.isLoading) {
    return <p className="mx-auto max-w-5xl px-5 py-24 text-muted-foreground">Loading…</p>;
  }

  if (!adminQuery.data?.isAdmin) {
    return (
      <section className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="text-2xl font-bold">Admin access required</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your account is signed in but hasn't been granted admin access yet. Share this ID with
          your developer to be approved:
        </p>
        <code className="mt-4 block break-all rounded-md bg-muted px-3 py-2 text-xs">
          {adminQuery.data?.userId}
        </code>
        <Button
          variant="outline"
          className="mt-6"
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/auth" });
          }}
        >
          Sign out
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/auth" });
          }}
        >
          Sign out
        </Button>
      </div>

      <div className="mt-6 flex gap-2">
        {(["leads", "blog"] as const).map((t) => (
          <Button
            key={t}
            size="sm"
            variant={tab === t ? "gold" : "outline"}
            onClick={() => setTab(t)}
          >
            {t === "leads" ? "Enquiries" : "Blog posts"}
          </Button>
        ))}
      </div>

      <div className="mt-8">{tab === "leads" ? <LeadsPanel /> : <BlogPanel />}</div>
    </section>
  );
}

function LeadsPanel() {
  const qc = useQueryClient();
  const fetchLeads = useServerFn(listLeads);
  const saveLead = useServerFn(updateLead);
  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["admin-leads"],
    queryFn: () => fetchLeads(),
  });

  const mutation = useMutation({
    mutationFn: (input: { id: string; status?: string; internal_notes?: string }) =>
      saveLead({ data: input }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-leads"] });
      toast.success("Enquiry updated");
    },
    onError: () => toast.error("Couldn't update the enquiry"),
  });

  if (isLoading) return <p className="text-muted-foreground">Loading enquiries…</p>;
  if (leads.length === 0) return <p className="text-muted-foreground">No enquiries yet.</p>;

  return (
    <div className="space-y-4">
      {leads.map((lead) => (
        <div key={lead.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-lg font-bold">{lead.full_name}</p>
              <p className="text-sm text-muted-foreground">
                {lead.phone}
                {lead.email ? ` · ${lead.email}` : ""}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {new Date(lead.created_at).toLocaleString("en-GB")}
                {lead.destination ? ` · ${lead.destination}` : ""}
                {lead.service ? ` · ${lead.service}` : ""}
              </p>
            </div>
            <select
              value={lead.status}
              onChange={(e) => mutation.mutate({ id: lead.id, status: e.target.value })}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            >
              {leadStatuses.map((s) => (
                <option key={s} value={s}>
                  {leadStatusLabels[s]}
                </option>
              ))}
            </select>
          </div>

          {lead.message && <p className="mt-4 text-sm text-foreground/85">{lead.message}</p>}

          <NotesEditor
            initial={lead.internal_notes ?? ""}
            onSave={(notes) => mutation.mutate({ id: lead.id, internal_notes: notes })}
          />
        </div>
      ))}
    </div>
  );
}

function NotesEditor({ initial, onSave }: { initial: string; onSave: (v: string) => void }) {
  const [value, setValue] = useState(initial);
  return (
    <div className="mt-4 grid gap-2">
      <Label>Follow-up notes</Label>
      <Textarea rows={2} value={value} onChange={(e) => setValue(e.target.value)} maxLength={4000} />
      <div>
        <Button size="sm" variant="outline" onClick={() => onSave(value)} disabled={value === initial}>
          Save notes
        </Button>
      </div>
    </div>
  );
}

const emptyPost = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  cover_image: "",
  published: false,
};

function BlogPanel() {
  const qc = useQueryClient();
  const fetchPosts = useServerFn(listAllPosts);
  const save = useServerFn(savePost);
  const remove = useServerFn(deletePost);
  const [draft, setDraft] = useState<Partial<AdminPost>>(emptyPost);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["admin-posts"],
    queryFn: () => fetchPosts(),
  });

  const saveMutation = useMutation({
    mutationFn: () =>
      save({
        data: {
          ...(draft.id ? { id: draft.id } : {}),
          slug: draft.slug || draft.title || "",
          title: draft.title ?? "",
          excerpt: draft.excerpt ?? "",
          content: draft.content ?? "",
          cover_image: draft.cover_image ?? "",
          published: Boolean(draft.published),
        },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
      setDraft(emptyPost);
      toast.success("Post saved");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Couldn't save the post"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
      toast.success("Post deleted");
    },
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h2 className="text-xl font-bold">{draft.id ? "Edit post" : "New post"}</h2>
        <div className="mt-4 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={draft.title ?? ""}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="slug">URL slug (leave blank to use the title)</Label>
            <Input
              id="slug"
              value={draft.slug ?? ""}
              onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="excerpt">Short summary</Label>
            <Textarea
              id="excerpt"
              rows={2}
              value={draft.excerpt ?? ""}
              onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">Content (use ## for headings)</Label>
            <Textarea
              id="content"
              rows={12}
              value={draft.content ?? ""}
              onChange={(e) => setDraft({ ...draft, content: e.target.value })}
            />
          </div>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={Boolean(draft.published)}
              onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
            />
            Published
          </label>
          <div className="flex gap-2">
            <Button variant="gold" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
              {saveMutation.isPending ? "Saving…" : "Save post"}
            </Button>
            {draft.id && (
              <Button variant="outline" onClick={() => setDraft(emptyPost)}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {isLoading && <p className="text-muted-foreground">Loading posts…</p>}
        {posts.map((post) => (
          <div key={post.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="font-semibold">{post.title}</p>
            <p className="text-xs text-muted-foreground">
              /{post.slug} · {post.published ? "Published" : "Draft"}
            </p>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setDraft(post)}>
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => deleteMutation.mutate(post.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
