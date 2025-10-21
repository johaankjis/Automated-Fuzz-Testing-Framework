import { Card } from "@/components/ui/card"

const heatmapData = [
  { file: "json_parser.c", functions: ["parse_string", "parse_number", "parse_object", "parse_array", "parse_value"] },
  { file: "xml_parser.c", functions: ["parse_element", "parse_attribute", "parse_text", "parse_cdata", "free_node"] },
  { file: "http_parser.c", functions: ["parse_header", "parse_method", "parse_uri", "parse_version"] },
  { file: "url_parser.c", functions: ["parse_scheme", "parse_host", "parse_port", "parse_path", "parse_query"] },
]

const getCoverageColor = (coverage: number) => {
  if (coverage >= 90) return "bg-chart-2"
  if (coverage >= 80) return "bg-chart-1"
  if (coverage >= 70) return "bg-chart-3"
  return "bg-destructive"
}

export function CoverageHeatmap() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Function Coverage Heatmap</h3>
        <p className="mt-1 text-sm text-muted-foreground">Visual representation of function-level coverage</p>
      </div>
      <div className="space-y-4">
        {heatmapData.map((module, i) => (
          <div key={i}>
            <p className="mb-2 font-mono text-sm font-medium">{module.file}</p>
            <div className="flex flex-wrap gap-2">
              {module.functions.map((func, j) => {
                const coverage = 75 + Math.random() * 25
                return (
                  <div
                    key={j}
                    className={`group relative cursor-pointer rounded px-3 py-2 font-mono text-xs transition-all hover:scale-105 ${getCoverageColor(coverage)}`}
                  >
                    <span className="text-background">{func}()</span>
                    <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded bg-popover px-2 py-1 text-xs text-popover-foreground shadow-lg group-hover:block">
                      {Math.round(coverage)}%
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-4 text-xs">
        <span className="text-muted-foreground">Coverage:</span>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-chart-2" />
          <span>≥90%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-chart-1" />
          <span>80-89%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-chart-3" />
          <span>70-79%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-destructive" />
          <span>&lt;70%</span>
        </div>
      </div>
    </Card>
  )
}
