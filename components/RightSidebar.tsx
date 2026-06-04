'use client';

import Image from 'next/image';
import { Cloud, Sun, Droplets } from 'lucide-react';

const WEATHER_DATA = {
  location: 'Amritsar, Punjab',
  temp: 32,
  condition: 'Partly Cloudy',
  humidity: 68,
  forecast: [
    { day: 'Aaj', icon: 'sun', temp: 32 },
    { day: 'Kal', icon: 'cloud', temp: 29 },
    { day: 'Parso', icon: 'rain', temp: 27 },
  ],
};

const TRENDING_TAGS = ['#GehunKisan', '#OrganicFarming', '#MSP2026', '#WaterSaving', '#DroneSpray'];

export default function RightSidebar() {
  return (
    <aside className="hidden xl:flex flex-col gap-4 w-72 shrink-0">
      {/* Weather Card */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-green-200 font-medium">{WEATHER_DATA.location}</p>
            <div className="flex items-end gap-1 mt-1">
              <span className="text-4xl font-bold">{WEATHER_DATA.temp}°</span>
              <span className="text-sm text-green-200 mb-1">C</span>
            </div>
            <p className="text-sm text-green-100">{WEATHER_DATA.condition}</p>
          </div>
          <Sun size={48} className="text-yellow-300 opacity-90" />
        </div>
        <div className="flex items-center gap-1 text-green-200 text-xs mt-2">
          <Droplets size={12} />
          <span>Humidity: {WEATHER_DATA.humidity}%</span>
        </div>
      </div>

      {/* Trending */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-900 text-sm mb-3">Trending Topics</h3>
        <div className="flex flex-col gap-2">
          {TRENDING_TAGS.map((tag) => (
            <button
              key={tag}
              className="text-left text-sm text-green-600 font-medium hover:text-green-700 hover:bg-green-50 px-2 py-1 rounded-lg transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Active Farmers */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-900 text-sm mb-3">Suggested Farmers</h3>
        <div className="flex flex-col gap-3">
          {['Harpreet Singh', 'Kavita Rani', 'Suresh Patil'].map((name, i) => {
            const initials = name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase();
            const locations = ['Ludhiana, PB', 'Pune, MH', 'Solapur, MH'];
            return (
              <div key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-earth-400 to-soil-500 flex items-center justify-center text-white text-xs font-bold bg-green-500">
                    {initials}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900 leading-tight">{name}</p>
                    <p className="text-[11px] text-gray-400">{locations[i]}</p>
                  </div>
                </div>
                <button className="text-xs font-medium text-green-600 border border-green-200 px-3 py-1 rounded-full hover:bg-green-600 hover:text-white transition-colors">
                  Follow
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
