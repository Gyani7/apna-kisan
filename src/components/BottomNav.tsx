import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background/80 backdrop-blur-sm sm:hidden">
      <div className="mx-auto grid h-16 max-w-sm grid-cols-5 items-center px-2">
        <Link href="#" className="flex flex-col items-center justify-center gap-1 text-primary" prefetch={false}>
          <HomeIcon className="h-6 w-6" />
          <span className="text-xs font-medium">Home</span>
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary"
          prefetch={false}>
          <UsersIcon className="h-6 w-6" />
          <span className="text-xs font-medium">Community</span>
        </Link>
        <div className="flex justify-center">
          <Button
            size="icon"
            className="-mt-8 h-16 w-16 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/50">
            <PlusIcon className="h-8 w-8" />
            <span className="sr-only">Create</span>
          </Button>
        </div>
        <Link
          href="#"
          className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary"
          prefetch={false}>
          <CompassIcon className="h-6 w-6" />
          <span className="text-xs font-medium">Explore</span>
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary"
          prefetch={false}>
          <UserIcon className="h-6 w-6" />
          <span className="text-xs font-medium">Profile</span>
        </Link>
      </div>
    </div>
  );
}

function CompassIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function PlusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UsersIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
