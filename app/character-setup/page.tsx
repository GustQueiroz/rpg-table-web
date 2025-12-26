"use client"

import { useRouter } from "next/navigation"
import { CharacterSetup } from "@/components/character-setup"
import { useGame } from "@/lib/contexts/game-context"
import { generateId } from "@/lib/utils/id-generator"
import { storage } from "@/lib/storage"
import type { Character } from "@/lib/types"

export default function CharacterSetupPage() {
  const router = useRouter()
  const { roomId, playerId, setCharacter } = useGame()

  if (!roomId || !playerId) {
    router.push("/")
    return null
  }

  const handleComplete = (char: Character) => {
    setCharacter(char)
    if (playerId) {
      storage.players.update(playerId, { character: char })
    }
    router.push(`/room/${roomId}/player`)
  }

  return <CharacterSetup onComplete={handleComplete} characterId={generateId()} />
}

