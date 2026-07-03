'use client';

import { ChevronRight } from "lucide-react";

export function LatestActivity() {
    return (
        <div className="bg-[#1E293B]/60 p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Latest Activity</h3>
                <button className="flex items-center text-gray-400">
                    See all
                    <ChevronRight size={16} />
                </button>
            </div>
            <div>
                <p>You haven't recorded any activity yet.</p>
            </div>
        </div>
    )
}