'use client';

interface StatCardProps {
    label: string;
    value: string;
}

export function StatCard({ label, value }: StatCardProps) {
    return (
        <div className="bg-[#1E293B]/60 p-4 rounded-2xl text-center">
            <p className="text-gray-400">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    )
}