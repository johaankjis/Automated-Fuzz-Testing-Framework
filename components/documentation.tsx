import { Card } from "@/components/ui/card"
import { BookOpen, FileText, Code, Shield, GitBranch } from "lucide-react"

const docSections = [
  {
    title: "Fuzzing Methodology",
    icon: BookOpen,
    description: "Comprehensive guide to our fuzzing approach and best practices",
    topics: [
      "libFuzzer integration and configuration",
      "Corpus management and seed selection",
      "Coverage-guided fuzzing strategies",
      "Sanitizer configuration (ASan, UBSan)",
    ],
  },
  {
    title: "Harness Design",
    icon: Code,
    description: "How to design effective fuzzing harnesses for C libraries",
    topics: [
      "LLVMFuzzerTestOneInput implementation",
      "Input validation and parsing",
      "Memory management in harnesses",
      "Error handling and crash detection",
    ],
  },
  {
    title: "CI/CD Integration",
    icon: GitBranch,
    description: "Automated fuzzing pipeline setup and configuration",
    topics: [
      "Jenkins pipeline configuration",
      "Parallel fuzzing execution",
      "Coverage report generation",
      "Artifact storage and management",
    ],
  },
  {
    title: "Vulnerability Remediation",
    icon: Shield,
    description: "Process for addressing discovered security issues",
    topics: [
      "Crash triage and analysis",
      "Root cause identification",
      "Fix validation and testing",
      "Regression test creation",
    ],
  },
  {
    title: "Reproducibility Guide",
    icon: FileText,
    description: "Steps to reproduce fuzzing results across environments",
    topics: [
      "Environment setup and dependencies",
      "Corpus and crash reproducer usage",
      "Build configuration replication",
      "Sanitizer output interpretation",
    ],
  },
]

export function Documentation() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Documentation</h1>
        <p className="mt-2 text-muted-foreground">Fuzzing methodology, harness designs, and reproducibility guides</p>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Knowledge Base</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Published in Confluence for team-wide access and collaboration
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {docSections.map((section, i) => {
            const Icon = section.icon
            return (
              <Card key={i} className="p-6 transition-colors hover:bg-muted/50">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{section.title}</h3>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">{section.description}</p>
                <ul className="space-y-2">
                  {section.topics.map((topic, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )
          })}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Quick Start Guide</h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-border p-4">
            <h4 className="mb-2 font-semibold">1. Setup Development Environment</h4>
            <div className="rounded bg-muted p-3 font-mono text-xs">
              <pre>
                {`# Install LLVM/Clang with fuzzing support
sudo apt-get install clang-15 llvm-15

# Clone the repository
git clone https://github.com/your-org/fuzz-testing.git
cd fuzz-testing`}
              </pre>
            </div>
          </div>

          <div className="rounded-lg border border-border p-4">
            <h4 className="mb-2 font-semibold">2. Build Fuzzing Harnesses</h4>
            <div className="rounded bg-muted p-3 font-mono text-xs">
              <pre>
                {`# Compile with fuzzing instrumentation
clang -fsanitize=fuzzer,address,undefined \\
      -g -O1 json_parser.c json_parser_fuzzer.c \\
      -o json_parser_fuzzer`}
              </pre>
            </div>
          </div>

          <div className="rounded-lg border border-border p-4">
            <h4 className="mb-2 font-semibold">3. Run Fuzzing Campaign</h4>
            <div className="rounded bg-muted p-3 font-mono text-xs">
              <pre>
                {`# Execute fuzzer with corpus
./json_parser_fuzzer corpus/ -max_total_time=3600 \\
                      -print_coverage=1`}
              </pre>
            </div>
          </div>

          <div className="rounded-lg border border-border p-4">
            <h4 className="mb-2 font-semibold">4. Analyze Results</h4>
            <div className="rounded bg-muted p-3 font-mono text-xs">
              <pre>
                {`# Generate coverage report
llvm-cov show json_parser_fuzzer -instr-profile=default.profdata

# Review crash reproducers
ls crash-*`}
              </pre>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
