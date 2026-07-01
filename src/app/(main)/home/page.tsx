
'use client';
import {StickyHeader} from "@/components/home/StickyHeader";
import {HeroBanner} from "@/components/home/HeroBanner";
import {CategorySlider} from "@/components/home/CategorySlider";
import {CommunityPostBox} from "@/components/home/CommunityPostBox";
import {DailyInfoGrid} from "@/components/home/DailyInfoGrid";
import {CommunityFeed} from "@/components/home/CommunityFeed";

export default function HomePage() {
  return (
    <div className="dark">
      <StickyHeader />
      <main className="p-4">
        <HeroBanner />
        <CategorySlider />
        <CommunityPostBox />
        <DailyInfoGrid />
        <CommunityFeed />
      </main>
    </div>
  );
}
