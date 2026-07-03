'use client';

import { useState } from 'react';
import { Plus } from "lucide-react";
import { Exercise } from "./Exercise";

export function WorkoutForm() {
    const [exercises, setExercises] = useState([1]);

    const addExercise = () => {
        setExercises([...exercises, exercises.length + 1]);
    };

    return (
        <div className="space-y-4">
            <input placeholder="Workout Name (e.g. Push Day)" className="bg-[#1E293B] border-none text-white w-full p-3 rounded-md" />
            <div className="space-y-4">
                {exercises.map((exerciseNumber) => (
                    <Exercise key={exerciseNumber} />
                ))}
            </div>
            <button onClick={addExercise} className="w-full flex items-center justify-center gap-2 bg-blue-500 p-3 rounded-md">
                <Plus size={16} />
                Add Exercise
            </button>
        </div>
    )
}