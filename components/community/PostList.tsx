import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PostList() {
  // Mock data
  const posts = [
    {
      id: 1,
      user: "Ram Singh",
      content: "What is the best fertilizer for wheat?",
      likes: 12,
      comments: 3,
    },
    {
      id: 2,
      user: "Sita Devi",
      content: "My crops are suffering from yellow rust...",
      likes: 5,
      comments: 1,
    },
  ];

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardContent className="p-4">
            <p className="font-bold">{post.user}</p>
            <p>{post.content}</p>
            <div className="flex justify-end space-x-2 mt-2">
              <Button variant="ghost">Like ({post.likes})</Button>
              <Button variant="ghost">Comment ({post.comments})</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
