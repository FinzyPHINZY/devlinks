import "../globals.css";

import { getServerSession } from "next-auth";
import { Inter, Lato } from "next/font/google";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import AppSidebar from "../../components/layout/AppSidebar";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Toaster } from "react-hot-toast";

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
  const headersList = headers();
  const url = headersList.get("next-url");
  console.log("url: " + url);
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  return (
    <html lang="en">
      <body className={lato.className}>
        <div className="flex min-h-screen ">
          <aside className="bg-white w-48 p-4 shadow-2xl">
            <div className="rounded-full overflow-hidden aspect-square w-24 mx-auto">
              <Image
                src={session.user.image}
                alt="user-image"
                width={256}
                height={256}
              />
            </div>
            <div className="text-center">
              <AppSidebar />
            </div>
          </aside>
          <main className="flex-1">
            <div className="bg-white m-4 p-4 shadow">{children}</div>
          </main>
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
