// "use client";
import connnectDB from "@/lib/database";
import "../../globals.css";

import Page from "@/models/page";
import { Stat } from "@/models/Stats";
import { User } from "@/models/User";
import { Link as Linkk } from "lucide-react";
import {
  Codepen,
  Dribbble,
  Facebook,
  Figma,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Slack,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const buttonIcons = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
  mobile: Phone,
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  slack: Slack,
  dribble: Dribbble,
  figma: Figma,
  codepen: Codepen,
};

const buttonLink = (key, value) => {
  if (key === "mobile") {
    return "tel:" + value;
  }
  if (key === "email") {
    return "mailto:" + value;
  }
  return value;
};

const UserPage = async ({ params }) => {
  connnectDB();
  const uri = params.uri;
  const page = await Page.findOne({ uri });
  const user = await User.findOne({ email: page.owner });

  await Stat.create({ uri: uri, page: uri, type: "view" });

  return (
    <div className="bg-blue-950 text-white min-h-screen">
      <div
        className="h-36 bg-gray-400 py-16 flex justify-center items-center bg-cover bg-center bg-no-repeat min-h-[300px]"
        style={
          page.bgType === "color"
            ? { backgroundColor: page.bgColor }
            : { backgroundImage: `url(${page.bgImage})` }
        }
      ></div>
      <div className="aspect-square w-36 h-36 mx-auto relative -top-16 -mb-12">
        <Image
          src={user.image}
          className="rounded-full w-full h-full object-cover"
          alt="avatar"
          width={256}
          height={256}
        />
      </div>

      <h2 className="text-2xl text-center mb-1">{page.displayName}</h2>
      <h3 className="text-md flex gap-2 justify-center items-center text-white/70">
        <MapPin />
        <span> {page.location}</span>
      </h3>

      <div className="max-w-xs mx-auto text-center my-2">
        <p className="">{page.bio}</p>
      </div>

      <div className="flex gap-2 justify-center mt-4 pb-4">
        {Object.keys(page.buttons).map((button) => {
          const IconComponent = buttonIcons[button]; // Get the icon component
          return (
            <Link
              href={buttonLink(button, page.buttons[button])}
              key={button}
              className="rounded-full bg-white text-blue-950 border border-white p-2  flex items-center justify-center"
            >
              {IconComponent && <IconComponent className="" />}{" "}
              {/* Render the icon */}
              {/* <span>{page.buttons[button]}</span> */}
            </Link>
          );
        })}
      </div>

      <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-4 px-8">
        {page.links.map((link) => (
          <Link
            ping={`${process.env.URL}api/click?url=${btoa(link.url)}&page=${
              page.uri
            }`}
            href={link.url}
            target="_blank"
            key={link.key}
            className="bg-indigo-900 p-2 flex items-center gap-2 rounded-lg"
          >
            <div className="bg-blue-700 aspect-square relative -left-6 w-16 h-16 overflow-hidden flex items-center justify-center rounded">
              {link.icon ? (
                <Image src={link.icon} alt="icon" width={64} height={64} />
              ) : (
                <Linkk className="w-8 h-8" />
              )}
            </div>
            <div className="flex items-center">
              <div className="">
                <h3>{link.title}</h3>
                <p className="text-white/50 h-6 overflow-hidden">
                  {link.subtitle}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
