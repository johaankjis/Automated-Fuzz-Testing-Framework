import { Navigation } from "@/components/navigation"
import { CoverageReports } from "@/components/coverage-reports"

export default function CoveragePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <CoverageReports />
      </main>
    </div>
  )
}
