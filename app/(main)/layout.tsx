
import { Header } from '@/components/common/Header';
import { LeftSidebar } from '@/components/common/LeftSidebar';
import { RightSidebar } from '@/components/common/RightSidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="flex">
        <LeftSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
        <RightSidebar />
      </div>
    </div>
  );
}
