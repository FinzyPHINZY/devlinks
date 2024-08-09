"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signIn } from "next-auth/react";

const LoginWithGoogle = () => {
  return (
    <button
      className="bg-white shadow flex items-center gap-3 justify-center text-center w-full py-4 "
      onClick={() => signIn("google")}
    >
      <FontAwesomeIcon icon={faGoogle} className="h-6" />
      <span> Sign in with Google</span>
    </button>
  );
};

export default LoginWithGoogle;
