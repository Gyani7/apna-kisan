'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Image as ImageIcon, Video, X, Send, MapPin } from 'lucide-react';

export default function CreatePostPage() {
  const [content, setContent] = useState('');

  return (
    <>
      <Header />
      <main className="pt-14 pb-20 min-h-screen bg-gray-50">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 text-base">Nai Post Banayein</h2>
              <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                AK
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Apni baat likhen, kisan bhai... fasal ki khabar, sawaal, ya koi tips?"
                rows={5}
                className="flex-1 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none leading-relaxed"
              />
            </div>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
              <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 px-3 py-2 rounded-xl hover:bg-green-50 transition-colors">
                <ImageIcon size={18} className="text-green-500" />
                <span className="font-medium">Photo</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 px-3 py-2 rounded-xl hover:bg-green-50 transition-colors">
                <Video size={18} className="text-blue-500" />
                <span className="font-medium">Video</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 px-3 py-2 rounded-xl hover:bg-green-50 transition-colors">
                <MapPin size={18} className="text-red-400" />
                <span className="font-medium">Location</span>
              </button>
              <div className="flex-1" />
              <button
                disabled={!content.trim()}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-700 active:scale-95 transition-all"
              >
                <Send size={15} />
                Post Karein
              </button>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
