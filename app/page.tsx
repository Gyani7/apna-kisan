'use client';

import { Bot, Cloudy, Leaf, Map, Tractor, Users, Wheat, Wind, Calendar, Award, Newspaper, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 ${className} h-full`}>
    {children}
  </div>
);

const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const GuestAuthForm = () => (
    <div className="max-w-sm mx-auto">
      <Card className="bg-transparent border-0">
        <CardContent className="p-0 space-y-4">
            <Link href="/feed" passHref>
                <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg">Continue as Guest</Button>
            </Link>
            <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/30" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-gray-900 px-2 text-gray-300">
                    OR
                    </span>
                </div>
            </div>
            <Button size="lg" variant="outline" className="w-full bg-white/10 text-white hover:bg-white/20">
                Sign in with Google
            </Button>
            <div className="flex space-x-2 pt-2">
                <Input type="tel" placeholder="+91" className="w-20 bg-white/10 border-white/20 placeholder:text-gray-300 text-center" />
                <Input type="tel" placeholder="Enter Mobile Number" className="flex-1 bg-white/10 border-white/20 placeholder:text-gray-300" />
            </div>
            <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Login with OTP</Button>
        </CardContent>
      </Card>
    </div>
);

const publicFeatures = [
    { icon: Cloudy, name: "Weather Forecast", description: "Real-time weather updates" },
    { icon: Wheat, name: "Live Mandi Prices", description: "Latest prices from your mandi" },
    { icon: Bot, name: "AI Assistant Demo", description: "Get your questions answered" },
    { icon: Leaf, name: "Disease Detection Demo", description: "Upload a photo to detect crop disease" },
    { icon: BarChart, name: "Village Statistics", description: "Analytics for your village" },
    { icon: Newspaper, name: "Agriculture News", description: "Stay updated with the latest news" },
    { icon: Calendar, name: "Crop Calendar", description: "Personalized crop schedule" },
    { icon: Award, name: "Success Stories", description: "Inspiring stories from farmers" },
    { icon: Tractor, name: "Government Schemes", description: "Find schemes you're eligible for" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black text-white">
      <main className="container mx-auto px-4 py-12 md:py-20">
        <motion.section
          className="text-center mb-16 md:mb-24"
          variants={sectionVariant}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariant} className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-500">
            Apna Kisan
          </motion.h1>
          <motion.p variants={itemVariant} className="text-lg md:text-xl text-green-200 mb-8 max-w-3xl mx-auto">
            India's Agricultural Intelligence Network. Built for the Indian Farmer.
          </motion.p>
          <motion.div variants={itemVariant}>
            <GuestAuthForm />
          </motion.div>
        </motion.section>

        <motion.section
            variants={sectionVariant}
            initial="hidden"
            animate="visible"
        >
            <h2 className="text-3xl font-bold text-center mb-10 text-green-300">Explore Public Features</h2>
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariant}
                initial="hidden"
                animate="visible"
            >
                {publicFeatures.map((feature, i) => (
                    <motion.div key={i} variants={itemVariant}>
                        <GlassCard className="p-6 flex flex-col items-center text-center">
                            <feature.icon className="w-12 h-12 mb-4 text-green-300" />
                            <h3 className="text-xl font-bold mb-2">{feature.name}</h3>
                            <p className="text-gray-300">{feature.description}</p>
                        </GlassCard>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
      </main>
    </div>
  );
}
