
import { NavItem } from "@/types/nav";

export type Post = {
    slug: string;
    slugAsParams: string;
    body: string;
    title: string;
    date: string;
    description: string;
    author: string;
};

export type MainNavItem = NavItem;
