import Link from "next/link";

export function BottomNavbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t">
      <div className="flex justify-around py-2">
        <Link href="/" className="text-center">
          {/* Home icon */}
          <p>Home</p>
        </Link>
        <Link href="/community" className="text-center">
          {/* Community icon */}
          <p>Community</p>
        </Link>
        <Link href="/reels" className="text-center">
          {/* Reels icon */}
          <p>Reels</p>
        </Link>
        <Link href="/marketplace" className="text-center">
          {/* Marketplace icon */}
          <p>Market</p>
        </Link>
        <Link href="/weather" className="text-center">
          {/* Weather icon */}
          <p>Weather</p>
        </Link>
      </div>
    </div>
  );
}
