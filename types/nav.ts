
export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export interface SidebarNavItem extends NavItem {
  items: SidebarNavItem[];
}
