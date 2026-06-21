import { getAllProducts } from "@/lib/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function MarketplacePage() {
  const products = await getAllProducts();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Agriculture Marketplace</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.id}>
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <p className="text-lg font-bold">₹{product.price}</p>
            </CardHeader>
            <CardContent>
              <p><strong>Seller:</strong> {product.seller}</p>
              <p><strong>Location:</strong> {product.location}</p>
              <Button className="mt-4 w-full">Contact Seller</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
