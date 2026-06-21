import { Button } from "@/components/ui/button";
import type { Reel } from "@/lib/types";

interface ReelsSidebarProps {
  reel: Reel;
}

export function ReelsSidebar({ reel }: ReelsSidebarProps) {
  // Mock data or use reel stats if available in the type
  const stats = { likes: 123, comments: 45, shares: 67 };

  return (
    <div className="flex flex-col space-y-4">
      <Button variant="ghost" size="icon">
        {/* Like icon */}
        <span>{stats.likes}</span>
      </Button>
      <Button variant="ghost" size="icon">
        {/* Comment icon */}
        <span>{stats.comments}</span>
      </Button>
      <Button variant="ghost" size="icon">
        {/* Share icon */}
        <span>{stats.shares}</span>
      </Button>
    </div>
  );
}