import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export function BookmarkButton({ postId }: { postId: string }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  const handleBookmark = async () => {
    // Here you would typically make an API call to save the bookmark
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from Bookmarks" : "Added to Bookmarks",
    });
  };

  return (
    <Button variant="outline" size="icon" onClick={handleBookmark}>
      <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
    </Button>
  );
}
