import connnectDB from "@/lib/database";
import { Stat } from "@/models/Stats";

export async function POST() {
  connnectDB();
  console.log("CLICK");
  await Stat.create({ type: "click", uri: "" });
  return Response.json(true);
}
