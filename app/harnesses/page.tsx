import { Navigation } from "@/components/navigation"
import { HarnessManagement } from "@/components/harness-management"

export default function HarnessesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <HarnessManagement />
      </main>
    </div>
  )
}
