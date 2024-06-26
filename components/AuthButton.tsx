import { auth } from "@/config/auth";
import { User } from "@prisma/client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { User as NextUIUser } from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { logout } from "@/actions/authActions";

interface Props {
  user: User | undefined;
}

const AuthButton = ({ user }: Props) => {
  return (
    <div className="items-center gap-2 flex">
      {user ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <NextUIUser
              name={user.name}
              description={user.email}
              className="cursor-pointer"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile">
              <div className="flex gap-4">
                <FaUser />
                <p className="font-semibold">Profile</p>
              </div>
            </DropdownItem>
            <DropdownItem
              key="Logout"
              onClick={async () => {
                logout();
              }}
            >
              <div className="flex gap-4">
                <IoMdExit className="size-4" />
                <p className="font-semibold">Logout</p>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <div className="hidden md:flex gap-2">
          <Button size="sm" variant="bordered" as={Link} href="/auth/login">
            Login
          </Button>
          <Button size="sm" variant="bordered" as={Link} href="/auth/register">
            Register
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuthButton;
