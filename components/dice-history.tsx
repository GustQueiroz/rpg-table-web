"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSSE } from "@/hooks/use-sse"
import { storage } from "@/lib/storage"
import { api } from "@/lib/api.client"
import type { DiceRoll } from "@/lib/types"

interface DiceHistoryProps {
  roomId: string
}

export function DiceHistory({ roomId }: DiceHistoryProps) {
  const [rolls, setRolls] = useState<DiceRoll[]>([])
  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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
  }, [roomId])

  useSSE(roomId, {
    onCharacterCreated: () => {
    },
    onCharacterUpdated: () => {
    },
    onDiceRolled: async () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current)
      }
      fetchTimeoutRef.current = setTimeout(async () => {
        await fetchRolls()
        fetchTimeoutRef.current = null
      }, 200)
    },
  })

  const formatTime = (timestamp: Date | number) => {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp)
    return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Histórico de Rolagens</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {rolls.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">Nenhuma rolagem ainda</p>
          ) : (
            rolls.map((roll) => (
              <div key={roll.id} className="border-2 border-border/40 rounded-lg p-3 bg-muted/20 hover:bg-muted/40 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">{roll.playerName}</p>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">
                      {roll.diceType || roll.type}
                      {roll.modifier !== 0 && ` ${roll.modifier > 0 ? "+" : ""}${roll.modifier}`}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-2xl font-bold text-primary">{roll.result}</p>
                    <p className="text-xs text-muted-foreground mt-1">{formatTime(roll.timestamp)}</p>
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
