# FuzzGuard: Automated Fuzz Testing Framework

FuzzGuard is a Next.js 15 dashboard for orchestrating and monitoring automated fuzz testing pipelines targeting C libraries. The interface highlights coverage trends, harness health, CI/CD status, and vulnerability remediation so teams can quickly triage issues uncovered by sanitizers such as ASan and UBSan.

## Features
- **Executive dashboard** with real-time style summaries of coverage, harness throughput, and sanitizer health drawn from the automated pipeline. 
- **Harness management** views to filter running, idle, and completed libFuzzer harnesses, inspect sanitizer configurations, and drill into execution metrics.
- **Coverage analytics** including line, module, and heatmap style visualizations to track progress toward coverage goals across services and time.
- **Pipeline visibility** for Jenkins-backed CI/CD stages, including build health, sanitizer checks, and fuzzing duration insights.
- **Vulnerability tracking** pages that surface memory-safety findings (e.g., buffer overflows, use-after-free) with metadata needed for remediation workflows.
- **Documentation hub** that captures methodology, harness design guidelines, and reproducibility steps for new contributors.

## Tech Stack
- [Next.js 15](https://nextjs.org/) App Router with React 19 and TypeScript for UI composition and routing.
- Tailwind CSS 4 for design tokens and utility-first styling, merged with Radix UI primitives and Lucide icons for accessible components.
- Vercel Analytics instrumentation for lightweight usage insights.

## Project Structure
```
app/
  layout.tsx          # Root layout, fonts, metadata, analytics wiring
  page.tsx            # Dashboard landing page
  docs/               # Documentation route rendering knowledge base content
  coverage/, harnesses/, pipelines/, vulnerabilities/  # Route groups for deep-dive views
components/
  dashboard-overview.tsx      # KPI cards, coverage trends, timeline widgets
  harness-management.tsx      # Harness filtering & detail drawer orchestration
  coverage-chart.tsx, coverage-heatmap.tsx, module-coverage-chart.tsx
  pipeline-view.tsx, pipeline-stages.tsx
  vulnerability-tracking.tsx, vulnerability-details.tsx
  documentation.tsx           # Knowledge base tiles & quick start steps
  ui/                         # Reusable button, card, badge, dialog primitives
lib/
  utils.ts             # Tailwind-aware class name helper
styles/
  globals.css          # Tailwind layer configuration and theme tokens
```

## Getting Started
1. **Install dependencies**
   ```bash
   pnpm install
   ```
2. **Run the development server**
   ```bash
   pnpm dev
   ```
   Then open [http://localhost:3000](http://localhost:3000) to explore the dashboard.
3. **Build for production**
   ```bash
   pnpm build
   pnpm start
   ```

## Available Scripts
- `pnpm dev` – Start the Next.js development server with hot reloading.
- `pnpm build` – Create an optimized production build.
- `pnpm start` – Serve the compiled application.
- `pnpm lint` – Run ESLint across the project.

## Contributing
1. Fork the repository and create a feature branch.
2. Follow the existing component patterns (server components by default, client components when interactivity is needed).
3. Ensure UI additions leverage shared primitives from `components/ui` and the Tailwind design tokens defined in `styles/globals.css`.
4. Submit a pull request describing the changes and any new harness or pipeline metadata surfaced in the UI.

## License
This project is distributed for demonstration purposes; update this section with your team's preferred license before release.
