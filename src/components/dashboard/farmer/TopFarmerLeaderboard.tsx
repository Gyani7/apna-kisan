
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function TopFarmerLeaderboard() {
  // Mock data - replace with API call
  const farmers = [
    { rank: 1, name: "Ramesh Kumar", yield: "5.1 Ton/Acre", profit: "₹ 85,000", innovation: "Drip Irrigation", badges: ["High Yield", "Water Saver"] },
    { rank: 2, name: "Sita Devi", yield: "4.9 Ton/Acre", profit: "₹ 82,000", innovation: "Organic Farming", badges: ["Organic Star"] },
    { rank: 3, name: "Vikram Singh", yield: "4.8 Ton/Acre", profit: "₹ 79,000", innovation: "Smart Sensors", badges: ["Tech Innovator"] },
    // Add more farmers as needed
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Farmer Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Yield</TableHead>
              <TableHead>Profit</TableHead>
              <TableHead>Innovation</TableHead>
              <TableHead>Badges</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {farmers.map((farmer) => (
              <TableRow key={farmer.rank}>
                <TableCell>{farmer.rank}</TableCell>
                <TableCell>{farmer.name}</TableCell>
                <TableCell>{farmer.yield}</TableCell>
                <TableCell>{farmer.profit}</TableCell>
                <TableCell>{farmer.innovation}</TableCell>
                <TableCell>
                  {farmer.badges.map(badge => <Badge key={badge} variant="secondary" className="mr-1">{badge}</Badge>)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
