
import { ReactNode } from "react";

export default function FarmerDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
      <aside className="hidden w-[200px] flex-col md:flex">
        {/* <DashboardNav items={dashboardNavItems} /> */}
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}
