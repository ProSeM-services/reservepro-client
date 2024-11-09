"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const data = [
  {
    month: "September",
    count: 0,
    fill: "var(--color-september)",
  },
  {
    month: "October",
    count: 3,
    fill: "var(--color-october)",
  },
  {
    month: "November",
    count: 3,
    fill: "var(--color-november)",
  },
];
const chartConfig = {
  January: {
    label: "January",
    color: "hsl(var(--chart-1))",
  },
  February: {
    label: "February",
    color: "hsl(var(--chart-2))",
  },
  March: {
    label: "March",
    color: "hsl(var(--chart-3))",
  },
  april: {
    label: "April",
    color: "hsl(var(--chart-4))",
  },
  May: {
    label: "May",
    color: "hsl(var(--chart-5))",
  },
  June: {
    label: "June",
    color: "hsl(var(--chart-5))",
  },
  July: {
    label: "July",
    color: "hsl(var(--chart-5))",
  },
  August: {
    label: "August",
    color: "hsl(var(--chart-5))",
  },
  September: {
    label: "September",
    color: "hsl(var(--chart-5))",
  },
  october: {
    label: "October",
    color: "hsl(var(--chart-5))",
  },
  november: {
    label: "November",
    color: "hsl(var(--chart-1))",
  },
  December: {
    label: "December",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;
// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   count: {
//     label: "Desktop",
//   },
//   mobile: {
//     label: "Mobile",
//   },
//   january: {
//     label: "January",
//     color: "hsl(var(--chart-1))",
//   },
//   february: {
//     label: "February",
//     color: "hsl(var(--chart-2))",
//   },
//   march: {
//     label: "March",
//     color: "hsl(var(--chart-3))",
//   },
//   april: {
//     label: "April",
//     color: "hsl(var(--chart-4))",
//   },
//   may: {
//     label: "May",
//     color: "hsl(var(--chart-5))",
//   },
// } satisfies ChartConfig;

export function PieExampleGraph() {
  const id = "pie-interactive";
  const [activeMonth, setActiveMonth] = React.useState(data[0].month);

  const activeIndex = React.useMemo(
    () => data.findIndex((item) => item.month === activeMonth),
    [activeMonth]
  );
  const months = React.useMemo(() => data.map((item) => item.month), []);

  return (
    <Card data-chart={id} className="flex flex-col border-none">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="count"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {data[activeIndex].count.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
