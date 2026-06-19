'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function PremiumLoginModal() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <Dialog open={!session}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Unlock Premium Features</DialogTitle>
          <DialogDescription>
            Create an account to access your personalized dashboard, post in the community, and sell your products.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
            <h3 className="font-semibold">Exclusive Benefits for Members:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Personalized Farmer Dashboard</li>
                <li>Crop Tracking & Farm Analytics</li>
                <li>Post Questions & Answers in the Community</li>
                <li>Buy & Sell in the Marketplace</li>
                <li>Personalized AI-Powered Advice</li>
                <li>Apply for Loans & Schemes</li>
            </ul>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <Button onClick={handleLogin}>Login / Sign Up</Button>
          <Button variant="outline" onClick={() => router.back()}>
            Continue Browsing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
