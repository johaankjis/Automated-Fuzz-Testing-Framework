"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Download, Terminal, FileText } from "lucide-react"

interface HarnessDetailsProps {
  harness: {
    id: string
    name: string
    target: string
    status: string
    coverage: number
    executions: string
    crashes: number
    lastRun: string
    sanitizers: string[]
    corpusSize: string
    avgExecSpeed: string
  }
  onClose: () => void
}

export function HarnessDetails({ harness, onClose }: HarnessDetailsProps) {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{harness.name}</h3>
          <p className="mt-1 font-mono text-sm text-muted-foreground">{harness.target}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <h4 className="mb-3 text-sm font-semibold">Configuration</h4>
            <div className="space-y-2 rounded-lg border border-border p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fuzzer Engine</span>
                <span className="font-mono font-medium">libFuzzer</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Corpus Size</span>
                <span className="font-medium">{harness.corpusSize} inputs</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Execution Speed</span>
                <span className="font-medium">{harness.avgExecSpeed}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Max Input Size</span>
                <span className="font-medium">64 KB</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Sanitizers</h4>
            <div className="flex flex-wrap gap-2">
              {harness.sanitizers.map((sanitizer) => (
                <Badge key={sanitizer} variant="secondary" className="font-mono">
                  {sanitizer}
                </Badge>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Memory corruption detection enabled for buffer overflows, use-after-free, and undefined behavior
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="mb-3 text-sm font-semibold">Statistics</h4>
            <div className="space-y-2 rounded-lg border border-border p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Executions</span>
                <span className="font-medium">{harness.executions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Code Coverage</span>
                <span className="font-medium">{harness.coverage}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Crashes Found</span>
                <span className={`font-medium ${harness.crashes === 0 ? "text-chart-2" : "text-destructive"}`}>
                  {harness.crashes}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Run</span>
                <span className="font-medium">{harness.lastRun}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Actions</h4>
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="justify-start gap-2 bg-transparent">
                <Terminal className="h-4 w-4" />
                View Logs
              </Button>
              <Button variant="outline" className="justify-start gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Download Corpus
              </Button>
              <Button variant="outline" className="justify-start gap-2 bg-transparent">
                <FileText className="h-4 w-4" />
                Coverage Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="mb-3 text-sm font-semibold">Harness Code</h4>
        <div className="rounded-lg bg-muted p-4 font-mono text-xs">
          <pre className="overflow-x-auto">
            {`// Fuzzing harness for ${harness.target}
#include <stdint.h>
#include <stddef.h>
#include "${harness.target.replace(".c", ".h")}"

extern "C" int LLVMFuzzerTestOneInput(const uint8_t *data, size_t size) {
  if (size < 1) return 0;
  
  // Initialize parser with fuzzer input
  parse_input(data, size);
  
  return 0;
}`}
          </pre>
        </div>
      </div>
    </Card>
  )
}
