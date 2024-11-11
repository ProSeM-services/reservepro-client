"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useMemo, useState } from "react";
import { MonthlyData } from "../models";
import { StatsServices } from "@/services/stats.services";
import { setAuthInterceptor } from "@/config/axios.config";
import { useSession } from "next-auth/react";
import { createChartConfig } from "../utils/generateCharConfig";
import { BarLoader } from "@/components/common/bar-loader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MONTHS } from "../constants";
import { Input } from "@/components/ui/input";
export function AppointmentStats() {
  const session = useSession();
  const [data, setData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});
  const [dateLimits, setDateLimits] = useState({
    start: 9,
    end: 11,
    year: 2024,
  });
  useEffect(() => {
    if (!session.data || !session.data?.backendTokens?.accessToken) return;
    const fetch = async () => {
      try {
        setLoading(true);
        setFetched(false);
        await setAuthInterceptor(session.data?.backendTokens.accessToken);
        const res = await StatsServices.getAppointmentStats(
          dateLimits.start,
          dateLimits.end,
          dateLimits.year
        );
        setChartConfig(createChartConfig(res));
        setData(res);
      } catch (error) {
        console.log("Error fetching today appointments : ", error);
      } finally {
        setFetched(true);
        setLoading(false);
      }
    };

    fetch();
  }, [session.data, dateLimits]);

  if (fetched && data.length === 0) {
    return <div>No data</div>;
  }

  const { end, start, year } = dateLimits;
  return (
    <Card className="w-2/5 flex flex-col justify-between ">
      <CardHeader>
        <CardTitle>Turnos Agendados</CardTitle>
        <CardDescription>
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              value={year}
              onChange={(e) =>
                setDateLimits((s) => ({
                  ...s,
                  year: parseInt(e.target.value),
                }))
              }
            />
            <Select
              value={`${start}`}
              onValueChange={(value) =>
                setDateLimits((s) => ({ ...s, start: parseInt(value) }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Desde" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Mes</SelectLabel>
                  {MONTHS.map((month, value) => (
                    <SelectItem value={`${value + 1}`} key={value}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <span> - </span>
            <Select
              value={`${end}`}
              onValueChange={(value) =>
                setDateLimits((s) => ({ ...s, end: parseInt(value) }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Hasta" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Mes</SelectLabel>
                  {MONTHS.map((month, value) => (
                    <SelectItem
                      key={value}
                      value={`${value + 1}`}
                      disabled={value + 1 <= start}
                    >
                      {month}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className=" w-full h-60 bg-accent relative rounded-xl">
            <BarLoader />
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={2}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              {/* Generamos las barras dinámicamente */}
              {Object.keys(chartConfig).map((serviceKey) => (
                <Bar
                  key={serviceKey}
                  dataKey={serviceKey}
                  fill={chartConfig[serviceKey].color}
                  radius={4}
                />
              ))}
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
