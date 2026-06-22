
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image, Video } from 'lucide-react';

export function CreatePost() {
  return (
    <div className="card-glass bg-premium-green-dark/60 border-premium-gold/30 p-4 rounded-lg">
      <div className="flex space-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="w-full">
          <Textarea 
            placeholder="Share your thoughts, Ramesh..." 
            className="bg-transparent border-0 placeholder-premium-white/50 text-premium-white focus:ring-0 resize-none" 
          />
          <div className="flex justify-between items-center mt-2">
            <div className="flex space-x-4">
              <Image className="text-premium-gold hover:text-premium-gold-dark cursor-pointer" />
              <Video className="text-premium-gold hover:text-premium-gold-dark cursor-pointer" />
            </div>
            <Button className="bg-gold-gradient text-premium-green-dark font-bold hover:opacity-90 transition-opacity">Post</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
