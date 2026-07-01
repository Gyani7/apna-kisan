
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export function InfoCard({ title, description, icon: Icon, color }: InfoCardProps) {
  return (
    <motion.div 
        className="glass-card p-4 rounded-2xl flex flex-col gap-2 relative overflow-hidden"
        whileHover={{ y: -5, boxShadow: `0px 10px 20px rgba(0,0,0,0.1)` }}
    >
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
            <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full" style={{ backgroundColor: color, opacity: 0.1 }} />
    </motion.div>
  );
}