import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DevLinks - Simplify Your Developer Portfolio",
  description:
    "DevLinks is the ultimate tool for developers to showcase their projects, skills, and social profiles all in one place. Create a personalized, streamlined portfolio in minutes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="p-6 max-w-4xl mx-auto">{children}</div>
      </body>
    </html>
  );
}
