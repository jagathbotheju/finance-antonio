"use client";

import { NavbarMenuItem } from "@nextui-org/navbar";
import { cn } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface Props {
  item: {
    label: string;
    href: string;
  };
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

const NavMenuLink = ({ item, setIsMenuOpen }: Props) => {
  const pathname = usePathname();

  return (
    <NavbarMenuItem
      isActive={item.href === pathname}
      className={cn({
        "text-lg data-[active=true]:text-secondary": item.href === pathname,
      })}
      onClick={() => setIsMenuOpen(false)}
    >
      <Link href={item.href}>{item.label}</Link>
    </NavbarMenuItem>
  );
};

export default NavMenuLink;
