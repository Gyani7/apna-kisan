'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Trophy, Sprout, Star, Award, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import PostCard from '@/components/PostCard';
import AuthProvider, { useAuth } from '@/components/AuthProvider';
import { getProfile, getPosts, toggleFollow, isFollowing } from '@/lib/supabase';
import { mapPostsToPostWithAuthor } from '@/lib/mappers';
import type { ProfileRow } from '@/lib/database.types';
import type { PostWithAuthor } from '@/lib/types';
import clsx from 'clsx';

export default function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const [userId, setUserId] = useState('');
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [following, setFollowing] = useState(false);
  const { user: currentUser } = useAuth();

  useEffect(() => { params.then((p) => setUserId(p.id)); }, [params]);

  useEffect(() => {
    if (!userId) return;
    getProfile(userId).then(setProfile);
    getPosts({ limit: 20 }).then((data) => {
      const typed = mapPostsToPostWithAuthor(data ?? []).filter((p) => p.user_id === userId);
      setPosts(typed);
    });
    if (currentUser && currentUser.id !== userId) {
      isFollowing(currentUser.id, userId).then(setFollowing);
    }
  }, [userId, currentUser]);

  async function handleFollow() {
    if (!currentUser) return;
    setFollowing(!following);
    await toggleFollow(currentUser.id, userId);
  }

  if (!profile) {
    return (
      <AuthProvider>
        <Header />
        <main className="pt-14 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="max-w-lg mx-auto px-4 py-8 text-center">
            <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </main>
        <BottomNav />
      </AuthProvider>
    );
  }

  const isOwn = currentUser?.id === userId;
  const initials = (profile.full_name ?? profile.username).split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <AuthProvider>
      <Header />
      <main className="pt-14 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-lg mx-auto">
          <div className="px-4 pt-4">
            <Link href="/" className="inline-flex items-center gap-1 text-sm text-brand-600 dark:text-brand-400 font-medium hover:underline mb-3">
              <ArrowLeft size={14} />Wapas
            </Link>
          </div>

          <div className="h-36 bg-gradient-to-r from-brand-600 to-brand-400 dark:from-brand-800 dark:to-brand-600" />

          <div className="px-4 pb-4">
            <div className="flex items-end justify-between -mt-10 mb-4">
              {profile.avatar_url ? (
                <Image src={profile.avatar_url} alt="" width={80} height={80} className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-2xl font-bold border-4 border-white dark:border-gray-800 shadow-md">{initials}</div>
              )}
              {!isOwn && (
                <button onClick={handleFollow} className={clsx(
                  'px-4 py-2 rounded-xl text-sm font-semibold transition-colors',
                  following ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300' : 'bg-brand-600 text-white hover:bg-brand-700'
                )}>
                  {following ? 'Following' : 'Follow Karein'}
                </button>
              )}
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{profile.full_name ?? profile.username}</h2>
            {profile.location && (
              <div className="flex items-center gap-1 mt-1 text-gray-500 dark:text-gray-400 text-sm">
                <MapPin size={13} className="text-brand-500" /><span>{profile.location}</span>
              </div>
            )}
            {profile.bio && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">{profile.bio}</p>}

            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="badge bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400"><Trophy size={11} className="mr-1" />{profile.reputation} pts</span>
              <span className="badge bg-earth-100 dark:bg-earth-900/30 text-earth-700 dark:text-earth-400"><Sprout size={11} className="mr-1" />{profile.badge}</span>
            </div>

            <div className="grid grid-cols-3 divide-x divide-gray-100 dark:divide-gray-700 card mt-4">
              <div className="flex flex-col items-center py-4">
                <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{profile.posts_count}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Posts</span>
              </div>
              <div className="flex flex-col items-center py-4">
                <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{profile.followers_count}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Followers</span>
              </div>
              <div className="flex flex-col items-center py-4">
                <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{profile.following_count}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Following</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              {posts.map((post) => <PostCard key={post.id} post={post} compact />)}
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </AuthProvider>
  );
}
