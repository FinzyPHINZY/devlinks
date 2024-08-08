import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header className="bg-white">
        <div className="">
          <Link href="/">DevLinks</Link>
          <nav>
            <Link href="/about">About</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>

        <div className="">
          <Link href="/login">Sign In</Link>
          <Link href="/register">Create Account</Link>
        </div>
      </header>

      <section></section>
    </main>
  );
}
