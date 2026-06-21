'use client';

import { motion } from "framer-motion";
import {
  Bot,
  Map,
  Users,
  BarChart3,
  Store,
  Tractor,
} from "lucide-react";

const features = [
  {
    icon: Map,
    title: "Village Intelligence",
    description:
      "Dynamic, real-time data hub for every village. Track demographics, crop patterns, soil health, and more.",
  },
  {
    icon: Bot,
    title: "AI Crop Doctor",
    description:
      "Instantly diagnose crop diseases, get treatment recommendations, and predict yields with our advanced AI.",
  },
  {
    icon: Users,
    title: "Agri-Social Network",
    description:
      "Connect with farmers, experts, and influencers. Share knowledge, stories, and build your community.",
  },
  {
    icon: Tractor,
    title: "Smart Farming Suite",
    description:
      "Access tools for farm management, from satellite imagery analysis to precision agriculture planning.",
  },
  {
    icon: Store,
    title: "E-Commerce Marketplace",
    description:
      "Buy and sell produce, seeds, and equipment directly through a trusted, nationwide network.",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description:
      "Leverage market trends, weather forecasts, and pricing data to make informed business decisions.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">A Single Platform for Every Need</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
                From field to market, our integrated suite of tools empowers every stakeholder in the agricultural ecosystem.
            </p>
        </div>

        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 md:mt-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
                initial: {},
                animate: {
                    transition: { staggerChildren: 0.1 }
                }
            }}
        >
          {features.map((feature, i) => (
            <motion.div
                key={i}
                className="bg-white/40 dark:bg-gray-800/20 p-6 rounded-xl shadow-lg backdrop-blur-sm border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                variants={{
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
            >
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 text-white mb-5">
                    <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">
                    {feature.description}
                </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
