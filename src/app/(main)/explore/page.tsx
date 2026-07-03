
'use client';
import { 
    ExploreHeader, 
    CategoryGrid, 
    TrendingTags, 
    MandiBhavCard, 
    WeeklyLeaderboard 
} from "@/components/explore";
import { BottomNav } from "@/components/BottomNav";
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

export default function ExplorePage() {
  return (
    <div className="bg-[#0B1220] min-h-screen text-white">
      <ExploreHeader />
      <main className="p-4 pb-24">
        <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl font-bold">Explore</h1>
            <p className="text-gray-400">Discover farming knowledge, mandi prices and government schemes.</p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <CategoryGrid />
          </motion.div>
          <motion.div variants={itemVariants}>
            <TrendingTags />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MandiBhavCard />
          </motion.div>
          <motion.div variants={itemVariants}>
            <WeeklyLeaderboard />
          </motion.div>
        </motion.div>
      </main>
      <BottomNav />
    </div>
  );
}
