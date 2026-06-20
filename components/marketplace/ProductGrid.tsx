import { Card, CardContent } from "@/components/ui/card";

export function ProductGrid() {
  // Mock data
  const products = [
    {
      id: 1,
      name: "Organic Fertilizer",
      price: "₹500",
      image: "/placeholder.svg?text=Fertilizer",
    },
    {
      id: 2,
      name: "Tractor",
      price: "₹5,00,000",
      image: "/placeholder.svg?text=Tractor",
    },
    // Add more products
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <Card key={product.id}>
          <img src={product.image} alt={product.name} className="rounded-t-lg" />
          <CardContent className="p-2">
            <p className="font-bold">{product.name}</p>
            <p>{product.price}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
