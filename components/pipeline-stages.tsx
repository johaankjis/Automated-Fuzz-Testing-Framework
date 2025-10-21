import { Card } from "@/components/ui/card"
import { CheckCircle2, Wrench, Bug, Shield } from "lucide-react"

const stageDetails = [
  {
    name: "Build Stage",
    icon: Wrench,
    description: "Compile C libraries with instrumentation",
    steps: [
      "Clone repository from Git",
      "Configure build with LLVM/Clang",
      "Compile with -fsanitize=fuzzer,address,undefined",
      "Link fuzzing harnesses",
    ],
    avgDuration: "43s",
  },
  {
    name: "Fuzz Testing Stage",
    icon: Bug,
    description: "Execute libFuzzer harnesses with corpus",
    steps: [
      "Load seed corpus from storage",
      "Run fuzzing harnesses in parallel",
      "Generate coverage reports with SanitizerCoverage",
      "Collect crash reproducers",
    ],
    avgDuration: "1m 18s",
  },
  {
    name: "Sanitizer Stage",
    icon: Shield,
    description: "Validate with ASan and UBSan",
    steps: [
      "Run ASan checks for memory corruption",
      "Execute UBSan for undefined behavior",
      "Parse sanitizer reports",
      "Archive results and artifacts",
    ],
    avgDuration: "24s",
  },
]

export function PipelineStages() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {stageDetails.map((stage, i) => {
        const Icon = stage.icon
        return (
          <Card key={i} className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{stage.name}</h3>
                <p className="text-xs text-muted-foreground">{stage.avgDuration} avg</p>
              </div>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">{stage.description}</p>
            <div className="space-y-2">
              {stage.steps.map((step, j) => (
                <div key={j} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-chart-2" />
                  <span className="text-xs text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
