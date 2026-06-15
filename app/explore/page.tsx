
import UnifiedGlobalFeed from '@/components/UnifiedGlobalFeed';
import { Suspense } from 'react';

// Revalidate this page every 60 seconds to fetch fresh content
export const revalidate = 60;

// --- EXPLORE PAGE (SERVER COMPONENT) ---

export default function ExplorePage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore the Community Feed</h1>
      <Suspense fallback={<FeedSkeleton />}>
        <UnifiedGlobalFeed />
      </Suspense>
    </div>
  );
}

// --- UI COMPONENTS ---

function FeedSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 animate-pulse">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 mr-3"></div>
            <div>
              <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-3 w-16 bg-gray-300 dark:bg-gray-600 rounded mt-1"></div>
            </div>
          </div>
          <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-600 rounded mt-1"></div>
        </div>
      ))}
    </div>
  );
}
