"use client"

import { useState } from "react"
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

  const rollDice = async (sides: number, count = 1) => {
    setIsRolling(true)
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
  }

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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Dice1 className="h-5 w-5" />
            Rolagem de Dados
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="font-semibold"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {lastRoll !== null && (
          <div className="p-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-lg text-center border-2 border-primary/30 shadow-lg">
            <p className="text-6xl font-bold">{lastRoll}</p>
          </div>
        )}

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
          <Button onClick={() => rollDice(20)} variant="outline" className="font-bold text-lg">
            d20
          </Button>
          <Button onClick={() => rollDice(12)} variant="outline" className="font-bold text-lg">
            d12
          </Button>
          <Button onClick={() => rollDice(10)} variant="outline" className="font-bold text-lg">
            d10
          </Button>
          <Button onClick={() => rollDice(8)} variant="outline" className="font-bold text-lg">
            d8
          </Button>
          <Button onClick={() => rollDice(6)} variant="outline" className="font-bold text-lg">
            d6
          </Button>
          <Button onClick={() => rollDice(4)} variant="outline" className="font-bold text-lg">
            d4
          </Button>
        </div>

        <div className="pt-4 border-t-2 border-border/40">
          <p className="text-sm font-semibold text-muted-foreground mb-3">Rolagens Múltiplas</p>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => rollDice(6, 2)} variant="outline" size="sm" className="font-bold">
              2d6
            </Button>
            <Button onClick={() => rollDice(8, 2)} variant="outline" size="sm" className="font-bold">
              2d8
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
