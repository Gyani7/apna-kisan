'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { createSupabaseClient } from '@/lib/supabase/client';

interface AddToCartButtonProps {
  productId: string;
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { toast } = useToast();
  const supabase = createSupabaseClient();

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({ title: 'Please log in to add items to your cart.', variant: 'destructive' });
      setIsAddingToCart(false);
      return;
    }

    const response = await fetch('/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity: 1 }),
    });

    if (response.ok) {
      toast({ title: 'Added to cart' });
    } else {
      toast({ title: 'Failed to add to cart', variant: 'destructive' });
    }
    setIsAddingToCart(false);
  };

  return (
    <Button onClick={handleAddToCart} disabled={isAddingToCart}>
      {isAddingToCart ? 'Adding...' : 'Add to Cart'}
    </Button>
  );
}
