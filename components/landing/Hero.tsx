'''"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative text-center py-20 md:py-32 lg:py-40 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -z-10" />

      {/* Animated Grid Pattern */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      >
        <div
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\' width=\'32\' height=\'32\' fill=\'none\' stroke-width=\'2\' stroke=\'%23d1d5db\'%3e%3cpath d=\'M0 .5H31.5V32\'/%3e%3c/svg%3e")',
          }}
        />
      </motion.div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-4">
            The Future of Indian Agriculture is
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 mt-2">
              Intelligent & Connected
            </span>
          </h1>
          <p className="max-w-xl md:max-w-2xl mx-auto text-base md:text-xl text-muted-foreground mt-6">
            Welcome to India's Agri OS. A unified platform for farmers, data,
            and commerce, powered by AI and a thriving social network.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Button asChild size="lg" className="group">
            <Link href="/signup">
              Join the Network
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#features">Learn More</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-sm text-muted-foreground"
        >
          <p>Powering <span className="font-semibold text-foreground">10,000+</span> Villages & <span className="font-semibold text-foreground">1 Million+</span> Farmers</p>
        </motion.div>
      </div>
    </section>
  );
}
'''