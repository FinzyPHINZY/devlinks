import RadioToggler from "../FormItems/RadioToggler";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Palette, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

const PageSettingsForm = async ({ page }) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="-m-4">
      <form>
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
            src={session?.user?.image}
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
          <input type="text" id="nameInput" placeholder="Jotn Doe" />
          <label className="input-label" htmlFor="locationInput">
            Location:
          </label>
          <input type="text" id="locationInput" placeholder="Scranton" />
          <label className="input-label" htmlFor="bioInput">
            Bio:
          </label>
          <textarea id="bioInput" placeholder="Some stuff about you" />{" "}
        </div>
      </form>
    </div>
  );
};

export default PageSettingsForm;
