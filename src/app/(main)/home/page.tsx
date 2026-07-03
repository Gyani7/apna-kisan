'use client';
import { HomeHeader, WeatherSummary, QuickActions, NewsFeed } from '@/components/home';
import { BottomNav } from '@/components/BottomNav';
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

export default function HomePage() {
  return (
    <div className="bg-[#0B1220] min-h-screen text-white">
      <HomeHeader />
      <main className="p-4 pb-24">
        <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants}>
                <h1 className="text-3xl font-bold">Welcome to AgriConnect!</h1>
                <p className="text-gray-400">Your digital companion for modern farming.</p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <WeatherSummary />
            </motion.div>
            <motion.div variants={itemVariants}>
                <QuickActions />
            </motion.div>
            <motion.div variants={itemVariants}>
                <NewsFeed />
            </motion.div>
        </motion.div>
      </main>
      <BottomNav />
    </div>
  );
}
