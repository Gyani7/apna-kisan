-- APNA KISAN V2.8: Enterprise Edge Video Layer
-- MIGRATION SCRIPT: Create tables and RPCs for reel interactions.
-- This script is now idempotent and can be re-run safely.

-- 0. CLEANUP PREVIOUS FAILED MIGRATIONS
DROP TABLE IF EXISTS public.reels CASCADE;
DROP TABLE IF EXISTS public.reel_likes CASCADE;
DROP TABLE IF EXISTS public.reel_comments CASCADE;
DROP FUNCTION IF EXISTS public.toggle_reel_like(UUID, UUID);
DROP FUNCTION IF EXISTS public.add_reel_comment(UUID, UUID, TEXT);

-- 1. Create the reels table
CREATE TABLE public.reels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  video_url text NOT NULL,
  thumbnail_url text,
  caption text,
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- 2. Create the reel_likes table
-- This table uses a composite primary key to natively prevent duplicate likes.
CREATE TABLE public.reel_likes (
  reel_id UUID NOT NULL REFERENCES public.reels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (reel_id, user_id)
);

-- Add indexes for faster lookups
CREATE INDEX idx_reel_likes_user_id ON public.reel_likes(user_id);

-- Add comments for clarity
COMMENT ON TABLE public.reel_likes IS 'Tracks user likes on individual reels. Composite PK ensures a user can only like a reel once.';


-- 3. Create the reel_comments table
-- Linked with foreign keys for data integrity and cascading deletes.
CREATE TABLE public.reel_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reel_id UUID NOT NULL REFERENCES public.reels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (char_length(content) > 0 AND char_length(content) <= 500),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add index for efficient querying of comments for a specific reel, sorted by creation time.
CREATE INDEX idx_reel_comments_reel_id_created_at ON public.reel_comments(reel_id, created_at DESC);

COMMENT ON TABLE public.reel_comments IS 'Stores comments made by users on reels.';


-- 4. Create RPC function to atomically toggle a like and update the count
-- This prevents race conditions and keeps the likes_count synchronized.
CREATE OR REPLACE FUNCTION toggle_reel_like(p_reel_id UUID, p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  is_liked BOOLEAN;
  new_likes_count INT;
BEGIN
  -- Check if the user has already liked the reel
  SELECT EXISTS (
    SELECT 1 FROM public.reel_likes WHERE reel_id = p_reel_id AND user_id = p_user_id
  ) INTO is_liked;

  IF is_liked THEN
    -- User has liked it, so unlike it (DELETE)
    DELETE FROM public.reel_likes WHERE reel_id = p_reel_id AND user_id = p_user_id;
    is_liked := FALSE;
  ELSE
    -- User has not liked it, so like it (INSERT)
    INSERT INTO public.reel_likes (reel_id, user_id) VALUES (p_reel_id, p_user_id);
    is_liked := TRUE;
  END IF;

  -- Atomically recalculate and update the likes_count on the parent reels table
  UPDATE public.reels
  SET likes_count = (SELECT COUNT(*) FROM public.reel_likes WHERE reel_id = p_reel_id)
  WHERE id = p_reel_id
  RETURNING likes_count INTO new_likes_count;

  -- Return the new state and count for optimistic UI updates
  RETURN jsonb_build_object('is_liked', is_liked, 'likes_count', new_likes_count);
END;
$$;

COMMENT ON FUNCTION toggle_reel_like(UUID, UUID) IS 'Atomically adds or removes a like from a reel and updates the total likes_count.';

-- 5. Create RPC function to atomically add a comment and update the count
CREATE OR REPLACE FUNCTION add_reel_comment(p_reel_id UUID, p_user_id UUID, p_content TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert the new comment
  INSERT INTO public.reel_comments (reel_id, user_id, content)
  VALUES (p_reel_id, p_user_id, p_content);

  -- Update the comments_count on the reels table
  UPDATE public.reels
  SET comments_count = comments_count + 1
  WHERE id = p_reel_id;
END;
$$;

COMMENT ON FUNCTION add_reel_comment(UUID, UUID, TEXT) IS 'Adds a comment to a reel and increments the comments_count.';
