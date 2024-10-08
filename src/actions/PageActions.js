"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connnectDB from "@/lib/database";
import Page from "@/models/page";
import { User } from "@/models/User";
import { mongoose } from "mongoose";
import { getServerSession } from "next-auth";

export const saveFormSettings = async (formData) => {
  connnectDB();
  const session = await getServerSession(authOptions);

  if (!session) return false;

  const dataKeys = [
    "displayName",
    "location",
    "bio",
    "bgType",
    "bgColor",
    "bgImage",
  ];

  const data = {};
  for (const key of dataKeys) {
    if (formData.has(key)) {
      data[key] = formData.get(key);
    }
  }

  await Page.updateOne({ owner: session.user?.email }, data);

  if (formData.has("avatar")) {
    const avatarLink = formData.get("avatar");
    await User.updateOne(
      {
        email: session.user?.email,
      },
      { image: avatarLink }
    );
  }

  return true;
};

export const savePageButtons = async (formData) => {
  connnectDB();
  const session = await getServerSession(authOptions);

  if (!session) return false;

  const buttonValues = {};
  formData.forEach((value, key) => {
    buttonValues[key] = value;
  });

  const data = { buttons: buttonValues };
  await Page.updateOne({ owner: session.user?.email }, data);

  return true;
};

export const savePageLinks = async (links) => {
  connnectDB();
  const session = await getServerSession(authOptions);

  if (!session) return false;

  await Page.updateOne({ owner: session.user?.email }, { links: links });

  return true;
};
