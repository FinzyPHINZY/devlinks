import { SessionProvider } from "next-auth/react";
import HeroForm from "../../components/forms/HeroForm";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <section className="pt-32 ">
        <div className="max-w-md mb-8">
          <h1 className="text-6xl font-bold">
            Your one <span className="bg-blue-500 px-2">link</span>{" "}
            <br className="hidden md:block" />
            for everything
          </h1>
          <h2 className="text-gray-500 text-xl mt-6">
            Build Your Developer Portfolio in Minute. Share your links, social
            profiles, contact info and more on one page
          </h2>
        </div>
        <HeroForm user={session?.user} />
      </section>
    </main>
  );
}
