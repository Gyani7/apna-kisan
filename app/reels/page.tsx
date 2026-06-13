import ReelsFeed from './ReelsFeed'; 
import { getReels } from '@/lib/actions/reels';

export default async function ReelsPage() {
  const { reels, error } = await getReels();

  return <ReelsFeed serverReels={reels} fetchError={error} />;
}
