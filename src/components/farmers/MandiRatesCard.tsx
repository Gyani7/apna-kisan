import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
  if (trend === 'up') return <ArrowUpRight className="w-4 h-4 text-green-500" />;
  if (trend === 'down') return <ArrowDownRight className="w-4 h-4 text-red-500" />;
  return <Minus className="w-4 h-4 text-gray-500" />;
};

export function MandiRatesCard() {
  // Placeholder data with trends
  const mandiRates = [
    { crop: 'Tomato', price: '₹1550/q', location: 'Pune', trend: 'up' as const },
    { crop: 'Onion', price: '₹1950/q', location: 'Nashik', trend: 'down' as const },
    { crop: 'Potato', price: '₹1200/q', location: 'Manchar', trend: 'stable' as const },
    { crop: 'Carrot', price: '₹1800/q', location: 'Pune', trend: 'up' as const },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Mandi Rates</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Crop</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mandiRates.map((rate, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{rate.crop}<br/><span className="text-xs text-muted-foreground">{rate.location}</span></TableCell>
                <TableCell>{rate.price}</TableCell>
                <TableCell className="text-right flex justify-end items-center"><TrendIcon trend={rate.trend} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
