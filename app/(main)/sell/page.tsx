'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { createClient } from '@/utils/supabase/client';
import withAuthorization from '@/components/withAuthorization';
import { UserRole } from '@/lib/types';

function SellPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: 'Please log in to sell products.', variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }

    // 1. Upload images to Supabase Storage
    const imageUrls: string[] = [];
    for (const image of images) {
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(`${user.id}/${Date.now()}_${image.name}`, image);

      if (error) {
        console.error('Error uploading image:', error);
        toast({ title: 'Error uploading image', variant: 'destructive' });
        setIsSubmitting(false);
        return;
      }
      const { data: publicUrlData } = supabase.storage.from('product-images').getPublicUrl(data.path);
      imageUrls.push(publicUrlData.publicUrl);
    }

    // 2. Insert product data into the 'products' table
    const { error: productError } = await supabase.from('products').insert({
      seller_id: user.id,
      title,
      description,
      price: parseFloat(price),
      image_urls: imageUrls,
    });

    if (productError) {
      console.error('Error creating product:', productError);
      toast({ title: 'Error creating product', variant: 'destructive' });
    } else {
      toast({ title: 'Product listed successfully!' });
      // Reset form
      setTitle('');
      setDescription('');
      setPrice('');
      setImages([]);
    }

    setIsSubmitting(false);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Sell Your Produce</CardTitle>
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
          <div className="space-y-2">
            <label htmlFor="images">Product Images</label>
            <Input id="images" type="file" multiple onChange={handleImageChange} accept="image/*" />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Listing...' : 'List Product'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default withAuthorization(SellPage, [UserRole.USER, UserRole.PRO_USER]);
