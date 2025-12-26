"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CharacterSetup } from "@/components/character-setup"
import { useGame } from "@/lib/contexts/game-context"
import { useToast } from "@/hooks/use-toast"
import { generateId } from "@/lib/utils/id-generator"
import { storage } from "@/lib/storage"
import { api } from "@/lib/api.client"
import type { Character } from "@/lib/types"

export default function CharacterSetupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { roomId, playerId, player, setCharacter } = useGame()
  const [isSaving, setIsSaving] = useState(false)

  if (!roomId || !playerId) {
    router.push("/")
    return null
  }

  const handleComplete = async (char: Character) => {
    setIsSaving(true)
    try {
      const characterData = {
        roomId,
        playerName: player?.name || "Jogador",
        name: char.name,
        classe: char.class || char.classe || "",
        level: char.level,
        strength: char.attributes?.strength || char.strength || 10,
        dexterity: char.attributes?.dexterity || char.dexterity || 10,
        constitution: char.attributes?.constitution || char.constitution || 10,
        intelligence: char.attributes?.intelligence || char.intelligence || 10,
        wisdom: char.attributes?.wisdom || char.wisdom || 10,
        charisma: char.attributes?.charisma || char.charisma || 10,
        currentHp: char.currentHp,
        maxHp: char.maxHp,
        armorClass: char.armorClass,
        notes: char.notes || "",
      }

      const savedCharacter = await api.characters.create(characterData)
      
      const characterWithId: Character = {
        ...char,
        id: savedCharacter.id,
        roomId: savedCharacter.roomId,
        playerName: savedCharacter.playerName,
      }

      setCharacter(characterWithId)
      if (playerId) {
        storage.players.update(playerId, { character: characterWithId })
      }

      toast({
        title: "Personagem criado",
        description: "Seu personagem foi salvo com sucesso.",
      })

      router.push(`/room/${roomId}/player`)
    } catch {
      toast({
        title: "Erro ao criar personagem",
        description: "Não foi possível salvar o personagem. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return <CharacterSetup onComplete={handleComplete} characterId={generateId()} isSaving={isSaving} />
}

