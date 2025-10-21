import { Card } from "@/components/ui/card"
import { Activity, AlertTriangle, CheckCircle2, TrendingUp, Clock, Zap } from "lucide-react"
import { CoverageChart } from "@/components/coverage-chart"
import { FuzzingTimeline } from "@/components/fuzzing-timeline"

const stats = [
  {
    name: "Function Coverage",
    value: "87%",
    change: "+2%",
    trend: "up",
    icon: TrendingUp,
    color: "text-chart-2",
    target: "85%",
  },
  {
    name: "Active Harnesses",
    value: "12",
    change: "+3",
    trend: "up",
    icon: Activity,
    color: "text-chart-1",
    target: "10",
  },
  {
    name: "Vulnerabilities Found",
    value: "3",
    change: "0",
    trend: "neutral",
    icon: AlertTriangle,
    color: "text-accent",
    target: "Pre-release",
  },
  {
    name: "Tests Passed",
    value: "1,247",
    change: "+89",
    trend: "up",
    icon: CheckCircle2,
    color: "text-chart-2",
    target: "24h",
  },
]

const recentActivity = [
  {
    harness: "json_parser_fuzzer",
    status: "completed",
    coverage: "89%",
    time: "2m ago",
    executions: "45.2K",
    crashes: 0,
  },
  {
    harness: "xml_parser_fuzzer",
    status: "running",
    coverage: "85%",
    time: "5m ago",
    executions: "32.1K",
    crashes: 0,
  },
  {
    harness: "http_header_fuzzer",
    status: "completed",
    coverage: "92%",
    time: "12m ago",
    executions: "67.8K",
    crashes: 0,
  },
  {
    harness: "url_parser_fuzzer",
    status: "completed",
    coverage: "88%",
    time: "18m ago",
    executions: "51.3K",
    crashes: 0,
  },
]

const vulnerabilities = [
  {
    type: "Buffer Overflow",
    cwe: "CWE-120",
    severity: "critical",
    module: "json_parser.c",
    status: "remediated",
    line: 247,
    sanitizer: "ASan",
  },
  {
    type: "Use After Free",
    cwe: "CWE-416",
    severity: "high",
    module: "xml_parser.c",
    status: "remediated",
    line: 189,
    sanitizer: "ASan",
  },
  {
    type: "Buffer Overflow",
    cwe: "CWE-120",
    severity: "critical",
    module: "http_parser.c",
    status: "remediated",
    line: 312,
    sanitizer: "ASan",
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Overview</h1>
          <p className="mt-2 text-muted-foreground">Automated fuzzing pipeline status and security metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Last updated: 30s ago</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name} className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.name}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`rounded-lg bg-muted p-3 ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs">
                  <span
                    className={
                      stat.trend === "up"
                        ? "text-chart-2"
                        : stat.trend === "down"
                          ? "text-destructive"
                          : "text-muted-foreground"
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">from last week</span>
                </div>
                <span className="text-xs text-muted-foreground">Target: {stat.target}</span>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Coverage Trends</h3>
              <p className="mt-1 text-sm text-muted-foreground">Function coverage over the last 7 days</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-chart-1" />
                <span className="text-xs text-muted-foreground">Critical Modules</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-chart-2" />
                <span className="text-xs text-muted-foreground">All Modules</span>
              </div>
            </div>
          </div>
          <CoverageChart />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold">Pipeline Status</h3>
          <p className="mt-1 text-sm text-muted-foreground">Jenkins CI/CD integration</p>
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Build Status</span>
                <span className="font-medium text-chart-2">Passing</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-full bg-chart-2" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Sanitizer Checks</span>
                <span className="font-medium text-chart-2">Clean</span>
              </div>
              <div className="flex gap-1">
                <div className="flex-1 rounded bg-chart-2 px-2 py-1 text-center text-xs font-medium text-background">
                  ASan
                </div>
                <div className="flex-1 rounded bg-chart-2 px-2 py-1 text-center text-xs font-medium text-background">
                  UBSan
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fuzzing Duration</span>
                <span className="font-medium">2h 34m</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                <Zap className="h-4 w-4 text-chart-3" />
                <div className="flex-1">
                  <p className="text-xs font-medium">Fast Execution</p>
                  <p className="text-xs text-muted-foreground">Parallel fuzzing enabled</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Recent Fuzzing Activity</h3>
              <p className="mt-1 text-sm text-muted-foreground">Latest test runs and discoveries</p>
            </div>
            <button className="text-sm font-medium text-primary hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="space-y-1">
                  <p className="font-mono text-sm font-medium">{activity.harness}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{activity.time}</span>
                    <span>•</span>
                    <span>{activity.executions} execs</span>
                    <span>•</span>
                    <span className="text-chart-2">{activity.crashes} crashes</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{activity.coverage}</p>
                    <p className="text-xs text-muted-foreground">coverage</p>
                  </div>
                  <div
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      activity.status === "completed"
                        ? "bg-chart-2/10 text-chart-2"
                        : "bg-chart-1/10 text-chart-1 animate-pulse"
                    }`}
                  >
                    {activity.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Vulnerability Summary</h3>
              <p className="mt-1 text-sm text-muted-foreground">Detected memory safety issues</p>
            </div>
            <button className="text-sm font-medium text-primary hover:underline">View Details</button>
          </div>
          <div className="space-y-3">
            {vulnerabilities.map((vuln, i) => (
              <div key={i} className="rounded-lg border border-border p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{vuln.type}</p>
                      <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{vuln.cwe}</span>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground">
                      {vuln.module}:{vuln.line}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                        {vuln.sanitizer}
                      </span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-chart-2" />
                      <span className="text-xs text-chart-2">Remediated</span>
                    </div>
                  </div>
                  <div
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      vuln.severity === "critical" ? "bg-destructive/10 text-destructive" : "bg-accent/10 text-accent"
                    }`}
                  >
                    {vuln.severity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <FuzzingTimeline />
    </div>
  )
}
