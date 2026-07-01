
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, HelpCircle, BookOpen, Image, Video } from "lucide-react";

export function CommunityPostBox() {
  return (
    <div className="my-8 glass-card p-4 rounded-2xl">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex-grow p-3 rounded-full bg-background/50 cursor-pointer hover:bg-background/70">
          <p className="text-muted-foreground">Login karke post karein...</p>
        </div>
      </div>
      <div className="flex justify-around mt-4">
        <Button variant="ghost" className="flex-col h-auto">
          <MessageSquare className="w-6 h-6 text-blue-500" />
          <span className="text-xs">Charcha</span>
        </Button>
        <Button variant="ghost" className="flex-col h-auto">
          <HelpCircle className="w-6 h-6 text-green-500" />
          <span className="text-xs">Sawaal</span>
        </Button>
        <Button variant="ghost" className="flex-col h-auto">
          <BookOpen className="w-6 h-6 text-purple-500" />
          <span className="text-xs">Kahani</span>
        </Button>
        <Button variant="ghost" className="flex-col h-auto">
          <Image className="w-6 h-6 text-red-500" />
          <span className="text-xs">Photo</span>
        </Button>
        <Button variant="ghost" className="flex-col h-auto">
          <Video className="w-6 h-6 text-pink-500" />
          <span className="text-xs">Video</span>
        </Button>
      </div>
    </div>
  );
}
