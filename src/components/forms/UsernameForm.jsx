"use client";

import { useState } from "react";
import Username from "../../actions/Username";
import { ArrowBigRightDash } from "lucide-react";
import { useRouter } from "next/navigation";
import SubmitButton from "../Buttons/SubmitButton";
import SectionBox from "../layout/SectionBox";

const UsernameForm = ({ usernameInput }) => {
  const router = useRouter();
  const [selected, setSelected] = useState(false);

  async function handleSubmit(formData) {
    const result = await Username(formData);
    if (result === false) {
      setSelected(true);
    } else {
      setSelected(false);
      router.push(`/account?created=${formData.get("username")}`);
    }
  }
  return (
    <SectionBox>
      <form action={handleSubmit}>
        <h1 className="text-4xl font-bold text-center mb-6">
          Grab your username
        </h1>
        <p className="text-center mb-6 text-gray-500">Choose your username</p>

        <div className="max-w-xs mx-auto *:w-full">
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="block p-2 mx-auto border mb-2 text-center outline-none"
            defaultValue={usernameInput}
          />
          {selected && (
            <div className="bg-red-200 border border-red-500 p-2 mb-2 text-center">
              Username is already taken
            </div>
          )}
          <SubmitButton>
            <span>Claim username</span> <ArrowBigRightDash />
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default UsernameForm;
