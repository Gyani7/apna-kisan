'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import PostCard from '@/components/PostCard';
import AuthProvider from '@/components/AuthProvider';
import { createBrowser } from '@/lib/supabase/utils';
import { mapPostsToPostWithAuthor } from '@/lib/mappers';
import type { PostWithAuthor } from '@/lib/types';
import { Search } from 'lucide-react';
import clsx from 'clsx';

const supabase = createBrowser();

async function getPosts({ postType, orderBy = 'created_at', limit = 20 }: { postType?: string, orderBy?: string, limit?: number }) {
  let query = supabase.from('posts').select('*, profiles:user_id(username, full_name, avatar_url, reputation, badge)');

  if (postType) {
    query = query.eq('post_type', postType);
  }

  query = query.order(orderBy, { ascending: false }).limit(limit);

  const { data } = await query;
  return data;
}

type Tab = 'all' | 'questions' | 'discussions' | 'stories' | 'popular';

const TABS: { key: Tab; label: string }[] = [
  { key: 'all', label: 'Sab' },
  { key: 'discussions', label: 'Charcha' },
  { key: 'questions', label: 'Sawaal' },
  { key: 'stories', label: 'Kahani' },
  { key: 'popular', label: 'Popular' },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    const postType = activeTab === 'questions' ? 'question' : activeTab === 'discussions' ? 'discussion' : activeTab === 'stories' ? 'story' : undefined;
    const orderBy = activeTab === 'popular' ? 'likes_count' : 'created_at';

    getPosts({ postType, orderBy, limit: 30 }).then((data) => {
      setPosts(mapPostsToPostWithAuthor(data ?? []));
      setLoading(false);
    });
  }, [activeTab]);

  const filtered = search
    ? posts.filter((p) => p.content.toLowerCase().includes(search.toLowerCase()) || (p.title ?? '').toLowerCase().includes(search.toLowerCase()))
    : posts;

  return (
    <AuthProvider>
      <Header />
      <main className="pt-14 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 py-4">
          {/* Search */}
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Community mein dhundhen..." className="input-field pl-9" />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4">
            {TABS.map(({ key, label }) => (
              <button key={key} onClick={() => setActiveTab(key)} className={clsx(
                'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors',
                activeTab === key ? 'bg-brand-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              )}>
                {label}
              </button>
            ))}
          </div>

          {/* Posts */}
          <div className="flex flex-col gap-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card p-4 space-y-3">
                  <div className="skeleton h-4 w-1/3" />
                  <div className="skeleton h-3 w-full" />
                  <div className="skeleton h-3 w-2/3" />
                </div>
              ))
            ) : filtered.length === 0 ? (
              <div className="card p-8 text-center">
                <p className="text-gray-400 dark:text-gray-500">Koi post nahi mila</p>
              </div>
            ) : (
              filtered.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>
        </div>
      </main>
      <BottomNav />
    </AuthProvider>
  );
}
