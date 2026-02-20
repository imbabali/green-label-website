-- ============================================================================
-- Green Label Services - Initial Database Schema
-- Migration: 001_initial_schema.sql
-- ============================================================================

-- ============================================================================
-- TABLES
-- ============================================================================

-- profiles: extends Supabase Auth users
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  bio TEXT,
  date_of_birth DATE,
  phone TEXT,
  photo_url TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- comments: threaded blog comments
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_slug TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT,
  content TEXT NOT NULL CHECK (char_length(content) BETWEEN 10 AND 1000),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'spam')),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_comments_post_status_created ON comments (post_slug, status, created_at);
CREATE INDEX idx_comments_parent_created ON comments (parent_id, created_at);

-- newsletter_subscribers
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  is_active BOOLEAN DEFAULT true,
  frequency TEXT DEFAULT 'W' CHECK (frequency IN ('D', 'W', 'M')),
  unsubscribe_token UUID DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- contact_submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 20 AND 2000),
  location TEXT,
  preferred_contact TEXT DEFAULT 'email',
  marketing_consent BOOLEAN DEFAULT false,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- quote_requests
CREATE TABLE quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service_type TEXT NOT NULL,
  location TEXT,
  frequency TEXT,
  estimated_volume TEXT,
  message TEXT NOT NULL,
  timeline TEXT,
  budget_range TEXT,
  marketing_consent BOOLEAN DEFAULT false,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- service_inquiries
CREATE TABLE service_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  location TEXT,
  preferred_contact TEXT DEFAULT 'email',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'converted', 'closed')),
  follow_up_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- job_applications
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_slug TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  resume_url TEXT NOT NULL,
  cover_letter TEXT,
  current_company TEXT,
  current_position TEXT,
  linkedin_profile TEXT,
  portfolio_url TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'shortlisted', 'interviewed', 'rejected', 'hired')),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_job_applications_job_created ON job_applications (job_slug, created_at);
CREATE INDEX idx_job_applications_email ON job_applications (email);

-- reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL,
  service_name TEXT NOT NULL,
  overall_rating INTEGER NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
  quality_rating INTEGER CHECK (quality_rating BETWEEN 1 AND 5),
  value_rating INTEGER CHECK (value_rating BETWEEN 1 AND 5),
  customer_service_rating INTEGER CHECK (customer_service_rating BETWEEN 1 AND 5),
  title TEXT NOT NULL,
  comment TEXT NOT NULL,
  would_recommend BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, service_type, service_name)
);

-- view_counts
CREATE TABLE view_counts (
  entity_type TEXT NOT NULL,
  entity_slug TEXT NOT NULL,
  count INTEGER DEFAULT 0,
  PRIMARY KEY (entity_type, entity_slug)
);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- increment_view_count: upserts and returns new count
CREATE OR REPLACE FUNCTION increment_view_count(p_entity_type TEXT, p_entity_slug TEXT)
RETURNS INTEGER
LANGUAGE sql
AS $$
  INSERT INTO view_counts (entity_type, entity_slug, count)
  VALUES (p_entity_type, p_entity_slug, 1)
  ON CONFLICT (entity_type, entity_slug)
  DO UPDATE SET count = view_counts.count + 1
  RETURNING count;
$$;

-- handle_new_user: creates a profile row when a new auth user is created
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, username)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'username', '')
  );
  RETURN NEW;
END;
$$;

-- handle_updated_at: sets updated_at = NOW() on row update
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Create profile on new auth user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Auto-update updated_at timestamps
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_newsletter_subscribers_updated_at
  BEFORE UPDATE ON newsletter_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_service_inquiries_updated_at
  BEFORE UPDATE ON service_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_job_applications_updated_at
  BEFORE UPDATE ON job_applications
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE view_counts ENABLE ROW LEVEL SECURITY;

-- profiles: public read, users update own
CREATE POLICY "Profiles are publicly readable"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- comments: public read where approved, anyone insert
CREATE POLICY "Approved comments are publicly readable"
  ON comments FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Anyone can insert comments"
  ON comments FOR INSERT
  WITH CHECK (true);

-- newsletter_subscribers: service_role only (no public access)
-- No policies = no public access. Only service_role key bypasses RLS.

-- contact_submissions: anyone insert, no public read
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- quote_requests: anyone insert, no public read
CREATE POLICY "Anyone can submit quote requests"
  ON quote_requests FOR INSERT
  WITH CHECK (true);

-- service_inquiries: anyone insert, no public read
CREATE POLICY "Anyone can submit service inquiries"
  ON service_inquiries FOR INSERT
  WITH CHECK (true);

-- job_applications: anyone insert, authenticated users view own (email match)
CREATE POLICY "Anyone can submit job applications"
  ON job_applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view own applications"
  ON job_applications FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- reviews: public read, authenticated insert, authenticated update/delete own
CREATE POLICY "Reviews are publicly readable"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = user_id);

-- view_counts: public read, anyone can call increment function
CREATE POLICY "View counts are publicly readable"
  ON view_counts FOR SELECT
  USING (true);

CREATE POLICY "View counts can be inserted via function"
  ON view_counts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "View counts can be updated via function"
  ON view_counts FOR UPDATE
  USING (true);

-- ============================================================================
-- STORAGE BUCKETS
-- ============================================================================

-- Note: Storage buckets must be created via Supabase Dashboard or API.
-- The following are reference configurations:
--
-- Bucket: resumes
--   - Public: false
--   - Max file size: 5MB (5242880 bytes)
--   - Allowed MIME types: application/pdf, application/msword,
--     application/vnd.openxmlformats-officedocument.wordprocessingml.document
--
-- Bucket: avatars
--   - Public: true
--   - Max file size: 2MB (2097152 bytes)
--   - Allowed MIME types: image/jpeg, image/png, image/webp, image/avif
--
-- Bucket: documents
--   - Public: false
--   - Max file size: 10MB (10485760 bytes)
--   - Allowed MIME types: application/pdf, application/msword,
--     application/vnd.openxmlformats-officedocument.wordprocessingml.document,
--     image/jpeg, image/png
