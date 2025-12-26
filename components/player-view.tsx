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
  onLeave?: () => void
  onRefresh?: () => Promise<void>
}

export function PlayerView({ roomId, playerId, character: initialCharacter, onLeave, onRefresh }: PlayerViewProps) {
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

  const handleRefresh = async () => {
    if (onRefresh) {
      await onRefresh()
    }
    const players = storage.players.getByRoom(roomId)
    const player = players.find((p) => p.id === playerId)
    if (player?.character) {
      setCharacter(player.character)
    }
  }

  return (
    <div className="min-h-screen p-4 bg-background">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between p-6 bg-card rounded-lg border-2 border-border/60 shadow-lg">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {character.name}
            </h1>
            <p className="text-muted-foreground mt-1 text-lg">
              {character.race} {character.class} - Nível {character.level}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right p-4 bg-muted/50 rounded-lg border border-border/40">
              <p className="text-sm text-muted-foreground font-semibold mb-1">Código da Sala</p>
              <p className="text-2xl font-mono font-bold tracking-wider">{roomId}</p>
            </div>
            <div className="flex flex-col gap-2">
              {onRefresh && (
                <Button onClick={handleRefresh} variant="outline" size="sm" className="font-semibold">
                  Atualizar
                </Button>
              )}
              {onLeave && (
                <Button onClick={onLeave} variant="destructive" size="sm" className="font-semibold">
                  Sair da Sala
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border/40">
                    <p className="text-base font-bold text-muted-foreground">Pontos de Vida</p>
                    <div className="flex items-center gap-2">
                      <Button onClick={() => updateHp(-1)} variant="outline" size="sm" className="font-bold">
                        -
                      </Button>
                      <div className="flex-1 text-center p-4 bg-background rounded-lg border-2 border-primary/20">
                        <p className="text-3xl font-bold">
                          {character.currentHp}/{character.maxHp}
                        </p>
                      </div>
                      <Button onClick={() => updateHp(1)} variant="outline" size="sm" className="font-bold">
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
                      <Button onClick={applyTempHp} size="sm" className="font-semibold">
                        Aplicar
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border/40 flex flex-col items-center justify-center">
                    <p className="text-base font-bold text-muted-foreground">Classe de Armadura</p>
                    <p className="text-6xl font-bold">{character.armorClass}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Atributos</CardTitle>
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
                    <div key={attr.name} className="text-center p-3 border-2 border-border/60 rounded-lg bg-muted/30 hover:border-primary/40 transition-colors">
                      <p className="text-xs text-muted-foreground font-bold mb-2">{attr.name}</p>
                      <p className="text-2xl font-bold">{attr.value}</p>
                      <p className="text-sm font-semibold text-primary mt-1">{calculateModifier(attr.value)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Condições</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {character.conditions.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Nenhuma condição ativa</p>
                  ) : (
                    character.conditions.map((condition, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer font-semibold hover:bg-destructive/20 transition-colors"
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
                  <Button onClick={addCondition} size="sm" className="font-semibold">
                    Adicionar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {character.notes && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Anotações</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap text-sm p-4 bg-muted/30 rounded-lg border border-border/40">{character.notes}</p>
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
