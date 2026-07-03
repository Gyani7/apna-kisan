'use client';
import { BottomNav } from "@/components/BottomNav";
import { ActivityCard } from "@/components/activity";
import { motion } from "framer-motion";

const activityData = [
    { 
        username: "John Doe", 
        avatarUrl: "https://github.com/shadcn.png", 
        activityText: "Just crushed a 5k run! Feeling amazing!", 
        timestamp: "2 hours ago", 
        likes: 15, 
        isLiked: true 
    },
    { 
        username: "Jane Smith", 
        avatarUrl: "https://github.com/shadcn.png", 
        activityText: "Morning yoga session done. Ready to take on the day!", 
        timestamp: "3 hours ago", 
        likes: 22, 
        isLiked: false 
    },
    { 
        username: "Peter Jones", 
        avatarUrl: "https://github.com/shadcn.png", 
        activityText: "New personal best on my bench press today!", 
        timestamp: "5 hours ago", 
        likes: 30, 
        isLiked: true 
    },
]

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

export default function ActivityPage() {
    return (
        <div className="bg-[#0B1220] min-h-screen text-white">
            <main className="p-4 pb-24">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    <motion.h1 variants={itemVariants} className="text-3xl font-bold">Activity</motion.h1>
                    <motion.div variants={itemVariants} className="space-y-4">
                        {activityData.map((activity, index) => (
                            <ActivityCard key={index} {...activity} />
                        ))}
                    </motion.div>
                </motion.div>
            </main>
            <BottomNav />
        </div>
    )
}