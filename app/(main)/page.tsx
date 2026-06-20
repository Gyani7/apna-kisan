
import { HeroSection } from "@/components/home/HeroSection";
import { CommunityFeed } from "@/components/home/CommunityFeed";
import { KisanReels } from "@/components/home/KisanReels";
import { LiveWeather } from "@/components/home/LiveWeather";
import { MandiBhav } from "@/components/home/MandiBhav";
import { VillageExplorer } from "@/components/home/VillageExplorer";
import { SuccessStories } from "@/components/home/SuccessStories";
import { GovernmentSchemes } from "@/components/home/GovernmentSchemes";
import { NearbyShops } from "@/components/home/NearbyShops";
import { Separator } from "@/components/ui/separator";

export default function MainPage() {
  return (
    <div className="container mx-auto space-y-12 py-8">
      <HeroSection />
      <Separator />
      <KisanReels />
      <Separator />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CommunityFeed />
        </div>
        <div className="space-y-8">
          <LiveWeather />
          <MandiBhav />
        </div>
      </div>
      <Separator />
      <VillageExplorer />
      <Separator />
      <SuccessStories />
      <Separator />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GovernmentSchemes />
          <NearbyShops />
      </div>
    </div>
  );
}
