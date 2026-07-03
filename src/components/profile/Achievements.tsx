'use client';
import { Medal, Star, Zap } from 'lucide-react';

const achievementsData = [
    { icon: <Medal/>, title: "First Workout", description: "Completed your first workout session." },
    { icon: <Star/>, title: "Workout Streak", description: "Completed workouts for 5 consecutive days." },
    { icon: <Zap/>, title: "Energy Boost", description: "Burned over 500 calories in a single workout." },
]

export function Achievements() {
    return (
        <div className="bg-[#1E293B]/60 p-6 rounded-2xl">
            <h3 className="text-lg font-bold mb-4">Achievements</h3>
            <div className="space-y-4">
                {achievementsData.map(item => (
                    <div key={item.title} className="flex items-center bg-[#293548]/70 p-4 rounded-lg">
                        <div className="p-2 bg-gray-600/50 rounded-full mr-4">{item.icon}</div>
                        <div>
                            <p className="font-bold">{item.title}</p>
                            <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}