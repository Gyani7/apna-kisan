import { getAllReels } from "@/lib/reels";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function ReelsPage() {
  const reels = await getAllReels();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Agri Reels</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reels.map((reel) => (
          <Card key={reel.id} className="overflow-hidden">
            <video src={reel.videoUrl} controls className="w-full h-auto"></video>
            <div className="p-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={reel.author.avatar} />
                  <AvatarFallback>{reel.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">{reel.author.name}</p>
                  <p className="text-sm text-gray-500">{reel.likes} Likes</p>
                </div>
              </div>
              <p className="mt-4">{reel.caption}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
