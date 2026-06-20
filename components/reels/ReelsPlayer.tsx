'''
"use client";

import { useRef, useEffect } from 'react';
import type { Reel } from '@/lib/types';
import { ReelsSidebar } from './ReelsSidebar';
import { useInView } from 'react-intersection-observer';

interface ReelItemProps {
    reel: Reel;
}

const ReelItem = ({ reel }: ReelItemProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { ref, inView } = useInView({
        threshold: 0.8, // Trigger when 80% of the video is visible
    });

    useEffect(() => {
        if (inView) {
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
        }
    }, [inView]);

    const handleVideoClick = () => {
        if (videoRef.current?.paused) {
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
        }
    };

    return (
        <div ref={ref} className="h-full w-full snap-start flex-shrink-0 relative">
            <video
                ref={videoRef}
                src={reel.video_url}
                loop
                playsInline
                className="w-full h-full object-cover"
                onClick={handleVideoClick}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex items-end justify-between">
                    <div className="text-white max-w-[75%]">
                        <h3 className="font-bold">@{reel.author.username}</h3>
                        <p className="text-sm mt-1">{reel.caption}</p>
                    </div>
                    <ReelsSidebar reel={reel} />
                </div>
            </div>
        </div>
    );
};

interface ReelsPlayerProps {
    reels: Reel[];
}

export function ReelsPlayer({ reels }: ReelsPlayerProps) {
    if (!reels || reels.length === 0) {
        return <div className="flex items-center justify-center h-full">No reels to show.</div>;
    }

    return (
        <div className="relative h-[calc(100vh-80px)] w-full max-w-md mx-auto bg-black rounded-lg overflow-y-auto snap-y snap-mandatory scroll-smooth">
            {reels.map((reel) => (
                <ReelItem key={reel.id} reel={reel} />
            ))}
        </div>
    );
}
'''