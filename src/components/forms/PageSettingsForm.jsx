"use client";

import {
  Camera,
  CloudUpload,
  Image as ImageIcon,
  Palette,
  Save,
} from "lucide-react";
import Image from "next/image";
import SubmitButton from "../Buttons/SubmitButton";
import RadioToggler from "../FormItems/RadioToggler";
import { saveFormSettings } from "@/actions/PageActions";
import toast from "react-hot-toast";
import { useState } from "react";
import SectionBox from "../layout/SectionBox";

export const upload = async (event, callbackFn) => {
  const file = event.target.files?.[0];
  if (file) {
    const uploadPromise = new Promise((resolve, reject) => {
      const data = new FormData();
      data.set("file", file);
      fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          response.json().then((link) => {
            callbackFn(link);
            resolve(link);
          });
        } else {
          reject();
        }
      });
    });

    await toast.promise(uploadPromise, {
      loading: "Uploading...",
      success: "Uploaded!",
      error: "Upload error!",
    });
  }
};

const PageSettingsForm = ({ page, user }) => {
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  const [bgImage, setBgImage] = useState(page.bgImage);
  const [avatar, setAvatar] = useState(user.image);

  async function saveBaseSettings(formData) {
    const result = await saveFormSettings(formData);
    result
      ? toast.success("Settings have been saved successfully.")
      : toast.error("Failed to save settings. Please try again.");
  }

  const handleCoverImageChange = async (event) => {
    await upload(event, (link) => setBgImage(link));
  };

  const handleAvatarImageChange = async (event) => {
    await upload(event, (link) => setAvatar(link));
  };

  return (
    <div className="">
      <SectionBox>
        <form action={saveBaseSettings}>
          <div
            className="py-16 flex justify-center items-center bg-cover bg-center bg-no-repeat min-h-[300px]"
            style={
              bgType === "color"
                ? { backgroundColor: bgColor }
                : { backgroundImage: `url(${bgImage})` }
            }
          >
            <div>
              <RadioToggler
                defaultValue={page.bgType}
                options={[
                  { value: "color", icon: Palette, label: "Color" },
                  { value: "image", icon: ImageIcon, label: "Image" },
                ]}
                onChange={(val) => setBgType(val)}
              />
              {bgType === "color" && (
                <div className="bg-gray-200 shadow text-gray-700 p-2 mt-2">
                  <div className="flex justify-center gap-2">
                    <span className="">Background color: </span>
                    <input
                      type="color"
                      name="bgColor"
                      id=""
                      className=""
                      defaultValue={page.bgColor}
                      onChange={(ev) => setBgColor(ev.target.value)}
                    />
                  </div>
                </div>
              )}
              {bgType === "image" && (
                <div className="flex justify-center">
                  <label className="bg-white shadow px-4 py-2 mt-2 ">
                    <input type="hidden" name="bgImage" value={bgImage} />
                    <input
                      type="file"
                      onChange={handleCoverImageChange}
                      className="hidden"
                    />
                    <div className="flex items-center gap-2 cursor-pointer">
                      <CloudUpload />
                      <span> Change Image</span>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center -mb-12 ">
            <div className="relative -top-8 w-[128px] h-[128px]">
              <div className="overflow-hidden h-full">
                <Image
                  src={avatar}
                  className="w-full h-full object-cover  rounded-full border-4 border-white shadow shadow-black/50"
                  alt="avatar"
                  width={128}
                  height={128}
                />
              </div>

              <label
                className="absolute bottom-0 bg-white p-2 rounded-full shadow shadow-black/50 cursor-pointer"
                htmlFor="avatarInput"
              >
                <Camera />
              </label>
              <input
                type="file"
                name=""
                id="avatarInput"
                className="hidden"
                onChange={handleAvatarImageChange}
              />
              <input type="hidden" name="avatar" value={avatar} />
            </div>
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
      </SectionBox>
    </div>
  );
};

export default PageSettingsForm;
