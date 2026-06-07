-- Add new columns to existing tables
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS cover_url text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS reputation integer DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS badge text DEFAULT 'New Kisan';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS posts_count integer DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS followers_count integer DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS following_count integer DEFAULT 0;

-- Add new columns to posts
ALTER TABLE posts ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS post_type text DEFAULT 'discussion' CHECK (post_type IN ('discussion', 'question', 'story', 'update'));
ALTER TABLE posts ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';
ALTER TABLE posts ADD COLUMN IF NOT EXISTS shares_count integer DEFAULT 0;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS excerpt text;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS read_time integer;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;

-- Add unique constraint on post slug
CREATE UNIQUE INDEX IF NOT EXISTS posts_slug_key ON posts(slug);

-- Create followers table
CREATE TABLE followers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  following_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(follower_id, following_id)
);

-- Create bookmarks table
CREATE TABLE bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- Create notifications table
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  actor_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('like', 'comment', 'follow', 'mention', 'answer')),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create stories table (ephemeral content, auto-deleted after 24h)
CREATE TABLE stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  media_url text NOT NULL,
  media_type text DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
  created_at timestamptz DEFAULT now()
);

-- Create story_views table
CREATE TABLE story_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id uuid NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(story_id, user_id)
);

-- Create reels table
CREATE TABLE reels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  video_url text NOT NULL,
  thumbnail_url text,
  caption text,
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create mandi_rates table
CREATE TABLE mandi_rates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  commodity text NOT NULL,
  mandi text NOT NULL,
  state text NOT NULL,
  price integer NOT NULL,
  change_percent numeric(5,2) DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Create farming_tips table
CREATE TABLE farming_tips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon_name text DEFAULT 'Leaf',
  color_class text DEFAULT 'text-green-600 bg-green-50',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE reels ENABLE ROW LEVEL SECURITY;
ALTER TABLE mandi_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE farming_tips ENABLE ROW LEVEL SECURITY;

-- RLS Policies for followers
CREATE POLICY "select_followers" ON followers FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_own_follow" ON followers FOR INSERT TO authenticated WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "delete_own_follow" ON followers FOR DELETE TO authenticated USING (auth.uid() = follower_id);

-- RLS Policies for bookmarks
CREATE POLICY "select_own_bookmarks" ON bookmarks FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_bookmark" ON bookmarks FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own_bookmark" ON bookmarks FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for notifications
CREATE POLICY "select_own_notifications" ON notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_notification" ON notifications FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_own_notification" ON notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for stories (any authenticated can view, own user can insert)
CREATE POLICY "select_stories" ON stories FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_own_story" ON stories FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own_story" ON stories FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for story_views
CREATE POLICY "select_story_views" ON story_views FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_own_story_view" ON story_views FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- RLS Policies for reels
CREATE POLICY "select_reels" ON reels FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_own_reel" ON reels FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_reel" ON reels FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "delete_own_reel" ON reels FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for mandi_rates (public read, no public write)
CREATE POLICY "select_mandi_rates" ON mandi_rates FOR SELECT TO authenticated USING (true);

-- RLS Policies for farming_tips (public read)
CREATE POLICY "select_farming_tips" ON farming_tips FOR SELECT TO authenticated USING (true);

-- Update posts RLS policies (already has RLS, need to update for community model)
-- Remove old policies if they exist and add new ones
CREATE POLICY "select_posts_public" ON posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_own_post" ON posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_post" ON posts FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "delete_own_post" ON posts FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Update likes RLS policies
CREATE POLICY "select_likes" ON likes FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_own_like" ON likes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own_like" ON likes FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Update comments RLS policies
CREATE POLICY "select_comments" ON comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_own_comment" ON comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_comment" ON comments FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "delete_own_comment" ON comments FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Update profiles RLS policies
CREATE POLICY "select_profiles" ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_post_type ON posts(post_type);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_likes_post_id ON likes(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id) WHERE is_read = false;
CREATE INDEX IF NOT EXISTS idx_followers_following_id ON followers(following_id);
CREATE INDEX IF NOT EXISTS idx_stories_user_id ON stories(user_id);
CREATE INDEX IF NOT EXISTS idx_reels_created_at ON reels(created_at DESC);

-- Function to auto-delete stories older than 24 hours
CREATE OR REPLACE FUNCTION delete_old_stories() RETURNS void AS $$
BEGIN
  DELETE FROM stories WHERE created_at < now() - interval '24 hours';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment post likes_count
