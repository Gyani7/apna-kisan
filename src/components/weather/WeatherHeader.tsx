'use client';

import { ChevronLeft } from "lucide-react";

export function WeatherHeader() {
    return (
        <header className="p-4 flex items-center">
        <button onClick={() => window.history.back()} className="mr-4">
          <ChevronLeft />
        </button>
        <h1 className="text-xl font-bold">Weather</h1>
      </header>
    )
}