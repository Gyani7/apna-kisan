import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function CreatePost() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex space-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="w-full">
          <Textarea placeholder="What's on your mind?" className="mb-2" />
          <div className="flex justify-between items-center">
            {/* Add icons for image/video upload etc */}
            <div className="flex space-x-2">
                {/* Icons here */}
            </div>
            <Button>Post</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
