"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import type { Player } from "@/lib/types"

interface CharacterCardCompactProps {
  player: Player
}

export function CharacterCardCompact({ player }: CharacterCardCompactProps) {
  const character = player.character

  if (!character) {
    return null
  }

  return (
    <div className="relative border-2 border-border/60 dark:border-border/50 rounded-lg overflow-hidden bg-card shadow-md hover:shadow-lg dark:shadow-lg dark:hover:shadow-xl transition-all duration-300 group hover:scale-105 active:scale-95">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none group-hover:from-primary/10 group-hover:to-secondary/10 dark:group-hover:from-primary/15 dark:group-hover:to-secondary/15 transition-all duration-300" />
      
      <div className="relative p-1.5">
        <div className="text-center border-b border-border/40 pb-1 mb-1.5">
          <h3 className="text-[10px] font-bold text-foreground truncate leading-tight">{character.name}</h3>
          <p className="text-[9px] text-muted-foreground truncate leading-tight">{player.name}</p>
        </div>

        <div className="flex justify-center mb-1.5">
          <Avatar className="h-10 w-10 border-2 border-primary/20 dark:border-primary/30 shadow-sm group-hover:scale-110 group-hover:border-primary/40 dark:group-hover:border-primary/50 transition-all duration-300">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 dark:from-primary/30 dark:to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <AvatarImage src={character.image || undefined} alt={character.name} className="relative z-10" />
            <AvatarFallback className="bg-muted dark:bg-muted/90 text-muted-foreground dark:text-muted-foreground/90 font-bold text-xs relative z-10">
              {character.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="grid grid-cols-2 gap-0.5 text-center mb-1">
          <div className="p-0.5 bg-muted/30 rounded border border-border/40">
            <p className="text-[8px] text-muted-foreground font-bold leading-tight">Classe</p>
            <p className="text-[9px] font-bold truncate leading-tight">{character.class || character.classe || "—"}</p>
          </div>
          <div className="p-0.5 bg-muted/30 rounded border border-border/40">
            <p className="text-[8px] text-muted-foreground font-bold leading-tight">Nível</p>
            <p className="text-[9px] font-bold leading-tight">{character.level}</p>
          </div>
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center justify-between p-0.5 bg-muted/30 rounded border border-border/40">
            <span className="text-[8px] text-muted-foreground font-bold">PV</span>
            <span className="text-[9px] font-bold leading-tight">
              {character.currentHp}/{character.maxHp}
            </span>
          </div>
          <div className="flex items-center justify-between p-0.5 bg-muted/30 rounded border border-border/40">
            <span className="text-[8px] text-muted-foreground font-bold">CA</span>
            <span className="text-[9px] font-bold leading-tight">{character.armorClass}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

