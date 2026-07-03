'use client';
import { Sun, Cloud, CloudRain } from "lucide-react";

const forecastData = [
    { day: "Mon", temp: "30°", icon: <Sun/> },
    { day: "Tue", temp: "28°", icon: <Cloud/> },
    { day: "Wed", temp: "25°", icon: <CloudRain/> },
    { day: "Thu", temp: "31°", icon: <Sun/> },
    { day: "Fri", temp: "29°", icon: <Cloud/> },
]

export function Forecast() {
    return (
        <div className="bg-[#1E293B]/60 p-6 rounded-2xl">
        <h3 className="text-lg font-bold mb-4">5-Day Forecast</h3>
        <div className="flex justify-between">
            {forecastData.map(item => (
                <div key={item.day} className="flex flex-col items-center">
                    <p className="text-gray-400">{item.day}</p>
                    <div className="my-2">{item.icon}</div>
                    <p>{item.temp}</p>
                </div>
            ))}
        </div>
      </div>
    )
}