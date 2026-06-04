'use client';

import { Image as ImageIcon, Video, ChartBar as BarChart3, Smile } from 'lucide-react';

export default function CreatePostCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 py-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
          AK
        </div>
        <button className="flex-1 text-left px-4 py-2.5 bg-gray-100 rounded-full text-sm text-gray-400 hover:bg-gray-200 transition-colors">
          Apni baat share karein, kisan bhai...
        </button>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <button className="flex items-center gap-1.5 text-gray-500 hover:text-green-600 transition-colors px-2 py-1.5 rounded-lg hover:bg-green-50">
          <ImageIcon size={18} className="text-green-500" />
          <span className="text-xs font-medium">Photo</span>
        </button>
        <button className="flex items-center gap-1.5 text-gray-500 hover:text-green-600 transition-colors px-2 py-1.5 rounded-lg hover:bg-green-50">
          <Video size={18} className="text-blue-500" />
          <span className="text-xs font-medium">Video</span>
        </button>
        <button className="flex items-center gap-1.5 text-gray-500 hover:text-green-600 transition-colors px-2 py-1.5 rounded-lg hover:bg-green-50">
          <BarChart3 size={18} className="text-orange-500" />
          <span className="text-xs font-medium">Poll</span>
        </button>
        <button className="flex items-center gap-1.5 text-gray-500 hover:text-green-600 transition-colors px-2 py-1.5 rounded-lg hover:bg-green-50">
          <Smile size={18} className="text-yellow-500" />
          <span className="text-xs font-medium">Feeling</span>
        </button>
      </div>
    </div>
  );
}
