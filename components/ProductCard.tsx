'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import { getUser } from '@/lib/user';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Heart, ShoppingCart, Trash2, Edit } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onDelete?: (productId: string) => void;
}

export function ProductCard({ product, onDelete }: ProductCardProps) {
  const [isOwner, setIsOwner] = useState(false);
  const supabase = createBrowserClient();
  const { toast } = useToast();

  useEffect(() => {
    const checkOwnership = async () => {
      const currentUser = await getUser();
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

  const handleAddToCart = () => {
    toast({ title: 'Product added to cart' });
  };

  const handleLike = () => {
    toast({ title: 'Product added to wishlist' });
  };

  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        <Link href={`/market/product/${product.id}`} className="block">
          <Image
            src={product.image_urls?.[0] || '/placeholder.svg'}
            alt={product.title}
            width={500}
            height={400}
            className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <Button size="icon" variant="outline" className="rounded-full bg-background/70 backdrop-blur-sm" onClick={handleLike}>
            <Heart className="h-5 w-5" />
          </Button>
        </div>
        {isOwner && (
          <div className="absolute top-2 left-2 flex gap-2">
            <Link href={`/my-products/edit/${product.id}`}>
              <Button size="icon" variant="outline" className="rounded-full bg-background/70 backdrop-blur-sm">
                <Edit className="h-5 w-5" />
              </Button>
            </Link>
            <Button size="icon" variant="destructive" className="rounded-full" onClick={handleDelete}>
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{product.category}</p>
        <h3 className="text-lg font-semibold leading-tight mt-1 mb-2 truncate">
          <Link href={`/market/product/${product.id}`}>{product.title}</Link>
        </h3>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 border-t">
        <p className="text-xl font-bold text-primary">{formatPrice(product.price)}</p>
        <Button onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
