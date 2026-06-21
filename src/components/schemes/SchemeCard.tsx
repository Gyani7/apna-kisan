'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function SchemeCard({ scheme }: { scheme: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{scheme.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{scheme.description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
}
