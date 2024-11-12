"use client";
import { setAuthInterceptor } from "@/config/axios.config";
import { StatsServices } from "@/services/stats.services";
import { useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import { ICustomerStat } from "../models/customer-stats.interface";
import { LoaderSpinner } from "@/components/common/loader-spinner";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarLoader } from "@/components/common/bar-loader";

const chartConfig = {
  january: {
    label: "January",
    color: "hsl(var(--chart-1))",
  },
  february: {
    label: "February",
    color: "hsl(var(--chart-2))",
  },
  march: {
    label: "March",
    color: "hsl(var(--chart-3))",
  },
  april: {
    label: "April",
    color: "hsl(var(--chart-4))",
  },
  may: {
    label: "May",
    color: "hsl(var(--chart-5))",
  },
  june: {
    label: "June",
    color: "hsl(var(--chart-6))",
  },
  july: {
    label: "July",
    color: "hsl(var(--chart-7))",
  },
  august: {
    label: "August",
    color: "hsl(var(--chart-8))",
  },
  september: {
    label: "September",
    color: "hsl(var(--chart-9))",
  },
  october: {
    label: "October",
    color: "hsl(var(--chart-10))",
  },
  november: {
    label: "November",
    color: "hsl(var(--chart-11))",
  },
  december: {
    label: "December",
    color: "hsl(var(--chart-12))",
  },
} satisfies ChartConfig;

export function CustomerStats() {
  const session = useSession();
  const [customersStats, setCustomersStats] = useState<ICustomerStat[]>([]);
  const [activeMonth, setActiveMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const id = "pie-interactive";
  useEffect(() => {
    if (!session.data || !session.data?.backendTokens?.accessToken) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        await setAuthInterceptor(session.data?.backendTokens.accessToken);
        const data = await StatsServices.getCustomerStats();

        setCustomersStats(data);
        setActiveMonth(data.filter((e) => e.count > 0)[0].month);
      } catch (error) {
        console.log("error fetchin customers stats data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session.data]);
  const months = useMemo(
    () => customersStats.map((item) => item.month),
    [customersStats]
  );
  const activeIndex = useMemo(
    () => customersStats.findIndex((item) => item.month === activeMonth),
    [activeMonth]
  );

  return (
    <div>
      <Card
        data-chart={id}
        className="flex flex-col border-0 h-full  flex-grow max-w-1/3"
      >
        <ChartStyle id={id} config={chartConfig} />
        <CardHeader className="flex-row items-start space-y-0 pb-0">
          <div className="grid gap-1">
            <CardTitle>Clientes </CardTitle>
            <CardDescription>
              {months[0]} - {months[months.length - 1]} 2024
            </CardDescription>
          </div>
          <Select value={activeMonth} onValueChange={setActiveMonth}>
            <SelectTrigger
              className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">
              {months.map((key) => {
                const config =
                  chartConfig[key.toLowerCase() as keyof typeof chartConfig];

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
                          backgroundColor: ` ${config.color}`,
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
          {loading || !customersStats.length || !months.length ? (
            <div className="bg-white h-full w-full relative grid place-items-center">
              <BarLoader />
              Loading ...
            </div>
          ) : (
            <ChartContainer
              id={id}
              config={chartConfig}
              className="mx-auto aspect-square w-full "
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={customersStats}
                  dataKey="count"
                  nameKey="month"
                  innerRadius={60}
                  strokeWidth={5}
                  activeIndex={activeIndex}
                  activeShape={({
                    outerRadius = 0,
                    ...props
                  }: PieSectorDataItem) => (
                    <g className="bg-green-400">
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
                              {customersStats[
                                activeIndex
                              ].count.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              New Clients
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
