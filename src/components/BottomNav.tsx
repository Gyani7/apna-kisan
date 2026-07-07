import { HomeIcon, CompassIcon, CloudIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-sm md:hidden">
      <div className="flex h-16 items-center justify-around">
        <Link href="/" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary">
          <HomeIcon className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/explore" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary">
          <CompassIcon className="h-6 w-6" />
          <span className="text-xs">Explore</span>
        </Link>
        <Link href="/weather" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary">
          <CloudIcon className="h-6 w-6" />
          <span className="text-xs">Weather</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary">
          <UserIcon className="h-6 w-6" />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </div>
  );
}
