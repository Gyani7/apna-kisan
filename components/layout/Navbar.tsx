import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold">Apna Kisan</a>
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/community"><a>Community</a></Link>
          <Link href="/reels"><a>Reels</a></Link>
          <Link href="/marketplace"><a>Marketplace</a></Link>
          <Link href="/weather"><a>Weather</a></Link>
          <Link href="/schemes"><a>Schemes</a></Link>
        </nav>
        <div className="space-x-2">
          <Link href="/login" passHref>
            <Button asChild><a>Login</a></Button>
          </Link>
          <Link href="/register" passHref>
            <Button asChild variant="secondary"><a>Register</a></Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
