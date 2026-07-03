'use client';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Crown } from 'lucide-react';

const farmers = [
  { name: 'Rakesh Kumar', village: 'Rampur', points: 1250, avatar: '/avatars/01.png', rank: 1 },
  { name: 'Suman Devi', village: 'Sitapur', points: 1100, avatar: '/avatars/02.png', rank: 2 },
  { name: 'Amit Singh', village: 'Govindpur', points: 980, avatar: '/avatars/03.png', rank: 3 },
];

export function WeeklyLeaderboard() {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/10">
      <h2 className="text-xl font-bold mb-4">Weekly Leaderboard</h2>
      <div className="space-y-4">
        {farmers.map((farmer, i) => (
          <motion.div 
            key={farmer.name} 
            className="flex items-center justify-between bg-white/5 p-3 rounded-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <span className="font-bold text-lg w-6">{i + 1}</span>
              <Avatar>
                <AvatarImage src={farmer.avatar} />
                <AvatarFallback>{farmer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{farmer.name}</p>
                <p className="text-xs text-gray-400">{farmer.village}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
                <span className="font-bold text-green-400">{farmer.points}</span>
                {farmer.rank === 1 && <Crown className="text-yellow-400" size={20} />}
            </div>
          </motion.div>
        ))}
      </div>
      <Button className="w-full mt-6 bg-transparent border border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold rounded-lg">
        View Leaderboard
      </Button>
    </div>
  );
}
