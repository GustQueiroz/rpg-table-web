"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { storage } from "@/lib/storage"
import { DiceRoller } from "@/components/dice-roller"
import { DiceHistory } from "@/components/dice-history"
import type { Character } from "@/lib/types"

interface PlayerViewProps {
  roomId: string
  playerId: string
  character: Character
}

export function PlayerView({ roomId, playerId, character: initialCharacter }: PlayerViewProps) {
  const [character, setCharacter] = useState(initialCharacter)
  const [tempHp, setTempHp] = useState("")
  const [newCondition, setNewCondition] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      const players = storage.players.getByRoom(roomId)
      const player = players.find((p) => p.id === playerId)
      if (player?.character) {
        setCharacter(player.character)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [roomId, playerId])

  const calculateModifier = (value: number): string => {
    const mod = Math.floor((value - 10) / 2)
    return mod >= 0 ? `+${mod}` : `${mod}`
  }

  const updateHp = (amount: number) => {
    const newHp = Math.max(0, Math.min(character.maxHp, character.currentHp + amount))
    const updated = { ...character, currentHp: newHp }
    setCharacter(updated)
    storage.players.update(playerId, { character: updated })
  }

  const applyTempHp = () => {
    const amount = Number.parseInt(tempHp)
    if (!Number.isNaN(amount)) {
      updateHp(amount)
      setTempHp("")
    }
  }

  const addCondition = () => {
    if (newCondition.trim()) {
      const updated = { ...character, conditions: [...character.conditions, newCondition.trim()] }
      setCharacter(updated)
      storage.players.update(playerId, { character: updated })
      setNewCondition("")
    }
  }

  const removeCondition = (index: number) => {
    const updated = { ...character, conditions: character.conditions.filter((_, i) => i !== index) }
    setCharacter(updated)
    storage.players.update(playerId, { character: updated })
  }

  return (
    <div className="min-h-screen p-4 bg-background">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{character.name}</h1>
            <p className="text-muted-foreground">
              {character.race} {character.class} - Nível {character.level}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Código da Sala</p>
            <p className="text-lg font-mono font-semibold">{roomId}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Pontos de Vida</p>
                    <div className="flex items-center gap-2">
                      <Button onClick={() => updateHp(-1)} variant="outline" size="sm">
                        -
                      </Button>
                      <p className="text-3xl font-bold flex-1 text-center">
                        {character.currentHp}/{character.maxHp}
                      </p>
                      <Button onClick={() => updateHp(1)} variant="outline" size="sm">
                        +
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="±PV"
                        value={tempHp}
                        onChange={(e) => setTempHp(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && applyTempHp()}
                      />
                      <Button onClick={applyTempHp} size="sm">
                        Aplicar
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Classe de Armadura</p>
                    <p className="text-5xl font-bold text-center">{character.armorClass}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Atributos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {[
                    { name: "FOR", value: character.attributes.strength },
                    { name: "DES", value: character.attributes.dexterity },
                    { name: "CON", value: character.attributes.constitution },
                    { name: "INT", value: character.attributes.intelligence },
                    { name: "SAB", value: character.attributes.wisdom },
                    { name: "CAR", value: character.attributes.charisma },
                  ].map((attr) => (
                    <div key={attr.name} className="text-center space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">{attr.name}</p>
                      <p className="text-2xl font-bold">{attr.value}</p>
                      <p className="text-sm text-muted-foreground">{calculateModifier(attr.value)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Condições</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {character.conditions.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Nenhuma condição ativa</p>
                  ) : (
                    character.conditions.map((condition, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeCondition(index)}
                      >
                        {condition} ×
                      </Badge>
                    ))
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Nova condição"
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCondition()}
                  />
                  <Button onClick={addCondition} size="sm">
                    Adicionar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {character.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Anotações</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap text-sm">{character.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <DiceRoller roomId={roomId} playerId={playerId} playerName={character.name} />
            <DiceHistory roomId={roomId} />
          </div>
        </div>
      </div>
    </div>
  )
}
