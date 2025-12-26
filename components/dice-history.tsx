"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { storage } from "@/lib/storage"
import type { DiceRoll } from "@/lib/types"

interface DiceHistoryProps {
  roomId: string
}

export function DiceHistory({ roomId }: DiceHistoryProps) {
  const [rolls, setRolls] = useState<DiceRoll[]>([])

  useEffect(() => {
    const updateRolls = () => {
      setRolls(storage.diceRolls.getByRoom(roomId))
    }

    updateRolls()
    const interval = setInterval(updateRolls, 1000)

    return () => clearInterval(interval)
  }, [roomId])

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Rolagens</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {rolls.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">Nenhuma rolagem ainda</p>
          ) : (
            rolls.map((roll) => (
              <div key={roll.id} className="border-b pb-3 last:border-b-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{roll.playerName}</p>
                    {roll.description && <p className="text-xs text-muted-foreground">{roll.description}</p>}
                    <p className="text-xs text-muted-foreground mt-1">
                      {roll.type}: [{roll.rolls.join(", ")}]
                      {roll.modifier !== 0 && ` ${roll.modifier > 0 ? "+" : ""}${roll.modifier}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{roll.result}</p>
                    <p className="text-xs text-muted-foreground">{formatTime(roll.timestamp)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
