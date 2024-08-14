"use client";

import {
  CloudUpload,
  GripHorizontal,
  Link,
  Plus,
  Save,
  Trash,
} from "lucide-react";
import SectionBox from "../layout/SectionBox";
import SubmitButton from "../Buttons/SubmitButton";
import { ReactSortable } from "react-sortablejs";
import { useState } from "react";
import { upload } from "./PageSettingsForm";
import Image from "next/image";
import { savePageLinks } from "@/actions/PageActions";
import toast from "react-hot-toast";

const PageLinksForm = ({ page, user }) => {
  const [links, setLinks] = useState(page.links);
  const save = async () => {
    try {
      savePageLinks(links);
      toast.success("Link saved successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addNewLink = () => {
    setLinks((prev) => {
      return [
        ...prev,
        {
          key: Date.now().toString(),
          title: "",
          subtitle: "",
          icon: "",
          url: "",
        },
      ];
    });
  };

  const handleUpload = (ev, linkKeyForUpload) => {
    upload(ev, (uploadedImageUrl) => {
      setLinks((prev) => {
        const newLinks = [...prev];
        newLinks.forEach((link, i) => {
          if (link.key === linkKeyForUpload) {
            link.icon = uploadedImageUrl;
          }
        });
        return newLinks;
      });
    });
  };

  const handleLinkChange = (key, title, ev) => {
    setLinks((prev) => {
      const newLinks = [...prev];
      newLinks.forEach((link) => {
        if (link.key === key) {
          link[title] = ev.target.value;
        }
      });
      return [...prev];
    });
  };

  const removeLink = ({ key }) => {
    setLinks((prev) => [...prev].filter((link) => link.key !== key));
    toast.success("Removed link successfully");
  };
  return (
    <SectionBox>
      <form action={save}>
        <h2 className="text-4xl font-bold mb-4">
          Links <span className="text-sm">(Custom)</span>
        </h2>
        <button
          type="button"
          onClick={addNewLink}
          className="flex text-blue-500 text-lg gap-2 items-center"
        >
          <Plus className="bg-blue-500 text-white p-1 rounded-full aspect-square" />
          <span>Add new link</span>
        </button>
        <ReactSortable handle=".handle" list={links} setList={setLinks}>
          {links.map((link) => (
            <div key={link.key} className="mt-8 flex items-center gap-4">
              <div className="text-center">
                <div className="bg-gray-300 rounded-full relative aspect-square overflow-hidden w-16 h-16 inline-flex justify-center items-center">
                  {link.icon && (
                    <Image
                      src={link.icon}
                      className="object-cover w-full h-full rounded-full"
                      alt="icon"
                      width={64}
                      height={64}
                    />
                  )}
                  {!link.icon && <Link />}
                </div>

                <div>
                  <input
                    type="file"
                    name=""
                    onChange={(ev) => handleUpload(ev, link.key)}
                    id={"icon" + link.key}
                    className="hidden"
                  />
                  <label
                    type="button"
                    htmlFor={"icon" + link.key}
                    className="border text-gray-600 my-2 p-2 flex item-center justify-center gap-1 rounded-md cursor-pointer"
                  >
                    <CloudUpload />
                    <span>Change Icon</span>
                  </label>
                </div>
              </div>

              <div className="grow">
                <label className="input-label">Title:</label>
                <input
                  value={link.title}
                  onChange={(ev) => handleLinkChange(link.key, "title", ev)}
                  type="text"
                  placeholder="Title"
                />
                <label className="input-label">SubTitle:</label>
                <input
                  value={link.subtitle}
                  onChange={(ev) => handleLinkChange(link.key, "subtitle", ev)}
                  type="text"
                  placeholder="Subtitle (optional)"
                />
                <label className="input-label">URL:</label>
                <input
                  value={link.url}
                  onChange={(ev) => handleLinkChange(link.key, "url", ev)}
                  type="text"
                  placeholder="URL"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => removeLink(link)}
                  type="button"
                  className="p-2 bg-gray-300 text-red-500"
                >
                  <Trash size={18} />
                </button>
                <div>
                  <GripHorizontal className="handle text-gray-400 cursor-ns-resize " />
                </div>
              </div>
            </div>
          ))}
        </ReactSortable>

        <div className="border-t p-4 mt-4">
          <SubmitButton>
            <Save />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default PageLinksForm;
