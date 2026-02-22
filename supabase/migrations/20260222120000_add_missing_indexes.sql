-- Add missing indexes for query performance on submission tables

-- service_inquiries: queried by service_slug + status, ordered by created_at
CREATE INDEX IF NOT EXISTS idx_service_inquiries_slug_status
  ON service_inquiries (service_slug, status);
CREATE INDEX IF NOT EXISTS idx_service_inquiries_status_created
  ON service_inquiries (status, created_at DESC);

-- quote_requests: queried by service_type, ordered by created_at
CREATE INDEX IF NOT EXISTS idx_quote_requests_service_created
  ON quote_requests (service_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_email
  ON quote_requests (email);

-- contact_submissions: ordered by created_at for admin views
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created
  ON contact_submissions (created_at DESC);

-- Fix job_applications RLS policy to use JWT claims instead of subquery
-- Drop the old inefficient policy that uses a subquery per row
DROP POLICY IF EXISTS "Users can view own applications" ON job_applications;

-- Create new policy using JWT email claim (no subquery needed)
CREATE POLICY "Users can view own applications" ON job_applications
  FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND email = (auth.jwt() ->> 'email')
  );
