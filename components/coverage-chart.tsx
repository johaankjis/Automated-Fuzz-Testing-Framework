"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { day: "Mon", critical: 82, all: 78 },
  { day: "Tue", critical: 83, all: 80 },
  { day: "Wed", critical: 84, all: 82 },
  { day: "Thu", critical: 85, all: 83 },
  { day: "Fri", critical: 86, all: 85 },
  { day: "Sat", critical: 87, all: 86 },
  { day: "Sun", critical: 87, all: 87 },
]

const chartConfig = {
  critical: {
    label: "Critical Modules",
    color: "hsl(var(--chart-1))",
  },
  all: {
    label: "All Modules",
    color: "hsl(var(--chart-2))",
  },
}

export function CoverageChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[240px] w-full">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="fillCritical" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-critical)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-critical)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fillAll" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-all)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-all)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          domain={[70, 100]}
          ticks={[70, 80, 90, 100]}
          tickFormatter={(value) => `${value}%`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="critical"
          stroke="var(--color-critical)"
          fill="url(#fillCritical)"
          strokeWidth={2}
        />
        <Area type="monotone" dataKey="all" stroke="var(--color-all)" fill="url(#fillAll)" strokeWidth={2} />
      </AreaChart>
    </ChartContainer>
  )
}
