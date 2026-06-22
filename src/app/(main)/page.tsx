import { HeroSection } from "@/components/home/HeroSection";
import { LiveWeather } from "@/components/home/LiveWeather";
import { MandiBhav } from "@/components/home/MandiBhav";
import { VillageExplorer } from "@/components/home/VillageExplorer";
import { CommunityFeed } from "@/components/home/CommunityFeed";
import { Marketplace } from "@/components/gis/Marketplace";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Sprout, CloudSun, Map, ShoppingBag, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen pb-24 lg:pb-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-background to-background">
      <HeroSection />

      <main className="container mx-auto px-4 -mt-8 relative z-10 space-y-8">
        {/* 1. AI Crop Doctor & Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Button 
              variant="ghost" 
              className="w-full h-32 flex flex-col gap-3 glass-card border-gold/30 hover:border-gold group transition-all duration-500"
            >
              <div className="p-3 rounded-full bg-gold/10 group-hover:bg-gold/20 text-gold transition-colors">
                <BrainCircuit className="w-8 h-8" />
              </div>
              <span className="font-semibold text-sm">AI Crop Doctor</span>
            </Button>
          </div>
          <QuickActions />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Weather & Mandi */}
          <div className="lg:col-span-2 space-y-8">
            {/* 2. Real-time Mandi Rates */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Sprout className="text-primary w-5 h-5" />
                  Mandi Bhav Today
                </h2>
                <Button variant="link" className="text-gold">View All</Button>
              </div>
              <MandiBhav />
            </section>

            {/* 3. Hyperlocal Weather */}
            <section>
              <LiveWeather />
            </section>

            {/* 5. Marketplace Highlights */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingBag className="text-gold w-5 h-5" />
                  Kisan Bazaar
                </h2>
                <Button variant="outline" className="border-gold/50 text-gold hover:bg-gold/10">Sell Item</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Marketplace limit={4} />
              </div>
            </section>
          </div>

          {/* Right Column: Village & Community */}
          <div className="space-y-8">
            {/* 4. Village Intelligence Overview */}
            <section className="glass-card p-6 border-primary/20 bg-primary/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Map className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Village Intelligence</h3>
                  <p className="text-xs text-muted-foreground">Local analytics for your area</p>
                </div>
              </div>
              <VillageExplorer compact />
            </section>

            {/* 6. Community Trending */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2 px-2">
                <Users className="text-primary w-5 h-5" />
                Community
              </h2>
              <CommunityFeed trendingOnly />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
