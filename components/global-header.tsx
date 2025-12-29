"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Home, Info, Users } from "lucide-react"

export function GlobalHeader() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border/60 dark:border-border/50 bg-background/95 dark:bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 dark:from-primary/90 dark:to-primary/70 flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">D&D</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/70 dark:from-primary dark:via-primary/95 dark:to-primary/80 bg-clip-text text-transparent">
              Mesa de RPG
            </span>
          </Link>
        </div>

        <nav className="flex items-center gap-1">
          <Link href="/">
            <Button
              variant={isActive("/") && pathname === "/" ? "default" : "ghost"}
              className="font-semibold"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
          <Link href="/infos">
            <Button
              variant={isActive("/infos") ? "default" : "ghost"}
              className="font-semibold"
            >
              <Info className="h-4 w-4 mr-2" />
              Infos
            </Button>
          </Link>
          <Link href="/rooms">
            <Button
              variant={isActive("/rooms") ? "default" : "ghost"}
              className="font-semibold"
            >
              <Users className="h-4 w-4 mr-2" />
              Salas
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

