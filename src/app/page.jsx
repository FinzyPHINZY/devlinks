import HeroForm from "../components/forms/HeroForm";

export default function Home() {
  return (
    <main>
      <section className="pt-32 ">
        <div className="max-w-md mb-8">
          <h1 className="text-6xl font-bold">
            Your one <span className="bg-blue-500">link</span> <br />
            for everything
          </h1>
          <h2 className="text-gray-500 text-xl mt-6">
            Build Your Developer Portfolio in Minute. Share your links, social
            profiles, contact info and more on one page
          </h2>
        </div>
        <HeroForm />
      </section>
    </main>
  );
}
