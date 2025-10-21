import { Card } from "@/components/ui/card"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

const timelineEvents = [
  {
    week: "Week 1-2",
    title: "Fuzzing Harness Development",
    description: "Developed fuzzing harnesses for C parsers targeting JSON, XML, and HTTP modules",
    status: "completed",
    deliverables: ["json_parser_fuzzer", "xml_parser_fuzzer", "http_header_fuzzer"],
  },
  {
    week: "Week 3-4",
    title: "Sanitizer Integration",
    description: "Integrated ASan and UBSan sanitizers with crash report validation",
    status: "completed",
    deliverables: ["ASan configuration", "UBSan configuration", "Crash reproducers"],
  },
  {
    week: "Week 5-6",
    title: "CI/CD Automation",
    description: "Automated fuzzing in Jenkins with coverage reporting and parallel execution",
    status: "completed",
    deliverables: ["Jenkins pipeline", "Coverage reports", "Automated test runs"],
  },
  {
    week: "Week 7-8",
    title: "Documentation & Knowledge Sharing",
    description: "Published methodology and reproducibility guide in Confluence",
    status: "in-progress",
    deliverables: ["Fuzzing methodology", "Harness design docs", "Reproducibility guide"],
  },
]

export function FuzzingTimeline() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Project Timeline</h3>
        <p className="mt-1 text-sm text-muted-foreground">8-week MVP development milestones</p>
      </div>
      <div className="space-y-6">
        {timelineEvents.map((event, i) => (
          <div key={i} className="relative flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  event.status === "completed"
                    ? "bg-chart-2/10"
                    : event.status === "in-progress"
                      ? "bg-chart-1/10"
                      : "bg-muted"
                }`}
              >
                {event.status === "completed" ? (
                  <CheckCircle2 className="h-4 w-4 text-chart-2" />
                ) : event.status === "in-progress" ? (
                  <Clock className="h-4 w-4 text-chart-1" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              {i < timelineEvents.length - 1 && (
                <div className="mt-2 h-full w-px bg-border" style={{ minHeight: "60px" }} />
              )}
            </div>
            <div className="flex-1 pb-6">
              <div className="flex items-center gap-2">
                <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  {event.week}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    event.status === "completed"
                      ? "bg-chart-2/10 text-chart-2"
                      : event.status === "in-progress"
                        ? "bg-chart-1/10 text-chart-1"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {event.status}
                </span>
              </div>
              <h4 className="mt-2 font-semibold">{event.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {event.deliverables.map((deliverable, j) => (
                  <span key={j} className="rounded-md bg-secondary px-2 py-1 font-mono text-xs">
                    {deliverable}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
