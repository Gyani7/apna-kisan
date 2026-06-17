'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import { getUser } from '@/lib/user';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface ProductCardProps {
  product: Product;
  onDelete?: (productId: string) => void;
}

export function ProductCard({ product, onDelete }: ProductCardProps) {
  const [isOwner, setIsOwner] = useState(false);
  const [user, setUser] = useState(null);
  const supabase = createBrowserClient();
  const { toast } = useToast();

  useEffect(() => {
    const checkOwnership = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
      setIsOwner(currentUser?.id === product.seller_id);
    };
    checkOwnership();
  }, [product.seller_id]);

  const handleDelete = async () => {
    if (!isOwner) return;

    const { error } = await supabase.from('products').delete().eq('id', product.id);

    if (error) {
      toast({ title: 'Error deleting product', variant: 'destructive' });
    } else {
      toast({ title: 'Product deleted' });
      if (onDelete) {
        onDelete(product.id);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={product.image_urls?.[0] || '/placeholder.svg'} alt={product.title} className="w-full h-48 object-cover" />
        <p className="mt-4">{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="font-bold">₹{product.price}</p>
        <div className="flex gap-2">
          <Link href={`/market/product/${product.id}`}>
            <Button size="sm">View</Button>
          </Link>
          {isOwner && (
            <>
              <Link href={`/my-products/edit/${product.id}`}>
                <Button size="sm" variant="outline">Edit</Button>
              </Link>
              <Button size="sm" variant="destructive" onClick={handleDelete}>Delete</Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
