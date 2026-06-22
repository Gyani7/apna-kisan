
import { SidebarNavItem } from "@/types/nav";

export const siteConfig = {
  name: "Apna Kisan",
  description:
    "A modern AgriTech Super Platform for farmers, buyers, traders, and administrators.",
  links: {
    twitter: "https://twitter.com/apnakisan",
    github: "https://github.com/apnakisan/apnakisan-platform",
    docs: "https://apnakisan.com/docs",
  },
  mainNav: [
    {
      title: "Home",
      href: "/",
      icon: "home",
    },
    {
      title: "Community",
      href: "/community",
      icon: "community",
    },
    {
      title: "Reels",
      href: "/reels",
      icon: "reels",
    },
    {
      title: "AI",
      href: "/ai-assistant",
      icon: "ai",
    },
    {
      title: "Profile",
      href: "/profile",
      icon: "profile",
    },
  ],
  sidebarNav: [
    {
      title: "Home",
      href: "/",
      icon: "home",
    },
    {
      title: "Weather",
      href: "/weather",
      icon: "weather",
    },
    {
      title: "Community",
      href: "/community",
      icon: "community",
    },
    {
      title: "Village Explorer",
      href: "/explore",
      icon: "village",
    },
    {
      title: "Market",
      href: "/market",
      icon: "market",
    },
    {
      title: "Govt Schemes",
      href: "/schemes",
      icon: "schemes",
    },
    {
      title: "AI Doctor",
      href: "/disease-prediction",
      icon: "aiDoctor",
    },
    {
      title: "Messages",
      href: "/messages",
      icon: "messages",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
    },
    {
      title: "Settings",
      href: "/profile/settings",
      icon: "settings",
    },
  ] as SidebarNavItem[],
};
