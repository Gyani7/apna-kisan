-- APNA KISAN V2.3: VILLAGE DIRECTORY LAYER SCHEMA
-- This script establishes the hyper-local directory, linking farmers to villages and villages to markets.

-- ----------------------------------------
-- 1. GEOGRAPHIC HIERARCHY TABLES
-- ----------------------------------------

CREATE TABLE public.states (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE
);
COMMENT ON TABLE public.states IS 'Master table for Indian states.';

CREATE TABLE public.districts (
    id SERIAL PRIMARY KEY,
    state_id INT NOT NULL REFERENCES public.states(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    UNIQUE(state_id, name)
);
COMMENT ON TABLE public.districts IS 'Master table for districts, linked to states.';

CREATE TABLE public.blocks (
    id SERIAL PRIMARY KEY,
    district_id INT NOT NULL REFERENCES public.districts(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    UNIQUE(district_id, name)
);
COMMENT ON TABLE public.blocks IS 'Master table for blocks/tehsils, linked to districts.';

-- ----------------------------------------
-- 2. VILLAGE & MANDI MASTER TABLES
-- ----------------------------------------

CREATE TABLE public.villages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    block_id INT NOT NULL REFERENCES public.blocks(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    primary_crops TEXT[] DEFAULT '{}', -- Array of major crops
    nearby_mandi_id UUID, -- To be linked below
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(block_id, name)
);
COMMENT ON TABLE public.villages IS 'Core table for all village profiles and their static data.';

CREATE TABLE public.mandis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    district_id INT NOT NULL REFERENCES public.districts(id) ON DELETE CASCADE
);
COMMENT ON TABLE public.mandis IS 'Master list of Agricultural Produce Market Committees (APMCs).';

-- Add the foreign key constraint from villages to mandis now that mandis table exists.
ALTER TABLE public.villages
ADD CONSTRAINT fk_nearby_mandi
FOREIGN KEY (nearby_mandi_id) REFERENCES public.mandis(id);

CREATE TABLE public.mandi_rates (
    id BIGSERIAL PRIMARY KEY,
    mandi_id UUID NOT NULL REFERENCES public.mandis(id) ON DELETE CASCADE,
    crop_name TEXT NOT NULL,
    min_price INT NOT NULL,
    max_price INT NOT NULL,
    modal_price INT NOT NULL,
    reported_at DATE NOT NULL DEFAULT CURRENT_DATE,
    UNIQUE(mandi_id, crop_name, reported_at)
);
COMMENT ON TABLE public.mandi_rates IS 'Stores daily commodity prices for each Mandi.';

-- ----------------------------------------
-- 3. SCHEMA MODIFICATIONS & ANALYTICAL FUNCTIONS
-- ----------------------------------------

-- Add village_id to user profiles to link users to their village.
ALTER TABLE public.profiles
ADD COLUMN village_id UUID REFERENCES public.villages(id) ON DELETE SET NULL;
COMMENT ON COLUMN public.profiles.village_id IS 'Links the user to their specific village for local context.';

-- Create a dynamic function to calculate farmer count, avoiding stale data.
CREATE OR REPLACE FUNCTION public.get_village_farmer_count(v_id UUID)
RETURNS INT AS $$
    SELECT COUNT(*)
    FROM public.profiles
    WHERE profiles.village_id = v_id;
$$ LANGUAGE sql STABLE;
COMMENT ON FUNCTION public.get_village_farmer_count(UUID) IS 'Calculates the real-time number of registered farmers in a given village.';

-- ----------------------------------------
-- 4. INDEXING FOR PERFORMANCE
-- ----------------------------------------

CREATE INDEX idx_districts_state_id ON public.districts(state_id);
CREATE INDEX idx_blocks_district_id ON public.blocks(district_id);
CREATE INDEX idx_villages_block_id ON public.villages(block_id);
CREATE INDEX idx_villages_slug ON public.villages(slug);
CREATE INDEX idx_profiles_village_id ON public.profiles(village_id);
CREATE INDEX idx_mandi_rates_mandi_id_reported_at ON public.mandi_rates(mandi_id, reported_at DESC);

-- ----------------------------------------
-- 5. ROW LEVEL SECURITY (RLS)
-- ----------------------------------------

-- Enable RLS for all new tables
ALTER TABLE public.states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.villages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mandis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mandi_rates ENABLE ROW LEVEL SECURITY;

-- Public read-only access for all directory and market data.
CREATE POLICY "Geographic and Market data is public." ON public.states FOR SELECT USING (true);
CREATE POLICY "Geographic and Market data is public." ON public.districts FOR SELECT USING (true);
CREATE POLICY "Geographic and Market data is public." ON public.blocks FOR SELECT USING (true);
CREATE POLICY "Geographic and Market data is public." ON public.villages FOR SELECT USING (true);
CREATE POLICY "Geographic and Market data is public." ON public.mandis FOR SELECT USING (true);
CREATE POLICY "Geographic and Market data is public." ON public.mandi_rates FOR SELECT USING (true);

-- Admin override for all operations.
CREATE POLICY "Admins have full access." ON public.states FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins have full access." ON public.districts FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins have full access." ON public.blocks FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins have full access." ON public.villages FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins have full access." ON public.mandis FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins have full access." ON public.mandi_rates FOR ALL USING (public.is_admin(auth.uid()));

-- Restrict write access on villages to verified residents (future).
-- For now, writes are admin-only. A trigger or function will be needed to validate residency for user updates.
-- e.g., CREATE POLICY "Verified residents can update their village details." ON public.villages FOR UPDATE
-- USING (auth.uid() IN (SELECT user_id FROM verified_residents WHERE village_id = id));
