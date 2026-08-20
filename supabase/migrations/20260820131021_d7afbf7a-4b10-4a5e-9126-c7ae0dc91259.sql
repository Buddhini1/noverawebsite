CREATE TYPE public.app_role AS ENUM ('admin','user');
CREATE TYPE public.lead_status AS ENUM ('new','contacted','in_progress','closed');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile write" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  destination TEXT,
  service TEXT,
  message TEXT,
  source TEXT NOT NULL DEFAULT 'website',
  status public.lead_status NOT NULL DEFAULT 'new',
  internal_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage leads" ON public.leads FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER leads_updated_at BEFORE UPDATE ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  author_name TEXT NOT NULL DEFAULT 'Novera International',
  tags TEXT[] NOT NULL DEFAULT '{}',
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public reads published posts" ON public.blog_posts FOR SELECT TO anon USING (published = true);
CREATE POLICY "authenticated reads published posts" ON public.blog_posts FOR SELECT TO authenticated USING (published = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins manage posts" ON public.blog_posts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.blog_posts (slug, title, excerpt, content, tags, published, published_at) VALUES
('uk-student-visa-checklist-2026','UK Student Visa Checklist for 2026 Intakes','Everything Sri Lankan students need to prepare before applying for a UK Student Route visa — documents, finances and timelines.',
'Applying for a UK Student Route visa is straightforward when your paperwork is in order from day one.

## 1. Secure your CAS
Your university issues a Confirmation of Acceptance for Studies (CAS) once you accept an offer and pay any required deposit. Nothing else can move forward without it.

## 2. Prove your finances
You must show tuition for the first year plus living costs (currently GBP 1,136 per month outside London, GBP 1,483 in London) held for 28 consecutive days.

## 3. English language evidence
Most universities accept IELTS UKVI, PTE Academic, or their own internal assessment. Check exactly which one your CAS lists.

## 4. Health and biometrics
Pay the Immigration Health Surcharge, book your biometrics appointment, and complete the TB test at an approved clinic.

## 5. Apply early
Applications can be submitted up to six months before your course starts. Aim for at least ten weeks ahead of your travel date.

Our counsellors review every document before submission so nothing is left to chance.', ARRAY['UK','Student Visa'], true, now() - interval '3 days'),
('australia-vs-new-zealand-study','Australia vs New Zealand: Which Is Right for You?','A side-by-side look at costs, work rights and post-study pathways in two of the most popular destinations for Sri Lankan students.',
'Both countries offer world-class education, generous work rights and a warm welcome to international students — but they suit different goals.

## Cost of study
Australian undergraduate degrees typically run AUD 20,000–45,000 a year. New Zealand sits slightly lower at NZD 22,000–35,000.

## Work while studying
Australia allows 48 hours per fortnight during term. New Zealand allows up to 20 hours per week, and full-time during scheduled breaks.

## After graduation
Australia''s Temporary Graduate visa gives 2–4 years depending on qualification and location. New Zealand''s Post Study Work visa offers up to 3 years for degree-level graduates.

## Lifestyle
Australia has larger cities and bigger job markets. New Zealand offers a quieter pace, smaller class sizes and easier access to nature.

Talk to us about your budget and long-term plans, and we will map both options honestly.', ARRAY['Australia','New Zealand'], true, now() - interval '10 days'),
('5-mistakes-visa-applications','5 Mistakes That Get Visa Applications Refused','Refusals are rarely about luck. These five avoidable errors account for most of the rejections we see.',
'A refusal costs time, money and momentum. Here is what we watch for in every file we prepare.

## 1. Inconsistent financial history
Large unexplained deposits raise questions. Funds should be seasoned and traceable to a clear source.

## 2. A weak statement of purpose
Generic essays fail. Your statement must connect your past study, chosen course and future plans in Sri Lanka.

## 3. Missing translations
Any document not in English needs a certified translation submitted alongside the original.

## 4. Course choice that does not match your background
A sharp change of field without justification is one of the most common grounds for refusal.

## 5. Applying too late
Rushed applications produce incomplete files. Start at least three months before your intake.

Every application we handle goes through a full document audit before submission.', ARRAY['Visa Tips'], true, now() - interval '20 days');