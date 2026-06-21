import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-20">
      <Hero />
      <Features />
    </div>
  );
}
