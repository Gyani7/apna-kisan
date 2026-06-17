
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const trendingTopics = [
  { tag: "organic-farming", posts: 1250 },
  { tag: "pest-control", posts: 890 },
  { tag: "irrigation-techniques", posts: 640 },
  { tag: "mandi-prices", posts: 1500 },
  { tag: "crop-rotation", posts: 420 },
];

const whoToFollow = [
  {
    name: "Dr. Anil Sharma",
    handle: "anilsharma",
    avatar: "/placeholder-user.jpg",
    bio: "Agronomist & Soil Scientist",
  },
  {
    name: "Sunita Verma",
    handle: "sunitaverma",
    avatar: "/placeholder-user.jpg",
    bio: "Organic Farming Specialist",
  },
  {
    name: "Rajesh Joshi",
    handle: "rajeshjoshi",
    avatar: "/placeholder-user.jpg",
    bio: "Horticulture Expert",
  },
];

const marketplacePicks = [
    {
        name: "Used Tractor",
        price: "$8,500",
        image: "/placeholder.svg",
    },
    {
        name: "Organic Seeds",
        price: "$25 / kg",
        image: "/placeholder.svg",
    },
];

export function RightSidebar() {
  return (
    <aside className="hidden w-80 flex-col gap-6 border-l bg-background p-6 lg:flex">
      <Card>
        <CardHeader>
          <CardTitle>Trending Topics</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {trendingTopics.map((topic) => (
            <Link key={topic.tag} href={`/community/tags/${topic.tag}`} className="group">
              <div className="font-semibold group-hover:text-primary transition-colors">#{topic.tag.replace(/-/g, ' ')}</div>
              <div className="text-xs text-muted-foreground">{topic.posts.toLocaleString()} posts</div>
            </Link>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Who to Follow</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {whoToFollow.map((user) => (
            <div key={user.handle} className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold">{user.name}</div>
                <div className="text-xs text-muted-foreground">@{user.handle}</div>
              </div>
              <Button size="sm" variant="outline">Follow</Button>
            </div>
          ))}
        </CardContent>
      </Card>
       <Card>
          <CardHeader>
            <CardTitle>Marketplace Picks</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {marketplacePicks.map((pick, index) => (
                <div key={index} className="flex items-center gap-4">
                    <img src={pick.image} alt={pick.name} className="w-16 h-16 object-cover rounded-md"/>
                    <div>
                        <div className="font-semibold">{pick.name}</div>
                        <div className="text-sm text-muted-foreground">{pick.price}</div>
                    </div>
                </div>
            ))}
          </CardContent>
        </Card>
    </aside>
  )
}
