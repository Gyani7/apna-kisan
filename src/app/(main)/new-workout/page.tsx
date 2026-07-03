'use client';
import { BottomNav } from "@/components/BottomNav";
import { WorkoutForm } from "@/components/new-workout";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
};

export default function NewWorkoutPage() {
    return (
        <div className="bg-[#0B1220] min-h-screen text-white">
            <main className="p-4 pb-24">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    <motion.h1 variants={itemVariants} className="text-3xl font-bold">
                        New Workout
                    </motion.h1>
                    <motion.div variants={itemVariants}>
                        <WorkoutForm />
                    </motion.div>
                </motion.div>
            </main>
            <BottomNav />
        </div>
    )
}