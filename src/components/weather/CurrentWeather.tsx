'use client';
import { Sun } from "lucide-react";

export function CurrentWeather() {
    return (
        <div className="flex flex-col items-center justify-center bg-[#1E293B]/60 p-8 rounded-2xl">
            <Sun size={64} className="mb-4"/>
            <h2 className="text-5xl font-bold">32°C</h2>
            <p className="text-lg">Sunny</p>
            <p className="text-gray-400">Udaipur, Rajasthan</p>
        </div>
    )
}