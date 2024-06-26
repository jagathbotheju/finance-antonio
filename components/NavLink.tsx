"use client";
import { NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  item: {
    label: string;
    href: string;
  };
}

const NavLink = ({ item }: Props) => {
  const pathname = usePathname();

  return (
    <NavbarItem as={Link} isActive={item.href === pathname} href={item.href}>
      {item.label}
    </NavbarItem>
  );
};

export default NavLink;
