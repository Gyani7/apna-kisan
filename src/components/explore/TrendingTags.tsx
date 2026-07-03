'use client';

import { motion } from 'framer-motion';

const tags = [
  '#GehunKisan',
  '#OrganicFarming',
  '#MSP2026',
  '#WaterSaving',
  '#DroneSpray',
  '#KisanCreditCard',
  '#PMKisan',
  '#NaturalFarming',
];

export function TrendingTags() {
  return (
    <div>
        <h2 className="text-xl font-bold mb-4">Trending Tags</h2>
        <div className="overflow-x-auto pb-4 -mb-4">
            <motion.div className="flex space-x-3">
            {tags.map((tag, i) => (
                <motion.div
                    key={tag}
                    className="bg-green-400/10 text-green-400 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap cursor-pointer"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 197, 94, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                >
                    {tag}
                </motion.div>
            ))}
            </motion.div>
        </div>
    </div>
  );
}
