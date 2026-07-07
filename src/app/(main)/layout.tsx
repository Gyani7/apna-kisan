import HomeHeader from "@/components/home/HomeHeader";
import { BottomNav } from "@/components/BottomNav";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <HomeHeader />
      <main className="pb-20 sm:pb-0">{children}</main>
      <BottomNav />
    </div>
  );
}
