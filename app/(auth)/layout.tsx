
interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="container flex h-screen w-screen flex-col items-center justify-center">{children}</div>;
}
