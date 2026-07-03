'use client';
import { useState } from 'react';
import { Plus } from "lucide-react";
import { SelectExercise } from "./SelectExercise";
import { Set } from "./Set";

export function Exercise() {
    const [sets, setSets] = useState([1]);

    const addSet = () => {
        setSets([...sets, sets.length + 1]);
    };

    return (
        <div className="bg-[#1E293B] p-4 rounded-md space-y-4">
            <SelectExercise />
            <div className="space-y-2">
                {sets.map((setNumber) => (
                    <Set key={setNumber} setNumber={setNumber} />
                ))}
            </div>
            <button onClick={addSet} className="w-full flex items-center justify-center gap-2 bg-blue-500/10 p-3 rounded-md text-blue-400">
                <Plus size={16} />
                Add Set
            </button>
        </div>
    )
}