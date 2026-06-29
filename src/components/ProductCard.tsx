'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import { useEffect, useState, useTransition } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Heart, ShoppingCart, Trash2, Edit } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useModal } from './Providers';
import { deleteProduct } from '@/app/(main)/my-products/actions';
import { createSupabaseClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isOwner, setIsOwner] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const { showPremiumModal } = useModal();
  const supabase = createSupabaseClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, [supabase]);

  useEffect(() => {
    if (user) {
      setIsOwner(user.id === product.farmer_id);
    }
  }, [user, product.farmer_id]);

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteProduct(product.id);
      if (result.success) {
        toast({ title: result.message });
      } else {
        toast({ title: result.message, variant: 'destructive' });
      }
    });
  };

  const handleAddToCart = () => {
    toast({ title: 'Product added to cart' });
  };

  const handleLike = () => {
    toast({ title: 'Product added to wishlist' });
  };

  const handleEditClick = (e: React.MouseEvent) => {
    if (!isOwner) {
      e.preventDefault();
      showPremiumModal();
    }
  };

  const { title = '', category = '', price = 0 } = product;

  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        <Link href={`/market/product/${product.id}`} className="block">
          <Image
            src={product.image_url || '/placeholder.svg'}
            alt={title}
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
            <Link href={`/my-products/edit/${product.id}`} onClick={handleEditClick}>
              <Button size="icon" variant="outline" className="rounded-full bg-background/70 backdrop-blur-sm">
                <Edit className="h-5 w-5" />
              </Button>
            </Link>
            <form action={handleDelete}>
              <Button size="icon" variant="destructive" className="rounded-full" disabled={isPending}>
                <Trash2 className="h-5 w-5" />
              </Button>
            </form>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{category}</p>
        <h3 className="text-lg font-semibold leading-tight mt-1 mb-2 truncate">
          <Link href={`/market/product/${product.id}`}>{title}</Link>
        </h3>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 border-t">
        <p className="text-xl font-bold text-primary">{formatPrice(price)}</p>
        <Button onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
