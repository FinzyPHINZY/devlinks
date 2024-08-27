"use client";

import React, { useEffect, useState } from "react";
import SectionBox from "../layout/SectionBox";
import {
  Codepen,
  Dribbble,
  Facebook,
  Figma,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Mails,
  Phone,
  Plus,
  Save,
  Slack,
  Trash,
  Twitter,
  Youtube,
} from "lucide-react";
import SubmitButton from "../Buttons/SubmitButton";
import { savePageButtons } from "@/actions/PageActions";
import toast from "react-hot-toast";
import { GripHorizontal } from "lucide-react";
import { ReactSortable } from "react-sortablejs";

const allButtons = [
  { key: "email", label: "E-mail", icon: Mail, placeholder: "jogn@doe.com" },
  {
    key: "github",
    label: "GitHub",
    icon: Github,
    placeholder: "www.github.com/johnDoe",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    placeholder: "www.linkedin.com/in/john-doe",
  },
  {
    key: "mobile",
    label: "Mobile",
    icon: Phone,
    placeholder: "+1 john-doe john",
  },
  {
    key: "twitter",
    label: "Twitter",
    icon: Twitter,
    placeholder: "www.twitter.com/iamjohndoe",
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: Instagram,
    placeholder: "www.instagram.com/iamjohndoe",
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: Facebook,
    placeholder: "www.facebook.com/iamjohndoe",
  },
  {
    key: "youtube",
    label: "YouTube",
    icon: Youtube,
    placeholder: "www.youtube.com/iamjohndoe",
  },
  { key: "slack", label: "Slack", icon: Slack, placeholder: "Your Slack URL" },
  {
    key: "dribble",
    label: "Dribble",
    icon: Dribbble,
    placeholder: "Your Dribbble URL",
  },
  { key: "figma", label: "Figma", icon: Figma, placeholder: "Your Figma URL" },
  {
    key: "codepen",
    label: "CodePen",
    icon: Codepen,
    placeholder: "placeholder",
  },
];

const PageButtonsForm = ({ page, user }) => {
  let savedButtonsInfo = [];

  if (page.buttons) {
    const savedButtonsKeys = Object.keys(page.buttons);
    savedButtonsInfo = savedButtonsKeys.map((key) =>
      allButtons.find((button) => button.key === key)
    );
  }

  const [activeButtons, setActiveButtons] = useState(savedButtonsInfo);

  console.log(activeButtons);

  const addButtonToProfile = (button) => {
    setActiveButtons((prev) => {
      return [...prev, button];
    });
  };

  const saveButtons = async (formData) => {
    try {
      await savePageButtons(formData);
      toast.success("Button Links Saved!");
    } catch (error) {
      toast.error("Failed to save Button Links!");
    }
  };

  const removeButton = (key) => {
    setActiveButtons((prev) => prev.filter((button) => button.key !== key));
  };

  const availableButtons = allButtons
    .filter((button) => !activeButtons.find((btn) => button.key === btn.key))
    .sort((a, b) => a.key.localeCompare(b.key));
  return (
    <SectionBox>
      <form action={saveButtons}>
        <h2 className="text-4xl font-bold mb-4">Buttons</h2>
        <ReactSortable
          handle=".handle"
          list={activeButtons}
          setList={setActiveButtons}
        >
          {activeButtons.map((b) => (
            <div key={b.key} className="mb-4 flex items-center gap-2 ">
              <div className="w-36 flex flex-col md:flex-row gap-2 items-center text-gray-700">
                <b.icon />
                <span>{b.label}</span>
              </div>
              <input
                type="text"
                defaultValue={page.buttons ? page.buttons[b.key] : ""}
                style={{ marginBottom: "0" }}
                placeholder={b.placeholder}
                name={b.key}
                aria-label={`Input for ${b.label}`}
              />
              <button
                onClick={() => removeButton(b.key)}
                type="button"
                className="p-2 bg-gray-300 text-red-500"
                aria-label={`Remove ${b.label} button`}
              >
                <Trash size={18} />
              </button>
              <GripHorizontal
                className="handle cursor-pointer text-gray-400"
                aria-label="Drag to reorder button"
              />
            </div>
          ))}
        </ReactSortable>

        <div className="flex flex-wrap gap-2 mt-8 border-t pt-4">
          {availableButtons.map((button) => (
            <button
              key={button.key}
              type="button"
              className="flex gap-1 p-2 items-center bg-gray-200"
              onClick={() => addButtonToProfile(button)}
              aria-label={`Add ${button.label} button`}
            >
              <button.icon color="blue" aria-hidden="true" />
              <span>{button.label}</span>
              <Plus size={12} color="green" aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="mt-8">
          <SubmitButton aria-label="Save button links">
            <Save aria-hidden="true" />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default PageButtonsForm;
