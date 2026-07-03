'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

interface ExerciseDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (exercise: any) => void;
}

export function ExerciseDialog({ isOpen, onClose, onSelect }: ExerciseDialogProps) {
    const [exercises, setExercises] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchExercises() {
            const response = await fetch('https://wger.de/api/v2/exerciseinfo/?language=2&limit=385');
            const data = await response.json();
            setExercises(data.results);
        }

        fetchExercises();
    }, []);

    const filteredExercises = exercises.filter(exercise => 
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#1E293B] border-none text-white">
                <DialogHeader>
                    <DialogTitle>Select Exercise</DialogTitle>
                </DialogHeader>
                <input 
                    type="text" 
                    placeholder="Search exercises..." 
                    className="bg-[#0B1220] p-2 rounded-md w-full mb-4"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="grid grid-cols-3 gap-4 h-96 overflow-y-auto">
                    {filteredExercises.map((exercise) => (
                        <div key={exercise.id} onClick={() => onSelect(exercise)} className="bg-[#0B1220] p-4 rounded-md cursor-pointer hover:bg-blue-500/20">
                            {exercise.name}
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}