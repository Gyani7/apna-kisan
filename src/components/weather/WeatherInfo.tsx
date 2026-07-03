'use client';
import { Wind, Droplets, Thermometer } from "lucide-react";

export function WeatherInfo() {
    return (
        <div className="bg-[#1E293B]/60 p-6 rounded-2xl">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <Wind className="mx-auto mb-2" />
            <p>12 km/h</p>
            <p className="text-gray-400 text-sm">Wind</p>
          </div>
          <div>
            <Droplets className="mx-auto mb-2" />
            <p>85%</p>
            <p className="text-gray-400 text-sm">Humidity</p>
          </div>
          <div>
            <Thermometer className="mx-auto mb-2" />
            <p>35°C</p>
            <p className="text-gray-400 text-sm">Feels like</p>
          </div>
        </div>
      </div>
    )
}