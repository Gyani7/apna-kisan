import { Navbar } from "@/components/layout/Navbar";
import { BottomNavbar } from "@/components/layout/BottomNavbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="mb-16">{children}</main>
      <BottomNavbar />
    </>
  );
}
