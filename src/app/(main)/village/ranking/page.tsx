import { getAllVillages, getRankedVillages } from "@/lib/village";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function VillageRankingPage() {
  const rankedVillages = await getRankedVillages();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Village Ranking</h1>

      <Card>
        <CardHeader>
          <CardTitle>Top 100 Villages in India</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Village</TableHead>
                <TableHead>Productivity</TableHead>
                <TableHead>Water Management</TableHead>
                <TableHead>Organic Farming</TableHead>
                <TableHead>Community Activity</TableHead>
                <TableHead>Technology Adoption</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankedVillages.map((village, index) => (
                <TableRow key={village.slug}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{village.name}</TableCell>
                  <TableCell>{village.productivity}</TableCell>
                  <TableCell>{village.waterManagement}</TableCell>
                  <TableCell>{village.organicFarming}</TableCell>
                  <TableCell>{village.communityActivity}</TableCell>
                  <TableCell>{village.technologyAdoption}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
