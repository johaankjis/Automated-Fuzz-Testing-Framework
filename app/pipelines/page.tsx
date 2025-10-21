import { Navigation } from "@/components/navigation"
import { PipelineView } from "@/components/pipeline-view"

export default function PipelinesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PipelineView />
      </main>
    </div>
  )
}
