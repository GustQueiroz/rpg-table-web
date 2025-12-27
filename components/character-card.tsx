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
      className={`relative border-4 border-border/80 dark:border-border/70 rounded-lg overflow-hidden bg-card shadow-xl hover:shadow-2xl dark:shadow-2xl dark:hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-300 group ${
        onClick ? "cursor-pointer hover:scale-[1.02] active:scale-[0.98]" : ""
      }`}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 dark:from-primary/15 dark:via-transparent dark:to-secondary/15 pointer-events-none group-hover:from-primary/20 group-hover:to-secondary/20 dark:group-hover:from-primary/25 dark:group-hover:to-secondary/25 transition-all duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent dark:from-black/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 dark:from-primary/30 dark:via-primary/15 dark:to-primary/30 border-b-2 border-primary/30 dark:border-primary/40 py-2 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/5 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <h3 className="text-lg font-bold text-center text-foreground relative z-10">{character.name}</h3>
          <p className="text-xs text-muted-foreground dark:text-muted-foreground/80 text-center mt-0.5 relative z-10">{player.name}</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-center">
            <Avatar className="h-40 w-40 border-4 border-primary/30 dark:border-primary/40 shadow-2xl dark:shadow-[0_0_20px_rgba(0,0,0,0.3)] ring-2 ring-primary/10 dark:ring-primary/20 group-hover:scale-105 group-hover:ring-primary/30 dark:group-hover:ring-primary/40 transition-all duration-300 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 dark:from-primary/30 dark:to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <AvatarImage src={character.image || undefined} alt={character.name} className="relative z-10" />
              <AvatarFallback className="bg-gradient-to-br from-muted to-muted/80 dark:from-muted/90 dark:to-muted/70 text-muted-foreground dark:text-muted-foreground/90 font-bold text-3xl relative z-10">
                {character.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t-2 border-border/60 dark:border-border/50">
            <div className="p-2 bg-muted/40 dark:bg-muted/50 rounded border-2 border-border/60 dark:border-border/50 text-center group-hover:bg-muted/50 dark:group-hover:bg-muted/60 transition-colors duration-300">
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/80 font-bold mb-1 uppercase">Classe</p>
              <p className="text-sm font-bold">{character.class || character.classe || "—"}</p>
            </div>
            <div className="p-2 bg-muted/40 dark:bg-muted/50 rounded border-2 border-border/60 dark:border-border/50 text-center group-hover:bg-muted/50 dark:group-hover:bg-muted/60 transition-colors duration-300">
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/80 font-bold mb-1 uppercase">Nível</p>
              <p className="text-sm font-bold">{character.level}</p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t-2 border-border/60 dark:border-border/50">
            <div className="flex items-center justify-between p-2 bg-muted/40 dark:bg-muted/50 rounded border-2 border-border/60 dark:border-border/50 group-hover:bg-muted/50 dark:group-hover:bg-muted/60 transition-colors duration-300">
              <span className="text-xs text-muted-foreground dark:text-muted-foreground/80 font-bold uppercase">PV</span>
              <span className="text-base font-bold">
                {character.currentHp}/{character.maxHp}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/40 dark:bg-muted/50 rounded border-2 border-border/60 dark:border-border/50 group-hover:bg-muted/50 dark:group-hover:bg-muted/60 transition-colors duration-300">
              <span className="text-xs text-muted-foreground dark:text-muted-foreground/80 font-bold uppercase">CA</span>
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

