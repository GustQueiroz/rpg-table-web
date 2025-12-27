"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface SessionTimerProps {
  startTime: Date
}

export function SessionTimer({ startTime }: SessionTimerProps) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const start = startTime.getTime()
      const elapsedMs = now - start
      setElapsed(Math.max(0, elapsedMs))
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime])

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-muted/50 dark:bg-muted/60 rounded-lg border border-border/40 dark:border-border/50">
      <Clock className="h-4 w-4 text-muted-foreground dark:text-muted-foreground/80" />
      <span className="font-mono font-bold text-sm tabular-nums min-w-[60px] text-right">
        {formatTime(elapsed)}
      </span>
    </div>
  )
}

