'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ProductCard({ product }: { product: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{product.description}</p>
        <p className="font-bold">{product.price}</p>
      </CardContent>
      <CardFooter>
        <Button>View Product</Button>
      </CardFooter>
    </Card>
  );
}
