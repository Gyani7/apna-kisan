'use client';

import { Reel } from '@/lib/types';
import { useRef, useState, useEffect } from 'react';

export function ReelCard({ reel }: { reel: Reel }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    
    return (
        <div className="relative w-full h-[70vh] bg-black rounded-lg overflow-hidden">
            <video
                ref={videoRef}
                src={reel.video_url}
                loop
                className="w-full h-full object-contain"
                onClick={togglePlay}
            />

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-sm font-semibold">{reel.caption}</p>
            </div>

            {!isPlaying && (
                <div 
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer"
                    onClick={togglePlay}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white opacity-80" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                </div>
            )}
        </div>
    );
}
