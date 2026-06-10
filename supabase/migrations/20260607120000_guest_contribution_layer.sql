-- V2.4: GUEST CONTRIBUTION LAYER

-- 1. Add Guest-Specific Columns
-- These columns will store optional information for unauthenticated users.
ALTER TABLE community_questions ADD COLUMN IF NOT EXISTS guest_name TEXT;
ALTER TABLE community_questions ADD COLUMN IF NOT EXISTS guest_mobile TEXT;
ALTER TABLE answers ADD COLUMN IF NOT EXISTS guest_name TEXT;
ALTER TABLE answers ADD COLUMN IF NOT EXISTS guest_mobile TEXT;

-- 2. Refine RLS Policies for Guest and Authenticated Access

-- COMMUNITY QUESTIONS TABLE

-- First, remove the existing policies to avoid conflicts
DROP POLICY IF EXISTS "select_community_questions" ON community_questions;
DROP POLICY IF EXISTS "insert_community_questions" ON community_questions;

-- Policy: Public can only view 'approved' questions.
CREATE POLICY "select_approved_community_questions" ON community_questions
  FOR SELECT USING (status = 'approved');

-- Policy: Guests (anon role) can insert questions.
-- The question will be 'pending' by default, enforced by server-side logic.
CREATE POLICY "insert_guest_community_questions" ON community_questions
  FOR INSERT TO anon
  WITH CHECK (
    user_id IS NULL AND -- Guests must not provide a user_id
    char_length(question) BETWEEN 10 AND 500 AND
    (guest_name IS NULL OR char_length(guest_name) BETWEEN 2 AND 50)
  );

-- Policy: Authenticated users can insert questions.
CREATE POLICY "insert_auth_community_questions" ON community_questions
  FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid() AND
    char_length(question) BETWEEN 10 AND 500
  );

-- ANSWERS TABLE

-- Remove existing policies
DROP POLICY IF EXISTS "select_answers" ON answers;
DROP POLICY IF EXISTS "insert_answers" ON answers;

-- Policy: Public can only view 'approved' answers.
CREATE POLICY "select_approved_answers" ON answers
  FOR SELECT USING (status = 'approved');

-- Policy: Guests (anon role) can insert answers.
CREATE POLICY "insert_guest_answers" ON answers
  FOR INSERT TO anon
  WITH CHECK (
    user_id IS NULL AND
    char_length(content) BETWEEN 10 AND 2000 AND
    (guest_name IS NULL OR char_length(guest_name) BETWEEN 2 AND 50)
  );

-- Policy: Authenticated users can insert answers.
CREATE POLICY "insert_auth_answers" ON answers
  FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid() AND
    char_length(content) BETWEEN 10 AND 2000
  );

-- 3. Admin Full Access Policies
-- Assuming an is_admin() function that checks for an admin role.

DROP POLICY IF EXISTS "admin_all_access_questions" ON community_questions;
CREATE POLICY "admin_all_access_questions" ON community_questions
  FOR ALL USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

DROP POLICY IF EXISTS "admin_all_access_answers" ON answers;
CREATE POLICY "admin_all_access_answers" ON answers
  FOR ALL USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));
