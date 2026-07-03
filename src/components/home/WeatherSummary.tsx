'use client';
import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain } from 'lucide-react';

const weatherData = {
  location: 'Bhopal, MP',
  temperature: '32°C',
  condition: 'Sunny',
  icon: <Sun className="w-16 h-16 text-yellow-400" />,
};

export function WeatherSummary() {
  return (
    <motion.div 
      className="bg-[#1E293B]/60 p-6 rounded-2xl shadow-lg flex items-center justify-between"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <p className="text-gray-400">{weatherData.location}</p>
        <p className="text-5xl font-bold">{weatherData.temperature}</p>
        <p className="text-lg text-gray-300">{weatherData.condition}</p>
      </div>
      <div>
        {weatherData.icon}
      </div>
    </motion.div>
  );
}
