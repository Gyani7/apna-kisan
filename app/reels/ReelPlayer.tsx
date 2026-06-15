'use client';

import { useState, useEffect, useRef, useTransition } from 'react';
import { Heart, MessageCircle, Send, Loader2 } from 'lucide-react';
import { toggleLike, addComment, LikeActionResult, ActionResult } from '@/lib/actions/reels';
import type { ReelData } from '@/lib/types'; 

interface ReelPlayerProps {
  reel: ReelData;
  currentUserLiked: boolean;
}

export default function ReelPlayer({ reel, currentUserLiked }: ReelPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showComments, setShowComments] = useState(false);
  
  // Optimistic UI states
  const [optimisticLiked, setOptimisticLiked] = useState(currentUserLiked);
  const [optimisticLikesCount, setOptimisticLikesCount] = useState(reel.likes_count ?? 0);
  const [optimisticComments, _setOptimisticComments] = useState(reel.comments ?? []);

  let [isLikePending, startLikeTransition] = useTransition();
  let [isCommentPending, startCommentTransition] = useTransition();

  // --- Intersection Observer Logic for Smart Playback ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().then(() => setIsPlaying(true)).catch(_e => console.log('Autoplay prevented'));
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 } // Play when 60% of the video is visible
    );

    const currentVideoRef = videoRef.current;
    if (currentVideoRef) {
      observer.observe(currentVideoRef);
    }

    return () => {
      if (currentVideoRef) {
        observer.unobserve(currentVideoRef);
      }
    };
  }, []);

  // --- Server Action Handlers ---
  const handleLike = () => {
    startLikeTransition(async () => {
      // Optimistic update
      setOptimisticLiked(prev => !prev);
      setOptimisticLikesCount(prev => optimisticLiked ? prev - 1 : prev + 1);

      const result: LikeActionResult = await toggleLike(reel.id);

      if (!result.success) {
        // Revert on failure
        setOptimisticLiked(currentUserLiked);
        setOptimisticLikesCount(reel.likes_count ?? 0);
        // Optionally show an error toast
      }
    });
  };

  const handleAddComment = async (formData: FormData) => {
    startCommentTransition(async () => {
        const result: ActionResult = await addComment(formData);
        if(result.success) {
            // On success, revalidation will fetch new comments.
            // Optionally, you can clear the form here.
        } else {
            // Handle comment submission error
        }
    });
  };

  const handleVideoClick = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="h-full w-full snap-start relative flex items-center justify-center bg-black">
      <video
        ref={videoRef}
        src={reel.video_url}
        loop
        playsInline
        onClick={handleVideoClick}
        className="object-contain h-full w-full z-0"
        preload="metadata" // Only load metadata initially
      />

      {/* --- Overlay UI --- */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent z-10">
        <p className="text-white font-bold">{reel.user?.full_name ?? 'Anonymous'}</p>
        <p className="text-white text-sm mt-1">{reel.caption}</p>
      </div>

      {/* --- Side Action Bar --- */}
      <div className="absolute right-2 bottom-20 flex flex-col items-center space-y-4 z-10">
        <button onClick={handleLike} disabled={isLikePending} className="text-white">
          <Heart size={30} fill={optimisticLiked ? '#E5245E' : 'transparent'} />
          <span className="text-xs font-semibold">{optimisticLikesCount}</span>
        </button>
        <button onClick={() => setShowComments(prev => !prev)} className="text-white">
          <MessageCircle size={30} />
          <span className="text-xs font-semibold">{reel.comments_count ?? 0}</span>
        </button>
      </div>

      {/* --- Comments Section --- */}
      {showComments && (
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-black/80 backdrop-blur-sm z-20 flex flex-col p-4">
          <h4 className="font-bold text-white mb-2">Comments</h4>
          <div className="flex-grow overflow-y-auto space-y-3">
            {optimisticComments && optimisticComments.length > 0 ? (
              optimisticComments.map((comment) => (
                comment && (
                  <div key={comment.id} className="text-white text-sm flex space-x-2">
                    <span className="font-bold">{comment.user?.full_name ?? 'User'}:</span>
                    <span>{comment.content}</span>
                  </div>
                )
              ))
            ) : (
              <p className="text-gray-400 text-sm">No comments yet.</p>
            )}
          </div>
          <form action={handleAddComment} className="mt-2 flex gap-2">
            <input type="hidden" name="reel_id" value={reel.id} />
            <input
              type="text"
              name="comment"
              placeholder="Add a comment..."
              required
              className="flex-grow bg-gray-700 text-white rounded-full px-4 py-2 text-sm focus:outline-none"
            />
            <button type="submit" disabled={isCommentPending} className="p-2 text-white bg-rose-600 rounded-full">
                {isCommentPending ? <Loader2 className="animate-spin" size={20}/> : <Send size={20}/>}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
