'use client';
import { BottomNav } from "@/components/BottomNav";

export default function HomePage() {
    return (
        <div className="bg-[#0B1220] min-h-screen text-white">
            <main className="p-4 pb-24">
                <h1 className="text-3xl font-bold">Home</h1>
            </main>
            <BottomNav />
        </div>
    )
}