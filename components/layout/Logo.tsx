'use client';

import Link from "next/link";
import { Leaf } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
        <div className="bg-primary p-2 rounded-md">
             <Leaf className="h-5 w-5 text-primary-foreground" />
        </div>
      <span className="text-xl font-bold tracking-tight text-foreground">Apna Kisan</span>
    </Link>
  );
}
