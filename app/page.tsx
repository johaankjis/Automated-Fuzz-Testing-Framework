import { Navigation } from "@/components/navigation"
import { DashboardOverview } from "@/components/dashboard-overview"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <DashboardOverview />
      </main>
    </div>
  )
}
