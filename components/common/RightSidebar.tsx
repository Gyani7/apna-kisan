
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RightSidebar() {
  return (
    <aside className="hidden w-80 flex-col gap-6 border-l bg-background p-6 lg:flex">
        <Card>
          <CardHeader>
            <CardTitle>Top Experts</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
             <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-semibold">Dr. Anil Sharma</div>
                    <div className="text-xs text-muted-foreground">Agronomist</div>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>SV</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-semibold">Sunita Verma</div>
                    <div className="text-xs text-muted-foreground">Organic Farming Specialist</div>
                </div>
             </div>
              <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>RJ</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-semibold">Rajesh Joshi</div>
                    <div className="text-xs text-muted-foreground">Soil Scientist</div>
                </div>
             </div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Trending Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
                <Badge variant="outline">#organic-farming</Badge>
                <Badge variant="outline">#pest-control</Badge>
                <Badge variant="outline">#irrigation</Badge>
                <Badge variant="outline">#mandi-rates</Badge>
                <Badge variant="outline">#tractors</Badge>
            </div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Marketplace Picks</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
             <div className="flex items-center gap-4">
                <img src="/placeholder.svg" alt="Tractor" className="w-16 h-16 object-cover rounded-md"/>
                <div>
                    <div className="font-semibold">Used Tractor</div>
                    <div className="text-sm text-muted-foreground">$8,500</div>
                </div>
             </div>
             <div className="flex items-center gap-4">
                 <img src="/placeholder.svg" alt="Seeds" className="w-16 h-16 object-cover rounded-md"/>
                <div>
                    <div className="font-semibold">Organic Seeds</div>
                    <div className="text-sm text-muted-foreground">$25 / kg</div>
                </div>
             </div>
          </CardContent>
        </Card>
    </aside>
  )
}
