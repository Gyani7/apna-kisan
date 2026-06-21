
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function CreatePost() {
  return (
    <div className="flex items-start gap-4 rounded-lg border p-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src="/avatars/01.png" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <Textarea placeholder="What's on your mind?" className="min-h-[80px]" />
        <div className="mt-2 flex justify-end">
          <Button>Post</Button>
        </div>
      </div>
    </div>
  )
}
