'use client';

export const siteConfig = {
  name: "Apna Kisan",
  description: "Apna Kisan is a platform for farmers to connect and share knowledge.",
  url: "https://apnakisan.com",
  ogImage: "https://apnakisan.com/og.jpg",
  links: {
    twitter: "https://twitter.com/apnakisan",
    github: "https://github.com/apnakisan/apnakisan-x",
  },
  mainNav: [
    {
      title: "Home",
      href: "/",
      icon: "Leaf",
    },
    {
      title: "Community",
      href: "/community",
      icon: "User",
    },
    {
      title: "Sell",
      href: "/sell",
      icon: "Search",
    },
    {
      title: "Mandi",
      href: "/mandi-rates",
      icon: "BookOpen",
    },
    {
      title: "Menu",
      href: "/menu",
      icon: "Search",
    },
  ] as const,
  sidebarNav: [
    {
      title: "Home",
      href: "/",
      icon: "Leaf",
    },
    {
      title: "Community",
      href: "/community",
      icon: "User",
    },
    {
      title: "Sell",
      href: "/sell",
      icon: "Search",
    },
    {
      title: "Mandi",
      href: "/mandi-rates",
      icon: "BookOpen",
    },
    {
      title: "Menu",
      href: "/menu",
      icon: "Search",
    },
  ] as const
};

export type SiteConfig = typeof siteConfig;
export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
} & (
    | {
        href: string;
        items?: never;
      }
    | {
        href?: string;
        items: any[];
      }
  );
