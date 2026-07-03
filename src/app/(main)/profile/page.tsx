'use client';
import { BottomNav } from '@/components/BottomNav';
import { Achievements, Progress, ProfileHeader, Stats } from '@/components/profile';
import { motion } from 'framer-motion';

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

export default function ProfilePage() {
  return (
    <div className="bg-[#0B1220] min-h-screen text-white">
        <ProfileHeader />
        <main className="p-4 pb-24">
            <motion.div 
                className="space-y-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants}>
                    <Stats />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <Achievements />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <Progress />
                </motion.div>
            </motion.div>
        </main>
      <BottomNav />
    </div>
  );
}
