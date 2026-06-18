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
      title: "AI Assistant",
      href: "/ai-assistant",
    },
    {
      title: "Mandi Rates",
      href: "/mandi-rates",
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      items: [
        {
          title: "Farmer Dashboard",
          href: "/dashboard/farmer",
          icon: "dashboard",
        },
        {
          title: "Buyer Dashboard",
          href: "/dashboard/buyer",
          icon: "dashboard",
        },
      ],
    },
    {
      title: "Marketplace",
      items: [
        {
          title: "My Products",
          href: "/my-products",
          icon: "package",
        },
        {
          title: "Sell a Product",
          href: "/sell",
          icon: "plusCircle",
        },
      ],
    },
  ],
  adminNav: [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      title: "Users",
      href: "/admin/users",
    },
    {
      title: "Products",
      href: "/admin/products",
    },
    {
      title: "Community",
      href: "/admin/community",
    },
    {
      title: "Reports",
      href: "/admin/reports",
    },
    {
      title: "Settings",
      href: "/admin/settings",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
