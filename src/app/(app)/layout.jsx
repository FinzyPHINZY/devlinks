import { Inter } from "next/font/google";
import "../globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChartNetwork,
  LogOut,
  Settings,
  SlidersHorizontal,
  UserCog,
} from "lucide-react";
import LogoutButton from "../../components/Buttons/LogoutButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DevLinks - Simplify Your Developer Portfolio",
  description:
    "DevLinks is the ultimate tool for developers to showcase their projects, skills, and social profiles all in one place. Create a personalized, streamlined portfolio in minutes.",
};

export default async function AppLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen ">
          <aside className="bg-white w-48 p-4 shadow-2xl">
            <div className="rounded-full overflow-hidden w-24 mx-auto">
              <Image
                src={session.user.image}
                alt="user-image"
                width={128}
                height={128}
              />
            </div>
            <div className="text-center">
              <nav className="inline-flex flex-col text-center mt-8 gap-6 text-gray-700 *:flex *:gap-2">
                <Link href="/account" className="">
                  <UserCog />
                  <span>My Page</span>
                </Link>
                <Link href="/analytics">
                  <ChartNetwork />
                  <span>Analytics</span>
                </Link>
                <LogoutButton />
              </nav>
            </div>
          </aside>
          <main className="flex-1">
            <div className="bg-white m-4 p-4 h-full shadow">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
