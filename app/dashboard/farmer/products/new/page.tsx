'use client';

import { useState } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Icons } from '@/components/icons';

export default function NewProductPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('quintal');
  const [category, setCategory] = useState('vegetable');
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createBrowserClient();
  const router = useRouter();

  const handleAddProduct = async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setIsLoading(false);
      return toast({
        title: 'Error',
        description: 'You must be logged in to add a product.',
        variant: 'destructive',
      });
    }

    const { error } = await supabase.from('products').insert([
      {
        name,
        description,
        price: parseFloat(price),
        unit,
        category,
        farmer_id: user.id,
      },
    ]);

    setIsLoading(false);

    if (error) {
      return toast({
        title: 'Error adding product',
        description: error.message,
        variant: 'destructive',
      });
    }

    router.push('/dashboard/farmer/products');
    router.refresh();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add a New Product</h1>
      <div className="grid gap-4 max-w-md">
        <Input placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <div className="flex gap-4">
          <Input placeholder="Unit (e.g., quintal)" value={unit} onChange={(e) => setUnit(e.target.value)} />
          <Input placeholder="Category (e.g., vegetable)" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <Button onClick={handleAddProduct} disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}Add Product
        </Button>
      </div>
    </div>
  );
}
