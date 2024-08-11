import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import UsernameForm from "../../../components/forms/UsernameForm";
import Page from "../../../models/page";
import mongoose from "mongoose";

const AccountPage = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);
  const usernameInput = searchParams.usernameInput;
  if (!session) {
    redirect("/");
  }
  mongoose.connect(process.env.MONGODB_URI);
  const page = await Page.findOne({ owner: session.user.email });

  if (page) {
    return <div>your page is: /{page.uri} </div>;
  }
  return (
    <div>
      <UsernameForm usernameInput={usernameInput} />
    </div>
  );
};

export default AccountPage;
