'use client';
import { BottomNav } from '@/components/BottomNav';
import { WeatherHeader, CurrentWeather, WeatherInfo, Forecast } from '@/components/weather';
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

export default function WeatherPage() {
  return (
    <div className="bg-[#0B1220] min-h-screen text-white">
        <WeatherHeader />
        <main className="p-4 pb-24">
            <motion.div 
                className="space-y-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants}>
                    <CurrentWeather />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <WeatherInfo />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <Forecast />
                </motion.div>
            </motion.div>
        </main>
      <BottomNav />
    </div>
  );
}
