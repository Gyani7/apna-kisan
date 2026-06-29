'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { createSupabaseClient } from '@/lib/supabase/client';

interface AddToWishlistButtonProps {
  productId: string;
}

export function AddToWishlistButton({ productId }: AddToWishlistButtonProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const { toast } = useToast();
  const supabase = createSupabaseClient();

  const handleAddToWishlist = async () => {
    setIsAddingToWishlist(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({ title: 'Please log in to add items to your wishlist.', variant: 'destructive' });
      setIsAddingToWishlist(false);
      return;
    }

    const response = await fetch('/api/wishlist/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId }),
    });

    if (response.ok) {
      toast({ title: 'Added to wishlist' });
    } else {
      toast({ title: 'Failed to add to wishlist', variant: 'destructive' });
    }
    setIsAddingToWishlist(false);
  };

  return (
    <Button onClick={handleAddToWishlist} variant="outline" disabled={isAddingToWishlist}>
      {isAddingToWishlist ? 'Adding...' : 'Add to Wishlist'}
    </Button>
  );
}
