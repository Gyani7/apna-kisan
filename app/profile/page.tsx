import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Settings, MapPin, Sprout, Star, LocationEdit as Edit2 } from 'lucide-react';

const PROFILE_STATS = [
  { label: 'Posts', value: '42' },
  { label: 'Followers', value: '1.2k' },
  { label: 'Following', value: '318' },
];

export default function ProfilePage() {
  return (
    <>
      <Header />
      <main className="pt-14 pb-20 min-h-screen bg-gray-50">
        <div className="max-w-lg mx-auto">
          {/* Cover */}
          <div className="h-36 bg-gradient-to-r from-green-600 to-green-400 relative">
            <button className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/30 transition-colors">
              <Settings size={18} />
            </button>
          </div>

          <div className="px-4 pb-4">
            {/* Avatar + Edit */}
            <div className="flex items-end justify-between -mt-10 mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-md">
                AK
              </div>
              <button className="flex items-center gap-1.5 border border-green-600 text-green-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-600 hover:text-white transition-colors">
                <Edit2 size={14} />
                Edit Profile
              </button>
            </div>

            {/* Name & Info */}
            <h2 className="text-xl font-bold text-gray-900">Apna Kisan</h2>
            <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
              <MapPin size={13} className="text-green-500" />
              <span>Amritsar, Punjab</span>
            </div>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Organic farmer | Wheat & Rice | Sharing 20 saal ka khet anubhav
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="flex items-center gap-1 text-xs font-medium bg-green-50 text-green-700 px-2.5 py-1 rounded-full">
                <Sprout size={11} /> Organic Farmer
              </span>
              <span className="flex items-center gap-1 text-xs font-medium bg-yellow-50 text-yellow-700 px-2.5 py-1 rounded-full">
                <Star size={11} /> Verified Kisan
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 divide-x divide-gray-100 bg-white rounded-2xl border border-gray-100 shadow-sm mt-4">
              {PROFILE_STATS.map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center py-4">
                  <span className="text-lg font-bold text-gray-900">{value}</span>
                  <span className="text-xs text-gray-500 mt-0.5">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
