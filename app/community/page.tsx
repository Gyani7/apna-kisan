import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Users } from 'lucide-react';

export default function CommunityPage() {
  return (
    <>
      <Header />
      <main className="pt-14 pb-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={36} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Community</h2>
          <p className="text-gray-500 text-sm">
            Kisan community aur groups yahan milengi. Jald aa raha hai!
          </p>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
