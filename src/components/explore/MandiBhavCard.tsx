'use client';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';

const mockData = [
    { crop: 'Wheat', price: '₹2,125/Qtl', change: '+', changeValue: '1.2%' },
    { crop: 'Mustard', price: '₹5,450/Qtl', change: '-', changeValue: '0.8%' },
    { crop: 'Soybean', price: '₹4,300/Qtl', change: '+', changeValue: '2.1%' },
];

function SkeletonLoader() {
    return (
        <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-lg animate-pulse">
                    <div className="w-1/3 h-5 bg-white/10 rounded"></div>
                    <div className="w-1/4 h-5 bg-white/10 rounded"></div>
                    <div className="w-1/6 h-5 bg-white/10 rounded"></div>
                </div>
            ))}
        </div>
    )
}

export function MandiBhavCard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/10">
      <h2 className="text-xl font-bold mb-1">Today's Mandi Rates</h2>
      <p className="text-sm text-gray-400 mb-4">Latest Crop Prices</p>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="space-y-3">
          {mockData.map((item, i) => (
            <motion.div 
                key={item.crop} 
                className="flex justify-between items-center bg-white/5 p-3 rounded-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
            >
              <span className="font-semibold text-white">{item.crop}</span>
              <span className="text-green-400 font-bold">{item.price}</span>
              <span className={`flex items-center text-sm ${item.change === '+' ? 'text-green-500' : 'text-red-500'}`}>
                {item.change} {item.changeValue}
              </span>
            </motion.div>
          ))}
        </div>
      )}
      <Button className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg">View All Rates</Button>
    </div>
  );
}
