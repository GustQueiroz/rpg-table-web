"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { storage } from "@/lib/storage"
import { api } from "@/lib/api.client"
import { DiceRoller } from "@/components/dice-roller"
import { DiceHistory } from "@/components/dice-history"
import { Chat } from "@/components/chat"
import { PlayersList } from "@/components/players-list"
import { ThemeToggle } from "@/components/theme-toggle"
import { CharacterImageUpload } from "@/components/character-image-upload"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useGame } from "@/lib/contexts/game-context"
import type { Player, Character } from "@/lib/types"

interface MasterViewProps {
  roomId: string
  masterId: string
  onLeave?: () => void
  onRefresh?: () => Promise<void>
}

export function MasterView({ roomId, masterId, onLeave, onRefresh }: MasterViewProps) {
  const { toast } = useToast()
  const { player } = useGame()
  const [room, setRoom] = useState(storage.rooms.getById(roomId))
  const [players, setPlayers] = useState<Player[]>([])
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchPlayersFromBackend = async () => {
    try {
      const charactersData = await api.characters.getByRoom(roomId)
      if (charactersData && Array.isArray(charactersData)) {
        const playersFromBackend: Player[] = charactersData.map((charData: any) => {
          const character: Character = {
            id: charData.id,
            roomId: charData.roomId,
            playerName: charData.playerName,
            name: charData.name,
            classe: charData.classe,
            class: charData.classe,
            level: charData.level,
            attributes: {
              strength: charData.strength,
              dexterity: charData.dexterity,
              constitution: charData.constitution,
              intelligence: charData.intelligence,
              wisdom: charData.wisdom,
              charisma: charData.charisma,
            },
            currentHp: charData.currentHp,
            maxHp: charData.maxHp,
            armorClass: charData.armorClass,
            notes: charData.notes,
            image: charData.image,
            conditions: charData.conditions || [],
            createdAt: new Date(charData.createdAt),
            updatedAt: new Date(charData.updatedAt),
          }

          return {
            id: `player_${charData.id}`,
            name: charData.playerName,
            role: "player" as const,
            roomId: roomId,
            character,
          }
        })

        setPlayers(playersFromBackend)
      }
    } catch {
      const currentPlayers = storage.players.getByRoom(roomId)
      setPlayers(currentPlayers)
    }
  }

  useEffect(() => {
    const updateData = async () => {
      const currentRoom = storage.rooms.getById(roomId)
      setRoom(currentRoom)
      await fetchPlayersFromBackend()
    }

    updateData()
    const interval = setInterval(updateData, 1000)

    return () => clearInterval(interval)
  }, [roomId])

  const selectedPlayerData = players.find((p) => p.id === selectedPlayer)

  const updatePlayerHp = async (playerId: string, amount: number) => {
    const player = players.find((p) => p.id === playerId)
    if (player?.character) {
      const newHp = Math.max(0, Math.min(player.character.maxHp, player.character.currentHp + amount))
      const updated = { ...player.character, currentHp: newHp }
      
      const updatedPlayers = players.map((p) => 
        p.id === playerId ? { ...p, character: updated } : p
      )
      setPlayers(updatedPlayers)

      if (player.character.id) {
        try {
          await api.characters.update(player.character.id, {
            currentHp: newHp,
          })
          setTimeout(() => fetchPlayersFromBackend(), 500)
        } catch {
        }
      }
    }
  }

  const addConditionToPlayer = async (playerId: string, condition: string) => {
    const player = players.find((p) => p.id === playerId)
    if (player?.character && condition.trim()) {
      const newConditions = [...(player.character.conditions || []), condition.trim()]
      const updated = { ...player.character, conditions: newConditions }
      
      const updatedPlayers = players.map((p) => 
        p.id === playerId ? { ...p, character: updated } : p
      )
      setPlayers(updatedPlayers)

      if (player.character.id) {
        try {
          await api.characters.update(player.character.id, {
            conditions: newConditions,
          })
          setTimeout(() => fetchPlayersFromBackend(), 500)
        } catch {
        }
      }
    }
  }

  const removeConditionFromPlayer = async (playerId: string, conditionIndex: number) => {
    const player = players.find((p) => p.id === playerId)
    if (player?.character) {
      const newConditions = (player.character.conditions || []).filter((_, i) => i !== conditionIndex)
      const updated = {
        ...player.character,
        conditions: newConditions,
      }
      
      const updatedPlayers = players.map((p) => 
        p.id === playerId ? { ...p, character: updated } : p
      )
      setPlayers(updatedPlayers)

      if (player.character.id) {
        try {
          await api.characters.update(player.character.id, {
            conditions: newConditions,
          })
          setTimeout(() => fetchPlayersFromBackend(), 500)
        } catch {
        }
      }
    }
  }

  const calculateModifier = (value: number): string => {
    const mod = Math.floor((value - 10) / 2)
    return mod >= 0 ? `+${mod}` : `${mod}`
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      if (onRefresh) {
        await onRefresh()
      }
      const currentRoom = storage.rooms.getById(roomId)
      setRoom(currentRoom)
      await fetchPlayersFromBackend()
      toast({
        title: "Atualizado com sucesso",
        description: "Os dados da sala foram atualizados.",
      })
    } catch {
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar os dados da sala.",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div className="min-h-screen p-4 bg-background">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between p-6 bg-card rounded-lg border-2 border-border/60 shadow-lg">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Painel do Mestre
            </h1>
            <p className="text-muted-foreground mt-1">{room?.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <div 
              className="text-right p-4 bg-muted/50 rounded-lg border border-border/40 cursor-pointer hover:bg-muted/70 transition-colors"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(roomId)
                  toast({
                    title: "Código copiado",
                    description: "O código da sala foi copiado para a área de transferência.",
                  })
                } catch {
                  toast({
                    title: "Erro ao copiar",
                    description: "Não foi possível copiar o código.",
                    variant: "destructive",
                  })
                }
              }}
            >
              <p className="text-sm text-muted-foreground font-semibold mb-1">Código da Sala</p>
              <p className="text-2xl font-mono font-bold tracking-wider">{roomId}</p>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <div className="flex flex-col gap-2">
                {onRefresh && (
                  <Button 
                    onClick={handleRefresh} 
                    variant="outline" 
                    size="sm" 
                    className="font-semibold"
                    disabled={isRefreshing}
                  >
                    {isRefreshing ? "Atualizando..." : "Atualizar"}
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <PlayersList 
              roomId={roomId}
              onPlayerSelect={(selectedPlayerFromList) => {
                if (selectedPlayerFromList.character?.id) {
                  const playerId = `player_${selectedPlayerFromList.character.id}`
                  setSelectedPlayer(playerId)
                  
                  const foundPlayer = players.find((p) => p.id === playerId)
                  if (!foundPlayer) {
                    fetchPlayersFromBackend()
                  }
                }
              }}
            />

            {selectedPlayerData?.character && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold">Controle: {selectedPlayerData.character.name}</CardTitle>
                    <CharacterImageUpload
                      characterId={selectedPlayerData.character.id}
                      currentImage={selectedPlayerData.character.image}
                      onImageUpdate={(image) => {
                        const updated = { ...selectedPlayerData.character!, image }
                        const updatedPlayers = players.map((p) =>
                          p.id === selectedPlayerData.id ? { ...p, character: updated } : p
                        )
                        setPlayers(updatedPlayers)
                      }}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border/40">
                    <p className="text-base font-bold">Pontos de Vida</p>
                    <div className="flex items-center gap-2">
                      <Button onClick={() => updatePlayerHp(selectedPlayerData.id, -5)} variant="outline" size="sm" className="font-bold">
                        -5
                      </Button>
                      <Button onClick={() => updatePlayerHp(selectedPlayerData.id, -1)} variant="outline" size="sm" className="font-bold">
                        -1
                      </Button>
                      <div className="flex-1 text-center p-4 bg-background rounded-lg border-2 border-primary/20">
                        <p className="text-3xl font-bold">
                          {selectedPlayerData.character.currentHp}/{selectedPlayerData.character.maxHp}
                        </p>
                      </div>
                      <Button onClick={() => updatePlayerHp(selectedPlayerData.id, 1)} variant="outline" size="sm" className="font-bold">
                        +1
                      </Button>
                      <Button onClick={() => updatePlayerHp(selectedPlayerData.id, 5)} variant="outline" size="sm" className="font-bold">
                        +5
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border/40">
                    <p className="text-base font-bold">Atributos</p>
                    <div className="grid grid-cols-6 gap-3">
                      {[
                        { name: "FOR", value: selectedPlayerData.character.attributes.strength },
                        { name: "DES", value: selectedPlayerData.character.attributes.dexterity },
                        { name: "CON", value: selectedPlayerData.character.attributes.constitution },
                        { name: "INT", value: selectedPlayerData.character.attributes.intelligence },
                        { name: "SAB", value: selectedPlayerData.character.attributes.wisdom },
                        { name: "CAR", value: selectedPlayerData.character.attributes.charisma },
                      ].map((attr) => (
                        <div key={attr.name} className="text-center p-3 border-2 border-border/60 rounded-lg bg-background hover:border-primary/40 transition-colors">
                          <p className="text-xs font-bold text-muted-foreground mb-1">{attr.name}</p>
                          <p className="text-xl font-bold">{attr.value}</p>
                          <p className="text-sm font-semibold text-primary mt-1">{calculateModifier(attr.value)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border/40">
                    <p className="text-base font-bold">Condições</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPlayerData.character.conditions.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Nenhuma condição</p>
                      ) : (
                        selectedPlayerData.character.conditions.map((condition, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="cursor-pointer font-semibold hover:bg-destructive/20 transition-colors"
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
                    <div className="space-y-2 p-4 bg-muted/30 rounded-lg border border-border/40">
                      <p className="text-base font-bold">Anotações</p>
                      <p className="text-sm whitespace-pre-wrap p-4 bg-background rounded-lg border border-border/40">
                        {selectedPlayerData.character.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Chat 
              roomId={roomId}
              playerName={player?.name || "Mestre"}
              playerImage={null}
            />
            <DiceRoller 
              roomId={roomId} 
              playerId={masterId} 
              playerName={player?.name || "Mestre"} 
            />
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
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {commonConditions.map((condition) => (
          <Button key={condition} variant="outline" size="sm" onClick={() => onAdd(condition)} className="font-semibold">
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
        />
        <Button onClick={handleCustom} size="sm" className="font-semibold">
          Adicionar
        </Button>
      </div>
    </div>
  )
}
