-- Drop tables if they exist
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS conversation_participants;
DROP TABLE IF EXISTS conversations;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS profiles;

-- Create profiles table
CREATE TABLE profiles (
  id uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
  username TEXT UNIQUE,
  role TEXT,
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Create posts table
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id uuid REFERENCES profiles,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  farmer_id uuid REFERENCES profiles,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  unit TEXT,
  category TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create conversations table
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create conversation_participants table
CREATE TABLE conversation_participants (
  conversation_id INTEGER REFERENCES conversations,
  user_id uuid REFERENCES profiles,
  PRIMARY KEY (conversation_id, user_id)
);

-- Create messages table
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  conversation_id INTEGER REFERENCES conversations,
  sender_id uuid REFERENCES profiles,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- RLS policies for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- RLS policies for posts
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Posts are viewable by everyone." ON posts FOR SELECT USING (true);
CREATE POLICY "Users can create posts." ON posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own posts." ON posts FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are viewable by everyone." ON products FOR SELECT USING (true);
CREATE POLICY "Farmers can create products." ON products FOR INSERT WITH CHECK (auth.uid() = farmer_id AND (SELECT role FROM profiles WHERE id = auth.uid()) = 'farmer');
CREATE POLICY "Farmers can update their own products." ON products FOR UPDATE USING (auth.uid() = farmer_id);
CREATE POLICY "Farmers can delete their own products." ON products FOR DELETE USING (auth.uid() = farmer_id);

-- RLS policies for conversations
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view conversations they are a part of." ON conversations FOR SELECT USING (id IN (SELECT conversation_id FROM conversation_participants WHERE user_id = auth.uid()));
CREATE POLICY "Users can create conversations." ON conversations FOR INSERT WITH CHECK (true);

-- RLS policies for conversation_participants
ALTER TABLE conversation_participants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view participants of conversations they are a part of." ON conversation_participants FOR SELECT USING (conversation_id IN (SELECT conversation_id FROM conversation_participants WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert themselves into a conversation." ON conversation_participants FOR INSERT WITH CHECK (user_id = auth.uid());


-- RLS policies for messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view messages in conversations they are a part of." ON messages FOR SELECT USING (conversation_id IN (SELECT conversation_id FROM conversation_participants WHERE user_id = auth.uid()));
CREATE POLICY "Users can send messages in conversations they are a part of." ON messages FOR INSERT WITH CHECK (sender_id = auth.uid() AND conversation_id IN (SELECT conversation_id FROM conversation_participants WHERE user_id = auth.uid()));

-- Function to get conversation between two users
CREATE OR REPLACE FUNCTION get_conversation_between_users(user_id_1 uuid, user_id_2 uuid)
RETURNS TABLE(conversation_id integer) AS $$
BEGIN
  RETURN QUERY
  SELECT cp1.conversation_id
  FROM conversation_participants cp1
  JOIN conversation_participants cp2 ON cp1.conversation_id = cp2.conversation_id
  WHERE cp1.user_id = user_id_1 AND cp2.user_id = user_id_2;
END;
$$ LANGUAGE plpgsql;
