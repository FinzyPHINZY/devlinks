"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";

const LogoutButton = ({ className }) => {
  return (
    <button
      className={`flex items-center gap-2 border px-4 py-2 shadow ${className}`}
      onClick={() => signOut()}
    >
      <span>Logout</span>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );
};

export default LogoutButton;
