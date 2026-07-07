import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { JSX, SVGProps } from "react";

export default function ExplorePage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[ 
                { name: "Fasal", icon: TractorIcon },
                { name: "Organic", icon: LeafIcon },
                { name: "Mandi Bhav", icon: TrendingUpIcon },
                { name: "Machine & Tech", icon: CpuIcon },
                { name: "Rog Niyantran", icon: ShieldIcon },
                { name: "Sinchai", icon: DropletsIcon },
            ].map((category, i) => (
                <Card key={i} className="bg-card/50 backdrop-blur-sm">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <category.icon className="h-12 w-12 text-primary" />
                        <h3 className="mt-4 text-lg font-semibold">{category.name}</h3>
                    </CardContent>
                </Card>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Trending Discussions</h2>
            <div className="mt-4 space-y-4">
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-4">
                        <p>What is the best way to grow tomatoes in a small space?</p>
                        <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                            <span>#fasal #organic</span>
                            <span>12 comments</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-4">
                        <p>Sarkari yojana for farmers in Maharashtra</p>
                        <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                            <span>#sarkariyojana</span>
                            <span>5 comments</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold">Trending Hashtags</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="secondary" className="rounded-full">#fasal</Button>
                    <Button variant="ghost" className="rounded-full">#organic</Button>
                    <Button variant="ghost" className="rounded-full">#mandi</Button>
                    <Button variant="ghost" className="rounded-full">#tech</Button>
                </div>
            </div>
          <div>
            <h2 className="text-2xl font-bold">Live Mandi Prices</h2>
            <Card className="mt-4 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>Wheat</div>
                  <div className="font-semibold">₹2,000 / quintal</div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div>Cotton</div>
                  <div className="font-semibold">₹8,000 / quintal</div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Weekly Leaderboard</h2>
            <Card className="mt-4 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Ramesh Kumar</div>
                    <div className="text-sm text-muted-foreground">1,200 points</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Government Schemes</h2>
            <Card className="mt-4 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                  <p>PM Kisan Samman Nidhi</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function TractorIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h18v1H3zM3 9h18v1H3zM3 14h18v1H3zM3 19h18v1H3z"/></svg>
    )
}

function LeafIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
    )
}

function TrendingUpIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
    )
}

function CpuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
    )
}

function ShieldIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    )
}

function DropletsIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.49-2.2-1.3-2.95A4.01 4.01 0 007.2 8.5c-2.2 0-4 1.83-4 4.05S4.8 16.3 7 16.3zM18.7 9.25c.3.55.5 1.15.5 1.75 0 2.22-1.8 4.02-4 4.02-1.9 0-3.5-1.5-4-3.5"/><path d="M12.6 19.3c1.7 0 3.1-1.4 3.1-3.1 0-.8-.3-1.5-.8-2.1"/></svg>
    )
}
