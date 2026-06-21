
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ThumbsUpIcon, MessageCircleIcon } from "lucide-react"

export function ForumPost() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/avatars/03.png" />
          <AvatarFallback>KV</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
            <p className="font-semibold">Kavita Verma</p>
            <p className="text-sm text-muted-foreground">5 hours ago</p>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold">How to deal with pests in organic farming?</h3>
        <p className="mt-2 text-muted-foreground">I've been having trouble with pests in my organic farm. Any advice on how to deal with them without using chemical pesticides?</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">
          <ThumbsUpIcon className="mr-2 h-4 w-4" />
          12 Votes
        </Button>
        <Button variant="ghost">
          <MessageCircleIcon className="mr-2 h-4 w-4" />
          5 Replies
        </Button>
      </CardFooter>
    </Card>
  )
}
