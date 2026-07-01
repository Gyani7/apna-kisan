
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { StickyHeader } from '@/components/home/StickyHeader';
import { TrendingUp, MapPin } from 'lucide-react';

const states = { 
    'Rajasthan': ['Jaipur', 'Kota', 'Jodhpur'], 
    'Punjab': ['Ludhiana', 'Amritsar'], 
    'Haryana': ['Karnal', 'Hisar'] 
};
const crops = ['Wheat', 'Cotton', 'Mustard', 'Bajra'];

// Placeholder data
const mandiData = {
    'Jaipur': { 'Wheat': 2200, 'Mustard': 5500 },
    'Kota': { 'Wheat': 2150, 'Mustard': 5600 },
    'Ludhiana': { 'Wheat': 2300, 'Cotton': 7500 },
}

export default function MandiRatesPage() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);

  const getPrice = () => {
      if(selectedCity && selectedCrop && mandiData[selectedCity as keyof typeof mandiData]) {
          const cityData = mandiData[selectedCity as keyof typeof mandiData];
          return cityData[selectedCrop as keyof typeof cityData] || 'N/A';
      }
      return 'N/A';
  }

  return (
    <div className="dark flex flex-col h-screen">
        <StickyHeader />
        <div className="p-4 space-y-6">
            <h1 className="text-3xl font-bold flex items-center gap-2"><TrendingUp /> Live Mandi Rates</h1>
            
            <div className="grid md:grid-cols-3 gap-4">
                <Select onValueChange={setSelectedState}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Select State" /></SelectTrigger>
                    <SelectContent>
                        {Object.keys(states).map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}
                    </SelectContent>
                </Select>

                <Select onValueChange={setSelectedCity} disabled={!selectedState}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Select City" /></SelectTrigger>
                    <SelectContent>
                        {selectedState && states[selectedState as keyof typeof states].map(city => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                    </SelectContent>
                </Select>

                <Select onValueChange={setSelectedCrop}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Select Crop" /></SelectTrigger>
                    <SelectContent>
                        {crops.map(crop => <SelectItem key={crop} value={crop}>{crop}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>

            {selectedCity && selectedCrop &&
                <motion.div 
                    className="glass-card p-6 rounded-2xl text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <h2 className="text-2xl font-bold mb-2">Price for {selectedCrop} in {selectedCity}</h2>
                    <p className="text-4xl font-extrabold text-primary">₹ {getPrice()}/Quintal</p>
                    <p className="text-sm text-muted-foreground mt-2">Last updated: Just now</p>
                </motion.div>
            }

            <div className="glass-card p-4 rounded-2xl">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><MapPin /> Nearby Mandis</h3>
                {/* Placeholder Nearby Mandis */}
                <div className="space-y-3">
                   <div className="flex justify-between items-center"><span>Jaipur Mandi</span><span className="font-semibold text-green-500">▲ 2250</span></div>
                   <div className="flex justify-between items-center"><span>Kota Mandi</span><span className="font-semibold text-red-500">▼ 2100</span></div>
                </div>
            </div>
        </div>
    </div>
  );
}
