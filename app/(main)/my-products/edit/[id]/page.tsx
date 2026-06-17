'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { createBrowserClient } from '@/lib/supabase/client';
import { getUser } from '@/lib/user';
import { withAuthorization } from '@/components/withAuthorization';
import { Product } from '@/lib/types';

function EditProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams() ?? {};
  const { toast } = useToast();
  const supabase = createBrowserClient();

  useEffect(() => {
    const fetchProduct = async () => {
      const user = await getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        console.error('Error fetching product:', error);
        toast({ title: 'Product not found', variant: 'destructive' });
        router.push('/my-products');
        return;
      }

      if (data.seller_id !== user.id) {
        toast({ title: 'You are not authorized to edit this product', variant: 'destructive' });
        router.push('/my-products');
        return;
      }

      setProduct(data);
      setTitle(data.title);
      setDescription(data.description || '');
      setPrice(data.price.toString());
      setIsLoading(false);
    };

    if (id) {
      fetchProduct();
    }
  }, [id, router, supabase, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase
      .from('products')
      .update({
        title,
        description,
        price: parseFloat(price),
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating product:', error);
      toast({ title: 'Error updating product', variant: 'destructive' });
    } else {
      toast({ title: 'Product updated successfully!' });
      router.push('/my-products');
    }

    setIsSubmitting(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title">Product Title</label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label htmlFor="description">Description</label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label htmlFor="price">Price (in ₹)</label>
            <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Product'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default withAuthorization(EditProductPage, ['farmer']);
