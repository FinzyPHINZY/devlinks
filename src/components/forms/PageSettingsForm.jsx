"use client";

import { Image as ImageIcon, Palette, Save } from "lucide-react";
import Image from "next/image";
import SubmitButton from "../Buttons/SubmitButton";
import RadioToggler from "../FormItems/RadioToggler";
import { saveFormSettings } from "@/actions/PageActions";
import toast from "react-hot-toast";

const PageSettingsForm = ({ page, user }) => {
  async function saveBaseSettings(formData) {
    const result = await saveFormSettings(formData);
    result
      ? toast.success("Settings have been saved successfully.")
      : toast.error("Failed to save settings. Please try again.");
  }
  return (
    <div className="-m-4">
      <form action={saveBaseSettings}>
        <div className="bg-gray-300 py-16 h-32 flex justify-center items-center">
          <RadioToggler
            options={[
              { value: "color", icon: Palette, label: "Color" },
              { value: "image", icon: ImageIcon, label: "Image" },
            ]}
          />
        </div>
        <div className="flex justify-center -mb-12">
          <Image
            src={user.image}
            className="rounded-full relative -top-8 border-4 border-white shadow-lg shadow-black/50"
            alt="avatar"
            width={128}
            height={128}
          />
        </div>
        <div className="p-4">
          <label className="input-label" htmlFor="nameInput">
            Display name:
          </label>
          <input
            type="text"
            id="nameInput"
            name="displayName"
            placeholder="Jotn Doe"
            defaultValue={page.displayName}
          />
          <label className="input-label" htmlFor="locationInput">
            Location:
          </label>
          <input
            type="text"
            id="locationInput"
            name="location"
            placeholder="Scranton"
            defaultValue={page.location}
          />
          <label className="input-label" htmlFor="bioInput">
            Bio:
          </label>
          <textarea
            id="bioInput"
            name="bio"
            placeholder="Some stuff about you"
            defaultValue={page.bio}
          />
          <SubmitButton>
            <Save />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default PageSettingsForm;
