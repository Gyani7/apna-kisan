'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { ProductCard } from '@/components/ProductCard';
import { getUserRole } from '@/lib/user'; // Corrected import

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_urls: string[];
  category: string;
  seller_id: string; // Added seller_id
}

export default function BuyerDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchRole = async () => {
      const userRole = await getUserRole();
      setRole(userRole);
    };

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchRole();
    fetchProducts();
  }, [supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (role !== 'buyer') {
    return <div>You are not authorized to view this page.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome, Buyer!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
