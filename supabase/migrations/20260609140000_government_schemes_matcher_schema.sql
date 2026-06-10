-- V3.0: GOVERNMENT SCHEMES MATCHER - SCHEMA SETUP

-- 1. Create the Government Schemes table
CREATE TABLE IF NOT EXISTS public.government_schemes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scheme_name TEXT NOT NULL,
    description TEXT NOT NULL,
    eligibility_criteria JSONB NOT NULL, -- e.g., {"min_age": 18, "land_holding_max_acres": 5, "required_docs": ["Aadhaar", "Land Record"]}
    benefits TEXT[],
    application_link TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.government_schemes IS 'Stores details of government agricultural schemes.';
COMMENT ON COLUMN public.government_schemes.eligibility_criteria IS 'Structured JSON defining who is eligible.';

-- 2. Create the User Scheme Matches table
CREATE TABLE IF NOT EXISTS public.user_scheme_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    scheme_id UUID NOT NULL REFERENCES public.government_schemes(id) ON DELETE CASCADE,
    match_score NUMERIC(3, 2) NOT NULL, -- A score indicating the confidence of the match (e.g., 0.95)
    is_eligible BOOLEAN,
    matched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, scheme_id)
);

COMMENT ON TABLE public.user_scheme_matches IS 'Tracks which schemes are a good match for each user.';

-- 3. Enable Row-Level Security (RLS)
ALTER TABLE public.government_schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_scheme_matches ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
-- Schemes are public to all, but only admins can modify them.
DROP POLICY IF EXISTS "allow_public_read_on_schemes" ON public.government_schemes;
CREATE POLICY "allow_public_read_on_schemes" ON public.government_schemes
  FOR SELECT USING (is_active = TRUE);

-- Assume an is_admin() function for admin checks
DROP POLICY IF EXISTS "allow_admin_all_on_schemes" ON public.government_schemes;
CREATE POLICY "allow_admin_all_on_schemes" ON public.government_schemes
  FOR ALL USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));

-- Users can only see their own scheme matches.
DROP POLICY IF EXISTS "allow_users_to_read_own_matches" ON public.user_scheme_matches;
CREATE POLICY "allow_users_to_read_own_matches" ON public.user_scheme_matches
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- 5. Seed the Government Schemes table with initial data
INSERT INTO public.government_schemes (scheme_name, description, eligibility_criteria, benefits, application_link)
VALUES 
  (
    'PM Kisan Samman Nidhi',
    'A central sector scheme with 100% funding from the Government of India. It provides income support of ₹6,000 per year to all landholding farmer families.',
    '{"land_holding_max_acres": 5, "farmer_type": "small_marginal", "required_docs": ["Aadhaar", "Land Record"]}',
    '{"₹6,000 per year in three installments", "Direct bank transfer"}',
    'https://pmkisan.gov.in/'
  ),
  (
    'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    'An insurance service for farmers for their yields. It provides a comprehensive insurance cover against failure of the crop thus helping in stabilising the income of the farmers.',
    '{"is_loanee_farmer": true, "has_crop_insurance": false, "required_docs": ["Aadhaar", "Land Record", "Bank Passbook"]}',
    '{"Insurance coverage for crop loss", "Financial stability"}',
    'https://pmfby.gov.in/'
  ),
  (
    'Kisan Credit Card (KCC)',
    'A scheme that provides farmers with timely access to credit. It provides a revolving cash credit facility.',
    '{"min_age": 18, "max_age": 75, "is_farmer": true, "required_docs": ["Aadhaar", "Voter ID", "Land Record"]}',
    '{"Revolving credit up to ₹3 lakh", "Low interest rates"}',
    'https://www.sbi.co.in/web/agri-rural/agriculture-banking/crop-finance/kisan-credit-card'
  )
ON CONFLICT DO NOTHING;
