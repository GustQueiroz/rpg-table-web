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
import type { Character } from "@/lib/types"

interface PlayerViewProps {
  roomId: string
  playerId: string
  character: Character
  onLeave?: () => void
  onRefresh?: () => Promise<void>
}

export function PlayerView({ roomId, playerId, character: initialCharacter, onLeave, onRefresh }: PlayerViewProps) {
  const { toast } = useToast()
  const [character, setCharacter] = useState(initialCharacter)
  const [tempHp, setTempHp] = useState("")
  const [newCondition, setNewCondition] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const updateCharacter = async () => {
      try {
        const charactersData = await api.characters.getByRoom(roomId)
        if (charactersData && Array.isArray(charactersData)) {
          const player = storage.players.getByRoom(roomId).find((p) => p.id === playerId)
          const charData = charactersData.find((c: any) => c.playerName === player?.name)
          if (charData && character.id && charData.id === character.id) {
            const updatedCharacter: Character = {
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
            setCharacter(updatedCharacter)
            storage.players.update(playerId, { character: updatedCharacter })
          }
        }
      } catch {
      }
    }

    if (character.id) {
      updateCharacter()
      const interval = setInterval(updateCharacter, 1000)
      return () => clearInterval(interval)
    }
  }, [roomId, playerId])

  const calculateModifier = (value: number): string => {
    const mod = Math.floor((value - 10) / 2)
    return mod >= 0 ? `+${mod}` : `${mod}`
  }

  const updateHp = async (amount: number) => {
    const newHp = Math.max(0, Math.min(character.maxHp, character.currentHp + amount))
    const updated = { ...character, currentHp: newHp }
    setCharacter(updated)
    storage.players.update(playerId, { character: updated })

    if (character.id) {
      try {
        await api.characters.update(character.id, {
          currentHp: newHp,
        })
      } catch {
      }
    }
  }

  const applyTempHp = () => {
    const amount = Number.parseInt(tempHp)
    if (!Number.isNaN(amount)) {
      updateHp(amount)
      setTempHp("")
    }
  }

  const addCondition = async () => {
    if (newCondition.trim()) {
      const newConditions = [...(character.conditions || []), newCondition.trim()]
      const updated = { ...character, conditions: newConditions }
      setCharacter(updated)
      storage.players.update(playerId, { character: updated })
      setNewCondition("")

      if (character.id) {
        try {
          await api.characters.update(character.id, {
            conditions: newConditions,
          })
        } catch {
        }
      }
    }
  }

  const removeCondition = async (index: number) => {
    const newConditions = (character.conditions || []).filter((_, i) => i !== index)
    const updated = { ...character, conditions: newConditions }
    setCharacter(updated)
    storage.players.update(playerId, { character: updated })

    if (character.id) {
      try {
        await api.characters.update(character.id, {
          conditions: newConditions,
        })
      } catch {
      }
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      if (onRefresh) {
        await onRefresh()
      }
      
      try {
        const charactersData = await api.characters.getByRoom(roomId)
        if (charactersData && Array.isArray(charactersData)) {
          const player = storage.players.getByRoom(roomId).find((p) => p.id === playerId)
          const charData = charactersData.find((c: any) => c.playerName === player?.name)
          if (charData) {
            const updatedCharacter: Character = {
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
            setCharacter(updatedCharacter)
            if (playerId) {
              storage.players.update(playerId, { character: updatedCharacter })
            }
          }
        }
      } catch {
      }

      toast({
        title: "Atualizado com sucesso",
        description: "Os dados do personagem foram atualizados.",
      })
    } catch {
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar os dados do personagem.",
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
              {character.name}
            </h1>
            <p className="text-muted-foreground mt-1 text-lg">
              {character.race} {character.class} - Nível {character.level}
            </p>
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
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold">Status</CardTitle>
                  {character.id && (
                    <CharacterImageUpload
                      characterId={character.id}
                      currentImage={character.image}
                      onImageUpdate={(image) => {
                        const updated = { ...character, image }
                        setCharacter(updated)
                        storage.players.update(playerId, { character: updated })
                      }}
                    />
                  )}
                </div>
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
            <Chat 
              roomId={roomId}
              playerName={character.playerName || character.name}
              playerImage={character.image || null}
            />
            <DiceRoller roomId={roomId} playerId={playerId} playerName={character.name} />
            <DiceHistory roomId={roomId} />
          </div>
        </div>
      </div>
    </div>
  )
}
