"use client";

import { addDays, differenceInDays, formatISO9075, parseISO } from "date-fns";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Chart = ({ data }) => {
  const xLabel = Object.keys(data[0]).find((key) => key !== "date");
  const dataWithoutGaps = [];

  data.forEach((value, index) => {
    const date = value.date;
    dataWithoutGaps.push({ date, [xLabel]: value?.[xLabel] || 0 });

    const nextDate = data?.[index + 1]?.date;
    if (date && nextDate) {
      const daysBetween = differenceInDays(parseISO(date), parseISO(nextDate));

      if (daysBetween > 0) {
        for (let i = 1; i < daysBetween; i++) {
          const dateBetween = formatISO9075(addDays(parseISO(date), i)).split(
            " "
          )[0];
          dataWithoutGaps.push({
            date: dateBetween,
            [xLabel]: 0,
          });
        }
      }
    }
  });

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid horizontal={false} strokeWidth="2" stroke="#f5f5f5" />
          <XAxis dataKey="date" tickMargin={5} tick={{ fill: "#aaa" }} />
          <YAxis tickMargin={5} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={xLabel}
            stroke="#09f"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
