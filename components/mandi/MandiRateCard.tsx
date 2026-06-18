'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function MandiRateCard({ rate }: { rate: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{rate.crop}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Price: {rate.price}</p>
        <p>Mandi: {rate.mandi}</p>
      </CardContent>
    </Card>
  );
}
