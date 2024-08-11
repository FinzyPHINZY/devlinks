"use server";

import mongoose from "mongoose";
import Page from "../models/page";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

const Username = async (formData) => {
  const username = formData.get("username");
  console.log("username", username);
  mongoose.connect(process.env.MONGODB_URI);
  const existingPageDoc = await Page.findOne({ uri: username });

  if (existingPageDoc) {
    return false;
  } else {
    const session = await getServerSession(authOptions);
    console.log(`Creating session before storing data: ${session}`);
    await Page.create({
      uri: username,
      owner: session.user.email,
    });
    return true;
  }
};

export default Username;
