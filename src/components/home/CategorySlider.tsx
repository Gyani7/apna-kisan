
import { motion, Variants } from 'framer-motion';
import { Wheat, Leaf, TrendingUp, Tractor, Dna, Droplets, Landmark, CloudSun, GitBranchPlus, Banknote } from 'lucide-react';

const categories = [
  { name: 'Fasal', icon: Wheat, color: '#FFC107' },
  { name: 'Organic', icon: Leaf, color: '#4CAF50' },
  { name: 'Mandi Bhav', icon: TrendingUp, color: '#FF5722' },
  { name: 'Machinery', icon: Tractor, color: '#607D8B' },
  { name: 'Seeds', icon: Dna, color: '#9C27B0' },
  { name: 'Irrigation', icon: Droplets, color: '#2196F3' },
  { name: 'Govt Schemes', icon: Landmark, color: '#F44336' },
  { name: 'Weather', icon: CloudSun, color: '#FF9800' },
  { name: 'Dairy', icon: GitBranchPlus, color: '#795548' },
  { name: 'Loans', icon: Banknote, color: '#4CAF50' },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
        y: 0, 
        opacity: 1,
        transition: { type: 'spring', stiffness: 100 }
    }
};

export function CategorySlider() {
  return (
    <motion.div 
        className="flex overflow-x-auto gap-4 py-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
      {categories.map((category) => (
        <motion.div 
            key={category.name} 
            className="flex flex-col items-center gap-2 flex-shrink-0 w-24"
            variants={itemVariants}
            whileHover={{ scale: 1.1, y: -5 }}
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center glass-card" style={{ borderColor: category.color }}>
            <category.icon className="w-8 h-8" style={{ color: category.color }} />
          </div>
          <p className="text-sm font-medium text-center">{category.name}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}