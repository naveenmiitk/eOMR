import { SidebarLink } from "@/components/SidebarItems";
import { BookCheck, Cog, Globe, HomeIcon, ReceiptIndianRupee, User } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  { href: "/testseries", title: "Test Series", icon: BookCheck },
  { href: "/subscribe", title : "Subscribe", icon: ReceiptIndianRupee },
  { href: "/account", title: "Account", icon: User },
  { href: "/settings", title: "Settings", icon: Cog },
];

export const additionalLinks: AdditionalLinks[] = [];
