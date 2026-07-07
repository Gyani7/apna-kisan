
import PostCard from './PostCard';
import { ProductCard } from '../marketplace/ProductCard';
import { StoryCard } from '../stories/StoryCard';
import { ReelCard } from '../reels/ReelCard';
import { MandiRateCard } from '../mandi/MandiRateCard';

// A new component to render the correct card based on item type
export function Feed({ items }: { items: any[] }) {
  return (
    <div>
      {items.map((item, index) => {
        switch (item.type) {
          case 'post':
            return <PostCard key={`${item.id}-${index}`} post={item} />;
          case 'product':
            return <ProductCard key={`${item.id}-${index}`} product={item} />;
          case 'story':
            return <StoryCard key={`${item.id}-${index}`} story={item} />;
          case 'reel':
            return <ReelCard key={`${item.id}-${index}`} reel={item} />;
          case 'mandi_rate':
            return <MandiRateCard key={`${item.id}-${index}`} rate={item} />;
          default:
            return <div key={index}>Unknown item type</div>;
        }
      })}
    </div>
  );
}
