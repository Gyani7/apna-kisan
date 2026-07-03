'use client';
import { Search, Bell, Sun, Moon, User } from "lucide-react";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function ExploreHeader() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <motion.header 
        className="sticky top-0 z-50 flex items-center justify-between p-4 bg-[#0B1220]/80 backdrop-blur-lg"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Apna Kisan Logo" className="h-8 w-8" />
        <div>
            <h1 className="text-lg font-bold text-green-400">Apna Kisan</h1>
            <p className="text-xs text-gray-400">Kisan Se Kisan Tak</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Search className="text-white" />
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Bell className="text-white" />
        </motion.button>
        <motion.button 
            onClick={() => setIsDark(!isDark)} 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
            className="relative w-6 h-6"
        >
            <motion.div animate={{ rotate: isDark ? 180 : 0, opacity: isDark ? 0 : 1 }} transition={{ duration: 0.3}} style={{ position: 'absolute' }}>
                <Sun className="text-white" />
            </motion.div>
            <motion.div animate={{ rotate: isDark ? 0 : -180, opacity: isDark ? 1 : 0 }} transition={{ duration: 0.3}} style={{ position: 'absolute' }}>
                <Moon className="text-white" />
            </motion.div>
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <User className="text-white" />
        </motion.button>
      </div>
    </motion.header>
  );
}
