import { SiteHeaderWithAuth } from '@/components/layout/SiteHeaderWithAuth';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeaderWithAuth />
      <main className="flex-1">{children}</main>
    </div>
  );
}
