"use client"

import { useState, useEffect } from "react"
import { storage } from "@/lib/storage"
import { api } from "@/lib/api.client"
import type { DiceRoll } from "@/lib/types"

interface DiceHistoryProps {
  roomId: string
}

export function DiceHistory({ roomId }: DiceHistoryProps) {
  const [rolls, setRolls] = useState<DiceRoll[]>([])

  const fetchRolls = async () => {
    try {
      const backendRolls = await api.diceRolls.getByRoom(roomId)
      if (backendRolls && Array.isArray(backendRolls)) {
        const formattedRolls: DiceRoll[] = backendRolls.map((roll: any) => ({
          id: roll.id,
          roomId: roll.roomId,
          playerName: roll.playerName,
          diceType: roll.diceType,
          result: roll.total,
          modifier: roll.modifier,
          total: roll.total,
          timestamp: new Date(roll.timestamp),
        }))
        setRolls(formattedRolls)
        
        formattedRolls.forEach((roll) => {
          storage.diceRolls.add(roomId, {
            ...roll,
            timestamp: roll.timestamp.getTime(),
          })
        })
      }
    } catch {
      const localRolls = storage.diceRolls.getByRoom(roomId)
      setRolls(localRolls)
    }
  }

  useEffect(() => {
    fetchRolls()
    const interval = setInterval(fetchRolls, 1000)
    return () => clearInterval(interval)
  }, [roomId])

  const getFirstName = (name: string) => {
    return name.split(" ")[0]
  }

  return (
    <div className="w-full bg-card rounded-lg border-2 border-border/60 shadow-lg p-3 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none dark:from-primary/10 dark:via-transparent dark:to-secondary/10" />
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent" style={{ scrollbarWidth: 'thin' }}>
        {rolls.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4 px-8">Nenhuma rolagem ainda</p>
        ) : (
          rolls.slice().reverse().map((roll, index) => (
            <div
              key={roll.id}
              className="relative flex-shrink-0 w-20 h-20 border-2 border-border/60 rounded-lg bg-muted/30 hover:bg-muted/50 dark:bg-muted/40 dark:hover:bg-muted/60 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary/40 dark:hover:border-primary/50 flex items-center justify-center group animate-in fade-in slide-in-from-right-4"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:from-primary/20 dark:to-secondary/20" />
              <p className="text-2xl font-bold text-primary relative z-10 group-hover:scale-110 transition-transform duration-300 dark:text-primary">{roll.total}</p>
              <div className="absolute bottom-1 left-1 z-10">
                <p className="text-[10px] font-mono text-muted-foreground leading-tight dark:text-muted-foreground/80">{roll.diceType}</p>
              </div>
              <div className="absolute bottom-1 right-1 z-10">
                <p className="text-[10px] font-semibold text-muted-foreground truncate max-w-[60px] leading-tight dark:text-muted-foreground/80">
                  {getFirstName(roll.playerName)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
