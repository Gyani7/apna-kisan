
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
    },
    {
      title: "Marketplace",
      href: "/market",
    },
    {
      title: "Community",
      href: "/community",
    },
    {
      title: "Dashboard",
      href: "/dashboard/farmer",
    },
  ],
  sidebarNav: [
    {
      title: "Farmer",
      items: [
        {
          title: "My Products",
          href: "/dashboard/farmer/products",
        },
        {
          title: "Sell Product",
          href: "/dashboard/farmer/products/new",
        },
        {
          title: "Orders",
          href: "/dashboard/farmer/orders",
        },
        {
          title: "Analytics",
          href: "/dashboard/farmer/analytics",
        },
        {
          title: "Settings",
          href: "/dashboard/farmer/settings",
        },
      ],
    },
    {
      title: "Buyer",
      items: [
        {
          title: "Browse Products",
          href: "/market",
        },
        {
          title: "My Orders",
          href: "/dashboard/buyer/orders",
        },
        {
          title: "Wishlist",
          href: "/dashboard/buyer/wishlist",
        },
        {
          title: "Settings",
          href: "/dashboard/buyer/settings",
        },
      ],
    },
  ] as SidebarNavItem[],
};

export type SiteConfig = typeof siteConfig;
