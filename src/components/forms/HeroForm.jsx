"use client";

import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

const HeroForm = ({ user }) => {
  const router = useRouter();
  useEffect(() => {
    if (
      `localStorage` in window &&
      window.localStorage.getItem("usernameInput")
    ) {
      const username = window.localStorage.getItem("usernameInput");
      window.localStorage.removeItem("usernameInput");
      redirect(`/account?usernameInput=${username}`);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.querySelector("input").value;

    if (username.length > 0) {
      if (user) {
        router.push(`/account?usernameInput=${username}`);
      } else {
        window.localStorage.setItem("usernameInput", username);
        await signIn("google");
      }
    }
  };

  return (
    <form
      className="inline-flex items-center shadow-lg shadow-gray-700/20"
      onSubmit={handleSubmit}
    >
      <span className="bg-white py-4 pl-4">devlink.to/</span>
      <input type="text" placeholder="username" className="py-4 outline-none" />
      <button type="submit" className="bg-blue-500 text-white py-4 px-6">
        Join for Free
      </button>
    </form>
  );
};

export default HeroForm;
