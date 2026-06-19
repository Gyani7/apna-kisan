'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

const premiumFeatures = [
  "Personalized Farmer Dashboard",
  "Track Your Crops & Analytics",
  "Post in the Community Forum",
  "Sell on the Marketplace",
  "Unlimited AI Assistant",
  "Apply for Loans & Schemes",
];

export const PremiumLoginModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gray-900 border-green-500 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-green-400">Unlock Premium Features</DialogTitle>
          <DialogDescription className="text-center text-gray-300 pt-2">
            Create an account to get the full Apna Kisan experience.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
            <ul className="space-y-2">
                {premiumFeatures.map((feature, i) => (
                    <li key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="space-y-3">
            <Button size="lg" variant="outline" className="w-full bg-white/10 text-white hover:bg-white/20">
                Sign in with Google
            </Button>
            <div className="flex space-x-2">
                <Input type="tel" placeholder="+91" className="w-20 bg-white/10 border-white/20 placeholder:text-gray-300 text-center" />
                <Input type="tel" placeholder="Enter Mobile Number" className="flex-1 bg-white/10 border-white/20 placeholder:text-gray-300" />
            </div>
            <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Login with OTP</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
