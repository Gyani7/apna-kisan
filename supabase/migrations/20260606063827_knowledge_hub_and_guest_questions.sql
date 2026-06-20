-- APNA KISAN V2.5 - Knowledge Hub & Public Community Migration
-- Target: Supabase / PostgreSQL
-- This script is now idempotent and can be re-run safely.

-- 0. CLEANUP PREVIOUS FAILED MIGRATIONS
DROP TABLE IF EXISTS public.questions CASCADE;
DROP TABLE IF EXISTS public.answers CASCADE;
DROP TABLE IF EXISTS public.answer_votes CASCADE;
DROP TABLE IF EXISTS public.community_questions CASCADE;
DROP FUNCTION IF EXISTS public.update_updated_at_column();

-- 1. Create Questions Table
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Answers Table
CREATE TABLE IF NOT EXISTS public.answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_best_answer BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Answer Votes Table (Upvotes/Downvotes)
CREATE TABLE IF NOT EXISTS public.answer_votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    answer_id UUID NOT NULL REFERENCES public.answers(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    vote_type SMALLINT NOT NULL CHECK (vote_type IN (-1, 1)),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(answer_id, user_id)
);

-- 4. Create Community Questions Table (Guest Submissions)
CREATE TABLE IF NOT EXISTS public.community_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    mobile TEXT,
    state TEXT NOT NULL,
    category TEXT NOT NULL,
    question TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Add status column to questions table if it doesn't exist
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('pending', 'published', 'archived'));

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answer_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_questions ENABLE ROW LEVEL SECURITY;

-- Questions RLS
CREATE POLICY "Anyone can view published questions" 
ON public.questions FOR SELECT 
USING (status = 'published');

CREATE POLICY "Authenticated users can create questions" 
ON public.questions FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own questions" 
ON public.questions FOR UPDATE 
USING (auth.uid() = author_id);

-- Answers RLS
CREATE POLICY "Anyone can view answers" 
ON public.answers FOR SELECT 
USING (TRUE);

CREATE POLICY "Authenticated users can post answers" 
ON public.answers FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Votes RLS
CREATE POLICY "Anyone can view votes" 
ON public.answer_votes FOR SELECT 
USING (TRUE);

CREATE POLICY "Authenticated users can vote" 
ON public.answer_votes FOR ALL 
USING (auth.uid() = user_id);

-- Community Questions RLS (Public Submission)
CREATE POLICY "Anyone can submit guest questions" 
ON public.community_questions FOR INSERT 
WITH CHECK (TRUE);

CREATE POLICY "Only admins can view/manage guest questions" 
ON public.community_questions FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 7. Performance & SEO Indexing
CREATE INDEX idx_questions_slug ON public.questions(slug);
CREATE INDEX idx_questions_status ON public.questions(status);
CREATE INDEX idx_answers_question_id ON public.answers(question_id);
CREATE INDEX idx_community_questions_status ON public.community_questions(status);

-- Update timestamp trigger for questions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_questions_modtime
    BEFORE UPDATE ON public.questions
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();