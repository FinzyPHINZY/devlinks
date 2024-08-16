import connnectDB from "@/lib/database";
import { Stat } from "@/models/Stats";

export async function POST(req) {
  connnectDB();
  const url = new URL(req.url);
  const clickedLink = atob(url.searchParams.get("url"));
  const page = url.searchParams.get("page");
  await Stat.create({ type: "click", uri: clickedLink, page });
  return Response.json(true);
}
