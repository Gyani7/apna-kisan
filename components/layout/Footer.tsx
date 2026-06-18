'use client';

import Link from "next/link";
import { Icons } from "@/components/icons";
import { Logo } from "./Logo";

const socialLinks = [
  { name: "Twitter", icon: Icons.X, href: "#" },
  { name: "Facebook", icon: Icons.Facebook, href: "#" },
  { name: "Instagram", icon: Icons.Instagram, href: "#" },
  { name: "Linkedin", icon: Icons.Linkedin, href: "#" },
];

const footerLinks = [
  { title: "Platform", links: [
    { label: "Market", href: "/market" },
    { label: "Community", href: "/community" },
    { label: "AI Assistant", href: "/ai-assistant" },
    { label: "Govt. Schemes", href: "/schemes" },
  ]},
  { title: "Company", links: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
    { label: "Press", href: "/press" },
  ]},
  { title: "Resources", links: [
    { label: "Blog", href: "/blog" },
    { label: "Help Center", href: "/help" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ]},
];

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t mt-auto">
        <div className="container py-12 px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-4 lg:grid-cols-5">
                <div className="col-span-full md:col-span-1 lg:col-span-2 space-y-4 pr-8">
                    <Logo />
                    <p className="text-sm text-muted-foreground">
                        The leading digital marketplace and community for Indian farmers.
                    </p>
                    <div className="flex space-x-4">
                        {socialLinks.map(social => (
                            <Link key={social.name} href={social.href} className="text-muted-foreground hover:text-primary">
                                <social.icon className="h-5 w-5" />
                                <span className="sr-only">{social.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
                {footerLinks.map(section => (
                    <div key={section.title} className="space-y-4">
                        <h4 className="font-semibold text-foreground">{section.title}</h4>
                        <ul className="space-y-2">
                            {section.links.map(link => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Apna Kisan. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
  );
}
