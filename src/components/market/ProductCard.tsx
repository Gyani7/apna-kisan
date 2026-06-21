'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function ProductCard({ product }: { product: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
        <p className="text-lg font-semibold mt-4">₹{product.price}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Product</Button>
      </CardFooter>
    </Card>
  );
}
