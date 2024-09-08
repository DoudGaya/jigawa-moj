"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive bar chart"

const chartData = [
  { month: "January", cases: 20, staffs: 10, inmates: 10, customers: 500 },
  { month: "February", cases: 222, staffs: 150, inmates: 100, customers: 300 },
  { month: "March", cases: 222, staffs: 150, inmates: 100, customers: 300 },
  { month: "April", cases: 222, staffs: 150, inmates: 100, customers: 300 },
  { month: "May", cases: 222, staffs: 150, inmates: 100, customers: 300 },
  { month: "June", cases: 222, staffs: 150, inmates: 100, customers: 300 },
  { month: "July", cases: 222, staffs: 150, inmates: 100, customers: 300 },
  { month: "August", cases: 222, staffs: 150, inmates: 100, customers: 300 },
  { month: "September", cases: 222, staffs: 150, inmates: 100, customers: 300 },
  { month: "October", cases: 222, staffs: 150, inmates: 100, customers: 300 },
  { month: "November", cases: 222, staffs: 150, inmates: 100, customers: 300 },
  { month: "December", cases: 222, staffs: 150, inmates: 100, customers: 300 },
]

const chartConfig = {
  views: {
    label: "Page Views",
  },
  staffs: {
    label: "Staffs",
    color: "hsl(var(--chart-1))",
  },
  inmates: {
    label: "Inmates",
    color: "hsl(var(--chart-2))",
  },
  customers: {
    label: "Customers",
    color: "hsl(var(--chart-2))",
  },
  cases: {
    label: "Cases",
    color: "hsl(var(--chart-2))",
  },
  
} satisfies ChartConfig

export function AdminDashboardCharts() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("inmates")

  const total = React.useMemo(
    () => ({
      customers: chartData.reduce((acc, curr) => acc + curr.customers, 0),
      inmates: chartData.reduce((acc, curr) => acc + curr.inmates, 0),
      cases: chartData.reduce((acc, curr) => acc + curr.cases, 0),
      staffs: chartData.reduce((acc, curr) => acc + curr.staffs, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing Total Records for a year
          </CardDescription>
        </div>
        <div className="flex">
          {["customers", "inmates", 'cases', 'staffs'].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
