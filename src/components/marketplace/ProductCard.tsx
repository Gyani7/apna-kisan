'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ProductCard({ product }: { product: any }) {
  const { name = '', description = '', price = '' } = product || {};

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
        <p className="font-bold">{price}</p>
      </CardContent>
      <CardFooter>
        <Button>View Product</Button>
      </CardFooter>
    </Card>
  );
}
