
import { Header } from '@/components/common/Header';
import { LeftSidebar } from '@/components/common/LeftSidebar';
import { RightSidebar } from '@/components/common/RightSidebar';
import { Toaster } from '@/components/ui/toaster';

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
        <main className="flex-1 p-6">
          <div className="container mx-auto max-w-4xl">
            {children}
          </div>
        </main>
        <RightSidebar />
      </div>
      <Toaster />
    </div>
  );
}
