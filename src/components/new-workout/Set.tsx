'use client';

import { Check, Trash } from "lucide-react";

interface SetProps {
    setNumber: number;
}

export function Set({ setNumber }: SetProps) {
    return (
        <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-[#1E293B] flex items-center justify-center text-sm">
                {setNumber}
            </div>
            <input type="number" placeholder="Reps" className="bg-[#1E293B] border-none text-white w-full p-3 rounded-md" />
            <input type="number" placeholder="Weight" className="bg-[#1E293B] border-none text-white w-full p-3 rounded-md" />
            <button className="bg-green-500 p-3 rounded-md">
                <Check size={16} />
            </button>
        </div>
    )
}