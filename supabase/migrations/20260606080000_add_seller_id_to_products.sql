
ALTER TABLE products
ADD COLUMN seller_id UUID REFERENCES profiles(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products(seller_id);
