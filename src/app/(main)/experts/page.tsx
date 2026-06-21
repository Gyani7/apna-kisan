import { getAllExperts } from "@/lib/experts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default async function ExpertsPage() {
  const experts = await getAllExperts();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Kisan Mitra Network</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {experts.map((expert) => (
          <Card key={expert.id}>
            <CardHeader className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={expert.avatar} />
                <AvatarFallback>{expert.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{expert.name}</CardTitle>
                <p className="text-sm text-gray-500">{expert.specialization}</p>
                <p className="text-sm text-gray-500">{expert.reputation} Reputation</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-around">
                <Button variant="outline">Call</Button>
                <Button>Chat</Button>
                <Button variant="outline">Video Consult</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
