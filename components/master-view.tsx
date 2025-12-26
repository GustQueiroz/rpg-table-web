"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { storage } from "@/lib/storage"
import { DiceHistory } from "@/components/dice-history"
import type { Player } from "@/lib/types"

interface MasterViewProps {
  roomId: string
  masterId: string
}

export function MasterView({ roomId, masterId }: MasterViewProps) {
  const [room, setRoom] = useState(storage.rooms.getById(roomId))
  const [players, setPlayers] = useState<Player[]>([])
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)

  useEffect(() => {
    const updateData = () => {
      const currentRoom = storage.rooms.getById(roomId)
      const currentPlayers = storage.players.getByRoom(roomId)
      setRoom(currentRoom)
      setPlayers(currentPlayers)
    }

    updateData()
    const interval = setInterval(updateData, 1000)

    return () => clearInterval(interval)
  }, [roomId])

  const selectedPlayerData = players.find((p) => p.id === selectedPlayer)

  const updatePlayerHp = (playerId: string, amount: number) => {
    const player = players.find((p) => p.id === playerId)
    if (player?.character) {
      const newHp = Math.max(0, Math.min(player.character.maxHp, player.character.currentHp + amount))
      const updated = { ...player.character, currentHp: newHp }
      storage.players.update(playerId, { character: updated })
    }
  }

  const addConditionToPlayer = (playerId: string, condition: string) => {
    const player = players.find((p) => p.id === playerId)
    if (player?.character && condition.trim()) {
      const updated = { ...player.character, conditions: [...player.character.conditions, condition.trim()] }
      storage.players.update(playerId, { character: updated })
    }
  }

  const removeConditionFromPlayer = (playerId: string, conditionIndex: number) => {
    const player = players.find((p) => p.id === playerId)
    if (player?.character) {
      const updated = {
        ...player.character,
        conditions: player.character.conditions.filter((_, i) => i !== conditionIndex),
      }
      storage.players.update(playerId, { character: updated })
    }
  }

  const calculateModifier = (value: number): string => {
    const mod = Math.floor((value - 10) / 2)
    return mod >= 0 ? `+${mod}` : `${mod}`
  }

  return (
    <div className="min-h-screen p-4 bg-background">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Painel do Mestre</h1>
            <p className="text-muted-foreground">{room?.name}</p>
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
                <CardTitle>Jogadores ({players.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {players.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">Nenhum jogador conectado</p>
                  ) : (
                    players.map((player) => (
                      <div
                        key={player.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedPlayer === player.id ? "border-primary bg-accent" : "hover:bg-accent"
                        }`}
                        onClick={() => setSelectedPlayer(player.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-semibold">{player.character?.name || player.name}</p>
                            {player.character && (
                              <p className="text-xs text-muted-foreground">
                                {player.character.race} {player.character.class} - Nível {player.character.level}
                              </p>
                            )}
                          </div>
                          {player.character && (
                            <div className="flex items-center gap-4">
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">PV</p>
                                <p className="font-bold">
                                  {player.character.currentHp}/{player.character.maxHp}
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">CA</p>
                                <p className="font-bold">{player.character.armorClass}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        {player.character && player.character.conditions.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {player.character.conditions.map((condition, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {condition}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {selectedPlayerData?.character && (
              <Card>
                <CardHeader>
                  <CardTitle>Controle: {selectedPlayerData.character.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Pontos de Vida</p>
                    <div className="flex items-center gap-2">
                      <Button onClick={() => updatePlayerHp(selectedPlayerData.id, -5)} variant="outline" size="sm">
                        -5
                      </Button>
                      <Button onClick={() => updatePlayerHp(selectedPlayerData.id, -1)} variant="outline" size="sm">
                        -1
                      </Button>
                      <p className="text-2xl font-bold flex-1 text-center">
                        {selectedPlayerData.character.currentHp}/{selectedPlayerData.character.maxHp}
                      </p>
                      <Button onClick={() => updatePlayerHp(selectedPlayerData.id, 1)} variant="outline" size="sm">
                        +1
                      </Button>
                      <Button onClick={() => updatePlayerHp(selectedPlayerData.id, 5)} variant="outline" size="sm">
                        +5
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Atributos</p>
                    <div className="grid grid-cols-6 gap-2">
                      {[
                        { name: "FOR", value: selectedPlayerData.character.attributes.strength },
                        { name: "DES", value: selectedPlayerData.character.attributes.dexterity },
                        { name: "CON", value: selectedPlayerData.character.attributes.constitution },
                        { name: "INT", value: selectedPlayerData.character.attributes.intelligence },
                        { name: "SAB", value: selectedPlayerData.character.attributes.wisdom },
                        { name: "CAR", value: selectedPlayerData.character.attributes.charisma },
                      ].map((attr) => (
                        <div key={attr.name} className="text-center p-2 border rounded">
                          <p className="text-xs font-semibold text-muted-foreground">{attr.name}</p>
                          <p className="text-lg font-bold">{attr.value}</p>
                          <p className="text-xs text-muted-foreground">{calculateModifier(attr.value)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Condições</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPlayerData.character.conditions.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Nenhuma condição</p>
                      ) : (
                        selectedPlayerData.character.conditions.map((condition, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => removeConditionFromPlayer(selectedPlayerData.id, idx)}
                          >
                            {condition} ×
                          </Badge>
                        ))
                      )}
                    </div>
                    <QuickConditions onAdd={(condition) => addConditionToPlayer(selectedPlayerData.id, condition)} />
                  </div>

                  {selectedPlayerData.character.notes && (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Anotações</p>
                      <p className="text-sm whitespace-pre-wrap p-3 bg-muted rounded-lg">
                        {selectedPlayerData.character.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <DiceHistory roomId={roomId} />
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickConditions({ onAdd }: { onAdd: (condition: string) => void }) {
  const [custom, setCustom] = useState("")

  const commonConditions = [
    "Envenenado",
    "Cego",
    "Surdo",
    "Paralisado",
    "Atordoado",
    "Caído",
    "Amedrontado",
    "Inconsciente",
  ]

  const handleCustom = () => {
    if (custom.trim()) {
      onAdd(custom)
      setCustom("")
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1">
        {commonConditions.map((condition) => (
          <Button key={condition} variant="outline" size="sm" onClick={() => onAdd(condition)}>
            {condition}
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Condição personalizada"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCustom()}
          size={1}
        />
        <Button onClick={handleCustom} size="sm">
          Adicionar
        </Button>
      </div>
    </div>
  )
}
