"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  GitBranch,
  CheckCircle2,
  XCircle,
  Clock,
  Play,
  RefreshCw,
  Download,
  ExternalLink,
  AlertTriangle,
} from "lucide-react"
import { PipelineStages } from "@/components/pipeline-stages"

const pipelines = [
  {
    id: "build-1247",
    branch: "main",
    commit: "a3f2c1d",
    message: "Add regex engine fuzzer with UBSan",
    author: "security-team",
    status: "success",
    duration: "2m 34s",
    timestamp: "5m ago",
    stages: [
      { name: "Build", status: "success", duration: "45s" },
      { name: "Fuzz Tests", status: "success", duration: "1m 20s" },
      { name: "Sanitizers", status: "success", duration: "29s" },
    ],
  },
  {
    id: "build-1246",
    branch: "feature/xml-parser",
    commit: "b7e9a2f",
    message: "Improve XML parser coverage",
    author: "dev-team",
    status: "running",
    duration: "1m 12s",
    timestamp: "8m ago",
    stages: [
      { name: "Build", status: "success", duration: "42s" },
      { name: "Fuzz Tests", status: "running", duration: "30s" },
      { name: "Sanitizers", status: "pending", duration: "-" },
    ],
  },
  {
    id: "build-1245",
    branch: "main",
    commit: "c4d8e1a",
    message: "Fix buffer overflow in JSON parser",
    author: "security-team",
    status: "success",
    duration: "2m 18s",
    timestamp: "2h ago",
    stages: [
      { name: "Build", status: "success", duration: "43s" },
      { name: "Fuzz Tests", status: "success", duration: "1m 15s" },
      { name: "Sanitizers", status: "success", duration: "20s" },
    ],
  },
  {
    id: "build-1244",
    branch: "feature/http-fuzzer",
    commit: "e2f1b9c",
    message: "Add HTTP header fuzzer",
    author: "dev-team",
    status: "failed",
    duration: "1m 45s",
    timestamp: "3h ago",
    stages: [
      { name: "Build", status: "success", duration: "44s" },
      { name: "Fuzz Tests", status: "failed", duration: "1m 1s" },
      { name: "Sanitizers", status: "skipped", duration: "-" },
    ],
  },
]

const stats = {
  totalRuns: 1247,
  successRate: 94.2,
  avgDuration: "2m 24s",
  activeRuns: 1,
}

export function PipelineView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">CI/CD Pipelines</h1>
          <p className="mt-2 text-muted-foreground">Jenkins automated fuzzing pipeline integration</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button className="gap-2">
            <Play className="h-4 w-4" />
            Trigger Build
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Runs</p>
              <p className="mt-1 text-2xl font-bold">{stats.totalRuns}</p>
            </div>
            <GitBranch className="h-8 w-8 text-chart-1" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="mt-1 text-2xl font-bold">{stats.successRate}%</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-chart-2" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Duration</p>
              <p className="mt-1 text-2xl font-bold">{stats.avgDuration}</p>
            </div>
            <Clock className="h-8 w-8 text-chart-3" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Runs</p>
              <p className="mt-1 text-2xl font-bold">{stats.activeRuns}</p>
            </div>
            <Play className="h-8 w-8 text-chart-1" />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Pipeline Runs</h3>
          <Button variant="ghost" size="sm" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            View in Jenkins
          </Button>
        </div>

        <div className="space-y-3">
          {pipelines.map((pipeline) => (
            <div key={pipeline.id} className="rounded-lg border border-border p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className={`mt-1 flex h-10 w-10 items-center justify-center rounded-lg ${
                      pipeline.status === "success"
                        ? "bg-chart-2/10"
                        : pipeline.status === "running"
                          ? "bg-chart-1/10"
                          : pipeline.status === "failed"
                            ? "bg-destructive/10"
                            : "bg-muted"
                    }`}
                  >
                    {pipeline.status === "success" ? (
                      <CheckCircle2 className="h-5 w-5 text-chart-2" />
                    ) : pipeline.status === "running" ? (
                      <Clock className="h-5 w-5 animate-pulse text-chart-1" />
                    ) : pipeline.status === "failed" ? (
                      <XCircle className="h-5 w-5 text-destructive" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-medium">#{pipeline.id}</span>
                      <Badge variant="outline" className="font-mono text-xs">
                        {pipeline.branch}
                      </Badge>
                      <Badge
                        variant={
                          pipeline.status === "success"
                            ? "default"
                            : pipeline.status === "running"
                              ? "secondary"
                              : "destructive"
                        }
                        className={
                          pipeline.status === "success"
                            ? "bg-chart-2/10 text-chart-2"
                            : pipeline.status === "running"
                              ? "animate-pulse bg-chart-1/10 text-chart-1"
                              : ""
                        }
                      >
                        {pipeline.status}
                      </Badge>
                    </div>
                    <p className="text-sm">{pipeline.message}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-mono">{pipeline.commit}</span>
                      <span>•</span>
                      <span>{pipeline.author}</span>
                      <span>•</span>
                      <span>{pipeline.duration}</span>
                      <span>•</span>
                      <span>{pipeline.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                {pipeline.stages.map((stage, i) => (
                  <div key={i} className="flex-1 rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">{stage.name}</span>
                      {stage.status === "success" ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-chart-2" />
                      ) : stage.status === "running" ? (
                        <Clock className="h-3.5 w-3.5 animate-pulse text-chart-1" />
                      ) : stage.status === "failed" ? (
                        <XCircle className="h-3.5 w-3.5 text-destructive" />
                      ) : (
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{stage.duration}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <PipelineStages />
    </div>
  )
}
