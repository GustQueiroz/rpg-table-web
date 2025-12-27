"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Player } from "@/lib/types"

interface CharacterCardProps {
  player: Player
  onClick?: () => void
}

export function CharacterCard({ player, onClick }: CharacterCardProps) {
  const character = player.character

  if (!character) {
    return null
  }

  return (
    <div
      className={`relative border-4 border-border/80 rounded-lg overflow-hidden bg-card shadow-xl hover:shadow-2xl transition-all ${
        onClick ? "cursor-pointer hover:scale-[1.02]" : ""
      }`}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
      
      <div className="relative">
        <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border-b-2 border-primary/30 py-2 px-4">
          <h3 className="text-lg font-bold text-center text-foreground">{character.name}</h3>
          <p className="text-xs text-muted-foreground text-center mt-0.5">{player.name}</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-center">
            <Avatar className="h-40 w-40 border-4 border-primary/30 shadow-2xl ring-2 ring-primary/10">
              <AvatarImage src={character.image || undefined} alt={character.name} />
              <AvatarFallback className="bg-gradient-to-br from-muted to-muted/80 text-muted-foreground font-bold text-3xl">
                {character.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t-2 border-border/60">
            <div className="p-2 bg-muted/40 rounded border-2 border-border/60 text-center">
              <p className="text-xs text-muted-foreground font-bold mb-1 uppercase">Classe</p>
              <p className="text-sm font-bold">{character.class || character.classe || "—"}</p>
            </div>
            <div className="p-2 bg-muted/40 rounded border-2 border-border/60 text-center">
              <p className="text-xs text-muted-foreground font-bold mb-1 uppercase">Nível</p>
              <p className="text-sm font-bold">{character.level}</p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t-2 border-border/60">
            <div className="flex items-center justify-between p-2 bg-muted/40 rounded border-2 border-border/60">
              <span className="text-xs text-muted-foreground font-bold uppercase">PV</span>
              <span className="text-base font-bold">
                {character.currentHp}/{character.maxHp}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/40 rounded border-2 border-border/60">
              <span className="text-xs text-muted-foreground font-bold uppercase">CA</span>
              <span className="text-base font-bold">{character.armorClass}</span>
            </div>
          </div>

          {character.conditions && character.conditions.length > 0 && (
            <div className="flex flex-wrap gap-1 justify-center pt-3 border-t-2 border-border/60">
              {character.conditions.slice(0, 3).map((condition, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs font-semibold">
                  {condition}
                </Badge>
              ))}
              {character.conditions.length > 3 && (
                <Badge variant="secondary" className="text-xs font-semibold">
                  +{character.conditions.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

