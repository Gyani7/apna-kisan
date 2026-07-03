'use client';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WaterManagementPage() {
  return (
    <div className="bg-[#0B1220] min-h-screen text-white">
        <header className="sticky top-0 z-50 flex items-center p-4 bg-[#0B1220]/80 backdrop-blur-lg">
            <Link href="/explore">
                <motion.button 
                    className="p-2 rounded-full hover:bg-white/10"
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }}
                >
                    <ArrowLeft />
                </motion.button>
            </Link>
            <h1 className="text-xl font-bold mx-auto">Water Management</h1>
        </header>
        <main className="p-4">
            <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold text-green-400 mb-2">💧</h2>
                <h3 className="text-2xl font-bold">Coming Soon!</h3>
                <p className="text-gray-400 mt-2">This section is under development. Please check back later for updates on water management.</p>
            </motion.div>
        </main>
    </div>
  );
}
