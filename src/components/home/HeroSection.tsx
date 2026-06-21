import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-bold md:text-6xl">Apna Kisan</h1>
        <p className="mt-4 text-lg md:text-xl">India's Digital Agriculture Network</p>
        <div className="mt-8 space-x-4">
          <Button>Join Community</Button>
          <Button variant="secondary">Explore Village</Button>
          <Button variant="secondary">Watch Reels</Button>
        </div>
      </div>
    </section>
  );
}
