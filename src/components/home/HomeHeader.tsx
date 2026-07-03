'use client';
import { motion } from 'framer-motion';
import { Bell, Settings } from 'lucide-react';
import AgriConnectLogo from '../AgriConnectLogo';

export function HomeHeader() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-[#0B1220]/80 backdrop-blur-lg">
      <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AgriConnectLogo />
      </motion.div>
      <div className="flex items-center space-x-4">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 rounded-full hover:bg-white/10">
          <Bell />
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 rounded-full hover:bg-white/10">
          <Settings />
        </motion.button>
      </div>
    </header>
  );
}
