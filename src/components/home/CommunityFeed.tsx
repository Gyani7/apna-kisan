import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CommunityFeed() {
  // Mock data
  const posts = [
    { id: 1, user: "Ram Singh", content: "What is the best fertilizer for wheat?" },
    { id: 2, user: "Sita Devi", content: "My crops are suffering from yellow rust..." },
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Community Feed</h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-4">
                <p className="font-bold">{post.user}</p>
                <p>{post.content}</p>
                <div className="flex justify-end space-x-2 mt-2">
                  <Button variant="ghost">Like</Button>
                  <Button variant="ghost">Comment</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
