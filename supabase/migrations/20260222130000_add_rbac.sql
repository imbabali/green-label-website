-- Add role-based access control to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user';

-- Check constraint for valid roles
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check
  CHECK (role IN ('user', 'admin', 'moderator'));

-- Index for role lookups
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles (role);

-- Helper function to get current user's role
CREATE OR REPLACE FUNCTION auth.user_role()
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid()
$$;

-- Admin-only policies for submission tables
-- Admins can read all contact submissions
CREATE POLICY "Admins can read contact submissions" ON contact_submissions
  FOR SELECT
  USING (auth.user_role() IN ('admin', 'moderator'));

-- Admins can read all quote requests
CREATE POLICY "Admins can read quote requests" ON quote_requests
  FOR SELECT
  USING (auth.user_role() IN ('admin', 'moderator'));

-- Admins can read all service inquiries
CREATE POLICY "Admins can read service inquiries" ON service_inquiries
  FOR SELECT
  USING (auth.user_role() IN ('admin', 'moderator'));

-- Admins can update service inquiry status
CREATE POLICY "Admins can update service inquiries" ON service_inquiries
  FOR UPDATE
  USING (auth.user_role() IN ('admin', 'moderator'));

-- Admins can read all job applications
CREATE POLICY "Admins can read all job applications" ON job_applications
  FOR SELECT
  USING (auth.user_role() IN ('admin', 'moderator'));

-- Admins can update job application status
CREATE POLICY "Admins can update job applications" ON job_applications
  FOR UPDATE
  USING (auth.user_role() IN ('admin', 'moderator'));

-- Admins can moderate comments (update status)
CREATE POLICY "Admins can moderate comments" ON comments
  FOR UPDATE
  USING (auth.user_role() IN ('admin', 'moderator'));

-- Admins can delete comments
CREATE POLICY "Admins can delete comments" ON comments
  FOR DELETE
  USING (auth.user_role() = 'admin');

-- Admins can read all newsletter subscribers
CREATE POLICY "Admins can read subscribers" ON newsletter_subscribers
  FOR SELECT
  USING (auth.user_role() IN ('admin', 'moderator'));
