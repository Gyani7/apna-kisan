-- V3.1: Refine RLS Policies for Products

-- Enable RLS on the products table if it's not already enabled
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public can read products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can insert products" ON public.products;
DROP POLICY IF EXISTS "Sellers can update their own products" ON public.products;
DROP POLICY IF EXISTS "Sellers can delete their own products" ON public.products;
DROP POLICY IF EXISTS "Admins have full access to products" ON public.products;
DROP POLICY IF EXISTS "Farmers can insert products" ON public.products;


-- Create new RLS policies for the products table

-- 1. Public Read Access
CREATE POLICY "Public can read products" ON public.products
  FOR SELECT USING (true);

-- 2. Farmer Insert Access
CREATE POLICY "Farmers can insert products" ON public.products
  FOR INSERT WITH CHECK (
    public.get_user_role(auth.uid()) = 'farmer' AND
    seller_id = auth.uid()
  );

-- 3. Seller Update Access
CREATE POLICY "Sellers can update their own products" ON public.products
  FOR UPDATE USING (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);

-- 4. Seller Delete Access
CREATE POLICY "Sellers can delete their own products" ON public.products
  FOR DELETE USING (auth.uid() = seller_id);

-- 5. Admin/Super Admin Full Access
CREATE POLICY "Admins have full access to products" ON public.products
  FOR ALL USING (
    public.get_user_role(auth.uid()) IN ('admin', 'super_admin')
  );

-- Helper function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(p_user_id UUID)
RETURNS TEXT AS $$
DECLARE
  user_role_name TEXT;
BEGIN
  SELECT r.name::TEXT INTO user_role_name
  FROM public.profiles p
  JOIN public.roles r ON p.role_id = r.id
  WHERE p.id = p_user_id;
  RETURN user_role_name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
