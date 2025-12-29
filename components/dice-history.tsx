"use client"

import { useState, useEffect, useRef } from "react"
import { storage } from "@/lib/storage"
import { api } from "@/lib/api.client"
import { Button } from "@/components/ui/button"
import { Dice1 } from "lucide-react"
import type { DiceRoll } from "@/lib/types"

interface DiceHistoryProps {
  roomId: string
  playerName?: string
  playerId?: string
  onQuickRoll?: () => void
}

export function DiceHistory({ roomId, playerName, playerId, onQuickRoll }: DiceHistoryProps) {
  const [rolls, setRolls] = useState<DiceRoll[]>([])
  const [hoveredRoll, setHoveredRoll] = useState<string | null>(null)

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

  const getFirstName = (name: string) => {
    return name.split(" ")[0]
  }

  const parseDiceType = (diceType: string) => {
    const match = diceType.match(/(\d+)d(\d+)([+-]\d+)?/)
    if (match) {
      return {
        count: Number.parseInt(match[1]),
        sides: Number.parseInt(match[2]),
        modifier: match[3] ? Number.parseInt(match[3]) : 0,
      }
    }
    return { count: 1, sides: 20, modifier: 0 }
  }

  const getDiceShape = (sides: number) => {
    if (sides === 20) return "d20"
    if (sides === 12) return "d12"
    if (sides === 10) return "d10"
    if (sides === 8) return "d8"
    if (sides === 6) return "d6"
    if (sides === 4) return "d4"
    return "d6"
  }

  const calculatePercentage = (roll: DiceRoll) => {
    const { sides } = parseDiceType(roll.diceType)
    const baseResult = roll.total - roll.modifier
    return Math.round((baseResult / sides) * 100)
  }

  const calculateStats = () => {
    if (rolls.length === 0) return null
    
    const totals = rolls.map(r => r.total)
    const average = totals.reduce((a, b) => a + b, 0) / totals.length
    const max = Math.max(...totals)
    const min = Math.min(...totals)
    
    return { average: Math.round(average * 10) / 10, max, min }
  }

  const stats = calculateStats()
  const handleQuickRoll = async () => {
    if (onQuickRoll) {
      onQuickRoll()
    } else if (playerName && playerId) {
      try {
        const rolls: number[] = []
        rolls.push(Math.floor(Math.random() * 20) + 1)
        const sum = rolls.reduce((a, b) => a + b, 0)
        const total = sum

        await api.diceRolls.create({
          roomId,
          playerName,
          diceType: "1d20",
          result: sum,
          modifier: 0,
          total,
        })
      } catch {
      }
    }
  }

  return (
    <div className="w-full bg-card rounded-lg border-2 border-border/60 dark:border-border/50 shadow-lg p-3 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none dark:from-primary/10 dark:via-transparent dark:to-secondary/10" />
      <div className="flex items-center gap-2 relative">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent flex-1" style={{ scrollbarWidth: 'thin' }}>
          {rolls.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-4 px-8">Nenhuma rolagem ainda</p>
          ) : (
            <>
              {rolls.map((roll, index) => {
              const { sides } = parseDiceType(roll.diceType)
              const shape = getDiceShape(sides)
              const percentage = calculatePercentage(roll)
              const isHovered = hoveredRoll === roll.id

              const shapeClasses = {
                d20: "w-20 h-20 rounded-lg",
                d12: "w-18 h-20 rounded-lg",
                d10: "w-16 h-20 rounded-lg",
                d8: "w-18 h-18 rounded-lg",
                d6: "w-20 h-20 rounded-lg",
                d4: "w-18 h-18 rounded-lg",
              }

              return (
                <div
                  key={roll.id}
                  className={`relative flex-shrink-0 transition-all duration-500 group ${shapeClasses[shape as keyof typeof shapeClasses] || "w-20 h-20 rounded-lg"}`}
                  onMouseEnter={() => setHoveredRoll(roll.id)}
                  onMouseLeave={() => setHoveredRoll(null)}
                >
                  <div
                    className={`relative w-full h-full border-2 border-border/60 dark:border-border/50 bg-muted/30 dark:bg-muted/40 hover:bg-muted/50 dark:hover:bg-muted/60 transition-all duration-500 hover:scale-110 hover:shadow-lg dark:hover:shadow-xl hover:border-primary/40 dark:hover:border-primary/50 flex items-center justify-center cursor-pointer ${shapeClasses[shape as keyof typeof shapeClasses] || "rounded-lg"}`}
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isHovered ? "rotateY(180deg)" : "rotateY(0deg)",
                      transition: "transform 0.6s ease-in-out",
                    }}
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:from-primary/20 dark:to-secondary/20"
                      style={{ backfaceVisibility: "hidden" }}
                    />
                    
                    {!isHovered ? (
                      <>
                        <p className="text-2xl font-bold text-primary dark:text-primary relative z-10 group-hover:scale-110 transition-transform duration-300">
                          {roll.total}
                        </p>
                        <div className="absolute bottom-1 left-1 z-10">
                          <p className="text-[10px] font-mono text-muted-foreground leading-tight dark:text-muted-foreground/80">
                            {roll.diceType}
                          </p>
                        </div>
                        <div className="absolute bottom-1 right-1 z-10">
                          <p className="text-[10px] font-semibold text-muted-foreground truncate max-w-[60px] leading-tight dark:text-muted-foreground/80">
                            {getFirstName(roll.playerName)}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center"
                        style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                      >
                        <p className="text-3xl font-bold text-primary dark:text-primary mb-1">
                          {percentage}%
                        </p>
                        <p className="text-xs text-muted-foreground dark:text-muted-foreground/80">
                          {roll.total}/{sides}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </>
        )}
        </div>
        
        {stats && (
          <div className="flex-shrink-0 ml-4 pl-4 border-l-2 border-border/40 dark:border-border/50 flex flex-col gap-1 text-xs">
            <div className="text-muted-foreground dark:text-muted-foreground/80">
              <span className="font-semibold">Média:</span> {stats.average}
            </div>
            <div className="text-muted-foreground dark:text-muted-foreground/80">
              <span className="font-semibold">Maior:</span> {stats.max}
            </div>
            <div className="text-muted-foreground dark:text-muted-foreground/80">
              <span className="font-semibold">Menor:</span> {stats.min}
            </div>
          </div>
        )}

        {onQuickRoll || (playerName && playerId) ? (
          <div className="flex-shrink-0 ml-2 relative z-10">
            <Button
              onClick={handleQuickRoll}
              className="h-20 w-20 rounded-lg bg-gradient-to-br from-primary to-primary/80 dark:from-primary/90 dark:to-primary/70 hover:from-primary/90 hover:to-primary/70 dark:hover:from-primary dark:hover:to-primary/80 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-primary/30 dark:border-primary/40"
            >
              <div className="flex flex-col items-center justify-center">
                <Dice1 className="h-8 w-8 mb-1" />
                <span className="text-xs font-bold">d20</span>
              </div>
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
