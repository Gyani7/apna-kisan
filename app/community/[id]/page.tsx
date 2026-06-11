'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation'; // CORRECT: Import useParams hook
import { ArrowLeft, Heart, MessageCircle, Share2, Bookmark, Send, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import AuthProvider, { useAuth } from '@/components/AuthProvider';
import { createBrowser } from '@/lib/supabase/utils';
import { mapPostToPostWithAuthor, RawPost } from '@/lib/mappers';
import { timeAgo, formatCount, POST_TYPE_CONFIG, type PostWithAuthor } from '@/lib/types';
import clsx from 'clsx';

const supabase = createBrowser();

// These functions are now defined in this file to use the client instance
async function getComments(postId: string) {
  const { data } = await supabase.from('comments').select('*, profiles(*)').eq('post_id', postId).order('created_at');
  return data;
}

async function addComment(postId: string, userId: string, content: string) {
  const { data } = await supabase.from('comments').insert([{ post_id: postId, user_id: userId, content }]).select('*, profiles(*)');
  return { data };
}

async function toggleLike(postId: string, userId: string) {
    await supabase.rpc('toggle_post_like', { p_post_id: postId, p_user_id: userId });
}

async function toggleBookmark(postId: string, userId: string) {
    await supabase.rpc('toggle_post_bookmark', { p_post_id: postId, p_user_id: userId });
}

// Mappers and types can remain as they are or be moved if preferred
interface CommentWithAuthor {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  author: { username: string; full_name: string | null; avatar_url: string | null; badge: string } | null;
}

function mapComment(c: any): CommentWithAuthor {
  return {
    id: c.id,
    content: c.content,
    created_at: c.created_at,
    user_id: c.user_id,
    author: c.profiles,
  };
}

// CORRECT: Component receives no props; params are accessed via hook
export default function PostDetailPage() {
  const params = useParams();
  const postId = params.id as string; // CORRECT: Get ID directly from params

  const [post, setPost] = useState<PostWithAuthor | null>(null);
  const [comments, setComments] = useState<CommentWithAuthor[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { user } = useAuth();

  // CORRECT: Simplified data fetching logic triggered by postId
  useEffect(() => {
    if (!postId) return;

    // Fetch post details
    supabase.from('posts').select('*, profiles:user_id(username, full_name, avatar_url, reputation, badge, location)').eq('id', postId).single().then(({ data }) => {
      if (data) {
        const mapped = mapPostToPostWithAuthor(data as RawPost);
        setPost(mapped);
        setLikesCount(mapped.likes_count);
      }
    });

    // Fetch comments
    getComments(postId).then((data) => {
      if (data) setComments(data.map(mapComment));
    });
  }, [postId]);

  async function handleComment() {
    if (!user || !newComment.trim() || !postId) return;
    const { data } = await addComment(postId, user.id, newComment.trim());
    // OPTIMIZED: Added null and length check for type safety
    if (data && data.length > 0) {
      setComments([...comments, mapComment(data[0])]);
      setNewComment('');
    }
  }

  if (!post) {
    return (
      <AuthProvider>
        <Header />
        <main className="pt-14 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="max-w-2xl mx-auto px-4 py-8 text-center">
            <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </main>
        <BottomNav />
      </AuthProvider>
    );
  }

  const authorName = post.author?.full_name ?? post.author?.username ?? 'Kisan';
  const config = POST_TYPE_CONFIG[post.post_type];

  return (
    <AuthProvider>
      <Header />
      <main className="pt-14 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Link href="/community" className="inline-flex items-center gap-1 text-sm text-brand-600 dark:text-brand-400 font-medium hover:underline mb-4">
            <ArrowLeft size={14} />Wapas
          </Link>

          <article className="card p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              {post.author?.avatar_url ? (
                <Image src={post.author.avatar_url} alt="" width={44} height={44} className="rounded-full object-cover" />
              ) : (
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-sm">{authorName[0]}</div>
              )}
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{authorName}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  {post.author?.location && <><MapPin size={10} />{post.author.location}<span>&middot;</span></>}
                  <span>{timeAgo(post.created_at)}</span>
                </div>
              </div>
              <span className={clsx('ml-auto badge', config.color, config.bgColor)}>{config.labelHi}</span>
            </div>

            {post.title && <h1 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">{post.title}</h1>}
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>

            {post.image_url && (
              <div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800 mt-3 rounded-xl overflow-hidden">
                <Image src={post.image_url} alt="" fill className="object-cover" sizes="672px" />
              </div>
            )}

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <button onClick={async () => { if (!user) return; setIsLiked(!isLiked); setLikesCount(isLiked ? likesCount - 1 : likesCount + 1); await toggleLike(postId, user.id); }} className={clsx('flex items-center gap-1.5 transition-colors', isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-red-400')}>
                  <Heart size={20} className={clsx(isLiked && 'fill-current')} /><span className="text-sm font-medium">{formatCount(likesCount)}</span>
                </button>
                <button className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400"><MessageCircle size={20} /><span className="text-sm font-medium">{formatCount(post.comments_count)}</span></button>
                <button className="text-gray-500 dark:text-gray-400"><Share2 size={20} /></button>
              </div>
              <button onClick={async () => { if (!user) return; setIsBookmarked(!isBookmarked); await toggleBookmark(postId, user.id); }} className={clsx(isBookmarked ? 'text-brand-600 dark:text-brand-400' : 'text-gray-400 dark:text-gray-500')}>
                <Bookmark size={20} className={clsx(isBookmarked && 'fill-current')} />
              </button>
            </div>
          </article>

          {/* Comments */}
          <div className="card p-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-3">Comments ({comments.length})</h3>

            {comments.length === 0 ? (
              <p className="text-gray-400 dark:text-gray-500 text-sm text-center py-4">Koi comment nahi hai. Pehla comment karein!</p>
            ) : (
              <div className="flex flex-col gap-3 mb-4">
                {comments.map((c) => {
                  const cName = c.author?.full_name ?? c.author?.username ?? 'Kisan';
                  return (
                    <div key={c.id} className="flex items-start gap-2.5">
                      {c.author?.avatar_url ? (
                        <Image src={c.author.avatar_url} alt="" width={32} height={32} className="rounded-full object-cover mt-0.5" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">{cName[0]}</div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{cName}</span>
                          <span className="text-[11px] text-gray-400">{timeAgo(c.created_at)}</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">{c.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {user && (
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleComment()} placeholder="Apna comment likhein..." className="input-field flex-1" />
                <button onClick={handleComment} disabled={!newComment.trim()} className="btn-primary px-3 py-2"><Send size={16} /></button>
              </div>
            )}
          </div>
        </div>
      </main>
      <BottomNav />
    </AuthProvider>
  );
}
