-- This script is now idempotent and can be re-run safely.

-- Create reel_likes table
CREATE TABLE IF NOT EXISTS reel_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reel_id uuid NOT NULL REFERENCES reels(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, reel_id)
);

-- Create reel_comments table
CREATE TABLE IF NOT EXISTS reel_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reel_id uuid NOT NULL REFERENCES reels(id) ON DELETE CASCADE,
  comment text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS for new tables
ALTER TABLE reel_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reel_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for reel_likes
DROP POLICY IF EXISTS "select_reel_likes" ON reel_likes;
CREATE POLICY "select_reel_likes" ON reel_likes FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_own_reel_like" ON reel_likes;
CREATE POLICY "insert_own_reel_like" ON reel_likes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_reel_like" ON reel_likes;
CREATE POLICY "delete_own_reel_like" ON reel_likes FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for reel_comments
DROP POLICY IF EXISTS "select_reel_comments" ON reel_comments;
CREATE POLICY "select_reel_comments" ON reel_comments FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_own_reel_comment" ON reel_comments;
CREATE POLICY "insert_own_reel_comment" ON reel_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_reel_comment" ON reel_comments;
CREATE POLICY "update_own_reel_comment" ON reel_comments FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_reel_comment" ON reel_comments;
CREATE POLICY "delete_own_reel_comment" ON reel_comments FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Function to increment reel likes_count (idempotent)
CREATE OR REPLACE FUNCTION increment_reel_likes() RETURNS trigger AS $$
BEGIN
  UPDATE reels SET likes_count = likes_count + 1 WHERE id = NEW.reel_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrement reel likes_count (idempotent)
CREATE OR REPLACE FUNCTION decrement_reel_likes() RETURNS trigger AS $$
BEGIN
  UPDATE reels SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.reel_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment reel comments_count (idempotent)
CREATE OR REPLACE FUNCTION increment_reel_comments() RETURNS trigger AS $$
BEGIN
  UPDATE reels SET comments_count = comments_count + 1 WHERE id = NEW.reel_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrement reel comments_count (idempotent)
CREATE OR REPLACE FUNCTION decrement_reel_comments() RETURNS trigger AS $$
BEGIN
  UPDATE reels SET comments_count = GREATEST(comments_count - 1, 0) WHERE id = OLD.reel_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers for reel likes count
DROP TRIGGER IF EXISTS on_reel_like_insert ON reel_likes;
CREATE TRIGGER on_reel_like_insert AFTER INSERT ON reel_likes FOR EACH ROW EXECUTE FUNCTION increment_reel_likes();

DROP TRIGGER IF EXISTS on_reel_like_delete ON reel_likes;
CREATE TRIGGER on_reel_like_delete AFTER DELETE ON reel_likes FOR EACH ROW EXECUTE FUNCTION decrement_reel_likes();

-- Triggers for reel comments count
DROP TRIGGER IF EXISTS on_reel_comment_insert ON reel_comments;
CREATE TRIGGER on_reel_comment_insert AFTER INSERT ON reel_comments FOR EACH ROW EXECUTE FUNCTION increment_reel_comments();

DROP TRIGGER IF EXISTS on_reel_comment_delete ON reel_comments;
CREATE TRIGGER on_reel_comment_delete AFTER DELETE ON reel_comments FOR EACH ROW EXECUTE FUNCTION decrement_reel_comments();
