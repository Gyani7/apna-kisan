-- 1. Extend Profiles Table with Role and Reputation
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('user', 'admin');
    END IF;
END $$;

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'user',
ADD COLUMN IF NOT EXISTS reputation_points INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS farmer_level TEXT DEFAULT 'Seed Farmer';

-- 2. Create Verification Requests Table
CREATE TABLE IF NOT EXISTS public.verification_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    document_type TEXT NOT NULL, -- 'Aadhaar', 'Farmer Card', 'KCC Card'
    document_url TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Function to Calculate Farmer Level based on Points
CREATE OR REPLACE FUNCTION public.calculate_farmer_level(points INTEGER)
RETURNS TEXT AS $$
BEGIN
    IF points >= 5001 THEN RETURN 'Kisan Guru';
    ELSIF points >= 2001 THEN RETURN 'Master Farmer';
    ELSIF points >= 501 THEN RETURN 'Expert Farmer';
    ELSIF points >= 101 THEN RETURN 'Progressive Farmer';
    ELSE RETURN 'Seed Farmer';
    END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Trigger to auto-update farmer_level when reputation_points change
CREATE OR REPLACE FUNCTION public.update_farmer_level_on_points_change()
RETURNS TRIGGER AS $$
BEGIN
    NEW.farmer_level := public.calculate_farmer_level(NEW.reputation_points);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_update_farmer_level
BEFORE UPDATE OF reputation_points ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_farmer_level_on_points_change();

-- 4. Reputation Management Function
CREATE OR REPLACE FUNCTION public.increment_reputation(target_user_id UUID, points_to_add INTEGER)
RETURNS VOID AS $$
BEGIN
    UPDATE public.profiles
    SET reputation_points = reputation_points + points_to_add
    WHERE id = target_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile fields" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (
    auth.uid() = id 
    AND (role = (SELECT role FROM public.profiles WHERE id = auth.uid())) -- Prevent role escalation
    AND (reputation_points = (SELECT reputation_points FROM public.profiles WHERE id = auth.uid())) -- Prevent points self-update
);

-- Verification Requests Policies
CREATE POLICY "Users can view own verification status" 
ON public.verification_requests FOR SELECT 
USING (auth.uid() = user_id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Users can submit own verification" 
ON public.verification_requests FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins have full control over verifications" 
ON public.verification_requests FOR ALL 
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 6. Trigger for is_verified sync
CREATE OR REPLACE FUNCTION public.sync_verification_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'approved' THEN
        UPDATE public.profiles SET is_verified = true WHERE id = NEW.user_id;
    ELSIF NEW.status = 'rejected' THEN
        UPDATE public.profiles SET is_verified = false WHERE id = NEW.user_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER tr_sync_verification
AFTER UPDATE OF status ON public.verification_requests
FOR EACH ROW EXECUTE FUNCTION public.sync_verification_status();