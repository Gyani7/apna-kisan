export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B1220] font-sans antialiased">
        <main>
          {children}
        </main>
    </div>
  );
}
