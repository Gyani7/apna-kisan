import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const genericShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: url,
      }).catch(console.error);
    } else {
      // Fallback for browsers that do not support navigator.share
      // You can implement a modal with links here
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="icon" onClick={genericShare}>
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
