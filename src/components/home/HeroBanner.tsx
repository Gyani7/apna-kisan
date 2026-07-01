
import { motion } from "framer-motion";

export function HeroBanner() {
    return (
        <motion.div 
            className="relative rounded-2xl p-8 my-8 text-white overflow-hidden"
            style={{ background: 'linear-gradient(to right, #4CAF50, #81C784, #4CAF50)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="absolute inset-0 bg-gradient-green animate-gradient-animation" style={{ backgroundSize: '200% 200%' }} />
            <div className="relative z-10 text-center">
                <motion.h1 
                    className="text-5xl font-bold tracking-tight"
                    initial={{ scale: 0.9 }} 
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Apna Kisan
                </motion.h1>
                <motion.p 
                    className="mt-4 text-xl"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    Kisan Se Kisan Tak
                </motion.p>
            </div>
        </motion.div>
    );
}