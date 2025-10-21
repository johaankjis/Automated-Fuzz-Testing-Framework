"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileCode,
  Play,
  Pause,
  Settings,
  TrendingUp,
  Clock,
  Activity,
  CheckCircle2,
  AlertCircle,
  Plus,
} from "lucide-react"
import { HarnessDetails } from "@/components/harness-details"

const harnesses = [
  {
    id: "json_parser_fuzzer",
    name: "JSON Parser Fuzzer",
    target: "json_parser.c",
    status: "running",
    coverage: 89,
    executions: "45.2K",
    crashes: 0,
    lastRun: "2m ago",
    sanitizers: ["ASan", "UBSan"],
    corpusSize: "1.2K",
    avgExecSpeed: "2.3K/sec",
  },
  {
    id: "xml_parser_fuzzer",
    name: "XML Parser Fuzzer",
    target: "xml_parser.c",
    status: "running",
    coverage: 85,
    executions: "32.1K",
    crashes: 0,
    lastRun: "5m ago",
    sanitizers: ["ASan", "UBSan"],
    corpusSize: "890",
    avgExecSpeed: "1.8K/sec",
  },
  {
    id: "http_header_fuzzer",
    name: "HTTP Header Fuzzer",
    target: "http_parser.c",
    status: "completed",
    coverage: 92,
    executions: "67.8K",
    crashes: 0,
    lastRun: "12m ago",
    sanitizers: ["ASan", "UBSan"],
    corpusSize: "2.1K",
    avgExecSpeed: "3.1K/sec",
  },
  {
    id: "url_parser_fuzzer",
    name: "URL Parser Fuzzer",
    target: "url_parser.c",
    status: "completed",
    coverage: 88,
    executions: "51.3K",
    crashes: 0,
    lastRun: "18m ago",
    sanitizers: ["ASan"],
    corpusSize: "1.5K",
    avgExecSpeed: "2.7K/sec",
  },
  {
    id: "base64_decoder_fuzzer",
    name: "Base64 Decoder Fuzzer",
    target: "base64.c",
    status: "idle",
    coverage: 94,
    executions: "89.4K",
    crashes: 0,
    lastRun: "2h ago",
    sanitizers: ["ASan", "UBSan"],
    corpusSize: "650",
    avgExecSpeed: "4.2K/sec",
  },
  {
    id: "regex_engine_fuzzer",
    name: "Regex Engine Fuzzer",
    target: "regex.c",
    status: "idle",
    coverage: 78,
    executions: "23.7K",
    crashes: 1,
    lastRun: "3h ago",
    sanitizers: ["ASan", "UBSan"],
    corpusSize: "1.8K",
    avgExecSpeed: "1.2K/sec",
  },
]

export function HarnessManagement() {
  const [selectedHarness, setSelectedHarness] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "running" | "idle" | "completed">("all")

  const filteredHarnesses = filter === "all" ? harnesses : harnesses.filter((h) => h.status === filter)

  const stats = {
    total: harnesses.length,
    running: harnesses.filter((h) => h.status === "running").length,
    idle: harnesses.filter((h) => h.status === "idle").length,
    avgCoverage: Math.round(harnesses.reduce((acc, h) => acc + h.coverage, 0) / harnesses.length),
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Fuzzing Harnesses</h1>
          <p className="mt-2 text-muted-foreground">Manage and monitor libFuzzer harnesses for C libraries</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Harness
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Harnesses</p>
              <p className="mt-1 text-2xl font-bold">{stats.total}</p>
            </div>
            <FileCode className="h-8 w-8 text-chart-1" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Running</p>
              <p className="mt-1 text-2xl font-bold">{stats.running}</p>
            </div>
            <Activity className="h-8 w-8 text-chart-2" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Idle</p>
              <p className="mt-1 text-2xl font-bold">{stats.idle}</p>
            </div>
            <Clock className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Coverage</p>
              <p className="mt-1 text-2xl font-bold">{stats.avgCoverage}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-chart-3" />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
              All
            </Button>
            <Button
              variant={filter === "running" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("running")}
            >
              Running
            </Button>
            <Button variant={filter === "idle" ? "default" : "outline"} size="sm" onClick={() => setFilter("idle")}>
              Idle
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("completed")}
            >
              Completed
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredHarnesses.map((harness) => (
            <div
              key={harness.id}
              className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    harness.status === "running"
                      ? "bg-chart-2/10"
                      : harness.status === "completed"
                        ? "bg-chart-1/10"
                        : "bg-muted"
                  }`}
                >
                  <FileCode
                    className={`h-5 w-5 ${
                      harness.status === "running"
                        ? "text-chart-2"
                        : harness.status === "completed"
                          ? "text-chart-1"
                          : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{harness.name}</p>
                    <Badge
                      variant={
                        harness.status === "running"
                          ? "default"
                          : harness.status === "completed"
                            ? "secondary"
                            : "outline"
                      }
                      className={harness.status === "running" ? "animate-pulse bg-chart-2/10 text-chart-2" : ""}
                    >
                      {harness.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-mono">{harness.target}</span>
                    <span>•</span>
                    <span>{harness.executions} execs</span>
                    <span>•</span>
                    <span>{harness.avgExecSpeed}</span>
                    <span>•</span>
                    <span>{harness.lastRun}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm font-medium">{harness.coverage}%</p>
                  <p className="text-xs text-muted-foreground">coverage</p>
                </div>
                <div className="flex items-center gap-1">
                  {harness.crashes === 0 ? (
                    <CheckCircle2 className="h-4 w-4 text-chart-2" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  )}
                  <span
                    className={`text-sm font-medium ${harness.crashes === 0 ? "text-chart-2" : "text-destructive"}`}
                  >
                    {harness.crashes}
                  </span>
                </div>
                <div className="flex gap-2">
                  {harness.status === "running" ? (
                    <Button size="sm" variant="outline">
                      <Pause className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline">
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => setSelectedHarness(harness.id)}>
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {selectedHarness && (
        <HarnessDetails
          harness={harnesses.find((h) => h.id === selectedHarness)!}
          onClose={() => setSelectedHarness(null)}
        />
      )}
    </div>
  )
}
