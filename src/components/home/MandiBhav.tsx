import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function MandiBhav() {
  // Mock data
  const prices = [
    { commodity: "Wheat", market: "Jaipur", price: "₹2,200", change: "+₹50" },
    { commodity: "Soybean", market: "Indore", price: "₹4,500", change: "-₹100" },
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Mandi Bhav</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Commodity</TableHead>
              <TableHead>Market</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prices.map((price) => (
              <TableRow key={price.commodity}>
                <TableCell>{price.commodity}</TableCell>
                <TableCell>{price.market}</TableCell>
                <TableCell>{price.price}</TableCell>
                <TableCell>{price.change}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
