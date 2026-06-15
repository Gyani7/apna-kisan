'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { MessageSquare, CircleHelp as HelpCircle, BookOpen, X, Send, ImagePlus, Tag } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import AuthProvider, { useAuth } from '@/components/AuthProvider';
import { createBrowserClient } from '@/lib/supabase/client';
import { CATEGORIES } from '@/lib/types';
import type { PostType } from '@/lib/types';
import clsx from 'clsx';

const supabase = createBrowserClient();

const BUCKETS = {
    posts: 'posts',
    avatars: 'avatars',
};

async function createPost(post: any) {
    return await supabase.from('posts').insert(post);
}

async function uploadFile(bucket: string, path: string, file: File) {
    const { data, error } = await supabase.storage.from(bucket).upload(path, file);
    if (error) {
        console.error('Error uploading file:', error);
        return null;
    }
    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path);
    return publicUrl;
}


const POST_TYPES: { key: PostType; label: string; labelHi: string; icon: typeof MessageSquare; color: string }[] = [
  { key: 'discussion', label: 'Discussion', labelHi: 'Charcha', icon: MessageSquare, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700' },
  { key: 'question', label: 'Question', labelHi: 'Sawaal', icon: HelpCircle, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-700' },
  { key: 'story', label: 'Story', labelHi: 'Kahani', icon: BookOpen, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700' },
];

function CreateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, profile } = useAuth();
  const [postType, setPostType] = useState<PostType>((searchParams.get('type') as PostType) ?? 'discussion');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const initials = profile?.full_name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) ?? 'AK';

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function addTag() {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput('');
  }

  async function handleSubmit() {
    if (!user || !content.trim()) return;
    setSubmitting(true);

    let imageUrl: string | null = null;
    if (imageFile) {
      const path = `${user.id}/${Date.now()}-${imageFile.name}`;
      imageUrl = await uploadFile(BUCKETS.posts, path, imageFile);
    }

    const slug = postType === 'story' && title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now().toString(36) : null;
    const readTime = postType === 'story' ? Math.max(1, Math.ceil(content.split(' ').length / 200)) : null;
    const excerpt = content.length > 150 ? content.slice(0, 150) + '...' : content;

    const { error } = await createPost({
      user_id: user.id,
      title: title || null,
      content,
      image_url: imageUrl,
      post_type: postType,
      category: category || null,
      tags,
      slug,
      excerpt,
      read_time: readTime,
    });

    if (!error) {
      router.push('/');
    }
    setSubmitting(false);
  }

  if (!user) {
    return (
      <div className="card p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">Post karne ke liye <a href="/auth" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">login karein</a></p>
      </div>
    );
  }

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900 dark:text-gray-100 text-base">Nai Post Banayein</h2>
        <button onClick={() => router.back()} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 transition-colors"><X size={18} /></button>
      </div>

      {/* Post Type Selection */}
      <div className="flex gap-2 mb-4">
        {POST_TYPES.map(({ key, labelHi, icon: Icon, color }) => (
          <button key={key} onClick={() => setPostType(key)} className={clsx(
            'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border transition-colors',
            postType === key ? color : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400'
          )}>
            <Icon size={14} />{labelHi}
          </button>
        ))}
      </div>

      {/* Category */}
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-field mb-3">
        <option value="">Category chunein</option>
        {CATEGORIES.map((cat) => <option key={cat.slug} value={cat.slug}>{cat.icon} {cat.nameHi} — {cat.name}</option>)}
      </select>

      {/* Title (for stories/questions) */}
      {(postType === 'story' || postType === 'question') && (
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={postType === 'story' ? 'Story ka title...' : 'Aapka sawaal...'} className="input-field mb-3" />
      )}

      <div className="flex items-start gap-3">
        {profile?.avatar_url ? (
          <Image src={profile.avatar_url} alt="" width={40} height={40} className="rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-sm shrink-0">{initials}</div>
        )}
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Apni baat likhen, kisan bhai..." rows={6} className="flex-1 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent resize-none focus:outline-none leading-relaxed" />
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="relative mt-3">
          <Image src={imagePreview} alt="" width={400} height={300} className="rounded-xl max-h-60 object-cover" />
          <button onClick={() => { setImageFile(null); setImagePreview(null); }} className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70"><X size={14} /></button>
        </div>
      )}

      {/* Tags */}
      <div className="mt-3">
        <div className="flex items-center gap-2">
          <Tag size={14} className="text-gray-400" />
          <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="Tag add karein (Enter dabayein)" className="flex-1 text-sm bg-transparent focus:outline-none text-gray-700 dark:text-gray-300" />
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.map((tag) => (
              <span key={tag} className="badge bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
                #{tag}
                <button onClick={() => setTags(tags.filter((t) => t !== tag))} className="ml-1 hover:text-red-500">&times;</button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
        <label className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 px-3 py-2 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors cursor-pointer">
          <ImagePlus size={18} className="text-brand-500" />
          <span className="font-medium">Photo</span>
          <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
        </label>
        <div className="flex-1" />
        <button disabled={!content.trim() || submitting} onClick={handleSubmit} className="btn-primary flex items-center gap-2">
          <Send size={15} />
          {submitting ? 'Posting...' : 'Post Karein'}
        </button>
      </div>
    </div>
  );
}

export default function CreatePostPage() {
  return (
    <AuthProvider>
      <Header />
      <main className="pt-14 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-lg mx-auto px-4 py-4">
          <Suspense fallback={<div className="card p-8 text-center text-gray-400">Loading...</div>}>
            <CreateForm />
          </Suspense>
        </div>
      </main>
      <BottomNav />
    </AuthProvider>
  );
}
