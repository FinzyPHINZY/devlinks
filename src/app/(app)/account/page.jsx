import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import UsernameForm from "../../../components/forms/UsernameForm";
import Page from "../../../models/page";
import mongoose from "mongoose";
import PageSettingsForm from "../../../components/forms/PageSettingsForm";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";

const AccountPage = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);
  const usernameInput = searchParams.usernameInput;
  if (!session) {
    redirect("/");
  }
  mongoose.connect(process.env.MONGODB_URI);
  const page = await Page.findOne({ owner: session.user.email });

  if (page) {
    return (
      <>
        <PageSettingsForm page={page} user={session.user} />
        <PageButtonsForm page={page} user={session.user} />
        <PageLinksForm page={page} user={session.user} />
      </>
    );
  }
  return (
    <div>
      <UsernameForm usernameInput={usernameInput} />
    </div>
  );
};

export default AccountPage;
