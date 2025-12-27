"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp, Dice1 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { storage } from "@/lib/storage"
import { api } from "@/lib/api.client"
import { generateId } from "@/lib/utils/id-generator"
import type { DiceRoll } from "@/lib/types"

interface DiceRollerProps {
  roomId: string
  playerId: string
  playerName: string
}

export function DiceRoller({ roomId, playerId, playerName }: DiceRollerProps) {
  const { toast } = useToast()
  const [modifier, setModifier] = useState(0)
  const [lastRoll, setLastRoll] = useState<number | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastDiceUsed, setLastDiceUsed] = useState<{ sides: number; count: number } | null>(null)

  const rollDice = useCallback(async (sides: number, count = 1) => {
    setIsRolling(true)
    setLastDiceUsed({ sides, count })
    try {
      const rolls: number[] = []
      for (let i = 0; i < count; i++) {
        rolls.push(Math.floor(Math.random() * sides) + 1)
      }
      const sum = rolls.reduce((a, b) => a + b, 0)
      const total = sum + modifier

      const diceType = `${count}d${sides}${modifier !== 0 ? (modifier > 0 ? `+${modifier}` : modifier) : ""}`

      await api.diceRolls.create({
        roomId,
        playerName,
        diceType,
        result: sum,
        modifier,
        total,
      })

      const roll: DiceRoll = {
        id: generateId(),
        roomId,
        playerName,
        diceType,
        result: sum,
        modifier,
        total,
        timestamp: new Date(),
      }

      storage.diceRolls.add(roomId, roll)
      setLastRoll(total)

      setTimeout(() => setLastRoll(null), 3000)
    } catch {
      toast({
        title: "Erro ao rolar dados",
        description: "Não foi possível salvar a rolagem. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsRolling(false)
    }
  }, [roomId, playerName, modifier])

  if (!isVisible) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Dice1 className="h-5 w-5" />
              Rolagem de Dados
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(true)}
              className="font-semibold"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Dice1 className="h-5 w-5 animate-pulse dark:animate-pulse" />
            Rolagem de Dados
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="font-semibold hover:bg-muted/50 dark:hover:bg-muted/70 transition-colors"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 relative">
        {lastRoll !== null && (
          <div className="p-8 bg-gradient-to-br from-primary to-primary/80 dark:from-primary/90 dark:to-primary/70 text-primary-foreground rounded-lg text-center border-2 border-primary/30 dark:border-primary/40 shadow-lg animate-in zoom-in-95 duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 animate-pulse bg-primary/20 pointer-events-none" />
            <p className="text-6xl font-bold relative z-10 animate-in zoom-in-95 duration-500 drop-shadow-lg dark:drop-shadow-xl">{lastRoll}</p>
          </div>
        )}

        <Button
          onClick={() => rollDice(20)}
          className="w-full h-16 text-2xl font-bold bg-gradient-to-br from-primary to-primary/80 dark:from-primary/90 dark:to-primary/70 hover:from-primary/90 hover:to-primary/70 dark:hover:from-primary dark:hover:to-primary/80 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          disabled={isRolling}
        >
          <Dice1 className="h-6 w-6 mr-2" />
          Rolar d20
        </Button>

        <div className="space-y-2">
          <Label htmlFor="modifier" className="font-semibold">Modificador</Label>
          <Input
            id="modifier"
            type="number"
            value={modifier}
            onChange={(e) => setModifier(Number.parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button 
            onClick={() => rollDice(20)} 
            variant="outline" 
            className="font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-200 hover:bg-primary/10 dark:hover:bg-primary/20 hover:border-primary/50 dark:hover:border-primary/60 hover:shadow-md dark:hover:shadow-lg"
            disabled={isRolling}
          >
            d20
          </Button>
          <Button 
            onClick={() => rollDice(12)} 
            variant="outline" 
            className="font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-200 hover:bg-primary/10 dark:hover:bg-primary/20 hover:border-primary/50 dark:hover:border-primary/60 hover:shadow-md dark:hover:shadow-lg"
            disabled={isRolling}
          >
            d12
          </Button>
          <Button 
            onClick={() => rollDice(10)} 
            variant="outline" 
            className="font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-200 hover:bg-primary/10 dark:hover:bg-primary/20 hover:border-primary/50 dark:hover:border-primary/60 hover:shadow-md dark:hover:shadow-lg"
            disabled={isRolling}
          >
            d10
          </Button>
          <Button 
            onClick={() => rollDice(8)} 
            variant="outline" 
            className="font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-200 hover:bg-primary/10 dark:hover:bg-primary/20 hover:border-primary/50 dark:hover:border-primary/60 hover:shadow-md dark:hover:shadow-lg"
            disabled={isRolling}
          >
            d8
          </Button>
          <Button 
            onClick={() => rollDice(6)} 
            variant="outline" 
            className="font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-200 hover:bg-primary/10 dark:hover:bg-primary/20 hover:border-primary/50 dark:hover:border-primary/60 hover:shadow-md dark:hover:shadow-lg"
            disabled={isRolling}
          >
            d6
          </Button>
          <Button 
            onClick={() => rollDice(4)} 
            variant="outline" 
            className="font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-200 hover:bg-primary/10 dark:hover:bg-primary/20 hover:border-primary/50 dark:hover:border-primary/60 hover:shadow-md dark:hover:shadow-lg"
            disabled={isRolling}
          >
            d4
          </Button>
        </div>

        <div className="pt-4 border-t-2 border-border/40 dark:border-border/50">
          <p className="text-sm font-semibold text-muted-foreground mb-3 dark:text-muted-foreground/90">Rolagens Múltiplas</p>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={() => rollDice(6, 2)} 
              variant="outline" 
              size="sm" 
              className="font-bold hover:scale-105 active:scale-95 transition-all duration-200 hover:bg-primary/10 dark:hover:bg-primary/20 hover:border-primary/50 dark:hover:border-primary/60 hover:shadow-md dark:hover:shadow-lg"
              disabled={isRolling}
            >
              2d6
            </Button>
            <Button 
              onClick={() => rollDice(8, 2)} 
              variant="outline" 
              size="sm" 
              className="font-bold hover:scale-105 active:scale-95 transition-all duration-200 hover:bg-primary/10 dark:hover:bg-primary/20 hover:border-primary/50 dark:hover:border-primary/60 hover:shadow-md dark:hover:shadow-lg"
              disabled={isRolling}
            >
              2d8
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      if ((e.key === "r" || e.key === "R") && !isRolling) {
        e.preventDefault()
        rollDice(20)
      } else if (e.key === " " && lastDiceUsed && !isRolling) {
        e.preventDefault()
        rollDice(lastDiceUsed.sides, lastDiceUsed.count)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [lastDiceUsed, isRolling, rollDice])
}
