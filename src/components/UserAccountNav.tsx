"use client";
import { User } from "next-auth";
import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import UserAvatar from "./UserAvater";
import Link from "next/link";
import { signOut } from "next-auth/react";

type Props = {
  user: Pick<User, "name" | "image" | "email">;
};

const UserAccountNav: FC<Props> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} className="h-8 w-8 " />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="text-lg font-medium username-gradient">{user.name}</p>}
            {user.email && (
              <p className="text-slate-400 w-[200px] truncate text-sm">{user.email}</p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/">Feed</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/r/create">Create community</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="'cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            signOut({ callbackUrl: `${window.location.origin}/sign-in` });
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
