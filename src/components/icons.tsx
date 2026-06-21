
'use client';

import {
  ChevronLeft,
  Command,
  Moon,
  SunMedium,
  Clock,
  BookOpen,
  Laptop,
  Loader,
  User,
  Smartphone,
  Github,
  X,
  Home,
  LayoutDashboard,
  Settings,
  LogOut,
  LogIn
} from 'lucide-react';

export const Sun = SunMedium;
export const MoonIcon = Moon;
export const ChevronLeftIcon = ChevronLeft;
export const Logo = Command;
export const ClockIcon = Clock;
export const BookOpenIcon = BookOpen;
export const LaptopIcon = Laptop;
export const Spinner = Loader;
export const UserIcon = User;
export const SmartphoneIcon = Smartphone;
export const GithubIcon = Github;
export const XIcon = X;
export const HomeIcon = Home;
export const DashboardIcon = LayoutDashboard;
export const SettingsIcon = Settings;
export const LogoutIcon = LogOut;
export const LoginIcon = LogIn;

export const GoogleIcon = ({ className }: { className?: string }) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
        <title>Google</title>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.9-4.73 1.9-3.41 0-6.23-2.8-6.23-6.23s2.82-6.23 6.23-6.23c1.87 0 3.13.78 3.86 1.48l2.84-2.76C19.31 2.91 16.33 1.25 12.48 1.25 7.02 1.25 3.09 5.16 3.09 10.5s3.93 9.25 9.39 9.25c3.34 0 5.86-1.12 7.77-3.03 1.96-1.91 2.58-4.6 2.58-6.88 0-.6-.06-1.21-.16-1.8z"/>
    </svg>
);
