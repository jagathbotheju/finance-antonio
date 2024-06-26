"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import { Input, Button } from "@nextui-org/react";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import NavLink from "./NavLink";
import NavMenuLink from "./NavMenuLink";
import { useState } from "react";
import AuthButton from "./AuthButton";
import { User } from "@prisma/client";
import { logout } from "@/actions/authActions";
import { useRouter } from "next/navigation";

interface Props {
  user: User | undefined;
}

export const Navbar = ({ user }: Props) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      position="sticky"
      disableAnimation
      classNames={{
        item: ["text-lg", "data-[active=true]:text-secondary"],
      }}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit text-xl">Finance</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* desktop menu */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="center"
      >
        {siteConfig.navItems.map((item) => (
          <NavLink item={item} key={item.href} />
        ))}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="hidden md:flex" justify="end">
        <ThemeSwitch />
        <AuthButton user={user} />
      </NavbarContent>

      {/* mobile menu */}
      <NavbarMenu>
        {/* {searchInput} */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavMenuLink
              item={item}
              key={index}
              setIsMenuOpen={setIsMenuOpen}
            />
          ))}

          {user ? (
            <NavbarMenuItem>
              <Button
                color="danger"
                variant="bordered"
                onClick={async () => {
                  setIsMenuOpen(false);
                  await logout();
                }}
              >
                Logout
              </Button>
            </NavbarMenuItem>
          ) : (
            <NavbarMenuItem>
              <Button
                variant="bordered"
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push("/auth/login");
                }}
              >
                Login
              </Button>
            </NavbarMenuItem>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
