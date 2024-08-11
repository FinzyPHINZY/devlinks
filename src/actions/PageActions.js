"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Page from "@/models/page";
import { mongoose } from "mongoose";
import { getServerSession } from "next-auth";

export const saveFormSettings = async (formData) => {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);

  if (!session) return false;

  const displayName = formData.get("displayName");
  const location = formData.get("location");
  const bio = formData.get("bio");

  await Page.updateOne(
    { owner: session.user?.email },
    {
      displayName,
      location,
      bio,
    }
  );

  return true;
};
