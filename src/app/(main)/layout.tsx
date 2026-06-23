import { Header } from '@/components/common/Header';
import { LeftSidebar } from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';

export default async function MainLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />
       <div className="container mx-auto grid grid-cols-1 md:grid-cols-[256px_1fr] lg:grid-cols-[256px_1fr_320px] gap-6 px-4 py-6">
        <LeftSidebar />
        <main className="-mx-4 md:mx-0">
          {children}
        </main>
        <RightSidebar />
      </div>
    </div>
  );
}
