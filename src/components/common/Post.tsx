
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ThumbsUpIcon, MessageCircleIcon, Share2Icon } from "lucide-react"

export function Post() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/avatars/02.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-muted-foreground">2 hours ago</p>
        </div>
      </CardHeader>
      <CardContent>
        <p>Just harvested my first batch of organic tomatoes! 🍅 So proud of the result. #organicfarming #homegrown</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">
          <ThumbsUpIcon className="mr-2 h-4 w-4" />
          Like
        </Button>
        <Button variant="ghost">
          <MessageCircleIcon className="mr-2 h-4 w-4" />
          Comment
        </Button>
        <Button variant="ghost">
          <Share2Icon className="mr-2 h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  )
}
