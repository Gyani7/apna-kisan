import { loans as getAllLoans } from "@/lib/supabase/app-features";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function LoansPage() {
  const loans = await getAllLoans();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Loan & Credit Services</h1>

      <Card>
        <CardHeader>
          <CardTitle>Available Loans</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bank</TableHead>
                <TableHead>Loan Type</TableHead>
                <TableHead>Interest Rate</TableHead>
                <TableHead>Max Amount</TableHead>
                <TableHead>Processing Fee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loans.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell>{loan.bank_name}</TableCell>
                  <TableCell>{loan.loan_type}</TableCell>
                  <TableCell>{loan.interest_rate}%</TableCell>
                  <TableCell>₹{loan.max_amount.toLocaleString()}</TableCell>
                  <TableCell>{loan.processing_fee}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
