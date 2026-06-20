import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { VillageIntelligencePreview } from "@/components/landing/VillageIntelligencePreview";
import { SocialFeedPreview } from "@/components/landing/SocialFeedPreview";
import { AiFeaturesPreview } from "@/components/landing/AiFeaturesPreview";
import { Cta } from "@/components/landing/Cta";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-20">
      <Hero />
      <Features />
      <VillageIntelligencePreview />
      <SocialFeedPreview />
      <AiFeaturesPreview />
      <Cta />
    </div>
  );
}
