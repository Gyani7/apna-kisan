-- V2.4: GUEST CONTRIBUTION LAYER
-- This script has been corrected to align with the existing database schema.

-- 1. Add Guest-Specific Columns & Modify Tables for Guest Contributions
ALTER TABLE public.community_questions ADD COLUMN IF NOT EXISTS guest_name TEXT;
ALTER TABLE public.community_questions ADD COLUMN IF NOT EXISTS guest_mobile TEXT;
ALTER TABLE public.answers ADD COLUMN IF NOT EXISTS guest_name TEXT;
ALTER TABLE public.answers ADD COLUMN IF NOT EXISTS guest_mobile TEXT;

-- Allow answers to be posted without a registered user (for guests)
ALTER TABLE public.answers ALTER COLUMN author_id DROP NOT NULL;

-- Add a status column to answers for moderation workflow
ALTER TABLE public.answers ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));


-- 2. Refine RLS Policies for Guest and Authenticated Access

-- COMMUNITY QUESTIONS TABLE
-- First, remove the existing policies to avoid conflicts
DROP POLICY IF EXISTS "select_community_questions" ON public.community_questions;
DROP POLICY IF EXISTS "insert_community_questions" ON public.community_questions;
DROP POLICY IF EXISTS "select_approved_community_questions" ON public.community_questions;
DROP POLICY IF EXISTS "insert_guest_community_questions" ON public.community_questions;
DROP POLICY IF EXISTS "insert_auth_community_questions" ON public.community_questions;


-- Policy: Public can only view 'approved' questions.
CREATE POLICY "select_approved_community_questions" ON public.community_questions
  FOR SELECT USING (status = 'approved');

-- Policy: Guests (anon role) can insert questions.
-- The question will be 'pending' by default from the table DDL.
CREATE POLICY "insert_guest_community_questions" ON public.community_questions
  FOR INSERT TO anon
  WITH CHECK (
    char_length(question) BETWEEN 10 AND 500 AND
    (guest_name IS NULL OR char_length(guest_name) BETWEEN 2 AND 50)
  );

-- ANSWERS TABLE
-- Remove existing policies
DROP POLICY IF EXISTS "select_answers" ON public.answers;
DROP POLICY IF EXISTS "insert_answers" ON public.answers;
DROP POLICY IF EXISTS "select_approved_answers" ON public.answers;
DROP POLICY IF EXISTS "insert_guest_answers" ON public.answers;
DROP POLICY IF EXISTS "insert_auth_answers" ON public.answers;


-- Policy: Public can only view 'approved' answers.
CREATE POLICY "select_approved_answers" ON public.answers
  FOR SELECT USING (status = 'approved');

-- Policy: Guests (anon role) can insert answers.
CREATE POLICY "insert_guest_answers" ON public.answers
  FOR INSERT TO anon
  WITH CHECK (
    author_id IS NULL AND -- Enforce that guests cannot specify an author
    char_length(content) BETWEEN 10 AND 2000 AND
    (guest_name IS NULL OR char_length(guest_name) BETWEEN 2 AND 50)
  );

-- Policy: Authenticated users can insert answers.
CREATE POLICY "insert_auth_answers" ON public.answers
  FOR INSERT TO authenticated
  WITH CHECK (
    author_id = auth.uid() AND
    char_length(content) BETWEEN 10 AND 2000
  );

-- 3. Admin Full Access Policies
-- Assuming a public.is_admin() function that checks for an admin role.

DROP POLICY IF EXISTS "admin_all_access_questions" ON public.community_questions;
CREATE POLICY "admin_all_access_questions" ON public.community_questions
  FOR ALL USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "admin_all_access_answers" ON public.answers;
CREATE POLICY "admin_all_access_answers" ON public.answers
  FOR ALL USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));
