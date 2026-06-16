
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function RightSidebar() {
  return (
    <aside className="hidden w-80 flex-col gap-6 border-l bg-background p-6 lg:flex">
        <Card>
          <CardHeader>
            <CardTitle>Trending Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-sm font-medium hover:underline">#organic-farming</a>
              <a href="#" className="text-sm font-medium hover:underline">#crop-rotation</a>
              <a href="#" className-="text-sm font-medium hover:underline">#pest-control</a>
            </div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Top Experts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <div className="font-semibold">Dr. Anil Sharma</div>
                    <div className="text-xs text-muted-foreground">Agronomist</div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="font-semibold">Sunita Verma</div>
                    <div className="text-xs text-muted-foreground">Organic Farming Specialist</div>
                </div>
            </div>
          </CardContent>
        </Card>
    </aside>
  )
}
