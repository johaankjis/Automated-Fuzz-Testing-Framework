"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Activity, FileCode, GitBranch, Shield, BarChart3, BookOpen } from "lucide-react"

const navItems = [
  { name: "Overview", href: "/", icon: Activity },
  { name: "Harnesses", href: "/harnesses", icon: FileCode },
  { name: "Pipelines", href: "/pipelines", icon: GitBranch },
  { name: "Vulnerabilities", href: "/vulnerabilities", icon: Shield },
  { name: "Coverage", href: "/coverage", icon: BarChart3 },
  { name: "Docs", href: "/docs", icon: BookOpen },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">FuzzGuard</span>
            </Link>
            <div className="hidden md:flex md:items-center md:gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-xs">
              <div className="h-2 w-2 rounded-full bg-chart-2" />
              <span className="text-muted-foreground">Production</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
