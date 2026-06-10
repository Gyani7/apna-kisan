-- V3.0: CROP DISEASE DETECTION - SCHEMA SETUP

-- 1. Create a dedicated storage bucket for crop images
-- We will use this bucket to store all images uploaded by users for analysis.
INSERT INTO storage.buckets (id, name, public)
VALUES ('crop_images', 'crop_images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Create the Crop Health Analysis table
-- This table will store the analysis request and the results from the AI model.
CREATE TABLE IF NOT EXISTS public.crop_health_analysis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
    analysis_provider TEXT, -- e.g., 'openai', 'gemini'
    analysis_payload JSONB, -- The full raw response from the AI service
    detected_disease TEXT,
    confidence_score NUMERIC(5, 4),
    recommendations TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- For guest users not logged in, we can add guest-specific columns if needed in the future
    guest_id TEXT UNIQUE
);

COMMENT ON TABLE public.crop_health_analysis IS 'Stores results of AI-powered crop disease detection.';

-- 3. Enable Row-Level Security (RLS)
ALTER TABLE public.crop_health_analysis ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for the Crop Health Analysis table
-- Users should only be able to see their own analysis history.

DROP POLICY IF EXISTS "allow_users_to_read_own_analysis" ON public.crop_health_analysis;
CREATE POLICY "allow_users_to_read_own_analysis" ON public.crop_health_analysis
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "allow_users_to_insert_own_analysis" ON public.crop_health_analysis;
CREATE POLICY "allow_users_to_insert_own_analysis" ON public.crop_health_analysis
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- 5. RLS Policies for the 'crop_images' Storage Bucket
-- Users can only upload images into a folder corresponding to their own user ID.
-- This prevents users from overwriting each other's files.

DROP POLICY IF EXISTS "allow_users_to_upload_to_own_folder" ON storage.objects;
CREATE POLICY "allow_users_to_upload_to_own_folder" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'crop_images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Public read access is already enabled on the bucket, which is what we want.
-- We will use the public URL to send the image to the analysis API.
