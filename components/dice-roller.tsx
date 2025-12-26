"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { storage } from "@/lib/storage"
import { generateId } from "@/lib/utils/id-generator"
import type { DiceRoll } from "@/lib/types"

interface DiceRollerProps {
  roomId: string
  playerId: string
  playerName: string
}

export function DiceRoller({ roomId, playerId, playerName }: DiceRollerProps) {
  const [modifier, setModifier] = useState(0)
  const [description, setDescription] = useState("")
  const [lastRoll, setLastRoll] = useState<number | null>(null)

  const rollDice = (sides: number, count = 1) => {
    const rolls: number[] = []
    for (let i = 0; i < count; i++) {
      rolls.push(Math.floor(Math.random() * sides) + 1)
    }
    const sum = rolls.reduce((a, b) => a + b, 0)
    const total = sum + modifier

    const roll: DiceRoll = {
      id: generateId(),
      playerId,
      playerName,
      type: `${count}d${sides}${modifier !== 0 ? (modifier > 0 ? `+${modifier}` : modifier) : ""}`,
      result: total,
      rolls,
      modifier,
      timestamp: Date.now(),
      description: description || undefined,
    }

    storage.diceRolls.add(roomId, roll)
    setLastRoll(total)
    setDescription("")

    setTimeout(() => setLastRoll(null), 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rolagem de Dados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {lastRoll !== null && (
          <div className="p-6 bg-primary text-primary-foreground rounded-lg text-center">
            <p className="text-5xl font-bold">{lastRoll}</p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="modifier">Modificador</Label>
          <Input
            id="modifier"
            type="number"
            value={modifier}
            onChange={(e) => setModifier(Number.parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição (opcional)</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Ataque com espada"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => rollDice(20)} variant="outline">
            d20
          </Button>
          <Button onClick={() => rollDice(12)} variant="outline">
            d12
          </Button>
          <Button onClick={() => rollDice(10)} variant="outline">
            d10
          </Button>
          <Button onClick={() => rollDice(8)} variant="outline">
            d8
          </Button>
          <Button onClick={() => rollDice(6)} variant="outline">
            d6
          </Button>
          <Button onClick={() => rollDice(4)} variant="outline">
            d4
          </Button>
        </div>

        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground mb-2">Rolagens Múltiplas</p>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => rollDice(6, 2)} variant="outline" size="sm">
              2d6
            </Button>
            <Button onClick={() => rollDice(8, 2)} variant="outline" size="sm">
              2d8
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
