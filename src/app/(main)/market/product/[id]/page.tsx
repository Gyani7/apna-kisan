'use client';

import { createBrowserClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { getUser } from '@/lib/user';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const { toast } = useToast();
  const supabase = createBrowserClient();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        toast({ title: 'Error fetching product', variant: 'destructive' });
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [params.id, supabase, toast]);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    const user = await getUser();
    if (!user) {
      toast({ title: 'Please log in to add items to your cart.', variant: 'destructive' });
      setIsAddingToCart(false);
      return;
    }

    if (!product) return;

    const response = await fetch('/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product.id, quantity: 1 }),
    });

    if (response.ok) {
      toast({ title: 'Added to cart' });
    } else {
      toast({ title: 'Failed to add to cart', variant: 'destructive' });
    }
    setIsAddingToCart(false);
  };

  const handleAddToWishlist = async () => {
    setIsAddingToWishlist(true);
    const user = await getUser();
    if (!user) {
      toast({ title: 'Please log in to add items to your wishlist.', variant: 'destructive' });
      setIsAddingToWishlist(false);
      return;
    }

    if (!product) return;

    const response = await fetch('/api/wishlist/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product.id }),
    });

    if (response.ok) {
      toast({ title: 'Added to wishlist' });
    } else {
      toast({ title: 'Failed to add to wishlist', variant: 'destructive' });
    }
    setIsAddingToWishlist(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.image_urls?.[0] || '/placeholder.svg'} alt={product.title} className="w-full rounded-lg" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4">₹{product.price}</p>
          <div className="flex gap-4">
            <Button onClick={handleAddToCart} disabled={isAddingToCart}>
              {isAddingToCart ? 'Adding...' : 'Add to Cart'}
            </Button>
            <Button onClick={handleAddToWishlist} variant="outline" disabled={isAddingToWishlist}>
              {isAddingToWishlist ? 'Adding...' : 'Add to Wishlist'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
