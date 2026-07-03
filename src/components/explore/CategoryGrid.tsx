'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Crop, Leaf, LineChart, Tractor, TestTube2, Droplets, Landmark, Milk } from 'lucide-react';

const categories = [
  { name: 'Crop', icon: <Crop size={48} />, description: 'Cultivation guide', href: '/explore/crop' },
  { name: 'Organic', icon: <Leaf size={48} />, description: 'Organic Farming', href: '/explore/organic' },
  { name: 'Mandi Bhav', icon: <LineChart size={48} />, description: 'Daily Market Prices', href: '/explore/mandi-bhav' },
  { name: 'Machine & Tech', icon: <Tractor size={48} />, description: 'Modern Farming Equipment', href: '/explore/machines' },
  { name: 'Rog Niyantran', icon: <TestTube2 size={48} />, description: 'Pest & Disease Control', href: '/explore/disease-control' },
  { name: 'Sinchai', icon: <Droplets size={48} />, description: 'Water Management', href: '/explore/water-management' },
  { name: 'Sarkari Yojana', icon: <Landmark size={48} />, description: 'Government Schemes', href: '/explore/schemes' },
  { name: 'Pashu', icon: <Milk size={48} />, description: 'Dairy Animal Husbandry', href: '/explore/animal-husbandry' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
        scale: 1, 
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 20 }
    },
};

export function CategoryGrid() {
  return (
    <motion.div 
        className="grid grid-cols-2 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
      {categories.map((category) => (
        <Link href={category.href} key={category.name}>
            <motion.div
              variants={itemVariants}
              className="relative group bg-white/10 backdrop-blur-lg rounded-2xl p-4 flex flex-col items-center justify-center text-center h-40 overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(34, 197, 94, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-2 right-2 h-8 w-8 bg-green-400/20 rounded-full"></div>
                <div className="text-green-400 mb-2">{category.icon}</div>
                <h3 className="font-bold text-white">{category.name}</h3>
                <p className="text-xs text-gray-400">{category.description}</p>
                <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-green-400/50 transition-colors duration-300"></div>
            </motion.div>
        </Link>
      ))}
    </motion.div>
  );
}
