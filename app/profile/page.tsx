'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Settings, MapPin, LocationEdit as Edit2, Trophy, Star, Sprout, Award } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import PostCard from '@/components/PostCard';
import AuthProvider, { useAuth } from '@/components/AuthProvider';
import { getPosts, updateProfile, uploadFile, BUCKETS } from '@/lib/supabase';
import { mapPostsToPostWithAuthor } from '@/lib/mappers';
import type { PostWithAuthor } from '@/lib/types';
import type { ProfileRow } from '@/lib/database.types';
import clsx from 'clsx';

const BADGE_ICONS: Record<string, typeof Sprout> = { 'New Kisan': Sprout, 'Verified Kisan': Star, 'Expert Kisan': Award, 'Organic Farmer': Sprout };

function ProfileContent() {
  const { user, profile, refreshProfile } = useAuth();
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [activeTab, setActiveTab] = useState<'posts' | 'stories' | 'answers'>('posts');
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editLocation, setEditLocation] = useState('');

  useEffect(() => {
    if (!user) return;
    getPosts({ limit: 20 }).then((data) => {
      const typed = mapPostsToPostWithAuthor(data ?? []).filter((p) => p.user_id === user.id);
      setPosts(typed);
    });
  }, [user]);

  useEffect(() => {
    if (profile) {
      setEditName(profile.full_name ?? '');
      setEditBio(profile.bio ?? '');
      setEditLocation(profile.location ?? '');
    }
  }, [profile]);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!user || !e.target.files?.[0]) return;
    const file = e.target.files[0];
    const path = `${user.id}/avatar-${Date.now()}.${file.name.split('.').pop()}`;
    const url = await uploadFile(BUCKETS.avatars, path, file);
    if (url) {
      await updateProfile(user.id, { avatar_url: url });
      refreshProfile();
    }
  }

  async function handleSaveProfile() {
    if (!user) return;
    await updateProfile(user.id, { full_name: editName, bio: editBio, location: editLocation });
    refreshProfile();
    setEditing(false);
  }

  if (!user || !profile) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sprout size={36} className="text-brand-600 dark:text-brand-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Apna Profile</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Profile dekhne ke liye login karein</p>
        <Link href="/auth" className="btn-primary inline-block">Login Karein</Link>
      </div>
    );
  }

  const initials = (profile.full_name ?? profile.username).split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div>
      {/* Cover */}
      <div className="h-36 bg-gradient-to-r from-brand-600 to-brand-400 dark:from-brand-800 dark:to-brand-600 relative">
        <button className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/30 transition-colors">
          <Settings size={18} />
        </button>
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-end justify-between -mt-10 mb-4">
          <label className="relative cursor-pointer">
            {profile.avatar_url ? (
              <Image src={profile.avatar_url} alt="" width={80} height={80} className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-2xl font-bold border-4 border-white dark:border-gray-800 shadow-md">{initials}</div>
            )}
            <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </label>
          <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 border border-brand-600 text-brand-600 dark:text-brand-400 dark:border-brand-400 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-brand-600 hover:text-white dark:hover:bg-brand-600 dark:hover:text-white transition-colors">
            <Edit2 size={14} />Edit Profile
          </button>
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{profile.full_name ?? profile.username}</h2>
        <div className="flex items-center gap-1 mt-1 text-gray-500 dark:text-gray-400 text-sm">
          <MapPin size={13} className="text-brand-500" />
          <span>{profile.location ?? 'Location add karein'}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">{profile.bio ?? 'Apne baare mein bataiye...'}</p>

        {/* Badges & Reputation */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="badge bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400">
            <Trophy size={11} className="mr-1" />{profile.reputation} pts
          </span>
          <span className="badge bg-earth-100 dark:bg-earth-900/30 text-earth-700 dark:text-earth-400">
            {(() => { const Icon = BADGE_ICONS[profile.badge] ?? Sprout; return <Icon size={11} className="mr-1" />; })()}
            {profile.badge}
          </span>
        </div>

        {/* Stats */}
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

        {/* Tabs */}
        <div className="flex gap-2 mt-4">
          {(['posts', 'stories', 'answers'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={clsx(
              'px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors',
              activeTab === tab ? 'bg-brand-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            )}>{tab}</button>
          ))}
        </div>

        {/* Posts */}
        <div className="flex flex-col gap-4 mt-4">
          {posts.length === 0 ? (
            <p className="text-center text-gray-400 dark:text-gray-500 py-8">Abhi koi post nahi hai</p>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} compact />)
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="card p-6 w-full max-w-md animate-scale-in">
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-4">Profile Edit Karein</h3>
            <div className="space-y-3">
              <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Apna naam" className="input-field" />
              <input type="text" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} placeholder="Location" className="input-field" />
              <textarea value={editBio} onChange={(e) => setEditBio(e.target.value)} placeholder="Apne baare mein" rows={3} className="input-field resize-none" />
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setEditing(false)} className="btn-ghost flex-1">Cancel</button>
              <button onClick={handleSaveProfile} className="btn-primary flex-1">Save Karein</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthProvider>
      <Header />
      <main className="pt-14 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-lg mx-auto">
          <ProfileContent />
        </div>
      </main>
      <BottomNav />
    </AuthProvider>
  );
}
