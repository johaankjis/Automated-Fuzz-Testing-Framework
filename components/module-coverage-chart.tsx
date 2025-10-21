"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { week: "W1", json: 82, xml: 78, http: 85, url: 80 },
  { week: "W2", json: 84, xml: 80, http: 87, url: 82 },
  { week: "W3", json: 85, xml: 81, http: 89, url: 84 },
  { week: "W4", json: 87, xml: 83, http: 90, url: 86 },
  { week: "W5", json: 88, xml: 84, http: 91, url: 87 },
  { week: "W6", json: 89, xml: 85, http: 92, url: 88 },
]

const chartConfig = {
  json: {
    label: "JSON Parser",
    color: "hsl(var(--chart-1))",
  },
  xml: {
    label: "XML Parser",
    color: "hsl(var(--chart-2))",
  },
  http: {
    label: "HTTP Parser",
    color: "hsl(var(--chart-3))",
  },
  url: {
    label: "URL Parser",
    color: "hsl(var(--chart-4))",
  },
}

export function ModuleCoverageChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
        <XAxis
          dataKey="week"
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
        <Line type="monotone" dataKey="json" stroke="var(--color-json)" strokeWidth={2} dot={{ r: 3 }} />
        <Line type="monotone" dataKey="xml" stroke="var(--color-xml)" strokeWidth={2} dot={{ r: 3 }} />
        <Line type="monotone" dataKey="http" stroke="var(--color-http)" strokeWidth={2} dot={{ r: 3 }} />
        <Line type="monotone" dataKey="url" stroke="var(--color-url)" strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </ChartContainer>
  )
}
