-- APNA KISAN V2.5: INITIAL SCHEMA MIGRATION
-- This script sets up the core tables, relationships, and security policies.

-- ----------------------------------------
-- 1. HELPER FUNCTIONS
-- ----------------------------------------

-- Helper function to check if a user is an admin. To be used in RLS policies.
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = user_id AND profiles.role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;


-- ----------------------------------------
-- 2. PROFILES & USER MANAGEMENT
-- ----------------------------------------

-- Create the profiles table to store public-facing user data and app-specific attributes.
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  bio text,
  location text,
  reputation_points integer NOT NULL DEFAULT 0,
  is_verified boolean NOT NULL DEFAULT false,
  role text NOT NULL DEFAULT 'user'
);

-- Add comments for clarity.
COMMENT ON TABLE public.profiles IS 'Stores public user profile information and application-specific data like reputation and roles.';
COMMENT ON COLUMN public.profiles.id IS 'References the user ID from Supabase Auth.';
COMMENT ON COLUMN public.profiles.reputation_points IS 'Gamified score for user contributions.';
COMMENT ON COLUMN public.profiles.is_verified IS 'Flag for users who have completed document verification.';
COMMENT ON COLUMN public.profiles.role IS 'Application-level role (e.g., user, admin).';

-- Automation: Function to create a new profile entry when a user signs up.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, username)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    -- Attempt to use a username from raw_user_meta_data, otherwise generate a random one.
    COALESCE(new.raw_user_meta_data->>'user_name', 'user' || substr(replace(gen_random_uuid()::text, '-', ''), 0, 10))
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to execute the function after a new user is inserted into auth.users.
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- ----------------------------------------
-- 3. KNOWLEDGE HUB TABLES
-- ----------------------------------------

-- Questions table
CREATE TABLE public.questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text,
  slug text UNIQUE NOT NULL, -- SEO-friendly URL part
  created_at timestamptz NOT NULL DEFAULT now()
);
COMMENT ON TABLE public.questions IS 'The core table for user-submitted questions in the Knowledge Hub.';

-- Answers table
CREATE TABLE public.answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  body text NOT NULL,
  is_best_answer boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
COMMENT ON TABLE public.answers IS 'Stores answers provided by users for the questions.';

-- Answer Votes table
CREATE TABLE public.answer_votes (
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  answer_id uuid NOT NULL REFERENCES public.answers(id) ON DELETE CASCADE,
  vote_type text NOT NULL CHECK (vote_type IN ('up', 'down')),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, answer_id) -- Composite key prevents a user from voting twice on the same answer.
);
COMMENT ON TABLE public.answer_votes IS 'Tracks upvotes and downvotes on answers. Enforces one vote per user per answer.';


-- ----------------------------------------
-- 4. GUEST & ADMIN WORKFLOW TABLES
-- ----------------------------------------

-- Community Questions table for guest submissions
CREATE TABLE public.community_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text,
  guest_mobile text,
  guest_state text,
  category text,
  question_text text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT now()
);
COMMENT ON TABLE public.community_questions IS 'Ingestion table for questions from non-logged-in users, pending admin approval.';

-- Verification Requests table for the document verification hub
CREATE TABLE public.verification_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  document_type text NOT NULL,
  document_url text NOT NULL, -- URL to the file in a private Supabase Storage bucket.
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT now(),
  reviewed_at timestamptz,
  reviewer_notes text
);
COMMENT ON TABLE public.verification_requests IS 'Manages the workflow for farmer document verification.';


-- ----------------------------------------
-- 5. ROW LEVEL SECURITY (RLS)
-- ----------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answer_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;

-- Profiles RLS
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins can manage all profiles." ON public.profiles FOR ALL USING (public.is_admin(auth.uid()));

-- Questions RLS
CREATE POLICY "Questions are viewable by everyone." ON public.questions FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert questions." ON public.questions FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update and delete their own questions." ON public.questions FOR (UPDATE, DELETE) USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all questions." ON public.questions FOR ALL USING (public.is_admin(auth.uid()));

-- Answers RLS
CREATE POLICY "Answers are viewable by everyone." ON public.answers FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert answers." ON public.answers FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update and delete their own answers." ON public.answers FOR (UPDATE, DELETE) USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all answers." ON public.answers FOR ALL USING (public.is_admin(auth.uid()));

-- Answer Votes RLS
CREATE POLICY "Answer votes are viewable by everyone." ON public.answer_votes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert and modify their own votes." ON public.answer_votes FOR (INSERT, UPDATE, DELETE) USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all votes." ON public.answer_votes FOR ALL USING (public.is_admin(auth.uid()));

-- Community Questions RLS (Guests cannot write directly; this is for admins)
CREATE POLICY "Approved community questions are public." ON public.community_questions FOR SELECT USING (status = 'approved');
CREATE POLICY "Admins can manage community questions." ON public.community_questions FOR ALL USING (public.is_admin(auth.uid()));

-- Verification Requests RLS (Highly restricted)
CREATE POLICY "Users can view and create their own verification requests." ON public.verification_requests FOR (SELECT, INSERT) USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all verification requests." ON public.verification_requests FOR ALL USING (public.is_admin(auth.uid()));


-- ----------------------------------------
-- 6. STORAGE BUCKETS
-- ----------------------------------------

-- Insert storage buckets into the storage schema.
-- Note: Bucket creation is often handled via the Supabase UI, but can be scripted.
-- This is illustrative. RLS policies on storage objects are critical.

-- Bucket for public avatars.
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT (id) DO NOTHING;

-- Bucket for private verification documents.
INSERT INTO storage.buckets (id, name, public) VALUES ('verification-docs', 'verification-docs', false) ON CONFLICT (id) DO NOTHING;

-- Storage RLS policies need to be created separately in the Supabase Dashboard
-- Example Policy for Avatars (on storage.objects):
-- Allow public read access: `FOR SELECT USING ( bucket_id = 'avatars' )`
-- Allow authenticated users to upload their own avatar: `FOR INSERT WITH CHECK ( bucket_id = 'avatars' AND auth.uid() = owner )`

-- Example Policy for Verification Docs (on storage.objects):
-- Deny all public access.
-- Allow users to upload to their own folder: `FOR INSERT WITH CHECK ( bucket_id = 'verification-docs' AND auth.uid() = owner )`
-- Allow admins to read all documents: `FOR SELECT USING ( bucket_id = 'verification-docs' AND public.is_admin(auth.uid()) )`

