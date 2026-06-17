import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function MandiRatesCard() {
  // Placeholder data
  const mandiRates = [
    { crop: 'Tomato', price: '₹1500/quintal', location: 'Pune' },
    { crop: 'Onion', price: '₹2000/quintal', location: 'Nashik' },
    { crop: 'Potato', price: '₹1200/quintal', location: 'Manchar' },
    { crop: 'Carrot', price: '₹1800/quintal', location: 'Pune' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mandi Rates</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Crop</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mandiRates.map((rate, index) => (
              <TableRow key={index}>
                <TableCell>{rate.crop}</TableCell>
                <TableCell>{rate.price}</TableCell>
                <TableCell>{rate.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
