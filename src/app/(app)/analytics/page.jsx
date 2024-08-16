import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Chart from "@/components/Chart";
import SectionBox from "@/components/layout/SectionBox";
import connnectDB from "@/lib/database";
import Page from "@/models/page";
import { Stat } from "@/models/Stats";
import { isToday } from "date-fns";
import { Link } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AnalyticsPage = async () => {
  connnectDB();
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/");

  const page = await Page.findOne({ owner: session.user.email });

  const groupedViews = await Stat.aggregate([
    {
      $match: {
        type: "view",
        uri: page.uri,
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$createdAt",
            format: "%Y-%m-%d",
          },
        },
        count: {
          $count: {},
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  const clicks = await Stat.find({
    page: page.uri,
    type: "click",
  });

  const data = groupedViews.map((o) => ({
    date: o._id,
    views: o.count,
  }));

  return (
    <div>
      <SectionBox>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-xs italic text-gray-400">
            *Ad-blockers on client devices may affect the data{" "}
          </p>
        </div>
      </SectionBox>
      <SectionBox>
        <h2 className="text-xl mb-6 text-center">Views</h2>
        <Chart data={data} />
      </SectionBox>

      <SectionBox>
        <h2 className="text-xl mb-6 text-center">Clicks</h2>
        {page.links.map((link) => (
          <div
            className=" flex gap-6 items-center border-t border-gray-200 py-4"
            key={link.key}
          >
            <div className="text-blue-500 pl-4">
              <Link />
            </div>
            <div className="grow">
              <h3> {link.title || "No title"}</h3>
              <p className="text-gray-500 text-xs">{link.subtitle || ""}</p>
              <a
                href={link.url}
                className="text-sm text-blue-700"
                target="_blank"
              >
                {link.url}
              </a>
            </div>
            <div className=" flex items-center gap-4 text-center *:flex *:flex-col-reverse *:items-center">
              <div>
                <span className="text-gray-500 text-xs uppercase font-bold">
                  today
                </span>
                <span className="text-xl">
                  {
                    clicks.filter(
                      (click) =>
                        click.uri === link.url && isToday(click.createdAt)
                    ).length
                  }
                </span>
              </div>
              <p>|</p>

              <div>
                <span className="text-gray-500 text-xs uppercase font-bold">
                  all time
                </span>
                <span className="text-lg">
                  {clicks.filter((click) => click.uri === link.url).length}
                </span>
              </div>
            </div>
          </div>
        ))}
      </SectionBox>
    </div>
  );
};

export default AnalyticsPage;
