'use client';

import { Button } from '@/components/ui/button';
import { createConversation } from '@/app/actions/messages';
import { useTransition } from 'react';
import { Icons } from './icons';

export function MessageFarmerButton({ farmerId }: { farmerId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={() => {
        startTransition(() => {
          createConversation(farmerId);
        });
      }}
    >
      <Button variant="outline" size="sm" disabled={isPending}>
        {isPending ? <Icons.spinner className="h-4 w-4 animate-spin" /> : 'Message Farmer'}
      </Button>
    </form>
  );
}
