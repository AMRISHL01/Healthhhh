
"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import type { Vital } from "@/lib/types";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "@/hooks/use-translation";

type VitalsChartProps = {
  vitals: Vital[];
};


export default function VitalsChart({ vitals }: VitalsChartProps) {
  const { t } = useTranslation();

  const chartConfig = {
    heartRate: {
      label: t("Heart Rate"),
      color: "hsl(var(--chart-1))",
    },
    spo2: {
      label: "SpO₂",
      color: "hsl(var(--chart-2))",
    },
    temperature: {
      label: t("Temperature"),
      color: "hsl(var(--chart-3))",
    },
  };

  const chartData = vitals
    .map((v) => ({
      ...v,
      date: format(new Date(v.date), "MMM d"),
    }))
    .reverse();

  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <LineChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={12}
          yAxisId="left"
        />
        <YAxis
          orientation="right"
          yAxisId="right"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={12}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="heartRate"
          type="monotone"
          stroke="var(--color-heartRate)"
          strokeWidth={2}
          dot={true}
          yAxisId="left"
          name={chartConfig.heartRate.label}
        />
        <Line
          dataKey="spo2"
          type="monotone"
          stroke="var(--color-spo2)"
          strokeWidth={2}
          dot={true}
          yAxisId="left"
          name={chartConfig.spo2.label}
        />
        <Line
          dataKey="temperature"
          type="monotone"
          stroke="var(--color-temperature)"
          strokeWidth={2}
          dot={true}
          yAxisId="right"
          name={chartConfig.temperature.label}
        />
      </LineChart>
    </ChartContainer>
  );
}
