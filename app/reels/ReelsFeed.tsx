'use client';

import { useState, useTransition, useRef } from 'react';
import { createBrowser } from '@/lib/supabase/utils';
import { createReelRecord, ActionResult } from '@/lib/actions/reels';
import type { ReelData } from './page';
import { Plus, Video, Send, Loader2 } from 'lucide-react';
import ReelPlayer from './ReelPlayer'; // IMPORTING the new V2.8 ReelPlayer

// --- Upload Form Component (Remains for upload functionality) ---
function UploadReelForm() {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<ActionResult | null>(null);
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const supabase = createBrowser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback(null);
    
    const formData = new FormData(e.currentTarget);
    const videoFile = formData.get('video') as File;

    if (!videoFile || videoFile.size === 0) {
      setFeedback({ success: false, message: 'Please select a video file.'});
      return;
    }

    startTransition(async () => {
      try {
        const fileExt = videoFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `reels/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('videos')
          .upload(filePath, videoFile);

        if (uploadError) throw new Error(`Storage Error: ${uploadError.message}`);

        const { data: { publicUrl } } = supabase.storage
          .from('videos')
          .getPublicUrl(filePath);

        if (!publicUrl) throw new Error('Could not retrieve video URL after upload.');

        const newFormData = new FormData();
        newFormData.append('video_url', publicUrl);
        const caption = formData.get('caption');
        if(caption) newFormData.append('caption', caption as string);

        const result = await createReelRecord(newFormData);
        setFeedback(result);

        if(result.success) {
          formRef.current?.reset();
          setShowForm(false);
        }

      } catch (error: any) {
        console.error('Reel Upload Failed: [File Details Masked]', { message: error.message });
        setFeedback({ success: false, message: 'Upload failed. Please try again.' });
      }
    });
  };

  if (!showForm) {
    return (
      <button 
        onClick={() => setShowForm(true)}
        className="fixed bottom-20 right-4 z-20 bg-rose-600 text-white p-4 rounded-full shadow-lg hover:bg-rose-700 transition-transform hover:scale-110"
        aria-label="Upload Reel">
        <Plus size={24} />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-30 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold">Upload a New Reel</h2>
          <div>
            <label htmlFor="video" className="font-semibold">Video File</label>
            <input ref={fileInputRef} id="video" name="video" type="file" accept="video/mp4,video/quicktime" required className="mt-1 w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"/>
          </div>
          <div>
            <label htmlFor="caption" className="font-semibold">Caption</label>
            <textarea id="caption" name="caption" placeholder="Write a caption..." rows={3} className="mt-1 w-full p-2 border rounded-md"></textarea>
          </div>
          {feedback && <div className={`text-sm ${feedback.success ? 'text-green-600' : 'text-red-600'}`}>{feedback.message}</div>}
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} disabled={isPending} className="px-4 py-2 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200">Cancel</button>
            <button type="submit" disabled={isPending} className="px-4 py-2 rounded-md text-white bg-rose-600 hover:bg-rose-700 flex items-center gap-2 disabled:bg-rose-300">
              {isPending ? <><Loader2 className="animate-spin" size={18}/> Publishing...</> : <><Send size={18}/> Publish</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Main Reels Feed Component (V2.8) ---
export default function ReelsFeed({ serverReels, fetchError }: { serverReels: ReelData[], fetchError: string | null }) {
  if (fetchError) {
    return <div className="flex h-screen items-center justify-center bg-gray-50"><p className="text-red-600">{fetchError}</p></div>;
  }

  return (
    <div className="relative h-screen bg-gray-900">
      <div className="absolute top-0 left-0 right-0 z-10 p-4 text-center bg-gradient-to-b from-black/50 to-transparent">
        <h1 className="text-xl font-bold text-white">Apna Kisan Reels</h1>
      </div>
      
      {/* Vertical scrolling container with updated ReelPlayer */}
      <div className="h-full w-full overflow-y-auto snap-y snap-mandatory scroll-smooth">
        {(serverReels && serverReels.length > 0) ? (
          serverReels.map((reel) => (
            // Using the new V2.8 ReelPlayer with all necessary props
            reel && <ReelPlayer key={reel.id} reel={reel} currentUserLiked={reel.user_has_liked_reel} />
          ))
        ) : (
          <div className="h-full snap-start flex flex-col items-center justify-center text-white">
            <Video size={48} className="mb-4"/>
            <h2 className="text-xl font-semibold">No Reels Yet</h2>
            <p className="text-sm opacity-80">Be the first to share a video!</p>
          </div>
        )}
      </div>

      <UploadReelForm />
    </div>
  );
}
