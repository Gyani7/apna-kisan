'use client';

import { useState } from "react";
import { ExerciseDialog } from "./ExerciseDialog";

export function SelectExercise() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState<any>(null);

    const handleSelectExercise = (exercise: any) => {
        setSelectedExercise(exercise);
        setIsDialogOpen(false);
    }

    return (
        <div>
            <button onClick={() => setIsDialogOpen(true)} className="bg-blue-500 p-3 rounded-md w-full">
                {selectedExercise ? selectedExercise.name : "Select Exercise"}
            </button>
            <ExerciseDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} onSelect={handleSelectExercise} />
        </div>
    )
}