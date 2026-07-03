'use client';
import { ChevronRight } from "lucide-react";

interface WorkoutCardProps {
    title: string;
    description: string;
}

export function WorkoutCard({ title, description }: WorkoutCardProps) {
    return (
        <div className="bg-[#1E293B]/60 p-6 rounded-2xl flex justify-between items-center">
            <div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-gray-400">{description}</p>
            </div>
            <ChevronRight />
        </div>
    )
}