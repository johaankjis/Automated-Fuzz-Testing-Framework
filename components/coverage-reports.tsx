"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, FileCode, Download, ChevronRight } from "lucide-react"
import { ModuleCoverageChart } from "@/components/module-coverage-chart"
import { CoverageHeatmap } from "@/components/coverage-heatmap"

const modules = [
  {
    name: "json_parser.c",
    category: "Critical",
    functions: 24,
    functionsCovered: 22,
    lines: 847,
    linesCovered: 756,
    branches: 156,
    branchesCovered: 138,
    coverage: 89,
    trend: "up",
    lastUpdated: "2m ago",
  },
  {
    name: "xml_parser.c",
    category: "Critical",
    functions: 31,
    functionsCovered: 26,
    lines: 1203,
    linesCovered: 1022,
    branches: 234,
    branchesCovered: 198,
    coverage: 85,
    trend: "up",
    lastUpdated: "5m ago",
  },
  {
    name: "http_parser.c",
    category: "Critical",
    functions: 18,
    functionsCovered: 17,
    lines: 654,
    linesCovered: 601,
    branches: 112,
    branchesCovered: 103,
    coverage: 92,
    trend: "stable",
    lastUpdated: "12m ago",
  },
  {
    name: "url_parser.c",
    category: "Critical",
    functions: 15,
    functionsCovered: 13,
    lines: 523,
    linesCovered: 460,
    branches: 89,
    branchesCovered: 78,
    coverage: 88,
    trend: "up",
    lastUpdated: "18m ago",
  },
  {
    name: "base64.c",
    category: "Standard",
    functions: 8,
    functionsCovered: 8,
    lines: 234,
    linesCovered: 220,
    branches: 34,
    branchesCovered: 32,
    coverage: 94,
    trend: "stable",
    lastUpdated: "2h ago",
  },
  {
    name: "regex.c",
    category: "Standard",
    functions: 42,
    functionsCovered: 33,
    lines: 1876,
    linesCovered: 1463,
    branches: 412,
    branchesCovered: 321,
    coverage: 78,
    trend: "down",
    lastUpdated: "3h ago",
  },
]

const stats = {
  overallCoverage: 87,
  criticalModules: 88,
  totalFunctions: modules.reduce((acc, m) => acc + m.functions, 0),
  coveredFunctions: modules.reduce((acc, m) => acc + m.functionsCovered, 0),
  target: 85,
}

export function CoverageReports() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "critical" | "standard">("all")

  const filteredModules = filter === "all" ? modules : modules.filter((m) => m.category.toLowerCase() === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Coverage Reports</h1>
          <p className="mt-2 text-muted-foreground">LLVM SanitizerCoverage analysis and function coverage metrics</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Overall Coverage</p>
              <p className="mt-1 text-2xl font-bold">{stats.overallCoverage}%</p>
            </div>
            <BarChart3 className="h-8 w-8 text-chart-2" />
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Target: {stats.target}%</div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Critical Modules</p>
              <p className="mt-1 text-2xl font-bold">{stats.criticalModules}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-chart-1" />
          </div>
          <div className="mt-2 text-xs text-chart-2">+2% from last week</div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Functions Covered</p>
              <p className="mt-1 text-2xl font-bold">
                {stats.coveredFunctions}/{stats.totalFunctions}
              </p>
            </div>
            <FileCode className="h-8 w-8 text-chart-3" />
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            {Math.round((stats.coveredFunctions / stats.totalFunctions) * 100)}% coverage
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="mt-1 text-2xl font-bold text-chart-2">Passing</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-chart-2/10">
              <div className="h-3 w-3 rounded-full bg-chart-2" />
            </div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Above target threshold</div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Coverage Trends</h3>
            <p className="mt-1 text-sm text-muted-foreground">Module coverage over time</p>
          </div>
          <ModuleCoverageChart />
        </Card>

        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Coverage Distribution</h3>
            <p className="mt-1 text-sm text-muted-foreground">By module category</p>
          </div>
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Critical Modules</span>
                <span className="font-medium">88%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-chart-1" style={{ width: "88%" }} />
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Standard Modules</span>
                <span className="font-medium">86%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-chart-2" style={{ width: "86%" }} />
              </div>
            </div>
            <div className="pt-4">
              <h4 className="mb-3 text-sm font-semibold">Coverage Goals</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span className="text-sm">Target Coverage</span>
                  <Badge variant="secondary">≥85%</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span className="text-sm">Critical Modules</span>
                  <Badge variant="default" className="bg-chart-2/10 text-chart-2">
                    Achieved
                  </Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span className="text-sm">Overall Target</span>
                  <Badge variant="default" className="bg-chart-2/10 text-chart-2">
                    Achieved
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Module Coverage Details</h3>
          <div className="flex gap-2">
            <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
              All
            </Button>
            <Button
              variant={filter === "critical" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("critical")}
            >
              Critical
            </Button>
            <Button
              variant={filter === "standard" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("standard")}
            >
              Standard
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredModules.map((module) => (
            <div
              key={module.name}
              className="cursor-pointer rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
              onClick={() => setSelectedModule(module.name)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileCode className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-sm font-medium">{module.name}</p>
                      <Badge variant={module.category === "Critical" ? "default" : "secondary"}>
                        {module.category}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          module.trend === "up"
                            ? "border-chart-2 text-chart-2"
                            : module.trend === "down"
                              ? "border-destructive text-destructive"
                              : ""
                        }
                      >
                        {module.trend === "up" ? "↑" : module.trend === "down" ? "↓" : "→"} {module.trend}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>
                        {module.functionsCovered}/{module.functions} functions
                      </span>
                      <span>•</span>
                      <span>
                        {module.linesCovered}/{module.lines} lines
                      </span>
                      <span>•</span>
                      <span>
                        {module.branchesCovered}/{module.branches} branches
                      </span>
                      <span>•</span>
                      <span>{module.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold">{module.coverage}%</p>
                    <p className="text-xs text-muted-foreground">coverage</p>
                  </div>
                  <div className="h-16 w-16">
                    <svg viewBox="0 0 36 36" className="-rotate-90">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke={
                          module.coverage >= 90
                            ? "hsl(var(--chart-2))"
                            : module.coverage >= 80
                              ? "hsl(var(--chart-1))"
                              : "hsl(var(--accent))"
                        }
                        strokeWidth="3"
                        strokeDasharray={`${module.coverage} ${100 - module.coverage}`}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <CoverageHeatmap />
    </div>
  )
}
