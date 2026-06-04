'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';

const STORIES = [
  { id: '1', name: 'Meri Story', isOwn: true },
  { id: '2', name: 'Ramesh', location: 'Punjab', image: 'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg' },
  { id: '3', name: 'Sunita', location: 'Maharashtra', image: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg' },
  { id: '4', name: 'Arjun', location: 'Gujarat', image: 'https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg' },
  { id: '5', name: 'Meera', location: 'Rajasthan', image: null },
  { id: '6', name: 'Vijay', location: 'Telangana', image: 'https://images.pexels.com/photos/3902882/pexels-photo-3902882.jpeg' },
];

export default function StoriesBar() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 py-4">
      <div className="flex gap-3 px-4 overflow-x-auto hide-scrollbar">
        {STORIES.map((story) => (
          <button key={story.id} className="flex flex-col items-center gap-1.5 shrink-0 group">
            {story.isOwn ? (
              <div className="relative w-14 h-14 rounded-full bg-gray-100 border-2 border-dashed border-green-400 flex items-center justify-center group-hover:border-green-500 transition-colors">
                <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
                  <Plus size={12} className="text-white" />
                </div>
              </div>
            ) : (
              <div className="w-14 h-14 rounded-full ring-2 ring-green-500 ring-offset-2 overflow-hidden group-hover:ring-green-600 transition-colors">
                {story.image ? (
                  <Image
                    src={story.image}
                    alt={story.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-sm">
                    {story.name[0]}
                  </div>
                )}
              </div>
            )}
            <span className="text-[11px] text-gray-600 font-medium max-w-[56px] truncate">
              {story.isOwn ? 'Add Story' : story.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
