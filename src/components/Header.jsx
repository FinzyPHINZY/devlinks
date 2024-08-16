import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import LogoutButton from "./Buttons/LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="bg-white border-b py-4">
      <div className="max-w-4xl flex justify-between items-center mx-auto px-6">
        <div className="flex gap-6">
          <Link href="/" className="flex items-center gap-2 text-blue-700">
            <FontAwesomeIcon icon={faLink} />
            <span className="font-bold">Devlinks</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-slate-500 text-sm">
            <Link href="/about">About</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>

        <nav className="flex items-center gap-4 text-sm text-slate-500">
          {!session ? (
            <>
              <Link href="/login">Sign In</Link>
              <Link href="/login">Create Account</Link>
            </>
          ) : (
            <>
              <Link href="/account" className="hidden md:block">
                Hello, {session.user.name}
              </Link>
              <LogoutButton />
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
