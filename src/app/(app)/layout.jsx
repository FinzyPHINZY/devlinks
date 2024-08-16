import "../globals.css";
import Page from "@/models/page";
import { getServerSession } from "next-auth";
import { Lato } from "next/font/google";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import AppSidebar from "../../components/layout/AppSidebar";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import connnectDB from "@/lib/database";
import { TableOfContents } from "lucide-react";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

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

  connnectDB();
  const page = await Page.findOne({ owner: session.user.email });

  return (
    <html lang="en">
      <body className={lato.className}>
        <div className="md:flex min-h-screen ">
          <div className="">
            <label
              htmlFor="navCheckbox"
              className="shadow-lg p-4 rounded-md bg-white items-center cursor-pointer gap-2 inline-flex md:hidden ml-4 mt-4 mb-2"
            >
              <TableOfContents />
              <span>Open Navigation</span>
            </label>
            <input type="checkbox" id="navCheckbox" className="hidden" />
            <label
              htmlFor="navCheckbox"
              className="backdrop fixed inset-0 bg-black/80 z-10 hidden"
            ></label>
          </div>

          <aside className="hidden bg-white w-48 p-4 shadow-2xl fixed md:static left-0 top-0 bottom-0 z-20 transition-all">
            <div className="sticky top-0 pt-4">
              <div className="rounded-full overflow-hidden aspect-square w-24 mx-auto">
                <Image
                  src={session.user.image}
                  alt="user-image"
                  width={256}
                  height={256}
                />
              </div>
              {page && (
                <Link target="_blank" href={`/${page.uri}`}>
                  <div className="text-center mt-4 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faLink}
                      className="text-blue-700"
                      size="lg"
                    />
                    <span className="text-2xl">/</span>
                    <span className="">{page.uri}</span>
                  </div>
                </Link>
              )}
              <div className="text-center">
                <AppSidebar />
              </div>
            </div>
          </aside>
          <main className="grow">{children}</main>
        </div>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
