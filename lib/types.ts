export interface Product {
  id: string;
  seller_id: string;
  title: string;
  description?: string;
  price: number;
  category?: string;
  image_urls?: string[];
  is_featured?: boolean;
  created_at?: string;
}
