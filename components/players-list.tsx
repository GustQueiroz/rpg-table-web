"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { List, Grid } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CharacterCard } from "@/components/character-card"
import { api } from "@/lib/api.client"
import type { Player, Character } from "@/lib/types"

interface PlayersListProps {
  roomId: string
  onPlayerSelect?: (player: Player) => void
}

export function PlayersList({ roomId, onPlayerSelect }: PlayersListProps) {
  const [players, setPlayers] = useState<Player[]>([])
  const [viewMode, setViewMode] = useState<"list" | "cards">("list")

  const fetchPlayers = async () => {
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
    }
  }

  useEffect(() => {
    fetchPlayers()
  }, [roomId])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Jogadores ({players.length})</CardTitle>
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "list" | "cards")}>
            <TabsList>
              <TabsTrigger value="list">
                <List className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="cards">
                <Grid className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {players.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">Nenhum jogador conectado</p>
        ) : viewMode === "list" ? (
          <div className="space-y-3">
            {players.map((player) => (
              <div
                key={player.id}
                className={`p-4 border-2 border-border/60 dark:border-border/50 rounded-lg hover:bg-accent/50 dark:hover:bg-accent/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-md dark:hover:shadow-lg group ${
                  onPlayerSelect ? "cursor-pointer active:scale-[0.98]" : ""
                }`}
                onClick={() => onPlayerSelect?.(player)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar className="h-10 w-10 border-2 border-border dark:border-border/60 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <AvatarImage src={player.character?.image || undefined} alt={player.name} />
                      <AvatarFallback className="bg-muted dark:bg-muted/80 text-muted-foreground dark:text-muted-foreground/90 font-semibold text-sm">
                        {player.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-lg">{player.name}</p>
                      {player.character && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {player.character.name} - {player.character.class || player.character.classe} - Nível {player.character.level}
                        </p>
                      )}
                    </div>
                  </div>
                  {player.character && (
                    <div className="flex items-center gap-6">
                      <div className="text-center p-2 bg-muted/50 dark:bg-muted/60 rounded border border-border/40 dark:border-border/50 min-w-[60px] group-hover:bg-muted/60 dark:group-hover:bg-muted/70 transition-colors duration-300">
                        <p className="text-xs text-muted-foreground dark:text-muted-foreground/80 font-semibold mb-1">PV</p>
                        <p className="font-bold text-lg">
                          {player.character.currentHp}/{player.character.maxHp}
                        </p>
                      </div>
                      <div className="text-center p-2 bg-muted/50 dark:bg-muted/60 rounded border border-border/40 dark:border-border/50 min-w-[50px] group-hover:bg-muted/60 dark:group-hover:bg-muted/70 transition-colors duration-300">
                        <p className="text-xs text-muted-foreground dark:text-muted-foreground/80 font-semibold mb-1">CA</p>
                        <p className="font-bold text-lg">{player.character.armorClass}</p>
                      </div>
                    </div>
                  )}
                </div>
                {player.character && player.character.conditions && player.character.conditions.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {player.character.conditions.map((condition, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {players.map((player) => (
              <CharacterCard
                key={player.id}
                player={player}
                onClick={() => onPlayerSelect?.(player)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

