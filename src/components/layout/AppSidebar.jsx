"use client";
import { ChartNetwork } from "lucide-react";
import { UserCog } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoutButton from "../Buttons/LogoutButton";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const AppSidebar = () => {
  const path = usePathname();
  return (
    <nav className="inline-flex flex-col text-center mt-8 gap-4 text-gray-500 *:flex *:gap-2 *:p-1">
      <Link
        href="/account"
        className={path === "/account" ? "text-blue-500 font-semibold" : ""}
      >
        <UserCog />
        <span>My Page</span>
      </Link>
      <Link
        href="/analytics"
        className={path === "/analytics" ? "text-blue-500 font-semibold" : ""}
      >
        <ChartNetwork />
        <span>Analytics</span>
      </Link>
      <Link href="/" className="shadow p-2">
        <ArrowLeft />
        <span>Back to Website</span>
      </Link>
      <LogoutButton />
    </nav>
  );
};

export default AppSidebar;
