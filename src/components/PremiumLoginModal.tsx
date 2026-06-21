'use client';

import { useModal } from '@/components/Providers';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function PremiumLoginModal() {
  const { isPremiumModalOpen, hidePremiumModal } = useModal();

  return (
    <Dialog open={isPremiumModalOpen} onOpenChange={hidePremiumModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upgrade to Premium</DialogTitle>
          <DialogDescription>
            This feature is only available to our premium users. Please upgrade your
            account to access it.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={hidePremiumModal}>
            Close
          </Button>
          <Button>Upgrade</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
