'use client';
import { motion } from 'framer-motion';
import { CloudSun, Leaf, ScanEye, Store } from 'lucide-react';
import Link from 'next/link';

const actions = [
  { name: 'Weather', icon: <CloudSun />, href: '/weather' },
  { name: 'Crop Doctor', icon: <Leaf />, href: '/crop-doctor' },
  { name: 'Scan', icon: <ScanEye />, href: '/scan' },
  { name: 'Marketplace', icon: <Store />, href: '/market' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export function QuickActions() {
  return (
    <div>
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <motion.div 
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
        {actions.map((action) => (
            <Link href={action.href} key={action.name}>
                <motion.div 
                    className="bg-[#1E293B]/60 p-4 rounded-2xl text-center hover:bg-white/10 transition-colors"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="mx-auto w-fit mb-2">{action.icon}</div>
                    <p className="font-semibold">{action.name}</p>
                </motion.div>
            </Link>
        ))}
        </motion.div>
    </div>
  );
}
