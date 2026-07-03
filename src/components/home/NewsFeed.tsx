'use client';
import { motion } from 'framer-motion';

const newsItems = [
    {
        id: 1,
        title: "Government announces new subsidy for organic farming",
        source: "Krishi Jagran",
        time: "2 hours ago",
        image: "/news1.jpg",
    },
    {
        id: 2,
        title: "Weather update: Heavy rainfall expected in northern states",
        source: "Skymet Weather",
        time: "5 hours ago",
        image: "/news2.jpg",
    },
    {
        id: 3,
        title: "New drone technology to revolutionize crop monitoring",
        source: "The Economic Times",
        time: "1 day ago",
        image: "/news3.jpg",
    },
];

export function NewsFeed() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Latest News</h2>
      <div className="space-y-4">
        {newsItems.map((item, index) => (
          <motion.div 
            key={item.id}
            className="bg-[#1E293B]/60 p-4 rounded-2xl flex items-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <img src={item.image} alt={item.title} className="w-24 h-24 rounded-lg object-cover" />
            <div className="flex-1">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.source} &middot; {item.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
