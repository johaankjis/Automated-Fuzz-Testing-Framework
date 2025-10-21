import { Navigation } from "@/components/navigation"
import { VulnerabilityTracking } from "@/components/vulnerability-tracking"

export default function VulnerabilitiesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <VulnerabilityTracking />
      </main>
    </div>
  )
}
