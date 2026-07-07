import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { JSX, SVGProps } from "react";
import CreatePost from "@/components/community/CreatePost";
import PostCard from "@/components/community/PostCard";

export default function Page() {
  return (
    <div className="w-full">
      <section className="relative h-64 w-full overflow-hidden rounded-b-xl bg-gradient-to-r from-green-500/20 to-green-500/5">
        <div className="container mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Welcome to <span className="text-primary">Apna Kisan</span>
            </h1>
            <p className="mt-4 text-lg text-white/80">Connecting farmers, empowering agriculture.</p>
          </div>
        </div>
      </section>
      <section className="py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Categories</h2>
            <Button variant="link" className="text-primary">View All</Button>
          </div>
          <div className="mt-6 grid grid-cols-4 gap-4 md:grid-cols-8">
            {[ 
              { name: "Fasal", icon: TractorIcon },
              { name: "Organic", icon: LeafIcon },
              { name: "Mandi Bhav", icon: TrendingUpIcon },
              { name: "Machine & Tech", icon: CpuIcon },
              { name: "Rog Niyantran", icon: ShieldIcon },
              { name: "Sinchai", icon: DropletsIcon },
              { name: "Sarkari Yojana", icon: LandmarkIcon },
              { name: "Pashu Dairy", icon: MilkIcon },
            ].map((category, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card">
                  <category.icon className="h-8 w-8 text-primary" />
                </div>
                <span className="text-sm font-medium">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="text-lg font-semibold">Organic Khaad</h3>
                  <p className="text-sm text-muted-foreground">Buy natural fertilizers</p>
                </div>
                <LeafIcon className="h-10 w-10 text-primary" />
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="text-lg font-semibold">Mandi Bhav</h3>
                  <p className="text-sm text-muted-foreground">Latest market prices</p>
                </div>
                <TrendingUpIcon className="h-10 w-10 text-primary" />
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="text-lg font-semibold">Pest Alert</h3>
                  <p className="text-sm text-muted-foreground">Get notified about pests</p>
                </div>
                <ShieldIcon className="h-10 w-10 text-primary" />
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="text-lg font-semibold">Barish Alert</h3>
                  <p className="text-sm text-muted-foreground">Rainfall predictions</p>
                </div>
                <CloudRainIcon className="h-10 w-10 text-primary" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <CreatePost />
          <div className="mt-8 space-y-6">
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
      </section>

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

function LandmarkIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><polygon points="2 22 12 16 22 22"/><path d="M6 11h12v-3L12 3 6 8v3z"/></svg>
    )
}

function MilkIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 5h8v3H8z"/><path d="M12 5v14m-4-1h8"/><path d="M12 19a4 4 0 01-4-4h8a4 4 0 01-4 4z"/></svg>
    )
}

function CloudRainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16.2A4.5 4.5 0 0017.5 8h-1.8A7 7 0 104.3 16.1"/><path d="M8 19v1"/><path d="M8 14v1"/><path d="M16 19v1"/><path d="M16 14v1"/><path d="M12 21v1"/><path d="M12 16v1"/></svg>
    )
}
