'use client';
import { BottomNav } from "@/components/BottomNav";
import { LatestWorkouts, ProfileHeader, StatCard } from "@/components/me";
import { motion } from "framer-motion";

const stats = [
    { label: "Workouts", value: "0" },
    { label: "Volume", value: "0 kg" },
    { label: "Time", value: "0 min" },
];

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

export default function MePage() {
    return (
        <div className="bg-[#0B1220] min-h-screen text-white">
            <main className="p-4 pb-24">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    <motion.div variants={itemVariants}>
                        <ProfileHeader />
                    </motion.div>
                    <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
                        {stats.map((stat, index) => (
                            <StatCard key={index} {...stat} />
                        ))}
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <LatestWorkouts />
                    </motion.div>
                </motion.div>
            </main>
            <BottomNav />
        </div>
    )
}