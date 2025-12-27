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
        setRolls(formattedRolls.slice().reverse())
        
        formattedRolls.forEach((roll) => {
          storage.diceRolls.add(roomId, {
            ...roll,
            timestamp: roll.timestamp.getTime(),
          })
        })
      }
    } catch {
      const localRolls = storage.diceRolls.getByRoom(roomId)
      setRolls(localRolls.slice().reverse())
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
    <div className="w-full bg-card rounded-lg border-2 border-border/60 shadow-lg p-3">
      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
        {rolls.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4 px-8">Nenhuma rolagem ainda</p>
        ) : (
          rolls.map((roll) => (
            <div
              key={roll.id}
              className="relative flex-shrink-0 w-20 h-20 border-2 border-border/60 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors flex items-center justify-center"
            >
              <p className="text-2xl font-bold text-primary">{roll.total}</p>
              <div className="absolute bottom-1 left-1">
                <p className="text-[10px] font-mono text-muted-foreground leading-tight">{roll.diceType}</p>
              </div>
              <div className="absolute bottom-1 right-1">
                <p className="text-[10px] font-semibold text-muted-foreground truncate max-w-[60px] leading-tight">
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
