import { Button } from "@/components/ui/button";
import Link from "next/link";

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Link href="/community">
        <Button className="w-full h-24 bg-blue-500 hover:bg-blue-600">Community</Button>
      </Link>
      <Link href="/reels">
        <Button className="w-full h-24 bg-purple-500 hover:bg-purple-600">Reels</Button>
      </Link>
      <Link href="/marketplace">
        <Button className="w-full h-24 bg-orange-500 hover:bg-orange-600">Marketplace</Button>
      </Link>
      <Link href="/weather">
        <Button className="w-full h-24 bg-yellow-500 hover:bg-yellow-600">Weather</Button>
      </Link>
    </div>
  );
}
