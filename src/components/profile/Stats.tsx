'use client';

const statsData = [
    { label: "Calories Burned", value: "3,500" },
    { label: "Workouts", value: "12" },
    { label: "Hours Training", value: "8" },
]

export function Stats() {
    return (
        <div className="grid grid-cols-3 gap-4 text-center bg-[#1E293B]/60 p-6 rounded-2xl">
            {statsData.map(stat => (
                <div key={stat.label}>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
            ))}
        </div>
    )
}