CREATE OR REPLACE FUNCTION increment_likes() RETURNS trigger AS $$
BEGIN
  UPDATE posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrement post likes_count
CREATE OR REPLACE FUNCTION decrement_likes() RETURNS trigger AS $$
BEGIN
  UPDATE posts SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.post_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment post comments_count
CREATE OR REPLACE FUNCTION increment_comments() RETURNS trigger AS $$
BEGIN
  UPDATE posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrement post comments_count
CREATE OR REPLACE FUNCTION decrement_comments() RETURNS trigger AS $$
BEGIN
  UPDATE posts SET comments_count = GREATEST(comments_count - 1, 0) WHERE id = OLD.post_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers for likes count
DROP TRIGGER IF EXISTS on_like_insert ON likes;
CREATE TRIGGER on_like_insert AFTER INSERT ON likes FOR EACH ROW EXECUTE FUNCTION increment_likes();

DROP TRIGGER IF EXISTS on_like_delete ON likes;
CREATE TRIGGER on_like_delete AFTER DELETE ON likes FOR EACH ROW EXECUTE FUNCTION decrement_likes();

-- Triggers for comments count
DROP TRIGGER IF EXISTS on_comment_insert ON comments;
CREATE TRIGGER on_comment_insert AFTER INSERT ON comments FOR EACH ROW EXECUTE FUNCTION increment_comments();

DROP TRIGGER IF EXISTS on_comment_delete ON comments;
CREATE TRIGGER on_comment_delete AFTER DELETE ON comments FOR EACH ROW EXECUTE FUNCTION decrement_comments();

-- Function to update profile posts_count
CREATE OR REPLACE FUNCTION update_profile_posts_count() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE profiles SET posts_count = posts_count + 1 WHERE id = NEW.user_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE profiles SET posts_count = GREATEST(posts_count - 1, 0) WHERE id = OLD.user_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_post_change ON posts;
CREATE TRIGGER on_post_change AFTER INSERT OR DELETE ON posts FOR EACH ROW EXECUTE FUNCTION update_profile_posts_count();

-- Function to update followers counts
CREATE OR REPLACE FUNCTION update_followers_count() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE profiles SET followers_count = followers_count + 1 WHERE id = NEW.following_id;
    UPDATE profiles SET following_count = following_count + 1 WHERE id = NEW.follower_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE profiles SET followers_count = GREATEST(followers_count - 1, 0) WHERE id = OLD.following_id;
    UPDATE profiles SET following_count = GREATEST(following_count - 1, 0) WHERE id = OLD.follower_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_follow_change ON followers;
CREATE TRIGGER on_follow_change AFTER INSERT OR DELETE ON followers FOR EACH ROW EXECUTE FUNCTION update_followers_count();

-- Function to handle new user signup (create profile)
CREATE OR REPLACE FUNCTION handle_new_user() RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'kisan_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Naya Kisan'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NULL)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Insert seed data for mandi_rates
INSERT INTO mandi_rates (commodity, mandi, state, price, change_percent) VALUES
  ('Wheat', 'Amritsar', 'Punjab', 2275, 2.0),
  ('Rice', 'Karnal', 'Haryana', 3186, -0.5),
  ('Cotton', 'Warangal', 'Telangana', 6820, 3.2),
  ('Sugarcane', 'Muzaffarnagar', 'UP', 350, 1.1),
  ('Mustard', 'Jaipur', 'Rajasthan', 5450, -1.2),
  ('Grapes', 'Nashik', 'Maharashtra', 4200, 0.8),
  ('Soybean', 'Indore', 'MP', 4600, 2.5),
  ('Groundnut', 'Rajkot', 'Gujarat', 5800, -0.3);

-- Insert seed data for farming_tips
INSERT INTO farming_tips (title, description, icon_name, color_class) VALUES
  ('Organic Khatad', 'Vermicompost se mitti ki quality 3x behtar hoti hai', 'Leaf', 'text-green-600 bg-green-50'),
  ('Mandi Bhav', 'Aaj Wheat ₹2,275/quintal — kal se 2% upar', 'TrendingUp', 'text-blue-600 bg-blue-50'),
  ('Pest Alert', 'Punjab mein Aphid attack ki sambhavna — sawdhan rahein', 'AlertCircle', 'text-orange-600 bg-orange-50'),
  ('Barish Alert', 'Agle 3 din mein moderate barish — seedai timely karein', 'CloudRain', 'text-sky-600 bg-sky-50');
